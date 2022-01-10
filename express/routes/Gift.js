const giftRouter = require('express').Router()
const checkSession = require('../database/session').checkSession
const getCookieSection = require('../utils/getCookieSection')
const getDb = require('../database/database').getDb;

const stripe = require('stripe')('')

giftRouter.get('/createcustomer', async (req, res) => {
	// Validate user session
	const isValid = await checkSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session'))

	if (isValid.error) {
		res.json({body: {...isValid}})
		return
	}

	const document = await getDb().collection('users').findOne({code: isValid.code})
	const customers = (await stripe.customers.list()).data
	const customerName = nameJoin(document.guests.map(guest => guest.name))

	let customer = customers.find(element => element.description === customerName)

	if (!customer)
		customer = await stripe.customers.create({name: customerName, description: customerName}) 

	res.json({body: {customerId: customer.id, customerName: customer.description}})
})

giftRouter.post('/createprice', async (req, res) => {
	// Validate user session
	const isValid = await checkSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session'))

	if (isValid.error)
		res.json({body: {...isValid}})

	// Create the product with the amount specified

	let product
	
	try {
		product = await stripe.products.retrieve(isValid.code)
	}
	catch {
		product = await stripe.products.create({name: req.body.data.customerName + ' - Gift', id: isValid.code})
	}

	const giftAmount = Math.round(req.body.data.giftAmount * 100)
	
	try {
		const price = await stripe.prices.create({
			unit_amount: giftAmount,
			currency: 'gbp',
			product: product.id
		})
	
		const session = await stripe.checkout.sessions.create({
			success_url: 'http://localhost:9000/giveagift?success=true',
			cancel_url: 'http://localhost:9000/giveagift?cancelled=true',
			line_items: [
				{price: price.id, quantity: 1},
			],
			mode: 'payment',
		});
	
		res.json({body: {url: session.url}})
	}
	catch (error) {
		console.log(error)
	}

})

function nameJoin(names) {
	let 	nameString 	= '';

	names.forEach((name, index) => {
		nameString += name;

		if (index < names.length - 2) {
			nameString += ', '
		}
		else if (index < names.length - 1) {
			nameString += ' & '
		}
	})

	return nameString;
}


module.exports = {giftRouter: giftRouter};
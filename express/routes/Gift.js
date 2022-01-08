const giftRouter = require('express').Router()
const checkSession = require('../database/session').checkSession
const getCookieSection = require('../utils/getCookieSection')
const getDb = require('../database/database').getDb;

const stripe = require('stripe')('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')

giftRouter.get('/createcustomer', async (req, res) => {
	// Validate user session
	const isValid = await checkSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session'))

	if (isValid.error) {
		res.json({body: {...isValid}})
		return
	}

	const document = await getDb().collection('users').findOne({code: isValid.code})
	const customerName = document.guests.map(guest => guest.name).join('+')
	const customers = (await stripe.customers.list()).data;

	let customer = customers.find(element => element.description === customerName)

	if (!customer)
		customer = await stripe.customers.create({name: customerName, description: customerName}) 

	res.json({data: {customerId: customer.id, customerName: customer.description}})
})

giftRouter.post('/createprice', async (req, res) => {
	// Validate user session
	const isValid = await checkSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session'))

	if (isValid.error)
		res.json({body: {...isValid}})

	// Create the product with the amount specified

	const product = await stripe.product.create({name: req.body.customerName})

	try {
		const price = await stripe.prices.create({
			unit_amount: req.body.giftAmount,
			currency: 'gbp',
			product_data: {
				name: req.body.customerName
			}
		})
	}
	catch (error) {
		console.log(error)
	}


	const thing = 1
})

module.exports = {giftRouter: giftRouter};
const updateRouter		= require('express').Router();
const getDb 			= require('../database/database').getDb;
const checkSession 		= require('../database/session').checkSession;
const getCookieSection 	= require('../utils/getCookieSection');

updateRouter.post('/', async (req, res) => {
	const session = await checkSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session'));

	if (!session.isValid)
		res.json({body: {success: false, error: 'sessionexpired'}})
	else {
		const _db 	= getDb();
		const users	= _db.collection('users');

		const successful = await users.updateOne({code: session.code}, {$set: {guests: req.body.data.guests, foodNotes: req.body.data.foodNotes.slice(0, 200)}})

		if (successful.result.ok)
			res.json({body: {success: true}})
		else
			res.json({body: {success: false, message: 'pages.rvsp.failedtoupdate'}})
	}
})

module.exports = {
	updateRouter: updateRouter
}
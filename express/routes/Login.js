const loginRouter 		= require('express').Router();
const getDb 			= require('../database/database').getDb;
const createSession 	= require('../database/session').createSession;
const checkSession 		= require('../database/session').checkSession;
const removeSession 	= require('../database/session').removeSession;
const getCookieSection 	= require('../utils/getCookieSection');

loginRouter.post('/', async (req, res) => {
	const _db 	= getDb();
	const users = _db.collection('users');

	const guests 	= await users.findOne({code: req.body.code}, {projection: {_id: 0, 'guests': 1}});
	const token 	= await createSession(guests);
	
	res.cookie('ksweddingviewer_session', token, {httpOnly: true});
	res.json({body: {success: true, ...guests}});
})

loginRouter.get('/checkForSession', async (req, res) => {
	const isValid = await checkSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session'));

	if (isValid.error) {
		res.json({body: {...isValid}})
	}
	else
		res.json({body: {success: true, ...isValid.guests}})
})

loginRouter.get('/logout', async (req, res) => {
	removeSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session')).then(() => {
		res.json({body: {success: true}})
	})
})

module.exports = loginRouter;
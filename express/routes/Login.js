const loginRouter 		= require('express').Router();
const getDb 			= require('../database/database').getDb;
const createSession 	= require('../database/session').createSession;
const checkSession 		= require('../database/session').checkSession;
const removeSession 	= require('../database/session').removeSession;
const getCookieSection 	= require('../utils/getCookieSection');

loginRouter.post('/', async (req, res) => { 
	const userInfo = await getUserInfo(req.body.code);
		
	if (userInfo) {
		const token = await createSession(req.body.code);

		res.cookie('ksweddingviewer_session', token, {httpOnly: true});
		res.json({body: {success: true, ...userInfo}});
	}
	else
		res.json({body: {success: false, error: 'pages.login.errors.codenotfound'}})
})

loginRouter.get('/checkForSession', async (req, res) => { 
	const isValid 	= await checkSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session'));
	const userInfo	= await getUserInfo(isValid.code);

	if (isValid.error) {
		res.json({body: {...isValid}})
	}
	else
		res.json({body: {success: true, ...userInfo}})
})

loginRouter.get('/logout', async (req, res) => { 
	removeSession(getCookieSection(req.headers.cookie, 'ksweddingviewer_session')).then(() => {
		res.json({body: {success: true}})
	})
})

async function getUserInfo(code) {
	const users = getDb().collection('users');

	return await users.findOne({code: code}, {projection: {_id: 0, guests: 1, foodNotes: 2, songRequests: 3}});
}

module.exports = {
	loginRouter: loginRouter,
	getUserInfo: getUserInfo 
};
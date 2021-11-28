const getDb = require('./database').getDb;

async function createSession(code) {
	let token = await createUniqueToken();

	saveToken(token, (Math.round(new Date().getTime() / 1000) + 86400), code);

	return token;
}

async function createUniqueToken() {
	return await new Promise(async (resolve, reject) => {
		let token	= createToken(48);

		while (await tokenExists(token)) {
			token = createToken(48);
		}

		resolve(token);
	})
}

async function tokenExists(token) {
	const _db 		= getDb();
	const sessions 	= _db.collection('sessions');

	const doc = await sessions.findOne({token: token}, {});

	return !!doc;
}

function saveToken(token, expires, code) {
	const _db 		= getDb();
	const sessions 	= _db.collection('sessions');

	sessions.insertOne({token: token, expires: expires, code: code});
}

function createToken(length) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	return [...Array(length)].map(item => chars[Math.floor(Math.random() * chars.length)]).join('');
}

async function checkSession(cookie) {
	if (!await tokenExists(cookie))
		return { error: 'nosession' };
	
	const _db 		= getDb();
	const sessions	= _db.collection('sessions');

	const session = await sessions.findOne({token: cookie}, {projection: {_id: 0, 'code': 1, 'expires': 2}});

	if (!isSessionValid(session)) {
		removeSession(cookie);
		return { isValid: false, error: 'sessionexpired' };
	}

	return {isValid: true, code: session.code};
}

function isSessionValid(session) {
	return session.expires && session.expires > (new Date().getTime() / 1000);
}

function removeSession(session) {
	const sessions = getDb().collection('sessions');

	return sessions.deleteOne({token: session});
}

module.exports = { createSession, checkSession, removeSession };
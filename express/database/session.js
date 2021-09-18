const getDb 	= require('./database').getDb;

async function createSession(guests) {
	let token = await createUniqueToken();

	saveToken(token, (Math.round(new Date().getTime() / 1000) + 86400), guests);

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

function saveToken(token, expires, guests) {
	const _db 		= getDb();
	const sessions 	= _db.collection('sessions');

	sessions.insertOne({token: token, expires: expires, guests: guests});
}

function createToken(length) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	return [...Array(length)].map(item => chars[Math.floor(Math.random() * chars.length)]).join('');
}

async function checkSession(cookie) {
	if (!await tokenExists(cookie))
		return { error: 'nosession' };
	
	const _db 		= getDb();
	const users 	= _db.collection('usres');
	const sessions	= _db.collection('sessions');

	const session = await sessions.findOne({token: cookie}, {projection: {_id: 0, 'guests': 1, 'expires': 2}});

	if (!isSessionValid(session)) {
		sessions.remove({token: cookie});
		return { error: 'sessionexpired' };
	}

	return session;
}

function isSessionValid(session) {
	return session.expires && session.expires > (new Date().getTime() / 1000);
}

module.exports = { createSession, checkSession };
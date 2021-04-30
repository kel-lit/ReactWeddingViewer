const assert = require('assert');
const client = require('mongodb').MongoClient;
const config = require('./config.json');

let _db;

function initDb(callback) { 
	if (_db) {
		console.warn('Database is already initialised!');
		return callback(null, _db);
	}

	client.connect(`mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.args}`, config.options, connected);

	function connected(err, db) {
		if (err) {
			return callback(err);
		} 

		console.log(`Database initialised - Connected to ${host}:${port}`);
		_db = db;
		return callback(null, _db);
	}
}

function getDb() {
	assert.ok(_db, 'Database has not been initialised. Call \'initDb\' first.')

	return _db;
}

module.exports = {getDb, initDb};
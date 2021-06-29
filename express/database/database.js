const assert = require('assert');
const client = require('mongodb').MongoClient;
const config = require('./config.json');

let _db;

function initDb(callback) { 
	if (_db) {
		console.warn('Database is already initialised!');
		return callback(null, _db);
	}

	console.log("Connecting to Database...");

	let connectionString;

	if (config.user) {
		connectionString = `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.args}`;
	}
	else {
		connectionString = `mongodb://${config.host}:${config.port}/${config.args}`
	}

	client.connect(connectionString, config.options, connected);

	function connected(err, client) {
		if (err) {
			return callback(err);
		} 

		console.log(`Database initialised - Connected to ${config.host}:${config.port}`);
		_db = client.db("WeddingViewer");
		return callback(null, _db);
	}
}

function getDb() {
	assert.ok(_db, 'Database has not been initialised. Call \'initDb\' first.')

	return _db;
}

module.exports = {getDb, initDb};
const databaseRouter 	= require('express').Router();
const secrets 			= require('../secrets.json');

const MongoClient = require('mongodb').MongoClient;
const MongoHost = '192.168.1.244';
const MongoPort = 27017;
const ConnectionString = `mongodb://${secrets.database.username}:${secrets.database.password}@${MongoHost}:${MongoPort}/?authSource=WeddingViewer&readPreference=primary&appname=MongoDB%20Compass&ssl=false`

MongoClient.connect(ConnectionString, { useUnifiedTopology: true })
.then(client => {
	//Connected
	console.log('Connected to database!');

	//Database and collection
	const db = client.db('WeddingViewer');
	const collection = db.collection('users');

	//Routes
	databaseRouter.post('/test', (req, res) => {
		const name = req.body.name;
		const age = req.body.age;
	
		collection.insertOne({name: name, age: age})
		.then(result => {
			console.log(result);
			res.json({message: 'Updated the database!'});
		})   
		.catch (error => console.error(error))
	})

	databaseRouter.post('/login', (req, res) => {
		collection.findOne({code: req.body.code})
		.then(result => {
			if (!result) {
				res.json({"body": {"error": "Key not found"}});
			}
			else {
				console.log(JSON.stringify(result.name));
				res.json({"body": {"success": result.name}});
			}
		})
		.catch(error => {
			res.json({"error": error});
		})
	})
})
.catch(error => console.log(error))

module.exports = databaseRouter;
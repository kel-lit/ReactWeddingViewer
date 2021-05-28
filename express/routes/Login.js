const loginRouter 	= require('express').Router();
const getDb 		= require('../database/database').getDb;

loginRouter.post('/', (req, res) => {
	_db = getDb();

	users = _db.collection('users');

	users.find({code: req.body.code}).project({ _id: 0, 'name': 1 }).toArray((err, results) => {
		if (err) throw err;

		if (!results) {
			res.json({"body": {"error": "pages.login.errors.codeNotFound"}});
		} 
		else {
			res.json({"body": {"success": results}});
		} 
	})
})

module.exports = loginRouter;
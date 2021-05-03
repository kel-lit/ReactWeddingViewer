const loginRouter 	= require('express').Router();
const getDb 		= require('../database/database').getDb;

loginRouter.post('/', (req, res) => {
	_db = getDb();

	users = _db.collection('users');

	users.findOne({code: req.body.code})
		.then(result => {
			if (!result) {
				res.json({"body": {"error": "pages.login.errors.codeNotFound"}});
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

module.exports = loginRouter;
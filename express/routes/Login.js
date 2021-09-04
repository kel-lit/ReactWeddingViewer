const loginRouter 	= require('express').Router();
const getDb 		= require('../database/database').getDb;

loginRouter.post('/', (req, res) => {
	_db = getDb();

	users = _db.collection('users');

	users.findOne({code: req.body.code}, {projection: {_id: 0, 'guests': 1}}, (err, results) => {
		if (err)
			res.json({body: {error: 'pages.login.errors.dberror'}, additional: err})

		if (!results || results.empty)
			res.json({body: {error: 'pages.login.errors.codenotfound'}});
		else
			res.json({body: {success: true, data: results.guests}});
	})
})

module.exports = loginRouter;
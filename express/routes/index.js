const Database 	= require('./Database')
const Login 	= require('./Login')

const routes = require('express').Router();

routes.use('/database', Database);
routes.use('/login', Login);

routes.get('/test', (req, res) => {
	res.json({"Hello": "World!"});
});

routes.post('/test', (req, res) => {
	res.json({"Hello": req.body.message});
});


module.exports = routes;
const routes 	= require('express').Router();
const Login 	= require('./Login').loginRouter;
const Update	= require('./Update').updateRouter;

routes.use('/login', Login);
routes.use('/update', Update)

routes.get('/test', (req, res) => {
	res.json({"Hello": "World!"});
});

routes.post('/test', (req, res) => {
	res.json({"Hello": req.body.message});
});


module.exports = routes;
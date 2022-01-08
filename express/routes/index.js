const routes 	= require('express').Router();
const Login 	= require('./Login').loginRouter;
const Update	= require('./Update').updateRouter;
const Gift 		= require('./Gift').giftRouter;

routes.use('/login', Login);
routes.use('/update', Update)
routes.use('/gift', Gift)

routes.get('/test', (req, res) => {
	res.json({"Hello": "World!"});
});

routes.post('/test', (req, res) => {
	res.json({"Hello": req.body.message});
});


module.exports = routes;
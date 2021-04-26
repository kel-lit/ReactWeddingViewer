const Database 	= require('./Database')
const Login 	= require('./Login')

const routes = require('express').Router();

routes.use('/database', Database);

module.exports = routes;
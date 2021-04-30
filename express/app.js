const express 	= require('express');
const initDb 	= require('./database/database').initDb;
const getDb 	= require('./database/database').getDb;
const app 		= express();
const port 		= 3000;

const routes = require('./routes');

app.use(express.json());

app.use('/api/', routes);

initDb(() => {
	app.listen(port, (err) => {
		if (err) throw err;

		console.log(`Wedding Viewer Backend listening at http://localhost:${port}`);
	})
});
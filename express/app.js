const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const routes = require('./routes');

app.use(express.json());

app.use('/api/', routes);

app.listen(port, () => {
	console.log(`Wedding Viewer Backend listening at http://localhost:${port}`);
}); 
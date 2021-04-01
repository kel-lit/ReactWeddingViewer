const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/api/test', (req, res) => {
  res.json({test: 'Hello, World!'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
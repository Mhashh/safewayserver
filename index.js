const express = require('express');
require('dotenv').config()
const app = express();

const cors = require('cors')

app.use(cors())
app.post('/getp', (req, res) => {
  res.send('Successful response.');
});

app.listen(3333, () => console.log('Example app is listening on port 3000.'));
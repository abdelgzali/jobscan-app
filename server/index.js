const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser');

const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/jobs', routes);

// server port
const port = process.env.PORT || 4000;

// start server
app.listen(port, () => {
  console.log(`Server started. Listening on port: ${port}`);
})
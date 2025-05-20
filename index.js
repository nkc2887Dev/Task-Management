const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/db.config');
const { PORT, SEED } = require('./src/config/processEnv.config');
const Routes = require('./src/routes/index');
const initSeed = require('./src/seeders/index.js');
dotenv.config();

connectDB();
const app = express();
require('./src/jobs/index.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.send('Server route running perfectly fine!');
});

if (SEED === 'true') {
  initSeed();
}

app.use('/', Routes);

app.listen(PORT, () => {
  console.info(`server running on http:localhost:${PORT}`);
});

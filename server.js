const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//const authController = require('./controllers/authController');

//const apiRouter = require('./routes/api');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(authController.receiveToken);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
// two test routes:
app.get('/', (req, res) => {
  res.send('HI FROM EXPRESS!');
})
app.get('/happy', (req, res) => {
  res.send(':-) :-) :-)');
})

//app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

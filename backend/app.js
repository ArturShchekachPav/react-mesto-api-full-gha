const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const centralErrorHandler = require('./middlewares/central-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3005 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.disable('etag');

app.use(cors({
  origin: 'http://localhost:3005',
  credentials: true,
}));

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: { message: 'Too many requests from this IP' },
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'img-src': ['*'],
    },
  },
}));
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
app.use('/api/', routes);
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT);
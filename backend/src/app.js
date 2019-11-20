import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
// import routes from './routes';
import radioRoutes from './routes/radioRoutes';
import cors from 'cors';

import models, { connectDb } from './models';

const app = express();
app.disable('x-powered-by');

app.use(cors());
app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
// app.use('/', routes);
app.use('/radios/', radioRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

connectDb().then(async () => {  
    console.log(`DB CONNECTED`)
});

export default app;

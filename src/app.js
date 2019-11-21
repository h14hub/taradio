import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import radioRoutes from './routes/radioRoutes';
import cors from 'cors';

import { connectDb } from './models';

const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static')

const app = express();
app.disable('x-powered-by');

app.use(cors());
app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));


app.use(serveStatic(path.join(__dirname, '../dist')))

app.use('/radios/', radioRoutes);


connectDb().then(async () => {  
    console.log(`DB CONNECTED`)
});

export default app;

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const radioRoutes = require('./routes/radioRoutes');
const cors = require('cors');

const { connectDb } = require('./models');

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


const { PORT = 8080 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console

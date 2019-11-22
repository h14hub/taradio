require('dotenv').config()

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const radioRoutes = require('./routes/radioRoutes');
const cors = require('cors');
const mongoose = require('mongoose');


const serveStatic = require('serve-static')
const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
};

const app = express();





app.disable('x-powered-by');

app.use(cors());
app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));


app.use(serveStatic(path.join(__dirname, '../dist_front')))

app.use('/radios/', radioRoutes);


connectDb().then(async () => {  
    console.log(`DB CONNECTED`)
});


const PORT= process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console

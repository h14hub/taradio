require('dotenv').config()

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const radioRoutes = require('./routes/radioRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
const aws = require('aws-sdk');


const serveStatic = require('serve-static')
const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
};

const S3_BUCKET = process.env.S3_BUCKET;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.S3_BUCKET;

aws.config.region = 'eu-west-3';

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

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3({
    signatureVersion: 'v4'
  });
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

connectDb().then(async () => {  
    console.log(`DB CONNECTED`)
});


const PORT= process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console

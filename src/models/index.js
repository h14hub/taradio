import mongoose from 'mongoose';
import Radio from './radioModel';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
};
const models = { Radio };
export { connectDb };
export default models;
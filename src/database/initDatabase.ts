import * as mongoose from 'mongoose';

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect('mongodb+srv://serhat-admin:sss123456@cluster0.kmmv1.mongodb.net/login-info?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

export default dbConnect;

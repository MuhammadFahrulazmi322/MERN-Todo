import express, { Request, Response } from 'express';
import routes from './routes';
const app = express();
const PORT = 8080; //port number localhost

//import koneksi mongo db
import mongoose from 'mongoose';
import cors from 'cors';

//ambil nilai username dan password mongo db di nodemon.json
const {
  MONGODB_ATLAS_USERNAME,
  MONGODB_ATLAS_PASSWORD,
  MONGODB_ATLAS_DBNAME,
} = process.env;

//buat URI dari koneksi yang diberi mongo db
const uri = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0.7qsdk62.mongodb.net/${MONGODB_ATLAS_DBNAME}?retryWrites=true&w=majority`;

//ada didalam doc mongoose, tinggal ikuti
const options = { useNewUrlParser: true, useUnifiedTopology: true };

//mengaktifkan cors agar server dapat diakses tanpa halangan dari cors policy
app.use(cors());
//app.get memiliki parameter pertama yaitu route dan yang kedua berisi req dan res
app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});
mongoose.set('useFindAndModify', true);
//mongoose menggunakan promise sehingga kita dapat mengambil promisenya
mongoose
  .connect(uri, options)
  .then(() => {
    //menjalankan server
    app.listen(PORT, () => {
      console.info(`App is listening in ${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });

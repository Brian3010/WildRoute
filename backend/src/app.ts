import express, { Express, NextFunction, Request, Response, response } from 'express';
import mongoose from 'mongoose';
import { nextTick } from 'process';
import activitiesRoute from './routes/activities';
import AppError from './utils/AppError';

const PORT = 3000;

// Connect to dbs
main()
  .then(() => {
    console.log('CONNECTION SUCCESS');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wildRoute');
}

const app: Express = express();

// app.get('/', (req: Request, res: Response) => {
//   res.send('Helloooooasdaasdasdasdsasdasdd');
// });

app.use('/activities', activitiesRoute);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.send('INVALID URL');
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log('error name: ', err.name);

  // console.log('error:', err);
  // res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  res
    .status(err.statusCode || 500)
    .json({ errorMessage: err.message } || { errorMessage: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`);
});

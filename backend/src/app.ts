import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import activitiesRoute from './routes/activities';

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

app.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`);
});

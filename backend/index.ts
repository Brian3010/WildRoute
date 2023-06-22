// const express = require('express');
import express, { Express, Request, Response } from 'express';
const PORT = 3000;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Helloooooasdaasdasdasdsd');
});

app.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`);
});

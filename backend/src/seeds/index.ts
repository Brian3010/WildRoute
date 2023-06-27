import mongoose from 'mongoose';
import { type } from 'os';
import ActivityList from '../models/activities.js';
import { cities } from './cities.js';
import { descriptors, places } from './seedHelpers.js';

main()
  .then(() => {
    console.log('CONNECTION SUCCESS');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wildRoute');
}

// utils func
const randomIndex = <T extends Array<string>[] | object[]>(data: T): [number, number] => {
  const randIndex: number = Math.floor(Math.random() * data.length);
  let subIndex = 0;

  if (Array.isArray(data[randIndex])) {
    subIndex = Math.floor(Math.random() * (data[randIndex] as string[]).length);
  }

  return [randIndex, subIndex];
};

const seedDb = async (): Promise<void> => {
  console.log('seedDb() TRIGGED');

  const placeIdx = randomIndex(places); // pass places to get randome place ['Fraser Island', 'Cape York Peninsula', 'Gibb River Road']
  // console.log(`title: ${places[placeIdx[0]][1]} ${descriptors[placeIdx[0]]}`);

  const cityIdx = randomIndex(cities)[0];
  // console.log(`location: ${cities[cityIdx].city} ${cities[cityIdx].admin_name}`);

  await ActivityList.deleteMany({});
  const ActList = new ActivityList({
    activity_title: `${places[placeIdx[0]][1]} ${descriptors[placeIdx[0]]}`,
    location: `${cities[cityIdx].city} ${cities[cityIdx].admin_name}`,
    description: 'desc',
    price: 2,
    image: 'url',
  });

  await ActList.save()
    .then(res => {
      console.log('RESULT: ', res);
    })
    .catch(err => {
      console.log('Error:', err);
    });
};

seedDb().then(() => {
  mongoose.connection.close();
});

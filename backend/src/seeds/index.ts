require('dotenv').config();
import axios, { AxiosResponse } from 'axios';
import mongoose from 'mongoose';
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

const getPhotoUrl = async (): Promise<string | undefined> => {
  try {
    const response: AxiosResponse = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        collections: '3293100',
        client_id: process.env.UNSPLASH_KEY,
      },
    });
    return response.data.urls.regular;
  } catch (error) {
    console.log('ERROR: ', error);
  }
  return undefined;
};

const seedDb = async (): Promise<void> => {
  console.log('seedDb() TRIGGED');
  await ActivityList.deleteMany({});
  // const imgUrl = await getPhotoUrl();
  // console.log(imgUrl);

  for (let i = 0; i < 50; i++) {
    console.log(i);

    const placeIdx = randomIndex(places); // pass places to get randome place ['Fraser Island', 'Cape York Peninsula', 'Gibb River Road']
    const cityIdx = randomIndex(cities)[0];
    const imgUrl = await getPhotoUrl();

    const ActList = new ActivityList({
      activity_title: `${places[placeIdx[0]][1]} ${descriptors[placeIdx[0]]}`,
      location: `${cities[cityIdx].city}, ${cities[cityIdx].admin_name}`,
      description:
        'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
      avg_price: 2,
      image: [
        {
          url: imgUrl,
        },
        {
          url: imgUrl,
        },
      ],
      author: '64c0bfe1503dd1eda3269198',
    });

    await ActList.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});

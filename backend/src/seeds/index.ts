require('dotenv').config();
import axios, { AxiosResponse } from 'axios';
import mongoose from 'mongoose';
import ActivityList from '../models/activities.js';
import { City, cities } from './cities.js';
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
    return response.data.urls.small;
  } catch (error) {
    console.log('ERROR: ', error);
  }
  return undefined;
};

const generateRandomTags = (): Array<string> => {
  const tags = ['Adventure', 'Nature', 'Camping', 'Water Sport', 'Climbing'];
  const someTags: string[] = [];

  while (someTags.length < 3) {
    const randIndex = Math.floor(Math.random() * tags.length);
    if (!someTags.includes(tags[randIndex])) {
      someTags.push(tags[randIndex]);
    }
  }

  return someTags;
};

// use The Fisher-Yates shuffle algorithm to get non-dup random index
// const shuffleArray = (array: Array<City>) => {
//   for (
//     let j, x, i = array.length;
//     i;
//     j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x
//   );
//   return array;
// };

const seedDb = async (): Promise<void> => {
  console.log('seedDb() TRIGGED');
  await ActivityList.deleteMany({});
  // const imgUrl = await getPhotoUrl();
  // console.log(imgUrl);

  const nonDupIndexArray = new Array();

  for (let i = 0; i < 50; i++) {
    console.log(i);

    const placeIdx = randomIndex(places); // pass places to get randome place ['Fraser Island', 'Cape York Peninsula', 'Gibb River Road']
    // const cityIdx = randomIndex(shuffleArray(cities))[0]; // shufferArray return shuffle array of cities, then use randomIndex to get an random number out of the array
    const cityIdx = randomIndex(cities)[0]; // shufferArray return shuffle array of cities, then use randomIndex to get an random number out of the array

    // check if index duplicates
    if (!nonDupIndexArray.includes(cityIdx)) {
      nonDupIndexArray.push(cityIdx);
    } else {
      // if there is duplicate, decrement the index and jump/try again
      i = i - 1;
      continue;
    }

    const imgUrl = await getPhotoUrl();
    // console.log({ imgUrl });
    const randTags = generateRandomTags();
    // const shuffleIdxCities = shuffleArray(cities)[0]

    const ActList = new ActivityList({
      activity_title: `${places[placeIdx[0]][1]} ${descriptors[placeIdx[0]]}`,
      location: `${cities[cityIdx].city}, ${cities[cityIdx].admin_name}`,
      geometry: {
        type: 'Point',
        coordinates: [cities[cityIdx].lng, cities[cityIdx].lat],
      },
      description:
        'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem eligendi eaquesaepe aliquid iusto molestias ut cupiditate quisquam, laboriosam, quo quia culpa obcaecati, modi unde.',
      avg_price: 2,
      tags: randTags,
      image: [
        {
          url: imgUrl,
          fileName: `fileName${i}`,
        },
        {
          url: imgUrl,
          fileName: `fileName${i}`,
        },
      ],
      author: '64c0bfe1503dd1eda3269198', //  -> userId when on PC
      // author: '64bf616a3694715302680542', // -> userId when on laptop
    });

    await ActList.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});

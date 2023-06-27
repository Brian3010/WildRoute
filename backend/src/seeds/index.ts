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

const seedDb = async (): Promise<void> => {
  // console.log(ActivityList);

  console.log('seedDb() TRIGGED');
  await ActivityList.deleteMany({});

  const ActList = new ActivityList({
    activity_title: 'title',
    location: 'lcoation',
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

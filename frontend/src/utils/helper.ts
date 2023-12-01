import { TActies } from '../services/getActies';
import { TTags } from '../services/getActyById';

export const mapBoxLocationSearchSimulate = (value: string) => {
  const locations = [
    'Footscray',
    'Avondale Heights',
    'Hawthorn',
    'Blackburn',
    'Seddon',
    '129 Hyde St',
    'Hawthorn East',
    '129 Hyde St, Mexico',
  ];

  const returnLoc = locations.filter(loc => loc.toLowerCase().includes(value.toLowerCase()));
  // console.log({ returnLoc });

  return new Promise<{ full_address: string }[]>(resolve => {
    setTimeout(() => {
      console.log('requesting location suggestion');
      return resolve(returnLoc.map(i => ({ full_address: i })));
    }, 3000);
  });
};

// TODO: return acties that match both tags and search text input
export const getActiesByTextAndTags = (
  data: TActies[],
  searchValues: { text: string; tagsArray: string[] }
): TActies[] => {
  let acties = data;

  if (searchValues.tagsArray.length > 0) {
    let isFiltered = false;
    for (let i = 0; i < searchValues.tagsArray.length; i++) {
      if (!isFiltered) {
        acties = data.filter(acty => acty.tags.includes(searchValues.tagsArray[i] as TTags));
        isFiltered = true;
      } else {
        acties = acties.filter(acty => acty.tags.includes(searchValues.tagsArray[i] as TTags));
      }
    }
  }

  const filteredData = acties.filter(i => {
    if (i.activity_title.toLowerCase().includes(searchValues.text.toLowerCase())) {
      return i;
    }
  });

  return filteredData;
};

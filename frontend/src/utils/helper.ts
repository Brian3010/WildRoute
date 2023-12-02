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

const strcmp = (fString: string, sString: string): boolean => fString.toLowerCase().includes(sString.toLowerCase());

export const getActiesByTextAndTags = (
  data: TActies[],
  searchValues: { text: string; tagsArray: string[] }
): TActies[] => {
  const filterdByText = data.filter(acty => strcmp(acty.activity_title, searchValues.text));
  console.log({ filterdByText });
  let acties: TActies[] = filterdByText || data;
  let isFiltered = false;
  for (let i = 0; i < searchValues.tagsArray.length; i++) {
    if (!isFiltered) {
      acties = filterdByText.filter(acty => acty.tags.includes(searchValues.tagsArray[i] as TTags));
      isFiltered = true;
    } else {
      acties = acties.filter(acty => acty.tags.includes(searchValues.tagsArray[i] as TTags));
    }
  }

  return acties;
};

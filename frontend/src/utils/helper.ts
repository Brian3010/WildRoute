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

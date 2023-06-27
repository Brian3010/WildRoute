export const descriptors: Array<string> = [
  '4WD Tours',
  'Abseiling',
  'Camping',
  'Canyoning',
  'Climbing',
  'Cycling',
  'Diving',
  'Hiking',
  'Jet Boat Rides',
  'Kayaking',
  'Rappelling',
  'Sailing',
  'Sandboarding',
  'Snorkeling',
  'Surfing',
  'Swimming',
  'Whale Watching',
  'White Water Rafting',
  'Wildlife Tours',
];

const placesWithLoc: Array<string>[] = [
  ['Fraser Island', 'Cape York Peninsula', 'Gibb River Road'],
  ['Blue Mountains', 'Kangaroo Point (Brisbane)', 'Mount Arapiles (Victoria)'],
  ['Wilsons Promontory National Park', 'Kakadu National Park', 'Great Ocean Road'],
  ['Blue Mountains', 'Lamington National Park', 'Cradle Mountain-Lake St Clair National Park'],
  ['Sydney Harbour Bridge', 'Mount Kosciuszko', 'Mount Barney (Queensland)'],
  ['Great Ocean Road', 'Rottnest Island', 'Munda Biddi Trail (Western Australia)'],
  ['Great Barrier Reef', 'Ningaloo Reef', 'Lord Howe Island'],
  ['Overland Track (Tasmania)', 'Larapinta Trail (Northern Territory)', 'Grampians National Park'],
  ['Sydney Harbour', 'Gold Coast', 'Queenstown (New Zealand)'],
  ['Freycinet National Park (Tasmania)', 'Ningaloo Reef', 'Noosa Everglades'],
  ['Blue Mountains', 'Mount Arapiles (Victoria)', 'Barrington Tops National Park'],
  ['Whitsunday Islands', 'Sydney Harbour', 'Great Barrier Reef'],
  [
    'Moreton Island',
    'Stockton Sand Dunes (Port Stephens)',
    'Lancelin Sand Dunes (Western Australia)',
  ],
  ['Great Barrier Reef', 'Ningaloo Reef', 'Lord Howe Island'],
  ['Gold Coast', 'Bells Beach (Victoria)', 'Margaret River (Western Australia)'],
  ['Bondi Beach (Sydney)', 'Whitehaven Beach (Whitsunday Islands)', 'Litchfield National Park'],
  ['Hervey Bay', 'Sydney', 'Augusta (Western Australia)'],
  ['Tully River (Queensland)', 'Franklin River (Tasmania)', 'Barron River (Cairns)'],
  ['Kangaroo Island', 'Tasmania', 'Great Ocean Road'],
];

// strip () out of the array

export const places : string[][] = placesWithLoc.map(place => {
  return place.map(pW => {
    return pW.replace(/\s*\([^)]*\)/, '');
  });
});

// places + descriptors

// 4WD Tours: Fraser Island, Cape York Peninsula, Gibb River Road
// Abseiling: Blue Mountains, Kangaroo Point (Brisbane), Mount Arapiles (Victoria)
// Camping: Wilsons Promontory National Park, Kakadu National Park, Great Ocean Road
// Canyoning: Blue Mountains, Lamington National Park, Cradle Mountain-Lake St Clair National Park
// Climbing: Sydney Harbour Bridge, Mount Kosciuszko, Mount Barney (Queensland)
// Cycling: Great Ocean Road, Rottnest Island, Munda Biddi Trail (Western Australia)
// Diving: Great Barrier Reef, Ningaloo Reef, Lord Howe Island
// Hiking: Overland Track (Tasmania), Larapinta Trail (Northern Territory), Grampians National Park
// Jet Boat Rides: Sydney Harbour, Gold Coast, Queenstown (New Zealand)
// Kayaking: Freycinet National Park (Tasmania), Ningaloo Reef, Noosa Everglades
// Rappelling: Blue Mountains, Mount Arapiles (Victoria), Barrington Tops National Park
// Sailing: Whitsunday Islands, Sydney Harbour, Great Barrier Reef
// Sandboarding: Moreton Island, Stockton Sand Dunes (Port Stephens), Lancelin Sand Dunes (Western Australia)
// Snorkeling: Great Barrier Reef, Ningaloo Reef, Lord Howe Island
// Surfing: Gold Coast, Bells Beach (Victoria), Margaret River (Western Australia)
// Swimming: Bondi Beach (Sydney), Whitehaven Beach (Whitsunday Islands), Litchfield National Park
// Whale Watching: Hervey Bay, Sydney, Augusta (Western Australia)
// White Water Rafting: Tully River (Queensland), Franklin River (Tasmania), Barron River (Cairns)
// Wildlife Tours: Kangaroo Island, Tasmania, Great Ocean Road

// export const location= [
//     { name: "Fraser Island", address: "123 Beach Street, Fraser Island, Queensland" },
//     { name: "Cape York Peninsula", address: "456 Peninsula Road, Cape York Peninsula, Queensland" },
//     { name: "Gibb River Road", address: "789 River Road, Gibb River Road, Western Australia" },
//     { name: "Blue Mountains", address: "321 Mountain Avenue, Blue Mountains, New South Wales" },
//     { name: "Kangaroo Point (Brisbane)", address: "567 Kangaroo Point Road, Brisbane, Queensland" },
//     { name: "Mount Arapiles (Victoria)", address: "890 Arapiles Street, Mount Arapiles, Victoria" },
//     { name: "Wilsons Promontory National Park", address: "234 Promontory Drive, Wilsons Promontory National Park, Victoria" },
//     { name: "Kakadu National Park", address: "876 Kakadu Avenue, Kakadu National Park, Northern Territory" },
//     { name: "Great Ocean Road", address: "543 Ocean Road, Great Ocean Road, Victoria" },
//     { name: "Lamington National Park", address: "987 Lamington Road, Lamington National Park, Queensland" },
//     { name: "Cradle Mountain-Lake St Clair National Park", address: "654 Lake Road, Cradle Mountain-Lake St Clair National Park, Tasmania" },
//     { name: "Sydney Harbour Bridge", address: "321 Bridge Street, Sydney, New South Wales" },
//     { name: "Mount Kosciuszko", address: "876 Kosciuszko Lane, Mount Kosciuszko, New South Wales" },
//     { name: "Mount Barney (Queensland)", address: "543 Barney Road, Mount Barney, Queensland" },
//     { name: "Great Barrier Reef", address: "123 Reef Street, Great Barrier Reef, Queensland" },
//     { name: "Ningaloo Reef", address: "789 Ningaloo Avenue, Ningaloo Reef, Western Australia" },
//     { name: "Lord Howe Island", address: "456 Howe Street, Lord Howe Island, New South Wales" },
//     { name: "Overland Track (Tasmania)", address: "234 Overland Road, Overland Track, Tasmania" },
//     { name: "Larapinta Trail (Northern Territory)", address: "567 Larapinta Lane, Larapinta Trail, Northern Territory" },
//     { name: "Grampians National Park", address: "890 Grampians Road, Grampians National Park, Victoria" }
//   ];

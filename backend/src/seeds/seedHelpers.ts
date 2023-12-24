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
  ['Moreton Island', 'Stockton Sand Dunes (Port Stephens)', 'Lancelin Sand Dunes (Western Australia)'],
  ['Great Barrier Reef', 'Ningaloo Reef', 'Lord Howe Island'],
  ['Gold Coast', 'Bells Beach (Victoria)', 'Margaret River (Western Australia)'],
  ['Bondi Beach (Sydney)', 'Whitehaven Beach (Whitsunday Islands)', 'Litchfield National Park'],
  ['Hervey Bay', 'Sydney', 'Augusta (Western Australia)'],
  ['Tully River (Queensland)', 'Franklin River (Tasmania)', 'Barron River (Cairns)'],
  ['Kangaroo Island', 'Tasmania', 'Great Ocean Road'],
];

// strip () out of the array

export const places: string[][] = placesWithLoc.map(place => {
  return place.map(pW => {
    return pW.replace(/\s*\([^)]*\)/, '');
  });
});

export const images = [
  {
    photo_id: 'wud-eV6Vpwo',
    photo_url: 'https://unsplash.com/photos/wud-eV6Vpwo',
    photo_image_url: 'https://images.unsplash.com/photo-1439246854758-f686a415d9da',
  },
  {
    photo_id: 'psIMdj26lgw',
    photo_url: 'https://unsplash.com/photos/psIMdj26lgw',
    photo_image_url: 'https://images.unsplash.com/photo-1440773310993-8660d1577dcd',
  },
  {
    photo_id: '2EDjes2hlZo',
    photo_url: 'https://unsplash.com/photos/2EDjes2hlZo',
    photo_image_url: 'https://images.unsplash.com/photo-1446834898093-264bbb1bdcc9',
  },
  {
    photo_id: 'WN8kSLy8KMQ',
    photo_url: 'https://unsplash.com/photos/WN8kSLy8KMQ',
    photo_image_url: 'https://images.unsplash.com/photo-1445308124430-8357b98a6f71',
  },
  {
    photo_id: 'QAXDmkU60OU',
    photo_url: 'https://unsplash.com/photos/QAXDmkU60OU',
    photo_image_url: 'https://images.unsplash.com/photo-1441961497852-89a16db29005',
  },
  {
    photo_id: '9myQkSVGooM',
    photo_url: 'https://unsplash.com/photos/9myQkSVGooM',
    photo_image_url: 'https://images.unsplash.com/photo-1442095962062-cc576a28f7ef',
  },
  {
    photo_id: '5kSVDnCVLDg',
    photo_url: 'https://unsplash.com/photos/5kSVDnCVLDg',
    photo_image_url: 'https://images.unsplash.com/photo-1421990535576-b336c6b1c8a1',
  },
  {
    photo_id: 'bzzGg63bzAM',
    photo_url: 'https://unsplash.com/photos/bzzGg63bzAM',
    photo_image_url: 'https://images.unsplash.com/photo-1442943861491-36a87a01e726',
  },
  {
    photo_id: 'ZSMgNjYrHRM',
    photo_url: 'https://unsplash.com/photos/ZSMgNjYrHRM',
    photo_image_url: 'https://images.unsplash.com/photo-1430132594682-16e1185b17c5',
  },
  {
    photo_id: 'gSF9dHUVK_Y',
    photo_url: 'https://unsplash.com/photos/gSF9dHUVK_Y',
    photo_image_url: 'https://images.unsplash.com/photo-1439853849133-aaf5b7b5f55b',
  },
  {
    photo_id: 'oXUEUEVJgec',
    photo_url: 'https://unsplash.com/photos/oXUEUEVJgec',
    photo_image_url: 'https://images.unsplash.com/photo-1440942574812-185bf7cf6c49',
  },
  {
    photo_id: 'aeUAfC92R-0',
    photo_url: 'https://unsplash.com/photos/aeUAfC92R-0',
    photo_image_url: 'https://images.unsplash.com/photo-1438185074000-4b84f7ffc075',
  },
  {
    photo_id: 'wuHPFRWtDLI',
    photo_url: 'https://unsplash.com/photos/wuHPFRWtDLI',
    photo_image_url: 'https://images.unsplash.com/26/australia.jpg',
  },
  {
    photo_id: '8fO08ukB24U',
    photo_url: 'https://unsplash.com/photos/8fO08ukB24U',
    photo_image_url: 'https://images.unsplash.com/photo-1448713551278-27e64beaa3fd',
  },
  {
    photo_id: 'NA0jD1Sg9WU',
    photo_url: 'https://unsplash.com/photos/NA0jD1Sg9WU',
    photo_image_url: 'https://images.unsplash.com/photo-1438129501245-af64ca2b270a',
  },
  {
    photo_id: 'vCKl84jpaZM',
    photo_url: 'https://unsplash.com/photos/vCKl84jpaZM',
    photo_image_url: 'https://images.unsplash.com/photo-1419293667059-7f9357d09013',
  },
  {
    photo_id: 'uKDn4RVsgFY',
    photo_url: 'https://unsplash.com/photos/uKDn4RVsgFY',
    photo_image_url: 'https://images.unsplash.com/photo-1451272994275-50b182fb2c70',
  },
  {
    photo_id: 'if5drRE4OM0',
    photo_url: 'https://unsplash.com/photos/if5drRE4OM0',
    photo_image_url: 'https://images.unsplash.com/photo-1452480306336-ffdc85b78768',
  },
  {
    photo_id: 'vVBRCRCWkbA',
    photo_url: 'https://unsplash.com/photos/vVBRCRCWkbA',
    photo_image_url: 'https://images.unsplash.com/photo-1433763484842-f9bca4a5b93f',
  },
  {
    photo_id: 'giwAx_VavaI',
    photo_url: 'https://unsplash.com/photos/giwAx_VavaI',
    photo_image_url: 'https://images.unsplash.com/photo-1429552016556-fd6f7d9743e1',
  },
  {
    photo_id: 'ka8WGEY2eZU',
    photo_url: 'https://unsplash.com/photos/ka8WGEY2eZU',
    photo_image_url: 'https://images.unsplash.com/photo-1428394527478-f01c05887d1f',
  },
  {
    photo_id: 'PcX1Qc0hhwk',
    photo_url: 'https://unsplash.com/photos/PcX1Qc0hhwk',
    photo_image_url: 'https://images.unsplash.com/photo-1450655816589-5eea781dae8a',
  },
  {
    photo_id: 'qcF0LfjJU78',
    photo_url: 'https://unsplash.com/photos/qcF0LfjJU78',
    photo_image_url: 'https://images.unsplash.com/photo-1446840908685-30f3a9e727f9',
  },
  {
    photo_id: 'ZwMJhmceY8s',
    photo_url: 'https://unsplash.com/photos/ZwMJhmceY8s',
    photo_image_url: 'https://images.unsplash.com/photo-1451395599223-6349b929a180',
  },
  {
    photo_id: 'ywMwEYTlObQ',
    photo_url: 'https://unsplash.com/photos/ywMwEYTlObQ',
    photo_image_url: 'https://images.unsplash.com/photo-1431683535750-2b9b2371efb7',
  },
  {
    photo_id: 'uDUiRS8YroY',
    photo_url: 'https://unsplash.com/photos/uDUiRS8YroY',
    photo_image_url: 'https://images.unsplash.com/5/pier.JPG',
  },
  {
    photo_id: 'B20ZhpKFL5U',
    photo_url: 'https://unsplash.com/photos/B20ZhpKFL5U',
    photo_image_url: 'https://images.unsplash.com/reserve/hFL7t7P3SuwV8NZhfOqz_hello_sylwiabartyzel.jpg',
  },
  {
    photo_id: 'HJ33Vyevx6E',
    photo_url: 'https://unsplash.com/photos/HJ33Vyevx6E',
    photo_image_url: 'https://images.unsplash.com/photo-1433030384060-b53fe066a835',
  },
  {
    photo_id: '-RlCdcbhygo',
    photo_url: 'https://unsplash.com/photos/-RlCdcbhygo',
    photo_image_url: 'https://images.unsplash.com/photo-1424136164161-9c851c61012f',
  },
  {
    photo_id: 'eQ4klIbz8Lc',
    photo_url: 'https://unsplash.com/photos/eQ4klIbz8Lc',
    photo_image_url: 'https://images.unsplash.com/photo-1445367986565-c73f84588095',
  },
  {
    photo_id: '5qJ5muCuN-I',
    photo_url: 'https://unsplash.com/photos/5qJ5muCuN-I',
    photo_image_url: 'https://images.unsplash.com/photo-1447655513720-7da85ed1fa57',
  },
  {
    photo_id: '9CfHPa6YM4Y',
    photo_url: 'https://unsplash.com/photos/9CfHPa6YM4Y',
    photo_image_url: 'https://images.unsplash.com/photo-1466943746581-80a02881f4c8',
  },
  {
    photo_id: 'OIoDCgocMqM',
    photo_url: 'https://unsplash.com/photos/OIoDCgocMqM',
    photo_image_url: 'https://images.unsplash.com/photo-1451959082120-81e1dbec1d7a',
  },
  {
    photo_id: '7wk0ja-DP_c',
    photo_url: 'https://unsplash.com/photos/7wk0ja-DP_c',
    photo_image_url: 'https://images.unsplash.com/photo-1476041026529-411f6ae1de3e',
  },
  {
    photo_id: 'O1lz53oVK2M',
    photo_url: 'https://unsplash.com/photos/O1lz53oVK2M',
    photo_image_url: 'https://images.unsplash.com/photo-1470771602397-a17d07357acc',
  },
  {
    photo_id: 'bvpWQI8Xb0k',
    photo_url: 'https://unsplash.com/photos/bvpWQI8Xb0k',
    photo_image_url: 'https://images.unsplash.com/photo-1470836047270-6c7c229fd74b',
  },
  {
    photo_id: 'Wvas_uTO8wQ',
    photo_url: 'https://unsplash.com/photos/Wvas_uTO8wQ',
    photo_image_url: 'https://images.unsplash.com/photo-1422452098470-722310d3ad74',
  },
  {
    photo_id: '6WLGMivmV00',
    photo_url: 'https://unsplash.com/photos/6WLGMivmV00',
    photo_image_url: 'https://images.unsplash.com/photo-1429152937938-07b5f2828cdd',
  },
  {
    photo_id: 'bMPm4BWtntk',
    photo_url: 'https://unsplash.com/photos/bMPm4BWtntk',
    photo_image_url: 'https://images.unsplash.com/photo-1435566029824-9ff1216c5b11',
  },
  {
    photo_id: 'Slh0Tx1MRNA',
    photo_url: 'https://unsplash.com/photos/Slh0Tx1MRNA',
    photo_image_url: 'https://images.unsplash.com/photo-1423209086112-cf2c8acd502f',
  },
  {
    photo_id: 'iVliB6Rsvvc',
    photo_url: 'https://unsplash.com/photos/iVliB6Rsvvc',
    photo_image_url: 'https://images.unsplash.com/photo-1440500122534-703c6966f83d',
  },
  {
    photo_id: 'OQWymBdj0Go',
    photo_url: 'https://unsplash.com/photos/OQWymBdj0Go',
    photo_image_url: 'https://images.unsplash.com/photo-1418874525809-bec95b9c4500',
  },
  {
    photo_id: '490pwyi-8bs',
    photo_url: 'https://unsplash.com/photos/490pwyi-8bs',
    photo_image_url: 'https://images.unsplash.com/photo-1440130266107-787dd24d69d7',
  },
  {
    photo_id: 'M4I_e5_z5Ww',
    photo_url: 'https://unsplash.com/photos/M4I_e5_z5Ww',
    photo_image_url: 'https://images.unsplash.com/photo-1433492753406-04e6d7ed995c',
  },
  {
    photo_id: 'Et-TyYbzrY8',
    photo_url: 'https://unsplash.com/photos/Et-TyYbzrY8',
    photo_image_url: 'https://images.unsplash.com/photo-1436772275169-d8467f9d5aa5',
  },
  {
    photo_id: 'VcRbMldAFU8',
    photo_url: 'https://unsplash.com/photos/VcRbMldAFU8',
    photo_image_url: 'https://images.unsplash.com/photo-1449027627419-e46b1154169d',
  },
  {
    photo_id: 'pHM4a_RZSLE',
    photo_url: 'https://unsplash.com/photos/pHM4a_RZSLE',
    photo_image_url: 'https://images.unsplash.com/20/green-beads.JPG',
  },
  {
    photo_id: 'SAcIANM1zgI',
    photo_url: 'https://unsplash.com/photos/SAcIANM1zgI',
    photo_image_url: 'https://images.unsplash.com/photo-1451102070012-5ec12448f8c6',
  },
  {
    photo_id: 'VeKqfHaa3e4',
    photo_url: 'https://unsplash.com/photos/VeKqfHaa3e4',
    photo_image_url: 'https://images.unsplash.com/reserve/uvRBqDAfQfaGPJiI6lVS_R0001899.jpg',
  },
  {
    photo_id: '2Fs6MBBeayk',
    photo_url: 'https://unsplash.com/photos/2Fs6MBBeayk',
    photo_image_url: 'https://images.unsplash.com/photo-1426270238320-f944ef4ddb3f',
  },
  {
    photo_id: 'ytwL9q4CIZk',
    photo_url: 'https://unsplash.com/photos/ytwL9q4CIZk',
    photo_image_url: 'https://images.unsplash.com/reserve/3QmLwayvTci8Fb9mx6Sw__DSC0312.JPG',
  },
  {
    photo_id: 'xfqOqP0ydQI',
    photo_url: 'https://unsplash.com/photos/xfqOqP0ydQI',
    photo_image_url: 'https://images.unsplash.com/uploads/141104078198192352262/c9aa631b',
  },
  {
    photo_id: 'b4SRwTQget8',
    photo_url: 'https://unsplash.com/photos/b4SRwTQget8',
    photo_image_url: 'https://images.unsplash.com/photo-1433155327100-12aac6a14ff1',
  },
  {
    photo_id: '5YvHy6-O5bU',
    photo_url: 'https://unsplash.com/photos/5YvHy6-O5bU',
    photo_image_url: 'https://images.unsplash.com/photo-1464823265838-c29e2a106ef6',
  },
  {
    photo_id: 'HLfoA3_UwoY',
    photo_url: 'https://unsplash.com/photos/HLfoA3_UwoY',
    photo_image_url: 'https://images.unsplash.com/photo-1431223430019-7c33d109bf40',
  },
  {
    photo_id: 'zroxr0l3Tso',
    photo_url: 'https://unsplash.com/photos/zroxr0l3Tso',
    photo_image_url: 'https://images.unsplash.com/photo-1447829171547-a5807f9e26d5',
  },
  {
    photo_id: 'KM1M0Kk4Xtg',
    photo_url: 'https://unsplash.com/photos/KM1M0Kk4Xtg',
    photo_image_url: 'https://images.unsplash.com/photo-1435002864064-ad5b71978e79',
  },
  {
    photo_id: 'a8r9V5ZG3Po',
    photo_url: 'https://unsplash.com/photos/a8r9V5ZG3Po',
    photo_image_url: 'https://images.unsplash.com/photo-1449617540102-accfca509ef6',
  },
  {
    photo_id: 'SWF1n1Bzlg0',
    photo_url: 'https://unsplash.com/photos/SWF1n1Bzlg0',
    photo_image_url: 'https://images.unsplash.com/photo-1430936084646-158d26ba98ff',
  },
  {
    photo_id: 'ILz31HBGEak',
    photo_url: 'https://unsplash.com/photos/ILz31HBGEak',
    photo_image_url: 'https://images.unsplash.com/photo-1422728221357-57980993ea99',
  },
  {
    photo_id: 'ipdJIEMu9qE',
    photo_url: 'https://unsplash.com/photos/ipdJIEMu9qE',
    photo_image_url: 'https://images.unsplash.com/photo-1424386883927-2078a32e5cfd',
  },
  {
    photo_id: '3sBnJqI8LXo',
    photo_url: 'https://unsplash.com/photos/3sBnJqI8LXo',
    photo_image_url: 'https://images.unsplash.com/photo-1435685813800-51ba4ceb9c4a',
  },
  {
    photo_id: 'eonAf_JQFbI',
    photo_url: 'https://unsplash.com/photos/eonAf_JQFbI',
    photo_image_url: 'https://images.unsplash.com/photo-1426760253677-88a3f201f5fe',
  },
  {
    photo_id: 'zMz14hsbpuU',
    photo_url: 'https://unsplash.com/photos/zMz14hsbpuU',
    photo_image_url: 'https://images.unsplash.com/7/salzburg-x.jpg',
  },
  {
    photo_id: 'gYyX7h7fbAM',
    photo_url: 'https://unsplash.com/photos/gYyX7h7fbAM',
    photo_image_url: 'https://images.unsplash.com/photo-1435568009252-48c5abc5dcae',
  },
  {
    photo_id: 'PaZjj8jC-Tg',
    photo_url: 'https://unsplash.com/photos/PaZjj8jC-Tg',
    photo_image_url: 'https://images.unsplash.com/photo-1442071771157-ead3c45f708f',
  },
  {
    photo_id: 'BXBUtRSCWxk',
    photo_url: 'https://unsplash.com/photos/BXBUtRSCWxk',
    photo_image_url: 'https://images.unsplash.com/photo-1434600171728-fd0c9ba2efe9',
  },
  {
    photo_id: 'x5LRxIZ5Lqk',
    photo_url: 'https://unsplash.com/photos/x5LRxIZ5Lqk',
    photo_image_url: 'https://images.unsplash.com/photo-1440605271345-b97ed0ef877f',
  },
  {
    photo_id: '9702xTENR-M',
    photo_url: 'https://unsplash.com/photos/9702xTENR-M',
    photo_image_url: 'https://images.unsplash.com/23/make-your-own-path.JPG',
  },
  {
    photo_id: '_gycpm2K900',
    photo_url: 'https://unsplash.com/photos/_gycpm2K900',
    photo_image_url: 'https://images.unsplash.com/photo-1444857697744-4691e1a0500e',
  },
  {
    photo_id: 'h_ovfsRi7pk',
    photo_url: 'https://unsplash.com/photos/h_ovfsRi7pk',
    photo_image_url: 'https://images.unsplash.com/photo-1421885661290-1b5a570626e9',
  },
  {
    photo_id: 'IfsvDZBSeWc',
    photo_url: 'https://unsplash.com/photos/IfsvDZBSeWc',
    photo_image_url: 'https://images.unsplash.com/photo-1435782944608-71c88cf57a17',
  },
  {
    photo_id: 'HAxoGmx2AYw',
    photo_url: 'https://unsplash.com/photos/HAxoGmx2AYw',
    photo_image_url: 'https://images.unsplash.com/photo-1429808016056-f8a16278ebff',
  },
  {
    photo_id: 'MQz-tZEg8L8',
    photo_url: 'https://unsplash.com/photos/MQz-tZEg8L8',
    photo_image_url: 'https://images.unsplash.com/photo-1447955552776-56465b845d20',
  },
  {
    photo_id: 'iOdOkX1yCMM',
    photo_url: 'https://unsplash.com/photos/iOdOkX1yCMM',
    photo_image_url: 'https://images.unsplash.com/photo-1422837284172-a925ac273aa9',
  },
  {
    photo_id: 'Yql8bO9_F1g',
    photo_url: 'https://unsplash.com/photos/Yql8bO9_F1g',
    photo_image_url: 'https://images.unsplash.com/photo-1445217320842-2edce6f9acd0',
  },
  {
    photo_id: 'ZdMGarUPuPY',
    photo_url: 'https://unsplash.com/photos/ZdMGarUPuPY',
    photo_image_url: 'https://images.unsplash.com/photo-1431793918933-1cb10f3ef908',
  },
  {
    photo_id: 'xDrxJCdedcI',
    photo_url: 'https://unsplash.com/photos/xDrxJCdedcI',
    photo_image_url: 'https://images.unsplash.com/9/fields.jpg',
  },
  {
    photo_id: 'EPmvy-Ql4U0',
    photo_url: 'https://unsplash.com/photos/EPmvy-Ql4U0',
    photo_image_url: 'https://images.unsplash.com/photo-1438803235109-d737bc3129ec',
  },
  {
    photo_id: 'rl7mUDEUmVE',
    photo_url: 'https://unsplash.com/photos/rl7mUDEUmVE',
    photo_image_url: 'https://images.unsplash.com/photo-1432105214010-ae5e45b2cebb',
  },
  {
    photo_id: '01ZeHnK3F_4',
    photo_url: 'https://unsplash.com/photos/01ZeHnK3F_4',
    photo_image_url: 'https://images.unsplash.com/44/9s1lvXLlSbCX5l3ZaYWP_hdr-1.jpg',
  },
  {
    photo_id: 'qjGz9PJg3sk',
    photo_url: 'https://unsplash.com/photos/qjGz9PJg3sk',
    photo_image_url: 'https://images.unsplash.com/photo-1417915134192-0194508577ac',
  },
  {
    photo_id: 'utqJcneoFjo',
    photo_url: 'https://unsplash.com/photos/utqJcneoFjo',
    photo_image_url: 'https://images.unsplash.com/photo-1446080501695-8e929f879f2b',
  },
  {
    photo_id: 'EHw2peCqFOw',
    photo_url: 'https://unsplash.com/photos/EHw2peCqFOw',
    photo_image_url: 'https://images.unsplash.com/photo-1446711994820-33c11e0a8bfc',
  },
  {
    photo_id: 'Cwo4iiZ5eDY',
    photo_url: 'https://unsplash.com/photos/Cwo4iiZ5eDY',
    photo_image_url: 'https://images.unsplash.com/photo-1450262109774-e464a9b783d8',
  },
  {
    photo_id: 'lh7-oEeOe_M',
    photo_url: 'https://unsplash.com/photos/lh7-oEeOe_M',
    photo_image_url: 'https://images.unsplash.com/photo-1446569405618-5a61f12ee143',
  },
  {
    photo_id: 'Fy1UlOIKBII',
    photo_url: 'https://unsplash.com/photos/Fy1UlOIKBII',
    photo_image_url: 'https://images.unsplash.com/photo-1470567391542-83b5ed63ea5b',
  },
  {
    photo_id: 'Erf1Kz7ZE5Y',
    photo_url: 'https://unsplash.com/photos/Erf1Kz7ZE5Y',
    photo_image_url: 'https://images.unsplash.com/photo-1468898203265-d5b5601865c7',
  },
  {
    photo_id: '2PMsTEWAfwU',
    photo_url: 'https://unsplash.com/photos/2PMsTEWAfwU',
    photo_image_url: 'https://images.unsplash.com/photo-1467318442930-9c0122002f65',
  },
  {
    photo_id: 'uTqSDZ0q8Lg',
    photo_url: 'https://unsplash.com/photos/uTqSDZ0q8Lg',
    photo_image_url: 'https://images.unsplash.com/photo-1451906148688-836c3e59d35c',
  },
  {
    photo_id: '3JcFnHLSMP8',
    photo_url: 'https://unsplash.com/photos/3JcFnHLSMP8',
    photo_image_url: 'https://images.unsplash.com/photo-1494756159834-6fdaee7a9b7e',
  },
  {
    photo_id: '9YpzV6czaAI',
    photo_url: 'https://unsplash.com/photos/9YpzV6czaAI',
    photo_image_url: 'https://images.unsplash.com/photo-1505159042738-73dbae90178f',
  },
  {
    photo_id: '9LwCEYH1oW4',
    photo_url: 'https://unsplash.com/photos/9LwCEYH1oW4',
    photo_image_url: 'https://images.unsplash.com/photo-1502943693086-33b5b1cfdf2f',
  },
  {
    photo_id: 'AXe_tx5Vi7U',
    photo_url: 'https://unsplash.com/photos/AXe_tx5Vi7U',
    photo_image_url: 'https://images.unsplash.com/photo-1496068485394-64235b139f6d',
  },
  {
    photo_id: 'kSTg5mvjZsQ',
    photo_url: 'https://unsplash.com/photos/kSTg5mvjZsQ',
    photo_image_url: 'https://images.unsplash.com/photo-1495927007324-53cb9cee3f15',
  },
  {
    photo_id: 'd7t7TjsBfpY',
    photo_url: 'https://unsplash.com/photos/d7t7TjsBfpY',
    photo_image_url: 'https://images.unsplash.com/photo-1507527982907-723733713d42',
  },
  {
    photo_id: 'k1jS_s5S0WE',
    photo_url: 'https://unsplash.com/photos/k1jS_s5S0WE',
    photo_image_url: 'https://images.unsplash.com/photo-1501229013772-1517cd5456bd',
  },
  {
    photo_id: 'gmrirPL71tU',
    photo_url: 'https://unsplash.com/photos/gmrirPL71tU',
    photo_image_url: 'https://images.unsplash.com/photo-1506543479114-405e954a2729',
  },
  {
    photo_id: 'tkxqguCmofw',
    photo_url: 'https://unsplash.com/photos/tkxqguCmofw',
    photo_image_url: 'https://images.unsplash.com/photo-1490495029043-4b194ff8895d',
  },
  {
    photo_id: 'LZpzMEY0pXI',
    photo_url: 'https://unsplash.com/photos/LZpzMEY0pXI',
    photo_image_url: 'https://images.unsplash.com/photo-1484943244867-fa64d4ed9486',
  },
  {
    photo_id: 'uCTlqRpsv5c',
    photo_url: 'https://unsplash.com/photos/uCTlqRpsv5c',
    photo_image_url: 'https://images.unsplash.com/photo-1495758229779-f55e454e6c90',
  },
];

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

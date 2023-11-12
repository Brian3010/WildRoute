export type TGeoJSON = {
  type: 'FeatureCollection';
  features: {
    type: 'Feature';
    geometry: { type: 'Point'; coordinates: [number, number] };
    properties: { title: string; location: string };
  }[];
};

export const sampleGeoJSONData: TGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.6942, -33.7511],
      },
      properties: {
        location: 'Penrith, New South Wales',
        title: 'Whitehaven Beach Swimming',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [115.7476, -32.0542],
      },
      properties: {
        location: 'Fremantle, Western Australia',
        title: 'Ningaloo Reef Snorkeling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [153.1289, -26.7986],
      },
      properties: {
        location: 'Caloundra, Queensland',
        title: 'Sydney Whale Watching',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [152.84, -25.29],
      },
      properties: {
        location: 'Hervey Bay, Queensland',
        title: 'Mount Arapiles Rappelling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [153.4, -28.0167],
      },
      properties: {
        location: 'Gold Coast, Queensland',
        title: 'Sydney Whale Watching',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.6678, -33.7483],
      },
      properties: {
        location: 'Emu Plains, New South Wales',
        title: 'Stockton Sand Dunes Sandboarding',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [147.3083, -42.9769],
      },
      properties: {
        location: 'Kingston, Tasmania',
        title: 'Franklin River White Water Rafting',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [147.145, -41.4419],
      },
      properties: {
        location: 'Launceston, Tasmania',
        title: 'Mount Arapiles Rappelling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [115.634, -31.55],
      },
      properties: {
        location: 'Yanchep, Western Australia',
        title: 'Whitehaven Beach Swimming',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [145.092, -38.189],
      },
      properties: {
        location: 'Mount Eliza, Victoria',
        title: 'Kakadu National Park Camping',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [144.5167, -38.25],
      },
      properties: {
        location: 'Barwon Heads, Victoria',
        title: 'Bells Beach Surfing',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [152.84, -25.29],
      },
      properties: {
        location: 'Hervey Bay, Queensland',
        title: 'Sydney Whale Watching',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.55, -33.7036],
      },
      properties: {
        location: 'Springwood, New South Wales',
        title: 'Ningaloo Reef Kayaking',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [144.9631, -37.8142],
      },
      properties: {
        location: 'Melbourne, Victoria',
        title: 'Lamington National Park Canyoning',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.6267, -35.1036],
      },
      properties: {
        location: 'Sanctuary Point, New South Wales',
        title: 'Sydney Whale Watching',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [145.215, -37.981],
      },
      properties: {
        location: 'Dandenong, Victoria',
        title: 'Kangaroo Point Abseiling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [152.45, -31.9],
      },
      properties: {
        location: 'Taree, New South Wales',
        title: 'Mount Arapiles Rappelling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [153.05, -28.8667],
      },
      properties: {
        location: 'Casino, New South Wales',
        title: 'Mount Arapiles Rappelling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [147.3083, -42.9769],
      },
      properties: {
        location: 'Kingston, Tasmania',
        title: 'Franklin River White Water Rafting',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [146.4, -38.2333],
      },
      properties: {
        location: 'Morwell, Victoria',
        title: 'Cape York Peninsula 4WD Tours',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [143.8475, -37.5608],
      },
      properties: {
        location: 'Ballarat, Victoria',
        title: 'Stockton Sand Dunes Sandboarding',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.6075, -34.8808],
      },
      properties: {
        location: 'Nowra, New South Wales',
        title: 'Kakadu National Park Camping',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [142.4833, -38.3833],
      },
      properties: {
        location: 'Warrnambool, Victoria',
        title: 'Sydney Whale Watching',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [153.5769, -28.2617],
      },
      properties: {
        location: 'Kingscliff, New South Wales',
        title: 'Kakadu National Park Camping',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [152.8219, -25.2955],
      },
      properties: {
        location: 'Urraween, Queensland',
        title: 'Larapinta Trail Hiking',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [144.35, -38.15],
      },
      properties: {
        location: 'Geelong, Victoria',
        title: 'Lamington National Park Canyoning',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [152.4625, -24.8205],
      },
      properties: {
        location: 'Bargara, Queensland',
        title: 'Mount Arapiles Rappelling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.6075, -34.8808],
      },
      properties: {
        location: 'Nowra, New South Wales',
        title: 'Mount Arapiles Rappelling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [140.7828, -37.8294],
      },
      properties: {
        location: 'Mount Gambier, South Australia',
        title: 'Larapinta Trail Hiking',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [145.78, -16.92],
      },
      properties: {
        location: 'Cairns, Queensland',
        title: 'Stockton Sand Dunes Sandboarding',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [145.215, -37.981],
      },
      properties: {
        location: 'Dandenong, Victoria',
        title: 'Ningaloo Reef Kayaking',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [151.2, -33.3],
      },
      properties: {
        location: 'Central Coast, New South Wales',
        title: 'Tasmania Wildlife Tours',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.6267, -35.1036],
      },
      properties: {
        location: 'Sanctuary Point, New South Wales',
        title: 'Ningaloo Reef Kayaking',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [152.7667, -27.6167],
      },
      properties: {
        location: 'Ipswich, Queensland',
        title: 'Mount Kosciuszko Climbing',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [144.9631, -37.8142],
      },
      properties: {
        location: 'Melbourne, Victoria',
        title: 'Rottnest Island Cycling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.8831, -34.4331],
      },
      properties: {
        location: 'Wollongong, New South Wales',
        title: 'Ningaloo Reef Kayaking',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [144.455, -37.247],
      },
      properties: {
        location: 'Kyneton, Victoria',
        title: 'Cape York Peninsula 4WD Tours',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.8885, -32.2654],
      },
      properties: {
        location: 'Muswellbrook, New South Wales',
        title: 'Tasmania Wildlife Tours',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [152.7667, -27.6167],
      },
      properties: {
        location: 'Ipswich, Queensland',
        title: 'Kakadu National Park Camping',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [147.145, -41.4419],
      },
      properties: {
        location: 'Launceston, Tasmania',
        title: 'Bells Beach Surfing',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [140.7828, -37.8294],
      },
      properties: {
        location: 'Mount Gambier, South Australia',
        title: 'Mount Kosciuszko Climbing',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [151.2555, -23.8427],
      },
      properties: {
        location: 'Gladstone, Queensland',
        title: 'Ningaloo Reef Snorkeling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.4181, -34.4792],
      },
      properties: {
        location: 'Bowral, New South Wales',
        title: 'Tasmania Wildlife Tours',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [150.8885, -32.2654],
      },
      properties: {
        location: 'Muswellbrook, New South Wales',
        title: 'Ningaloo Reef Kayaking',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [153.55, -28.1833],
      },
      properties: {
        location: 'Tweed Heads, New South Wales',
        title: 'Kangaroo Point Abseiling',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [152.6655, -26.19],
      },
      properties: {
        location: 'Gympie, Queensland',
        title: 'Mount Kosciuszko Climbing',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [149.186, -21.0931],
      },
      properties: {
        location: 'Andergrove, Queensland',
        title: 'Cape York Peninsula 4WD Tours',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [144.5167, -38.25],
      },
      properties: {
        location: 'Barwon Heads, Victoria',
        title: 'Lamington National Park Canyoning',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [148.176, -33.133],
      },
      properties: {
        location: 'Parkes, New South Wales',
        title: 'Cape York Peninsula 4WD Tours',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [143.55, -35.3333],
      },
      properties: {
        location: 'Swan Hill, Victoria',
        title: 'Bells Beach Surfing',
      },
    },
  ],
};

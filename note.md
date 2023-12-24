# WildRoute (Wanderly Website) in Australia

The name "WildRoute" brings to mind the excitement of discovering off-the-beaten-path trails, remote destinations, and exhilarating outdoor experiences. It signifies the spirit of embracing nature's wild side and taking unconventional routes in your outdoor adventures.

WildRoute is an exciting online platform designed for outdoor enthusiasts and adventure seekers. It provides a comprehensive collection of outdoor activities, ranging from hiking and biking to rock climbing and water sports. With detailed activity listings, users can explore a wide range of options, including descriptions, difficulty ratings, distances, elevations, and special requirements. The website also encourages user engagement through the ability to leave reviews and ratings, sharing personal experiences with the community. With integrated trail maps, navigation, and GPS functionalities, users can easily discover new routes, points of interest, and plan their adventures. The search feature enables users to find activities based on location, type, difficulty, and duration, ensuring a personalized and tailored experience. Additionally, users can create profiles, track their activities, save favorite trails, and record personal achievements. WildRoute aims to be a go-to resource for outdoor enthusiasts, providing essential information, safety guidelines, equipment recommendations, weather conditions, and even event listings. The website is designed to be mobile-responsive, ensuring a seamless experience across devices. Join WildRoute and embark on thrilling outdoor experiences, discovering new routes and connecting with a vibrant community of adventure lovers.

The WildRoute website will be developed using Node.js, MongoDB, Express, React, HTML, CSS, and JavaScript. It will have a backend built with Node.js and Express, utilizing MongoDB as the database. RESTful API endpoints will enable seamless communication between the frontend and backend. The frontend will be developed using React, with HTML, CSS, and JavaScript for structure, styling, and interactivity. The website will be designed to be responsive, adapting to different devices. It will offer a comprehensive collection of outdoor activities with detailed listings, user reviews and ratings, trail maps with navigation, and a search functionality. User profiles will allow activity tracking and personal achievements. The website will provide safety guidelines, equipment recommendations, weather conditions, and event listings. The development will prioritize the activity listings feature as the starting point for building the WildRoute website.

## List of potential features

1. Activity Listings: Provide detailed listings for various outdoor activities, including descriptions, difficulty ratings, distance, elevation, and special requirements.
2. User Reviews and Ratings: Allow users to leave reviews, ratings, and comments on the activities they have experienced.
3. Trail Maps and Navigation: Integrate interactive trail maps with route information, points of interest, and GPS navigation.
4. Activity Search: Implement a search functionality where users can search for outdoor activities based on location, activity type, difficulty level, or duration.
5. User Profiles and Activity Tracking: Allow users to create profiles to track their outdoor activities, save favorite trails, and record personal achievements.
6. Photography and Sharing: Allow users to share their outdoor adventure photos and stories within the app.
7. Equipment and Gear Recommendations: Provide recommendations and tips on outdoor gear, equipment, and clothing required for various activities.
8. Weather Conditions: Display real-time weather conditions and forecasts for the locations of outdoor activities.
9. Activity Booking and Reservations: Enable users to book or reserve outdoor activities directly through the app.
10. Trip Planning and Itineraries: Help users plan their outdoor trips by offering suggestions for multi-day itineraries, camping spots, nearby attractions, and recommended routes
11. Safety and Precautions: Offer safety guidelines, tips, and precautions for different outdoor activities.
12. Trail Maps and Navigation: Integrate interactive trail maps with route information, points of interest, and GPS navigation.
13. Community and Social Features: Implement community features where users can interact, share experiences, and join discussions related to outdoor activities
14. Event Listings: Provide information about upcoming outdoor events, such as marathons, cycling races, or adventure festivals.
15. Mobile Responsiveness: Ensure that the app is mobile-friendly and responsive for a seamless user experience on different devices.

P/s: This prioritization focuses on the core functionality of your app, starting with providing detailed listings of outdoor activities and allowing user engagement through reviews and ratings. It then moves on to essential features like trail maps, activity search, and user profiles. As you progress, you can add more advanced features like photography and sharing, equipment recommendations, and weather conditions. Finally, you can incorporate features related to activity booking, trip planning, safety, community engagement, event listings, and ensuring a responsive mobile experience.

---

### **Initial Settups**

**Backend**

1. Create a folder called 'backend'.
2. `npm init` to install package.json.
3. `npm install express mongoose`.
4. `npm install --save-dev @types/express typescript`.
5. `npx tsc --init` to create a `tsconfig.json` file.
    - configure `tsconfig.json` file.
    - [refer to this for configuration](https://www.youtube.com/watch?v=qy8PxD3alWw&list=LL&index=3&t=1s).
6. Create Routes folder including `routes` such as POST, GET, DELETE, PUT, PATCH ... And a `.env` file including environment variable such as PORT, MONGO_URL or URLs.
7. Create Models folder including `schemas`.
8. Create Controller folder including `function` for modify and update in the Routes

**Frontend** [Refer to this link for frontend](https://www.youtube.com/watch?v=G_XyAfcLeqI&t=5s)

1. Create a folder called 'frontend'.
2. Install Vite as a react development environment. run `npm create vite@latest`.
3. Start building the react app

*note*: Would encounter the `cors error`, because the when we want to access the backend API, by default the browser will block it so we will need to `npm install --save cors` then `app.use(cors())` to let the http request from the frontend can hit the backend

We can configure

```javascript

app.use(cors(
    {
        origin: 'actual url like yelpcamp.com', // to allow a site hosted on the url origin to access the api
        // or
        origin: '*',
    }
))

```

**Use Helmet as in YelpCamp** for `cors error`?

To access differnet path, we need this:

```javascript
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/decks/:deckId",
    element: <Deck />, // component runned based on the path 
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="page">
      <Header />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

```

### 1. Activity Listings

*Brief*: Provide detailed listings for various outdoor activities, including descriptions, difficulty ratings, distance, elevation, and special requirements

*Ideas*:

- List all activities:
  - started data: {id, activity_name, location, desciption(fact), price, image, author}.
  - modified ?:
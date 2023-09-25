export interface NewActivityBody {
  // jsonData: string;
  activity: {
    activity_title: string;
    location: string;
    description: string;
    avg_price: number;
    image: Array<{
      url: string;
      fileName?: string;
    }>;
    author?: string; // mongoose.objectId type
    reviews?: Array<any>;
  };
}

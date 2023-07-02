export interface NewActivityBody {
  activity: {
    activity_title: string;
    location: string;
    description: string;
    avg_price: number;
    image: Array<{
      url: string;
      // filename: string;
    }>;
  };
}

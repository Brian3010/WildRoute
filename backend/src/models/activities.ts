import mongoose, { SchemaOptions, Types } from 'mongoose';
import Review from './review';
const { Schema } = mongoose;

interface IActivityList {
  _id?: string;
  activity_title: string;
  rating?: number;
  location: string;
  description: string;
  avg_price: number;
  tags: 'Adventure' | 'Nature' | 'Camping' | 'Water Sport' | 'Climbing';
  image: Array<{ url: string }>;
  author?: Types.ObjectId;
  reviews?: Array<{ _id: Types.ObjectId; body: string; rating: number; owner: Types.ObjectId }>;
}

const schemaConfig: SchemaOptions = {
  strict: 'throw',
};

const ActivityListSchema = new Schema(
  {
    // id: String,
    activity_title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avg_price: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    image: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          // fileName: String,
        },
      ],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  schemaConfig
);

// applied when delete a activity
// when deleting an activity, we delete the review in review colllection as well
// "findbyidandDelete" trigger "findOneAndDelete".
ActivityListSchema.post('findOneAndDelete', async function (actyToDel: IActivityList) {
  console.log('POST "findbyIdandDelete"');
  console.log('file: activities.ts:58 ~ actyToDel:', actyToDel);

  if (actyToDel) {
    // delete all reviews that are in actyTodel.reviews[]
    await Review.deleteMany({
      _id: {
        $in: actyToDel.reviews,
      },
    });
  }
});

// update the rating, when a review deleted
// this function triggered by calling findByIdAndUpdate()
ActivityListSchema.post('findOneAndUpdate', async function (acty: IActivityList) {
  // console.log({ acty });

  if (acty) {
    const currentActy = await ActivityList.findById(acty._id).populate('reviews');
    if (currentActy) {
      const numOfReviews = currentActy.reviews?.length;
      const sumOfRating = currentActy.reviews?.reduce((acc, curr) => {
        // console.log(curr.rating);
        return acc + curr.rating;
      }, 0);

      const updatedRating = Math.round(sumOfRating! / numOfReviews!);
      // console.log({ currentActy, numOfReviews, sumOfRating,updatedRating });
      currentActy.rating = updatedRating || 0; // preventing null value assigned
      currentActy.save();
    }

    // console.log({ currentActy });
  }

  // console.log('rating updated:, ',actyToUpdate);
});

//{id, activity_name, location, desciption(fact), price, image, author}.
// type SchemaType = InferSchemaType<typeof ActivityListSchema> ;

const ActivityList = mongoose.model<IActivityList>('ActivityList', ActivityListSchema);

export default ActivityList;

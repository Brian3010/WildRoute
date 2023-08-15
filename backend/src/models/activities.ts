import { required } from 'joi';
import mongoose, { SchemaOptions, Types } from 'mongoose';
import { type } from 'os';
import { activitySchema } from '../middleware/joiSchema';
import Review from './review';
const { Schema } = mongoose;

interface IActivityList {
  activity_title: string;
  rating?: number;
  location: string;
  description: string;
  avg_price: number;
  tags: 'Adventure' | 'Nature' | 'Camping' | 'Water Sport' | 'Climping';
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

//{id, activity_name, location, desciption(fact), price, image, author}.
// type SchemaType = InferSchemaType<typeof ActivityListSchema> ;

const ActivityList = mongoose.model<IActivityList>('ActivityList', ActivityListSchema);

export default ActivityList;

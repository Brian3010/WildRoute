import mongoose, { InferSchemaType, SchemaOptions } from 'mongoose';
const Schema = mongoose.Schema;

interface IReview {
  body?: string;
  rating: string;
  owner: string;
}

const schemaConfig: SchemaOptions = {
  strict: 'throw',
};
const reviewSchema = new Schema(
  {
    body: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  schemaConfig
);

// type reviewSchemaType = InferSchemaType<typeof reviewSchema>;

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;

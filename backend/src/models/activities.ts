// import mongoose from 'mongoose';
import mongoose, { InferSchemaType } from 'mongoose';
import { type } from 'os';
const { Schema } = mongoose;

const ActivityListSchema = new Schema({
  // id: String,
  activity_title: {
    type: String,
    required: true,
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
  image: [
    {
      url: {
        type: String,
        required: true,
      },
      // fileName: String,
    },
  ],
});

//{id, activity_name, location, desciption(fact), price, image, author}.
type SchemaType = InferSchemaType<typeof ActivityListSchema>;

const ActivityList = mongoose.model<SchemaType>('ActivityList', ActivityListSchema);

export default ActivityList;

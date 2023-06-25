// import mongoose from 'mongoose';
import mongoose, { InferSchemaType } from 'mongoose';
const { Schema } = mongoose;

const ActivityListSchema = new Schema({
  // id: String,
  activity_title: String,
  location: String,
  description: String,
  avg_price: Number,
  image: String,
});

//{id, activity_name, location, desciption(fact), price, image, author}.
type SchemaType = InferSchemaType<typeof ActivityListSchema>;

const ActivityList = mongoose.model<SchemaType>('ActivityList', ActivityListSchema);

export default ActivityList;

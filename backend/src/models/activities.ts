import mongoose from 'mongoose';
const { Schema } = mongoose;

const ActivityListSchema = new Schema({
  // id: String,
  activity_title: String,
  location: String,
  description: String,
  price: Number,
  image: String,
});

//{id, activity_name, location, desciption(fact), price, image, author}.

const ActivityList = mongoose.model('ActivityList', ActivityListSchema);

module.exports = ActivityList;

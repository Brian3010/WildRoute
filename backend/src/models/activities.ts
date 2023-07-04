import mongoose, { InferSchemaType, SchemaOptions } from 'mongoose';
const { Schema } = mongoose;

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
  },
  schemaConfig
);

//{id, activity_name, location, desciption(fact), price, image, author}.
type SchemaType = InferSchemaType<typeof ActivityListSchema>;

const ActivityList = mongoose.model<SchemaType>('ActivityList', ActivityListSchema);

export default ActivityList;

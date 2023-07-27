import Joi from 'joi';

export const activitySchema = Joi.object({
  activity: Joi.object({
    activity_title: Joi.string().min(5).required(),
    location: Joi.string().min(5).required(),
    description: Joi.string().min(5).max(50).required(),
    avg_price: Joi.number().max(10000).required(),
    image: Joi.array().items(
      Joi.object({
        url: Joi.string().required(),
        //fileName: Joi.string()
      }).required()
    ),
  }).required(),
});

export const reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().min(5).max(50),
    rating: Joi.number().max(5).min(1).required(),
  }).required(),
});

// })

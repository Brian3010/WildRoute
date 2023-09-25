import Joi, { Extension, ExtensionFactory, Root } from 'joi';
import sanitizeHTML from 'sanitize-html';

type ExtensionFunc = (joi: Root) => Extension;

const customExtension: ExtensionFunc = joi => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.escapeHTML': '{{#label}} must not include HTML', // custom message to passed to error
    },
    rules: {
      // provide rules
      escapeHTML: {
        validate(value, helpers) {
          console.log(value);
          const cleanHTMLVal = sanitizeHTML(value, {
            // clean input value
            allowedTags: [],
            allowedAttributes: {},
          });

          // check if value is clean from html chars
          if (cleanHTMLVal !== value) return helpers.error('string.escapeHTML', { value });

          // return the clean input value if there is no html chars.
          return cleanHTMLVal;
        },
      },
    },
  };
};

const customJoi = Joi.extend(customExtension);

export const activitySchema = customJoi.object({
  activity: customJoi
    .object({
      activity_title: customJoi.string().min(5).required().escapeHTML(),
      location: customJoi.string().min(5).required().escapeHTML(),
      description: customJoi.string().min(5).max(300).required().escapeHTML(),
      avg_price: customJoi.number().max(10000).required(),
      tags: customJoi
        .array()
        .items(customJoi.string().valid('Adventure', 'Nature', 'Camping', 'Water Sport', 'Climbing').required()),
      // image: customJoi.array().items(
      //   customJoi
      //     .object({
      //       url: customJoi.string().required(),
      //       // url: customJoi.string().required().escapeHTML(),
      //       //fileName: customJoi.string()
      //     })
      //     .required()
      // ),
    })
    .required(),
});

export const reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().min(5).max(50).allow('').empty(''),
    rating: Joi.number().max(5).min(1).required(),
  }).required(),
});

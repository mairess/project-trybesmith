import Joi from 'joi';

const schemaProducts = Joi.object({
  name: Joi.string().required().min(3)
    .messages({
      'string.empty': 'Name is required',
    }),
  price: Joi.string().required().min(3),
  userId: Joi.number().required(),
}).strict();

export default schemaProducts;
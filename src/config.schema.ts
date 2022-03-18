import * as Joi from '@hapi/joi';

export const ConfigValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

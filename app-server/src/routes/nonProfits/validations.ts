const { Joi } = require('express-validation')

export const createNonProfitValidation = {
  body: Joi.object({
    name: Joi.string()
      .required(),
    address: Joi.string(),
    email: Joi.string()
      .required()
  })
}

export const querySchema = Joi.object({
  npIds: Joi.string().required(),
})
const { Joi } = require('express-validation')

export const createUserValidation = {
  body: Joi.object({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string(),
    emailId: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
    role: Joi.string()
      .required(),
  })
}

export const updateUserValidation = {
  body: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    emailId: Joi.string(),
    password: Joi.string(),
    role: Joi.string(),
  })
}
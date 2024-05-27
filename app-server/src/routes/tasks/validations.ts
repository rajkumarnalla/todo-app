const { Joi } = require('express-validation')

export const createTaskValidation = {
  body: Joi.object({
    title: Joi.string()
      .required(),
    description: Joi.string(),
    status: Joi.string()
      .required(),
    dueDate: Joi.string()
  })
}

export const updateTaskValidation = {
  body: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
    dueDate: Joi.string()
  })
}

export const paramsSchema = {
  params: Joi.object({
    taskId: Joi.number().integer().required(),
  })
};

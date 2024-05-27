import { validate } from "express-validation";
import { createTask, deleteTask, getTasks, updateTask } from "../../controllers/tasks";
import { createTaskValidation, paramsSchema, updateTaskValidation } from "./validations";

var express = require('express');
var tasksRouter = express.Router();

tasksRouter.get('/', getTasks);

tasksRouter.post('/', validate(createTaskValidation), createTask);

tasksRouter.put('/:taskId', validate(paramsSchema), validate(updateTaskValidation), updateTask);

tasksRouter.delete('/:taskId', validate(paramsSchema), deleteTask);

export default tasksRouter;

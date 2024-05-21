import { Request, Response, NextFunction } from "express";
import Task from "../models/task";

var express = require('express');
var tasksRouter = express.Router();

/* GET all todo tasks. */
tasksRouter.get('/', async function(req: Request, res: Response, next: NextFunction) {
  const data = await Task.findAll({
    where: {
      userId: req.user?.id
    },
    raw: true
  });
  
  res.send(data);
});

/* Create new task. */
tasksRouter.post('/', async function(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  console.log(body);
  body.userId = req.user?.id;
  // Task.create()
  await Task.create(body)
  res.send('respond with a resource');
});

/* Update task status. */
tasksRouter.put('/:taskId', async function(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const {taskId} = req.params;
  body.userId = req.user?.id;

  await Task.update(body, {where: {id: taskId}})

  res.send({status: 'success'});
});

/* Delete task. */
tasksRouter.delete('/:taskId', async function(req: Request, res: Response, next: NextFunction) {
  const {taskId} = req.params;

  await Task.destroy({
    where: {
      id: taskId,
      userId: req.user?.id
    }
  });

  res.send({status: "success"});
});

export default tasksRouter;

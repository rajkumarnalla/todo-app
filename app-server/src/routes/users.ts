import { NextFunction, Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/auth";
import User from "../models/user";

var express = require('express');
var userRouter = express.Router();

export async function getUser(emailId: string) {
  try {
    const data = await User.findOne({
      where: {emailId},
      raw: true
    })

    return data as User;
  } catch(err) {
    throw err;
  }
}

/* GET users listing. */
userRouter.get('/', async function(req: Request, res: Response, next: NextFunction) {
  const data = await User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'emailId', 'createdAt'],
    raw: true
  });

  res.send({data});
});

/* Create new user. */
userRouter.post('/', async function(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  body.password = await hashPassword(body.password);
  
  const resss = await User.create(body);
  console.log(resss.dataValues)
  res.send('respond with a resource');
});

/* Update existing user. */
userRouter.patch('/:taskId', async function(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const {taskId} = req.params;
  
  await User.update(body, {where: {id: taskId}});

  res.send({status: 'success'});
});

/* delete existing user. */
userRouter.delete('/:userId', async function(req: Request, res: Response, next: NextFunction) {
  const {userId} = req.params;

  const resss = await User.destroy({
    where: {
      id: userId
    },
    
  });
  console.log(resss)
  res.send({status: 'success'});
});

export default userRouter;

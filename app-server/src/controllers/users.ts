import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../utils/auth";
import User from "../models/user";

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

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'emailId', 'createdAt'],
      raw: true
    });

    res.send({data});
  } catch(err) {
    next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    body.password = await hashPassword(body.password);
    
    await User.create(body);
    
    res.send('respond with a resource');
  } catch(err) {
    next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const {userId} = req.params;
    
    await User.update(body, {where: {id: userId}});

    res.send({status: 'success'});
  } catch(err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const {userId} = req.params;

    await User.destroy({
      where: {
        id: userId
      },
      
    });
    
    res.send({status: 'success'});
  } catch(err) {
    next(err);
  }
}
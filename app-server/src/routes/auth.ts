import { NextFunction, Request, Response } from "express";
import { getUser } from "./users";
import { comparePassword, hashPassword } from "../utils/auth";
import { generateAccessToken } from "../utils/token";

var express = require('express');
var authRouter = express.Router();

authRouter.post('/login', async function(req: Request, res: Response, next: NextFunction) {
  const {email, password} = req.body;

  const dbUser = await getUser(email);
  const match = await comparePassword(password, dbUser?.password || '')
  const accessToken = await generateAccessToken({
    id: dbUser?.id,
    firstName: dbUser?.firstName,
    email: dbUser?.emailId
  });

  if (match) {
    res.cookie('authToken', accessToken, { httpOnly: true });
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.json({
      userId: dbUser?.id,
      email, 
      role: dbUser?.role,
      firstName: dbUser?.firstName + (dbUser?.lastName || '')
    });
  } else {
    res.status(403).json({status: 'Unauthorized'});
  }
});

authRouter.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('authToken');
  res.redirect('/');
});

export default authRouter;

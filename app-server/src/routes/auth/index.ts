import { validate } from "express-validation";
import { login, logout } from "../../controllers/auth";
import { loginValidation } from "./validations";

var express = require('express');
var authRouter = express.Router();

authRouter.post('/login', validate(loginValidation), login);

authRouter.get('/logout', logout);

export default authRouter;

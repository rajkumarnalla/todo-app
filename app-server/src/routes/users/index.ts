import { validate } from "express-validation";
import { createUser, deleteUser, getUsers, updateUser } from "../../controllers/users";
import { auth } from "../../middleware/auth";
import { createUserValidation, updateUserValidation } from "./validations";

var express = require('express');
var userRouter = express.Router();

userRouter.get('/', auth, getUsers);

userRouter.post('/', validate(createUserValidation), createUser);

userRouter.patch('/:userId', validate(updateUserValidation), auth, updateUser);

userRouter.delete('/:userId', auth, deleteUser);

export default userRouter;

import express from 'express'
import {  signUp } from '../controllers/signUpController.js'
import { login } from '../controllers/loginController.js'
export const userRouter = express.Router()


userRouter.post('/login', login)

userRouter.post('/signup', signUp)
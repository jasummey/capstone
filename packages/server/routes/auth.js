// authRoutes.js
import {Router}from 'express'
import validateSignUp from '../middleware/validateSignUp';
import { signUp } from '../controllers/auth.controller';
import { signIn } from '../controllers/auth.controller';
import validateSignIn from '../middleware/validateSignIn';

const authRoutes = Router();

authRoutes.post ("/signup", validateSignUp, signUp)
authRoutes.post ("/signin", validateSignIn, signIn)
// authRoutes.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   // Simulate registration by adding the user to the 'users' array
//   users.push({ username, password });
//   res.status(201).json({ message: 'User registered' });
// });

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Simulate login by checking if the user exists in the 'users' array
//   const user = users.find((u) => u.username === username && u.password === password);

//   if (user) {
//     res.status(200).json({ message: 'Login successful', user });
//   } else {
//     res.status(401).json({ message: 'Login failed' });
//   }
// });

export default authRoutes

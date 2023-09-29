import User from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/auth.config";


export async function signUp (req,res,next) {
const {username, password} = req.body;
  try {
 const user = await User.findOne ({username: username.toLowerCase()})
    if (user) {
    return res.status(422).json ({username:"Username already in use"})}

    const passwordHash = bcrypt.hashSync (password,12)
    await User.create({username: username.toLowerCase(), passwordHash})
    res.sendStatus (201);
 }

  catch(error){
 console.log (error)
  res.status(400).json(error)
  }

}
export async function signIn (req,res,next) {
    const {username, password} = req.body;
    try {
    const user = await User.findOne ({username: username.toLowerCase()})
    if (!user) {
        return res.status(422).json ({username: "Username and/or password is invalid"})
    }
    const passwordIsValid =bcrypt.compareSync(password, user.passwordHash)
    if (!passwordIsValid) {
        return res.status(422).json ({username: "Username and/or password is invalid"})      
    };
    const tokenPayload = {
        sub: user.id,
        uname: user.username
    }
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET,{expiresIn: "7d"} );
    res.json({token:accessToken, sub: user.id, uname: user.username})
} catch(error){
    res.status(400).json(error);
    }
}
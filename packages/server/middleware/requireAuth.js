import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/auth.config";


export function requireAuth() {

    return async (req,res,next) => {
        const auth = req.get("authorization")

        if (!auth) {
            return res.sendStatus(401)
        }
        const token = auth.replace("Bearer ", "")
        jwt.verify(token, JWT_SECRET, (error,payload) => {
            if (error) {
                return  res.sendStatus (401)
            }
    
        next ()
        })
    }
    
}
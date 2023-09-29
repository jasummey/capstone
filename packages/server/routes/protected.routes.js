import {Router} from "express";
import authRoutes from "./auth";
import { basicProtectedRoute, roleProtectedRoute } from "../controllers/protected.controller";
import { requireAuth } from "../middleware/requireAuth";

const protectedRoutes = Router();

protectedRoutes.get("/",requireAuth(), basicProtectedRoute)
protectedRoutes.get("/role", roleProtectedRoute)
export default protectedRoutes;


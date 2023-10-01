import Router from "express";
// import { userRoutes } from "./user";
import recipeRoutes from "../routes/recipes.js";
import userRoutes from"../routes/user.js"
import authRoutes from "../routes/auth.js"
import protectedRoutes from "./protected.routes.js";

const router = Router();
router.use('/auth', authRoutes)
router.use ('/protected', protectedRoutes)
// router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);
// router.use('/register',userRoutes)


export default router;

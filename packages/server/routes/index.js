import Router from "express";
import recipeRoutes from "../routes/recipes.js";
import authRoutes from "../routes/auth.js";
import protectedRoutes from "./protected.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/protected", protectedRoutes);
router.use("/recipes", recipeRoutes);

export default router;

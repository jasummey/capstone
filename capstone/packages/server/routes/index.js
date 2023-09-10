import { Router } from "express";
import userRoutes from "./user";
import recipeRoutes from "./recipes";

const router = Router();

router.use("/users", userRoutes);

router.use("/recipes", recipeRoutes);

export default router;

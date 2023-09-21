import Router from "express";
// import { userRoutes } from "./user";
import recipeRoutes from "../routes/recipes.js";

const router = Router();

// router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);

export default router;

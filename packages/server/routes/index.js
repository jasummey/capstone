import Router from "express";
import recipeRoutes from "../routes/recipes.js";
import authRoutes from "../routes/auth.js";
import protectedRoutes from "./protected.routes.js";
import fileRoutes from "./file.routes.js";
import fileUpload from "express-fileupload";

const router = Router();
router.use("/auth", authRoutes);
router.use("/protected", protectedRoutes);
router.use("/recipes", recipeRoutes);
router.use("/files", fileUpload(), fileRoutes)

export default router;

import { Router } from "express";
import Recipe from "../models/recipes.js";

const router = Router();

router.get("");

// Create a new recipe
router.post("/", async (req, res) => {
  const {
    // recipeName,
    // imgUrl,
    // ingredients,
    // preparation,
    // cookingTime,
    // difficulty,
    // author,
    newRecipe,
  } = req.body;
  const {
    recipeName,
    imgUrl,
    ingredients,
    preparation,
    cookingTime,
    difficulty,
    author,
  } = newRecipe;

  try {
    const newRecipe = new Recipe({
      recipeName,
      imgUrl,
      ingredients,
      preparation,
      cookingTime,
      difficulty,
      author, // Save the author's username
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch recipes by username
router.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const recipes = await Recipe.find({ author: username });
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/recipes", async (req, res) => {
  const searchTerm = req.query.recipeName.toLowerCase();

  try {
    const recipes = await Recipe.find({
      recipeName: { $regex: searchTerm, $options: "i" },
    });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

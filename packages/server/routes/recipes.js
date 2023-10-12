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
      author,
    });

    const savedRecipe = await newRecipe.save();
    const responseRecipe = savedRecipe.toJSON();
    res.status(201).json(responseRecipe);
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

router.get("/:recipeName", async (req, res) => {
  const { recipeName } = req.params;
  try {
    const recipe = await Recipe.findOne({ recipeName });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Edit a recipe by recipeName
router.put("/edit/:recipeName", async (req, res) => {
  const { recipeName } = req.params;
  const updatedRecipeData = req.body;

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { recipeName },
      updatedRecipeData,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a recipe by recipeName
router.delete("/delete/:recipeName", async (req, res) => {
  const { recipeName } = req.params;

  try {
    const deletedRecipe = await Recipe.findOneAndDelete({ recipeName });

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

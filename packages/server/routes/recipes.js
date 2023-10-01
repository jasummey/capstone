import { Router } from "express";
const router = Router();

import Recipe from "../models/recipes.js";
import Comment from "../models/comments.js";

// list of all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create a new recipe
router.post("/", async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    imageURL,
    cookTime,
    mealType,
    author,
  } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      imageURL,
      cookTime,
      mealType,
      author,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update an existing recipe by ID
router.put("/:id", async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    imageURL,
    cookTime,
    mealType,
    author,
  } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        ingredients,
        instructions,
        imageURL,
        cookTime,
        mealType,
        author,
      },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get and post comments by recipe ID
router.get("/:id/comments", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const comments = await Comment.find({ recipeId }); // Assuming Comment model has a 'recipeId' field
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Post a new comment for a recipe
router.post("/:id/comments", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { text, author } = req.body;

    const newComment = new Comment({
      recipeId,
      text,
      author,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete a recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

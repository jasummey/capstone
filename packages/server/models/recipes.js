import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    label: "Recipe Name",
  },
  imgUrl: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
    label: "Ingredients",
  },
  preparation: {
    type: String,
    required: true,
    label: "Preparation Steps",
  },
  cookingTime: {
    type: Number,
    required: true,
    label: "Cooking Time (minutes)",
  },
  difficulty: {
    type: String,
    required: true,
    label: "Difficulty",
    enum: ["easy", "medium", "hard"],
  },
  author: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,
  ingredients: [{ name: String, quantity: String }],
  instructions: [String],
  imageURL: String,
  cookTime: Number,
  mealType: String,
  author: {
    type: ObjectId,
    ref: "User",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

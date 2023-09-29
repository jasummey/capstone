import React, { useState } from "react";
import "../pages/addRecipe.css"

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    preparation: "",
    cookingTime: "",
    difficulty: "easy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe submitted:", recipe);
    // You can add code here to send the recipe data to a backend or perform other actions.
  };

  return (
    <div className="new-recipe">
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipeName">Recipe Name:</label>
        <input
          type="text"
          id="recipeName"
          name="recipeName"
          value={recipe.recipeName}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
        <br />

        <label htmlFor="preparation">Preparation Steps:</label>
        <textarea
          id="preparation"
          name="preparation"
          value={recipe.preparation}
          onChange={handleChange}
          rows="8"
          required
        ></textarea>
        <br />

        <label htmlFor="cookingTime">Cooking Time (minutes):</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={recipe.difficulty}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />

        <input type="submit" value="Create Recipe" />
      </form>
    </div>
  );
};

export default RecipeForm;

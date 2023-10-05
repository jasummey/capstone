import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProvideAuth } from "../contexts/AuthContext"; // Import your authentication context
import "../pages/addRecipe.css";

const RecipeForm = () => {
  const { auth } = useProvideAuth(); // Get authentication information from the context
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    preparation: "",
    cookingTime: "",
    difficulty: "easy",
    author: auth.user, // Use the username from the authentication context
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { recipeName, ingredients, preparation, cookingTime, difficulty, author } = recipe;
      const newRecipe = {
        recipeName,
        ingredients,
        preparation,
        cookingTime,
        difficulty,
        author, // Include the author's username
      };

      const response = await fetch("http://localhost:3001/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.status === 201) {
        console.log("Recipe added to the database");
        navigate("/user");
      } else {
        const data = await response.json();
        console.error("Failed to add the recipe to the database:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

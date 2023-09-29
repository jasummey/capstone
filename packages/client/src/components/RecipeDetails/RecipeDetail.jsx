import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";
import { Link } from "react-router-dom";

import { Navbar, Container } from "react-bootstrap";
import { Button } from "bootstrap";


const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]));
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const {
    strMeal,
    strCategory,
    strInstructions,
    strMealThumb,
  } = recipe;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="recipe-detail-container ">
      <div className="d-flex justify-content-center">
        <div className="recipe-card">
        <h1 className="recipe-card-title display-4">{strMeal}</h1>
          <img src={strMealThumb} alt={strMeal} className="recipe-card-img-top" />
          <div className="recipe-card-body">
            <h3 className="recipe-card-subtitle mb-3">Category: {strCategory}</h3>
            <h3 className="recipe-card-subtitle mb-3">Ingredients:</h3>
            <ul className="recipe-card-list list-group mb-4">
              {ingredients.length > 0 ? (
                ingredients.map((item, index) => (
                  <li className="recipe-card-list-item list-group-item" key={index}>
                    {item.measure} {item.ingredient}
                  </li>
                ))
              ) : (
                <p>No ingredients available.</p>
              )}
            </ul>
            <h3 className="recipe-card-subtitle mb-3">Instructions:</h3>
            <p className="recipe-card-text">{strInstructions}</p>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

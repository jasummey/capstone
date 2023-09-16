import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strCategory, strMealThumb } = recipe;

  return (

    <div className="card">
    <Link to={`/recipe/${idMeal}`}> 
        <img src={strMealThumb} alt={strMeal} className="card-image" />
        <div className="card-body">
          <span className="category">{strCategory}</span>
          <h3>{strMeal}</h3>
    </div>
    </Link>
    </div>
  );
};

export default RecipeCard;

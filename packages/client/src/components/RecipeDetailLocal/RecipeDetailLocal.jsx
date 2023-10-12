import React from "react";
import "./RecipeDetailLocal.css";
import { useParams, Link } from "react-router-dom";

const RecipeDetailLocal = () => {
  const { recipeName } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const ingredients = queryParams.get("ingredients");
  const preparation = queryParams.get("preparation");
  const cookingTime = queryParams.get("cookingTime");
  const imgUrl = queryParams.get("imgUrl");

    const ingredientsArray = ingredients ? ingredients.split(", ") : [];

  return (
    <div className="recipe-detail-container">
      <div className="d-flex justify-content-center">
        <div className="recipe-card">
          <h1 className="recipe-card-title display-4">{recipeName}</h1>
          <img src={imgUrl} alt={recipeName} className="recipe-card-img-top" />
          <div className="recipe-card-body">
            <h3 className="recipe-card-subtitle mb-3">Ingredients:</h3>
            <ul className="recipe-card-list list-group mb-4">
              {ingredientsArray.map((ingredient, index) => (
                <li className="recipe-card-list-item list-group-item" key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="recipe-card-text">Preparation:</h3>
            <p>{preparation}</p>
            <h3 className="recipe-card-subtitle mb-3">Cooking Time:</h3>
            <p>{cookingTime} minutes</p>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailLocal;

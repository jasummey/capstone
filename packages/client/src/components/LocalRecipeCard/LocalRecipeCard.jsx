import React from "react";
import { Link } from "react-router-dom";

const LocalRecipeCard = ({ recipe }) => {
  const { recipeName, ingredients, preparation, cookingTime, difficulty, imgUrl } = recipe;

  return (
    <div className="card">
      <Link
        to={{
          pathname: `/local-recipe/${recipeName}`,
          search: `?ingredients=${ingredients}&preparation=${preparation}&cookingTime=${cookingTime}&imgUrl=${imgUrl}` 
        }}
      >
        <div className="card-body">
          {/* <span className="category">{difficulty}</span> */}
          <img src={imgUrl} alt={recipeName} />    
          <h3>{recipeName}</h3>
        </div>
      </Link>
    </div>
  );
};

export default LocalRecipeCard;

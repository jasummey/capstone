import React from "react";
import { Link } from "react-router-dom";

const UserRecipeCard = ({recipe}) => {
 
  const { recipeName, imgUrl, difficulty} = recipe;
   console.log(recipe)
   return (
    <div className="card">
    <Link to={`/${recipeName}`}> 
        <img src={imgUrl} alt={recipeName} className="card-image" />
        <div className="card-body">
          <span className="category">{difficulty}</span>
          <h3>{recipeName}</h3>
    </div>
    </Link>
    </div>
  );
};

export default  UserRecipeCard;
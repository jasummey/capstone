import "./UserRecipeDetail.css"
import { useParams, Link } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
const UserRecipeDetail= () => {

  const { recipeName } = useParams();

  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/recipes`);
        console.log(response.data)
        if (response.ok) {
          const data = await response.json();
          setRecipeDetails(data);
        } else {
          console.error('Failed to fetch recipe details');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchData();
  }, [recipeName]);

  if (!recipeDetails) {
    return <p>Loading recipe details...</p>;
  }

  const { imgUrl, ingredients, preparation, cookingTime } = recipeDetails;

  
  return (
    <div className="recipe-detail-container">
      <div className="d-flex justify-content-center">
        <div className="recipe-card">
          <h1 className="recipe-card-title display-4">{recipeName}</h1>
          <img src={imgUrl} alt={recipeName} /> 
          <div className="recipe-card-body">
            <h3 className="recipe-card-subtitle mb-3">Ingredients:</h3>
            <p>{ingredients}</p>
            <h3 className="recipe-card-subtitle mb-3">Preparation:</h3>
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

  export default UserRecipeDetail;
  
  
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api.config';
import './RecipeEdit.css';

function RecipeEdit() {
  const { recipeName } = useParams();
  const navigate = useNavigate();

  const [editedRecipe, setEditedRecipe] = useState({
    ingredients: '',
    preparation: '',
    cookingTime: '', // Add cooking time to state
  });

  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    console.log("Fetching recipe for:", recipeName);
    api.get(`/recipes/${recipeName}`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          console.log("Fetched recipe data:", data);
          setEditedRecipe(data);
          setCurrentRecipe(data);
        } else {
          console.error("Failed to fetch recipe. Response status:", response.status);
          console.error("Response data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [recipeName]);

  const handleEditRecipe = () => {
    console.log("Editing recipe:", editedRecipe);
    api.put(`/recipes/edit/${recipeName}`, editedRecipe)
      .then((response) => {
        if (response.status === 200) {
          console.log("Recipe updated successfully");
          navigate(`/user/${editedRecipe.author}`);
        } else {
          console.error("Failed to update the recipe");
        }
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  return (
    <div className="edit-recipe">
      <h2>Edit Recipe: {recipeName}</h2>
      <div className="recipe-card">
        <div>
          <p><strong>Recipe Name:</strong> {currentRecipe.recipeName}</p>
          <p><strong>Ingredients:</strong> {currentRecipe.ingredients}</p>
          <p><strong>Preparation Steps:</strong> {currentRecipe.preparation}</p>
          <div>
            <label htmlFor="cookingTime">Updated Cooking Time</label>
            <input
              type="number"
              name="cookingTime"
              value={editedRecipe.cookingTime}
              onChange={handleInputChange}
            />
          </div>
          <p><strong>Difficulty:</strong> {currentRecipe.difficulty}</p>
        </div>
        <form>
          <div>
            <label htmlFor="ingredients">Updated Ingredients</label>
            <textarea
              name="ingredients"
              value={editedRecipe.ingredients}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="preparation">Updated Preparation Steps</label>
            <textarea
              name="preparation"
              value={editedRecipe.preparation}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <button type="button" onClick={handleEditRecipe}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeEdit;

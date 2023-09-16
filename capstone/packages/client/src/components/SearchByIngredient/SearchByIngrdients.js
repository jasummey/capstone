import React, { useState } from 'react';
import axios from 'axios'; // for making API requests to your backend

function SearchByIngredients() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleIngredientChange = (e) => {
    setIngredients(e.target.value);
  };

  const findRecipe = async () => {
    try {
      const response = await axios.post('/api/recipes', { ingredients });
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Find a Recipe</h2>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={handleIngredientChange}
      />
      <button onClick={findRecipe}>Find Recipe</button>
      {recipe && (
        <div>
          <h3>Recipe</h3>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
}

export default SearchByIngredients;


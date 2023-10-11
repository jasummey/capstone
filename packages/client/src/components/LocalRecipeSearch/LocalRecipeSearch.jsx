import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";

const LocalRecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  console.log(filteredRecipes)
  console.log(searchResults)
  console.log()

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/recipes?recipeName=${searchTerm}`);

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching for recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    setFilteredRecipes(searchResults);
  }, [searchResults]);

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onSearch={handleSearch}
        placeholder="Search Local Recipes"
      />

      {filteredRecipes.length > 0 && (
        <div>
          <h3>Filtered Recipes:</h3>
          <ul>
            {filteredRecipes.map((recipe) => (
              <li key={recipe._id}>
                <h4>{recipe.recipeName}</h4>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Preparation: {recipe.preparation}</p>
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocalRecipeSearch;

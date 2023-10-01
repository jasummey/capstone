import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import Slides from '../components/Slides/Slides';
import axios from 'axios';

const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

export function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    setIsLoading(true);
    const searchUrl = searchType === 'name' ? 'search.php?s=' : 'filter.php?i=';
    try {
      const response = await axios.get(apiUrl + searchUrl + query);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchRecipes();
  }, [searchType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <div className="container">
      <Slides recipes={recipes} />
      <SearchBar
        handleSubmit={handleSubmit}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        isLoading={isLoading}
      />
      <div className="search-toggle">
        <label>
          <input
            type="radio"
            value="name"
            checked={searchType === 'name'}
            onChange={() => setSearchType('name')}
          />
          Search by Name
        </label>
        <label>
          <input
            type="radio"
            value="ingredient"
            checked={searchType === 'ingredient'}
            onChange={() => setSearchType('ingredient')}
          />
          Search by Ingredient
        </label>
      </div>
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No Recipes!</p>
        )}
      </div>
    </div>
  );
}


export default HomePage;
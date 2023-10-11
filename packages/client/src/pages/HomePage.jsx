import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import Slides from '../components/Slides/Slides';
import axios from 'axios';
import LocalRecipeCard from '../components/LocalRecipeCard/LocalRecipeCard';
import api from "../utils/api.config"

const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';


export function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [externalRecipes, setExternalRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);
  console.log(query);

  const fetchExternalRecipes = async () => {
    try {
      const externalResponse = await axios.get(apiUrl + 'search.php?s=');
      const externalRecipes = externalResponse.data.meals || [];
      setExternalRecipes(externalRecipes);
    } catch (error) {
      console.error('Error fetching external recipes:', error);
    }
  };

  useEffect(() => {
    fetchExternalRecipes()
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error('Error fetching external recipes:', error);
        setIsLoading(false);
      });
  }, []);

  const searchRecipes = async () => {
    setIsLoading(true);
    try {
      if (searchType === 'name') {
        const externalResponse = await axios.get(apiUrl + 'search.php?s=' + query);
        const externalRecipes = externalResponse.data.meals || [];
        setExternalRecipes(externalRecipes);

        const localResponse = await api.get("/recipes"); 
        const localRecipes = localResponse.data || [];
        const filteredLocalRecipes = localRecipes.filter((recipe) =>
          recipe.recipeName.toLowerCase().includes(query.toLowerCase())
        );
        setLocalRecipes(filteredLocalRecipes);
      } else if (searchType === 'ingredient') {
        const externalResponse = await axios.get(apiUrl + 'filter.php?i=' + query);
        const externalRecipes = externalResponse.data.meals || [];
        setExternalRecipes(externalRecipes);

        const localResponse = await api.get("/recipes");
        const localRecipes = localResponse.data || [];
        const filteredLocalRecipes = localRecipes.filter((recipe) => {
          const ingredients = recipe.ingredients ? recipe.ingredients.split(', ') : [];
          return ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query.toLowerCase())
          );
        });
        setLocalRecipes(filteredLocalRecipes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
    setQuery('');
  };

  return (
    <div className="container">
      <Slides recipes={externalRecipes} />
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
        {(localRecipes.length > 0 || externalRecipes.length > 0) && (
          <>
            {localRecipes.map((recipe) => (
              <LocalRecipeCard key={recipe._id} recipe={recipe} />
            ))}
           {externalRecipes.map((recipe) => (
  <RecipeCard key={recipe.idMeal || recipe._id} recipe={recipe} />
))}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;

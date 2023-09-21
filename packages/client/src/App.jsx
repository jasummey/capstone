import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import RecipeCard from "./components/RecipeCard/RecipeCard"
import AppHeader from './components/Header/header'
import Slides from './components/Slides/Slides'

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);


  const searchRecipes = async () => {
    setIsLoading(true);
    const url = apiUrl + query;
    const res = await fetch(url);
    const data = await res.json();
    console.log (data.strMealThumb)
    setRecipes(data.meals);
    setIsLoading(false)
  };
  useEffect(() => {
    searchRecipes()
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    searchRecipes()
  }

  return (<div className="container">
 
    <Slides  recipes={recipes}/>
    <div style={{ display: 'block', width: 922, padding: 1 }}>
    </div>

    <SearchBar
      handleSubmit={handleSubmit}
      value={query}
      onChange={event => setQuery(event.target.value)}
      isLoading={isLoading} />
    <div className="recipes">
      {recipes ? recipes.map(recipe => (
        <RecipeCard
          key={recipe.idMeal} recipe={recipe} />
      ))
        : "No Recipes!"}

    </div>
  </div>)
}



export default App
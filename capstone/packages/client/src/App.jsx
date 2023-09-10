import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {useState, useEffect} from "react"
import SearchBar from "./components/SearchBar"
import RecipeCard from "./components/RecipeCard"

import AppHeader from './components/header'


const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="

function App() {
const [isLoading, setIsLoading] = useState (false);
const [query, setQuery] = useState("");
const [recipes, setRecipes] = useState ([]);

const searchRecipes = async () => {
  setIsLoading (true);
  const url = apiUrl + query;
  const res = await fetch(url);
  const data = await res.json();
  console.log (data.meals)
  setRecipes(data.meals);
  setIsLoading (false)
};
useEffect (() => {
  searchRecipes()
},[])

const handleSubmit = event => {
  event.preventDefault()
  searchRecipes()
}

return (<div className= "container">
  <header id="header"> 
    <AppHeader />
  </header>

 <SearchBar 
 handleSubmit ={handleSubmit}
 value={query}
 onChange ={event => setQuery(event.target.value)}
 isLoading = {isLoading} />
 <div className="recipes">
  {recipes ? recipes.map(recipe => (
    <RecipeCard 
    key = {recipe.idMeal} recipe = {recipe}/>
  ))
  : "No Recipes!"}
 </div>
</div>)
}

export default App
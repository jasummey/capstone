import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from "react"
import { Carousel} from 'react-bootstrap'
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
  {/* <div style={{ display: 'block', width: 1200, padding: 2 }}>
      <Carousel>
        <Carousel.Item interval={2000}>
          <img
            className="d-block"
src="dish5.jpeg"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block"
src="image11.jpeg"
            alt="Image Two"
          />
  
        </Carousel.Item>
      </Carousel>
    </div> */}

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
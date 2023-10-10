import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components';
import RecipeDetail from './components/RecipeDetails/RecipeDetail';
import { LoginPage, RegisterPage, HomePage} from './pages';
import { Routes,Route } from 'react-router-dom';
import RecipeForm from './pages/addRecipe';
import UserProfile from './pages/UserProfile';
import RecipeDetailLocal from './components/RecipeDetailLocal/RecipeDetailLocal'

function App() {

const user = {
  username: "",
  password: "",
 
}
  return (
  <>
<Header />

<Routes>
  <Route exact path="/" element = {<HomePage />} />
  <Route path="/user" element = {<UserProfile />}/>
  <Route path="/addrecipe" element ={< RecipeForm/>}/>
  <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
  <Route path="/signup" element= {<RegisterPage />} />
  <Route path="/signin" element= {<LoginPage />} /> 
  <Route path="/local-recipe/:recipeName" element={<RecipeDetailLocal />} />

</Routes>
</>)
}



export default App



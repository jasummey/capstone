import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components';
import RecipeDetail from './components/RecipeDetails/RecipeDetail';
import { LoginPage, RegisterPage, HomePage} from './pages';
import { Routes,Route } from 'react-router-dom';
import RecipeForm from './pages/addRecipe';
import Dashboard from './pages/Dashboard';

function App() {
  return (
  <>
<Header />

<Routes>
  <Route exact path="/" element = {<HomePage />} />
  <Route path="/dashboard" element = {<Dashboard />}/>
  <Route path="/addrecipe" element ={< RecipeForm/>}/>
  <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
  <Route path="/signup" element= {<RegisterPage />} />
  
  <Route path="/signin" element= {<LoginPage />} /> 
</Routes>
</>)
}



export default App



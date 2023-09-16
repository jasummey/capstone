import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeDetail from './components/RecipeDetails/RecipeDetail.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
      </Routes>

    </Router>
   
  </React.StrictMode>,
)

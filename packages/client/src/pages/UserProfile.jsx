
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';
import { useProvideAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../utils/api.config';
import { useNavigate } from 'react-router-dom';
import UserRecipeCard from '../components/UserRecipeCard/UserRecipeCard';
import LocalRecipeCard from '../components/LocalRecipeCard/LocalRecipeCard';



function UserProfile() {
  const [userRecipes, setUserRecipes] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { auth } = useProvideAuth();
  const navigate = useNavigate();
  const [editRecipe, setEditRecipe] = useState(null); 
  


  useEffect(() => {
    
    if (auth.isAuthenticated) {
    
      api.get(`/recipes/user/${auth.user}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
        .then(async (response) => {
          if (response.status === 200) {
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
              try {
                console.log(response.data)
                const jsonData = await response.data;
                console.log(jsonData)
                setUserRecipes(jsonData); 
              } catch (error) {
                console.error("Error parsing JSON:", error);
                
              }
            } else {
              console.error("Response is not JSON.");
             
              setUserRecipes([]); 
              
            }
          } else {
            throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
          
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, [auth.token, auth.user]); 
  console.log(userRecipes)

  const handleAddRecipe = () => {
    
    navigate('/addrecipe');
  };

  
const handleDeleteRecipe = (recipeName) => {
  api.delete(`/recipes/delete/${recipeName}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
    .then((response) => {
      if (response.status === 204) {
        
        setUserRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.recipeName !== recipeName)
        );
      } else {
        
        console.error("Failed to delete recipe:", response.statusText);
      }
    })
    .catch((error) => {
      
      console.error("Error deleting recipe:", error);
    });
};

const handleEditRecipe = (recipe) => {
  setEditRecipe(recipe);
};
const handleSaveRecipe = (editedRecipe) => {
  
  api.put(`/recipes/edit/${editedRecipe.recipeName}`, editedRecipe, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
    .then((response) => {
      if (response.status === 200) {
  
        setUserRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.recipeName === editedRecipe.recipeName ? editedRecipe : recipe
          )
        );
        setEditRecipe(null); 
      } else {
        console.error("Failed to edit recipe:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error editing recipe:", error);
    });
};


  if (auth.isAuthenticated === false) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>{`${auth.user}'s `}Profile</h2>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
        <button  id="btn"
  style={{
    padding: '10px 20px', 
    width: '300px',
    backgroundColor: '#FBD199', 
    color: 'black', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer',
  }} onClick={handleAddRecipe}>Add recipe</button>
    </div>
    {loading ? (
      <p>Loading recipe...</p>
    ) : (
      <div >
        <h3 style={{ display: 'flex', justifyContent: 'center' }}> My Recipes</h3>
        {userRecipes.map((recipe) => (
<div key={recipe.recipeName}>
  <LocalRecipeCard recipe={recipe} />
  <button onClick={() => handleDeleteRecipe(recipe.recipeName)} className="btn btn-danger btn-sm mr-2">
  Delete
</button>


  <Link to={`/editrecipe/${recipe.recipeName}`}>Edit Recipe</Link>
</div>
))}
      </div>
    )}
  </div>
);
}

export default UserProfile;

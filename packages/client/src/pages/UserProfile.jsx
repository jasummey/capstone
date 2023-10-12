
import React, { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import { useProvideAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../utils/api.config';
import { useNavigate } from 'react-router-dom';
import UserRecipeCard from '../components/UserRecipeCard/UserRecipeCard';



function UserProfile() {
  const [userRecipes, setUserRecipes] = useState([]); // State to store user's recipes
  const [loading, setLoading] = useState(true); // Loading indicator
  const { auth } = useProvideAuth();
  const navigate = useNavigate();;
  


  useEffect(() => {
    // Check if auth.user is defined before making the request
    if (auth.isAuthenticated) {
      // Fetch user's recipes from the backend using their username
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
                setUserRecipes(jsonData); // Set the user's recipes
              } catch (error) {
                console.error("Error parsing JSON:", error);
                // Handle the error appropriately
              }
            } else {
              console.error("Response is not JSON.");
              // Handle the error appropriately for non-JSON responses
              setUserRecipes([]); // Set userRecipes to an empty array in case of non-JSON response
              
            }
          } else {
            throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
          // Handle the error appropriately, e.g., set an error state or display a message
        })
        .finally(() => {
          setLoading(false); // Data loading is complete
        });
    }
  }, [auth.token, auth.user]); 
  console.log(userRecipes)

  const handleAddRecipe = () => {
    // Redirect the user to the recipe add page
    navigate('/addrecipe');
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
      </div >
      <h3 style={{ display: 'flex', justifyContent: 'center' }}> My Recipes</h3>
      {loading ? (
        <p>Loading recipe...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px'}}>
            {userRecipes.map((recipe) => (
              <UserRecipeCard recipe ={recipe} />
            ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;

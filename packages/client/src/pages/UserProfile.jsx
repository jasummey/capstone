import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProvideAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../utils/api.config';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [userRecipes, setUserRecipes] = useState([]); // State to store user's recipes
  const [loading, setLoading] = useState(true); // Loading indicator
  const { auth } = useProvideAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if auth.user is defined before making the request
  //   if (auth.user) {
  //     // Fetch user's recipes from the backend using their username
  //     api.get(`/recipes/user/${auth.user}`, {
  //       headers: { Authorization: `Bearer ${auth.token}` },
  //     })
  //       .then(async (response) => {
  //         if (response.status === 200) {
  //           const contentType = response.headers.get('Content-Type');

  //           if (contentType && contentType.includes('application/json')) {
  //             try {
  //               const jsonData = await response.json();
                
  //               setUserRecipes(jsonData); // Set the user's recipes
  //             } catch (error) {
  //               console.error("Error parsing JSON:", error);
  //               // Handle the error appropriately
  //             }
  //           } else {
  //             console.error("Response is not JSON.");
  //             // Handle the error appropriately for non-JSON responses
  //             setUserRecipes([]); // Set userRecipes to an empty array in case of non-JSON response
              
  //           }
  //         } else {
  //           throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching recipes:", error);
  //         // Handle the error appropriately, e.g., set an error state or display a message
  //       })
  //       .finally(() => {
  //         setLoading(false); // Data loading is complete
  //       });
  //   }
  // }, [auth.token, auth.user]);

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
        <button onClick={handleAddRecipe}>Add recipe</button>
      </div>

      {/* Display the user's recipes or loading indicator */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Your Recipes</h3>
          <ul>
            {userRecipes.map((recipe) => (
              <li key={recipe._id}>{recipe.recipeName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserProfile;

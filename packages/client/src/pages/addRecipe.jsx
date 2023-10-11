import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProvideAuth } from "../contexts/AuthContext"; // Import your authentication context
import "../pages/addRecipe.css";
import useFileUploader from "../hooks/useFileUploader";
import api from "../utils/api.config";

const RecipeForm = () => {
   const[file,setFile] = useState();
   const [uploadedFilePath,setUploadedFilePath] = useState();
  const { auth } = useProvideAuth();
  const { uploadFile } = useFileUploader(); // Get authentication information from the context
  const [recipe, setRecipe] = useState({
    recipeName: "",
    imgUrl: "",
    ingredients: "",
    preparation: "",
    cookingTime: "",
    difficulty: "easy",
    author: auth.user, // Use the username from the authentication context
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleFileUpload = async(e) =>{
    e.preventDefault();
    const response = await uploadFile("/files/images", file, "file");
    setUploadedFilePath(response.data.path);
    setRecipe({...recipe,
    imgUrl: response.data.path});
  
  }
  const handleFileSelection =(e) =>{
  setFile(e.target.files[0]);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
    
      const { recipeName, imgUrl, ingredients, preparation, cookingTime, difficulty, author } = recipe;
        console.log({imgUrl})
        
        const newRecipe = {
        recipeName,
        imgUrl,
        ingredients,
        preparation,
        cookingTime,
        difficulty,
        author, // Include the author's username
       };
       console.log (newRecipe)

      const response = await api.post("/recipes", {
        // method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(newRecipe),
        newRecipe
      });

      if (response.status === 201) {
        console.log("Recipe added to the database");
        navigate(`/user/${auth.user}`);
      } else {
        const data = await response.json();
        console.error("Failed to add the recipe to the database:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="new-recipe">
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipeName">Recipe Name:</label>
        <input
          type="text"
          id="recipeName"
          name="recipeName"
          value={recipe.recipeName}
          onChange={handleChange}
          required
        />
        <br />
       {uploadedFilePath ? (<img className = "upload-preview" src={`${uploadedFilePath}`} alt = "Recipe Preview" /> ) :
(
  <div> 
        <label htmlFor="file"> Add Image </label>
        <input
          type="file"
          id="file"
          name="file"
          filename={file ? file.name: ""}
          onChange={handleFileSelection}
          required
        />
        <button type="button" onClick = {handleFileUpload} >Upload</button> 
        </div>
)}
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
        <br />
  
        <label htmlFor="preparation">Preparation Steps:</label>
        <textarea
          id="preparation"
          name="preparation"
          value={recipe.preparation}
          onChange={handleChange}
          rows="8"
          required
        ></textarea>
        <br />

        <label htmlFor="cookingTime">Cooking Time (minutes):</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={recipe.difficulty}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />

        <input type="submit" value="Create Recipe" />
      </form>
    </div>
  );
};

export default RecipeForm;

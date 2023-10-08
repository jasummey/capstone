import Recipe from "../models/recipes";
export async function createRecipe (req,res,next) {
    try {
    const {recipeName, imgUrl, ingredients, preparation, cookingTime, diffucilty, author} = req.body;
   const newRecipe = await Recipe.create({recipeName, imgUrl, ingredients, preparation, cookingTime, diffucilty, author});
   res.json(newRecipe);
   
} catch (error) {
        
        
    }
}

// import Recipe from '../models/Recipe'; // Import your Recipe model

// export async function createRecipe(req, res, next) {
//   try {
//     const {
//       recipeName,
//       imgUrl,
//       ingredients,
//       preparation,
//       cookingTime,
//       difficulty,
//       author,
//     } = req.body;

//     // Create a new recipe using your Recipe model
//     const newRecipe = await Recipe.create({
//       recipeName,
//       imgUrl,
//       ingredients,
//       preparation,
//       cookingTime,
//       difficulty, // Corrected spelling
//       author,
//     });

//     // Send a JSON response with the newly created recipe
//     res.status(201).json(newRecipe);
//   } catch (error) {
//     // Handle errors by sending an appropriate response or logging them
//     console.error("Error creating recipe:", error);
//     res.status(500).json({ error: "Internal Server Error" }); // Example error response
//   }
// }

import express from "express";
import User from "../models/Recipe.js";
import Recipe from "../models/Recipe.js";
import axios from 'axios';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Create a new recipe
 * @method POST /recipes/
 */
router.post("/",authMiddleware, async (req, res) => {
  console.log(req.body);
  const { title, ingredients, instructions, imageUrl, source } = req.body;
try{
    const newRecipe =  new Recipe({ 
        title, ingredients, instructions, imageUrl, source, user: req.user.id,
    });
    await newRecipe.save();
    console.log(newRecipe);

    return res.status(201).json(newRecipe);
  
}
  catch(error){
    console.log('adding error', error.message); 
    res.status(500).json({msg: 'error adding recipe to database...'});   
  }
  
});
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/**
 * Fetch random recipes from external API
 * @method GET /recipes/random
 */
router.get("/random", async (req, res) => {
  try {
    await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response)=>{
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        if (error.response) {                    
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          res.status(error.response.status).json(error.response.data);
        }});   

    
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/**
 * Fetch all recipes
 * @method GET /recipes/
 */
router.get("/", async (req, res) => {
    try {
      const recipes = await Recipe.find().populate('user','username');
      res.json(recipes);
      } catch (error) {
        console.log(error.message);
      res.status(500).json({ msg: 'error fetching recipes from database' });
    }
  });
  
  //////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /**
 * search recipes
 * @method GET /recipes/search
 */
router.get("/search", async (req, res) => {
    const {query} = req.query;
    try {
      const recipes = await Recipe.find({title: new RegExp(query, 'i')}).populate('user','username');
      if(!recipes){
        return res.status(404).json({msg:"Recipe not found"});
      }
      res.json(recipes);
      } catch (error) {
        console.log(error.message);
      res.status(500).json({ msg: 'error searching recipes in database' });
    }
  });
  
  //////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
   /**
 * fetch a specific recipe by id
 * @method GET /recipes/:id
 */
router.get("/:id", async (req, res) => {
    console.log(req.params);
    try {
      const recipe = await Recipe.findById(req.params.id).populate('user','username');
      if(!recipe){
        return res.status(404).json({msg:"Recipe not found"});
      }
      res.json(recipe);
      } catch (error) {
        console.log(error.message);
      res.status(500).json({ msg: 'error fetching recipe from database' });
    }
  });
  
  //////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

/**
 * Deletes recipe by the id
 * @method Delete /recipes/:id
 * @param id
 */
router.delete("/:id",authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.findByIdAndDelete(id);
    res.json({ msg: `Recipe with id: ${id} was deleted!` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'error deleting recipe' });
  }
});
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

/**
 * Updates recipe by the id
 * @method PUT /recipes/:id
 * @param id
 */
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, imageUrl, source } = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, ingredients, instructions, imageUrl, source },
      { new: true },
    );

    console.log(updatedRecipe);
    res.json(updatedRecipe);
  } catch (error) {
    console.log(error.message);
    res.json({ msg:  'error updating recipe'});
  }
});

export default router;
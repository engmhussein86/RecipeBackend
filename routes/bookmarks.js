import express from "express";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

/**
 * Create a new bookmark
 * @method POST /bookmarks/add

 */
router.post("/add",authMiddleware, async (req, res) => {
  console.log(req.body);
  const { username,email,password } = req.body;
try{
  // check if user exists
  const dbUser = await User.findById(req.user.id);
  const recipe = await Recipe.findById(req.body.recipeId);
  console.log(dbUser);

  if (!dbUser || !recipe) {    
    return res.status(404).json({msg: "User or Recipe not found"});
  } else {
    if(dbUser.bookmarks.includes(recipe.id)){
        return res.status(400).json({msg: "Recipe already bookmarked"});
    }

    dbUser.bookmarks.push(recipe.id);
    await dbUser.save();
    res.json(dbUser.bookmarks);
  }
}
  catch(error){
    console.log('add bookmarks error', error); 
    res.status(500).json({msg: 'error adding bookmark'});   
  }
  
});
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/**
 * Create a new bookmark
 * @method POST /bookmarks/remove
 */
router.post('/remove', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const recipe = await Recipe.findById(req.body.recipeId);
  
      if (!user || !recipe) {
        return res.status(404).json({ msg: 'User or Recipe not found' });
      }
  
      user.bookmarks = user.bookmarks.filter(
        (bookmark) => bookmark.toString() !== recipe.id
      );
  
      await user.save();
  
      res.json(user.bookmarks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('error removing bookmark');
    }
  });
  //////////////////////////////////////////////////////
  router.get('/', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('bookmarks');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user.bookmarks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('error fetching bookmarks');
    }
  });

export default router;
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      favorites: [{
        type: String, // Assuming we'll store recipe IDs as strings
      }],
    });

userSchema.index({username: 1});

export default new mongoose.model('User', userSchema);
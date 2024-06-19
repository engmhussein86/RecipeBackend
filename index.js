import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import usersRouter from './routes/users.js';
import recipesRouter from './routes/recipes.js';
import bookmarksRouter from './routes/bookmarks.js';

// env variables && connect to MongoDB
dotenv.config();
mongoose.connect(process.env.ATLAS_URI).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/bookmarks', bookmarksRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});



app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
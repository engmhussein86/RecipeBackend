
# Recipe Manager Backend

This is the backend part of the Recipe Manager application built with Node.js, Express, and MongoDB. It provides APIs for user authentication, recipe management, and bookmarking.

## Deployment link

- Frontend => https://recipes-ps.netlify.app/
- Backend => https://recipebackend-lx5k.onrender.com

## Features

- User Authentication (Register, Login)
- CRUD operations for recipes
- Bookmarking recipes
- Token-based authentication

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Cors
- Morgan
- jsonwebtoken
- bcryptjs

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/engmhussein86/RecipeBackend.git
    cd RecipeBackend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:

    ```env
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/recipe-manager # or your MONGODB_URI
    JWT_SECRET=your_jwt_secret
    ```

## Running the Application

1. Start the development server:

    ```sh
    npm run dev
    ```

2. The server will run on `http://localhost:4000`.

## API Endpoints

### Authentication

- `POST /register`: Register a new user
- `POST /login`: Login a user

### Recipes

- `GET /recipes`: Get all recipes
- `GET /recipes/:id`: Get a recipe by ID
- `GET /recipes/random`: Get random recipe (from external Api https://www.themealdb.com/api/json/v1/1/random.php)
- `GET /recipes/search`: Get recipe by search title
- `POST /recipes`: Create a new recipe
- `PUT /recipes/:id`: Update a recipe
- `DELETE /recipes/:id`: Delete a recipe

### Bookmarks

- `GET /bookmarks`: Get all bookmarked recipes
- `POST /bookmarks/add`: Add a recipe to bookmarks
- `POST /bookmarks/remove`: Remove a recipe from bookmarks

## Postman documentation

- https://documenter.getpostman.com/view/4681793/2sA3XSC2PB


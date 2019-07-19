'use strict';

const mongoose = require('mongoose');

const data = require('./data.js');
const Recipe = require('./models/Recipe.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

/* here the method related to the model, defines model's props'values == it creates one document in database */
const createOneRecipe = async () => {
  try {
    const response = await Recipe.create({
      title: 'Brocoli con patatas',
      level: 'UltraPro Chef',
      ingredients: ['brocoli', 'patatas', 'ajo', 'aceite', 'sal'],
      cuisine: 'veggie',
      dishType: 'Dish',
      duration: 30,
      creator: 'Anna'
    })
    console.log(response.title);
  }
  catch(error) {
    console.log(error);
  }
}

// insert list of recipes from data.js 
const addManyRecipes = async (data) => {
  try {
    const response = await Recipe.insertMany(data);
    response.forEach((recipe) => console.log(recipe.title))
  }
  catch(error) {
    console.log(error);
  }
}

// update recipe

const updateDurationRecipe = async (title, duration) => {
  try {
    const response = await Recipe.findOneAndUpdate({title}, {duration}, {new: true}); // 1st param= find, 2nd= value to update; new:true --> makes show the right result 
    console.log(response);
    console.log('Success!')
  }
  catch(error) {
    console.log(error);
  }
}

// delete recipe
const deleteOneRecipe = (title) => {
  try {
    const response = await Recipe.deleteOne({title})
    console.log(response);
    console.log('recipe deleted');
  }
  catch(error) {
    console.log(error);
  }
}

// empty collection to avoid unique keys error & automatize the manual deletion at start, useful for this case, not as rule
const emptyCollection = async() => {
  await Recipe.deleteMany();
  console.log('collection deleted')
}

// Run tasks awaiting response, if not, code will try to execute all methods without having data, or the previous method is finished
const doExercise = async () => {
  await emptyCollection();
  await createOneRecipe();
  await addManyRecipes(data);
  await updateDurationRecipe('Rigatoni alla Genovese', 100);
  await deleteOneRecipe('Carrot Cake');

  mongoose.connection.close();
}

doExercise();
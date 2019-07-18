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
/*
const updateRecipe = async (data) => {
  try {
    data = Recipe.title('Rigatoni alla Genovese');
    const newDuration = { duration: 100};
    Recipe.findOneAndUpdate(newDuration, {this.duration};
    console.log('Success!');
  }
  catch(error) {
    console.log(error);
  }
}
*/
// Recipe.findOneAndUpdate({duration: 220}, {$set: {duration: 100}});

createOneRecipe();
addManyRecipes(data);
//updateRecipe();

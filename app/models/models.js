//===Mongoose DB schema and models=========================
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

//=== Define the schema for recipes ==========================
	var schemaRecipe=new Schema({
		title: String,
		recipeID: String,
		ingredients: [String],
		servings: Number,
		steps: String,
		author: String,
		meal: String,
		desc: String,
		likes: Number
	});

//=== define the model for recipes =========================
module.exports={
	Recipe:mongoose.model('Recipe', schemaRecipe)
};
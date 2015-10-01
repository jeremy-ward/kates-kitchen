//===API for applicaiton===================================

//===Get required tools===============================
	var express=require('express');
	var api=express.Router();
	var model =require("../models/models");
//=== functions to adjust/verify data ======================
	function recipeIDMaker(recipe){
		return recipe.replace(/ +/g,"-").replace(/(?!-)\W/g,"").toLowerCase();
	}

	function properCase(str){
		return str.toLowerCase().replace(/\b(?!and|or|with)\w/g,function(letter){return letter.toUpperCase()}).replace(/ {2,}/g," ");
	}	

//===API=========================================

//=== Post new recipe to database ==================
	api.post("/add", function(req, res){
		var myRecipe= req.body;
		myRecipeID = recipeIDMaker(myRecipe.title)
		model.Recipe.find({'recipeID':myRecipeID},function(err,recipe1){
			if(!recipe1.length){
				model.Recipe.create({
					title: properCase(myRecipe.title),
					recipeID: myRecipeID,
					ingredients: myRecipe.ingredients,
					servings: myRecipe.servings,
					steps: myRecipe.steps,
					author: myRecipe.author || "Unknown",
					meal:myRecipe.meal,
					desc:myRecipe.desc || "",
					likes:0}, function(err, recipe){
					if(err){
						res.send(err);}
					res.send(recipe);
				})}
			else{
				res.send(false);
			}
		});
	});
	
	//=== Allow visitor to like a recipe ===================
	api.post("/likerecipe",function(req,res){
		var myRecipe = req.body;
		model.Recipe.findById(myRecipe.id, function(err,recipe){
			if(err)
				res.send(err);
			recipe.likes++;
			recipe.save(function(err){
				if(err)
					console.log(err);
				res.send(recipe.likes);
			});
		});
	});


module.exports=api;
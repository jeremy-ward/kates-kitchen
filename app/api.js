//===API for applicaiton===================================

//===Get required tools===============================
	var express=require('express');
	var api=express.Router();

//=== functions to adjust/verify data ======================
	function recipeIDMaker(recipe){
		return recipe.replace(/ +/g,"-").replace(/(?!-)\W/g,"").toLowerCase();
	}

	function properCase(str){
		return str.replace(/\b(?!and|or|with)\w/g,function(letter){return letter.toUpperCase()}).replace(/ {2,}/g," ");
	}	

//===API=========================================

//=== Post new recipe to database ==================
	api.post("/add", function(req, res){
		var myRecipe= req.body,
		myRecipeID = recipeIDMaker(myRecipe.name)
		Recipe.find({'recipeID':mrRecipeID},function(err,recipe1){
			if(!recipe1){
				Recipe.create({
					name: properCase(myRecipe.name),
					recipeId: mrRecipeID,
					ingredients: myRecipe.ingredients,
					servings: myRecipe.servings,
					steps: myRecipe.steps,
					author: myRecipe.author || "Unknown",
					meal:myRecipe.meal,
					desc:myRecipe.desc || "",
					likes:0}, function(err, recipe){
					if(err){
						res.send(err);}
					res.redirect("/"+recipe.recipeID);
				})}
			else{
				res.send(true);
			}
		});
	});
	
	//=== Allow visitor to like a recipe ===================
	api.post("/likerecipe",function(req,res){
		var myRecipe = req.body
		Recipe.findById(myRecipe.id, function(err,recipe){
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
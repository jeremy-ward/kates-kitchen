//===Routes for application=================================
var testObj={title: "Mac and Cheese",
	ingredients: ["1 Cup Cheese",
	"1 cup Mac"],servings: 1,
	steps: "Melt and mix baby!",
	author: "jeremy",meal: "Dinner",
	desc: "Yummy",
	likes: 200};
//=== get required tools =============================
	var express=require('express');
	var router = express.Router();
	var model = require("../models/models");

//===ROUTES======================================

//=== Home Route ===============================
	router.get('/',function(req, res){
		res.render('home');
	});

//=== Add Recipe Route ===========================
	router.get('/add-recipe', function(req, res){
		res.render("add-recipe");
	});

//=== Recipe Route ==============================
	router.get("/recipe/:id", function(req,res){
		model.Recipe.find({recipeID: req.params.id}, function(err,recipe){
			if(err)
				res.send(err);
			else if(recipe)
				res.render('recipe', recipe);
			else
				res.status(404).send("Not Found");  //this is crashing the app as headers cannot be set after send?
		});
		
	});

//=== test Route ==============================
	router.get("/test", function(req,res){
		res.render('recipe', testObj);
	});

module.exports=router;
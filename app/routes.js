//===Routes for application=================================
var testObj={title: "Mac and Cheese",
	ingredients: ["1 Cup Cheese",
	"1 cup Mac"],servings: 1,
	steps: "Melt and mix baby!",
	author: "jeremy",meal: "Dinner",
	desc: "Yummy",
	likes: 200};


module.exports=function(app, model){
//===ROUTES======================================

//=== Home Route ===============================
	app.get('/',function(req, res){
		res.render('home');
	});

//=== Add Recipe Route ===========================
//router.

//=== Recipe Route ==============================
	app.get("/recipe/:id", function(req,res){
		model.Recipe.find({recipeID: req.params.id}, function(err,recipe){
			if(err)
				res.send(err);
			res.render('recipe', recipe);
		});
		
	});

//=== test Route ==============================
	app.get("/test", function(req,res){
		res.render('recipe', testObj);
	});

}
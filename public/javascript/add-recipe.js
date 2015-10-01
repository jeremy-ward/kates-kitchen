//=== app to send recipe to server for recording ==========

//=== function to get list items into array ===============
function getIngredients(){
	var x = document.getElementsByClassName("ingr"),
		y=[];
	for(var i=0, z=x.length;i<z;i++){
		y.push(x[i].value);
	}
	return y;
}

//=== Define the application ======================
var app=angular.module('add-app',[]);
//=== Set up the controlller ======================
app.controller('main-controller', function($scope, $http){
	$scope.sameRecipe=false;
	$scope.sendRecipe=function(){
		console.log("Send a recipe");
		$scope.recipe.ingredients=getIngredients();
		console.log($scope.recipe.ingredients);
		$http.post("/api/add",$scope.recipe)
			.success(function(data){
				if(!data)
					$scope.sameRecipe=true;
				window.location.href="/recipe/"+data.recipeID;	
			});
	}
});
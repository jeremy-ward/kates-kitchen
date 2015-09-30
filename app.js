//===main application file =================================

//===get required tools===============================
	var express=require('express');
	var mongoose=require('mongoose');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var path = require('path');
	var fs = require('fs');

	var port = process.env.PORT||1234;
	var router=express.Router();
	var app = express();
	
	var models=require("./app/models/models");



//===configure the application==========================
	app.use(express.static(path.join(__dirname,"public")));
	app.use(morgan('dev'));
	//app.use(bodyParser.urlencoded({'extended:true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({type:'application/vnd.api+json'}));

	app.set('view engine', "ejs");

//=== include routes and api ===========================
	require("./app/routes.js")(app, models);
	
//===Connect to the data base===========================
mongoose.connect("mongodb://localhost/kate-kitchen");
	

//===Start app up===================================
	app.listen(port);
	console.log("Kate's Kitchen is up on port '"+port);
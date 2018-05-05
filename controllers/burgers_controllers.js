var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

// Redirect users to the /index route.
router.get("/", function(req, res) {
	res.redirect("/index");
});

// Get/Read/display a list of burgers
// Handlebars index file will handledevoured and undevoured burgers 
router.get("/index", function(req, res) {
	burger.viewAll(function(err,data) {
		if(err){
			return res.status(500).end();
		}
		res.render("index", {burgers: data});
	});
});

// Post/Create/Add a new burger
router.post("/api/new", function(req, res) {
	burger.addBurger({burger_name: req.body.burger_name, devoured: false}, function(err, result) {
		if (err) {
			console.log('Error occurred while adding burger:' + req.body.burger_name);
			console.error(err);
			return res.status(500).end();
		} else if (result.affectedRows === 0){
			console.log('Burger ' + req.body.burger_name + ' was not added.');
			return res.status(404).end();
		}
		console.log('Successfully added burger: ' + req.body.burger_name);
		res.redirect(200, "/index");
	});
});

// Put/Update/Eat a single burger
router.put("/api/eat/:id", function(req, res) {
	burger.eatBurger(req.params.id, function(err, result) {
		if (err) {
			console.log('Error occurred while eating burger:' + req.params.id);
			return res.status(500).end();
		} else if (result.changedRows === 0){
			console.log('You were not able to eat the burger: ' + req.params.id);
			return res.status(404).end();
		}
		console.log('Successfully eaten burger:' + req.params.id);
		res.redirect(200, "/index");
	});
});

module.exports = router;
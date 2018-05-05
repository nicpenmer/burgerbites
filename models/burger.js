// Handle click event when a burger has been devoured
$(".eatBurger").on('click', function(event) {
	event.preventDefault();

	var id = $(this).data("burgerid");
	console.log('burgerid: ' + id);

	$.ajax("/api/eat/" + id, {
		type: "PUT"
	}).then(function() {
		location.reload();
	});
});

// Handle form submit event when a burger has been created
$(".add-burger").on('submit', function(event) {
	event.preventDefault();

	var newBurger = {
		burger_name: $("#burgerName").val().trim(),
		devoured: false
	};

	$.post("/api/new", newBurger)
		.then(function() {
			location.reload();
		});
});
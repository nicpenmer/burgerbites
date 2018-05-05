var conn = require("../config/connection");

// Setup ORM to Read, Create, and Update the database
var orm = {
	selectAll: function(db_table, cb) {
		conn.query('SELECT * FROM ' + db_table + ';', cb);
	},
	insertOne: function(db_table, userInput, cb) {
		conn.query('INSERT INTO burgers SET ?', userInput, cb);
	},
	updateOne: function(db_table, userInput, cb) {
		conn.query('UPDATE burgers SET ? WHERE ?', userInput, cb);
	}
};

module.exports = orm;
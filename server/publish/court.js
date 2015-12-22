Meteor.publish("court_list", function() {
	return Courts.find({});
});

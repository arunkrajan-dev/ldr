Meteor.publish("represent_list", function() {
	return Represent.find({});
});

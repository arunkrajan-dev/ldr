Meteor.publish("relationship_list", function() {
	return Relationship.find({});
});

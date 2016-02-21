Meteor.publish("groups_list", function() {
	return Groups.find({});
});

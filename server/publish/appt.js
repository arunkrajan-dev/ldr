Meteor.publish("appt_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Appt.find({});
	}
	return Appt.find({ownerId:this.userId});
});
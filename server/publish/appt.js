Meteor.publish("appt_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Appt.find({});
	}
	return Appt.find({ownerId:this.userId});
});

Meteor.publish("appt_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Appt.find({_id:null}, {});
	}
	return Appt.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("appt", function(apptId) {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Appt.find({_id:apptId}, {});
	}
	return Appt.find({_id:apptId,ownerId:this.userId}, {});
});
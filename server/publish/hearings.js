Meteor.publish("hearings", function(caseId) {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Hearings.find({caseId:caseId}, {});
	}
	return Hearings.find({caseId:caseId,ownerId:this.userId}, {});
});

Meteor.publish("hearings_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Hearings.find({_id:"null"}, {});
	}
	return Hearings.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("hearing", function(hearingId) {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Hearings.find({_id:hearingId}, {});
	}
	return Hearings.find({_id:hearingId,ownerId:this.userId}, {});
});


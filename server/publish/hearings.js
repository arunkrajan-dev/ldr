Meteor.publish("hearings", function(caseId) {
	return Hearings.find({caseId:caseId,ownerId:this.userId}, {});
});

Meteor.publish("hearings_empty", function() {
	return Hearings.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("hearing", function(hearingId) {
	return Hearings.find({_id:hearingId,ownerId:this.userId}, {});
});


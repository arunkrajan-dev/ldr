Meteor.publish("caseprofile_list", function() {
	return Caseprofile.find({ownerId:this.userId}, {sort:[["caseId","desc"]]});
});

Meteor.publish("caseprofile_empty", function() {
	return Caseprofile.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("caseprofile_details", function(caseId) {
	return Caseprofile.find({_id:caseId,ownerId:this.userId}, {});
});


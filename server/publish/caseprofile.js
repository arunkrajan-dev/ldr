Meteor.publish("caseprofile_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Caseprofile.find({}, {sort:[["caseId","desc"]]});
	}
	return Caseprofile.find({ownerId:this.userId}, {sort:[["caseId","desc"]]});
});

Meteor.publish("caseprofile_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Caseprofile.find({_id:null}, {});
	}
	return Caseprofile.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("caseprofile_details", function(caseId) {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Caseprofile.find({_id:caseId}, {});
	}
	return Caseprofile.find({_id:caseId,ownerId:this.userId}, {});
});


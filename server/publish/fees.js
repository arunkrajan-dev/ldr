Meteor.publish("fees_list", function(caseId) {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Fees.find({}, {});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Fees.find({ownerId: user.seniorId}, {});
	}
	return Fees.find({ownerId:this.userId}, {});
});

Meteor.publish("fees", function(caseId) {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Fees.find({caseId:caseId}, {});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Fees.find({caseId:caseId,ownerId:user.seniorId}, {});
	}
	return Fees.find({caseId:caseId,ownerId:this.userId}, {});
});

Meteor.publish("fees_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Fees.find({_id:"null"}, {});
	}
	return Fees.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("fee", function(feeId) {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Fees.find({_id:feeId}, {});
	}
	return Fees.find({_id:feeId,ownerId:this.userId}, {});
});


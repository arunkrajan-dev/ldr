Meteor.publish("hearings_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Hearings.find({}, {});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Hearings.find({ownerId: user.seniorId}, {});
	}
	return Hearings.find({ownerId:this.userId}, {});
});

Meteor.publish("hearings", function(caseId) {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Hearings.find({caseId:caseId}, {});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Hearings.find({caseId:caseId,ownerId:user.seniorId}, {});
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

Meteor.publish("hearings_today_list", function(caseId) {
	var start = moment().startOf('day').toISOString(); // set to 12:00 am today
	var end = moment().endOf('day').toISOString(); // set to 23:59 pm today
	
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Hearings.find({nextDate:{$gte: new Date(start), $lte: new Date(end)}}, {});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Hearings.find({ownerId: user.seniorId, nextDate:{$gte: new Date(start), $lte: new Date(end)}}, {});
	}
	return Hearings.find({ownerId:this.userId, nextDate:{$gte: new Date(start), $lte: new Date(end)}}, {});
});

Meteor.publish("hearings_print", function(caseId) {
	var start = moment().startOf('day').toISOString(); // set to 12:00 am today
	var end = moment().endOf('day').toISOString(); // set to 23:59 pm today
	
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Hearings.find({nextDate:{$gte: new Date(start)}, caseId:caseId}, {});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Hearings.find({ownerId: user.seniorId, nextDate:{$gte: new Date(start)}, caseId:caseId}, {});
	}
	return Hearings.find({ownerId:this.userId, nextDate:{$gte: new Date(start)}, caseId:caseId}, {});
});
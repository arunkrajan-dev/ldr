// Meteor.publish("caseprofile_list", function() {
// 	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
// 		return Caseprofile.find({"archived":{"$exists": false}}, {sort:[["caseId","desc"]]});
// 	}
// 	if(Users.isInRoles(this.userId, ["junior"])) {
// 		var user = Meteor.users.findOne(this.userId);
// 		return Caseprofile.find({ownerId: user.seniorId, "archived":{"$exists": false}}, {sort:[["caseId","desc"]]});
// 	}
// 	return Caseprofile.find({ownerId:this.userId, "archived":{"$exists": false}}, {sort:[["caseId","desc"]]});
// });

// Meteor.publish("caseprofileA_list", function() {
// 	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
// 		return Caseprofile.find({"archived":"archived"}, {sort:[["caseId","desc"]]});
// 	}
// 	if(Users.isInRoles(this.userId, ["junior"])) {
// 		var user = Meteor.users.findOne(this.userId);
// 		return Caseprofile.find({ownerId: user.seniorId, "archived":{"$exists": false}}, {sort:[["caseId","desc"]]});
// 	}
// 	return Caseprofile.find({ownerId:this.userId, "archived":"archived"}, {sort:[["caseId","desc"]]});
// });

Meteor.publish("caseprofile_list_date", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Caseprofile.find({"archived":{"$exists": false}}, {fields: {_id:1, caseId:1, filingDate:1}});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Caseprofile.find({ownerId: user.seniorId, "archived":{"$exists": false}}, {_id:1, caseId:1, filingDate:1});
	}
	return Caseprofile.find({ownerId:this.userId, "archived":{"$exists": false}}, {_id:1, caseId:1, filingDate:1});
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
	if(Users.isInRoles(this.userId, ["junior"])) {
		return Caseprofile.find({_id:caseId,ownerId:this.seniorId}, {});
	}
	return Caseprofile.find({_id:caseId,ownerId:this.userId}, {});
});

Meteor.publish("caseprofile_home_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Caseprofile.find({"archived":{"$exists": false}}, {fields: {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1}});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Caseprofile.find({ownerId: user.seniorId, "archived":{"$exists": false}}, {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1});
	}
	return Caseprofile.find({ownerId:this.userId, "archived":{"$exists": false}}, {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1});
});

Meteor.publish("caseprofile_mini_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Caseprofile.find({"archived":{"$exists": false}}, {fields: {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1}});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Caseprofile.find({ownerId: user.seniorId, "archived":{"$exists": false}}, {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1});
	}
	return Caseprofile.find({ownerId:this.userId, "archived":{"$exists": false}}, {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1});
});

Meteor.publish("caseprofile_mini_listA", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Caseprofile.find({"archived":"archived"}, {fields: {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1}});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Caseprofile.find({ownerId: user.seniorId, "archived":"archived"}, {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1});
	}
	return Caseprofile.find({ownerId:this.userId, "archived":"archived"}, {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1});
});

Meteor.publish("caseprofile_limitation", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer"])) {
		return Caseprofile.find({"limitationDate":{$ne:null}, "filingDate": null}, {fields: {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1, limitationDate:1, judgementDate:1, limitation:1}});
	}
	if(Users.isInRoles(this.userId, ["junior"])) {
		var user = Meteor.users.findOne(this.userId);
		return Caseprofile.find({ownerId: user.seniorId, "limitationDate":{$ne:null}, "filingDate": null}, {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1, limitationDate:1, judgementDate:1, limitation:1});
	}
	return Caseprofile.find({ownerId:this.userId, "limitationDate":{$ne:null}, "filingDate": null}, {_id:1, caseId:1, caseNumber:1, nextHearingDate:1, modifiedAt:1, court:1, limitationDate:1, judgementDate:1, limitation:1});
});
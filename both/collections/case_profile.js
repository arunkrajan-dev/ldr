this.CaseProfile = new Mongo.Collection("case_profile");

this.CaseProfile.userCanInsert = function(userId, doc) {
	return true;
}

this.CaseProfile.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CaseProfile.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

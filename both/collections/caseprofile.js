this.Caseprofile = new Mongo.Collection("caseprofile");

this.Caseprofile.userCanInsert = function(userId, doc) {
	return true;
}

this.Caseprofile.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Caseprofile.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

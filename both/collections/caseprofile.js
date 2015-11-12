this.Caseprofile = new Mongo.Collection("caseprofile");

this.Caseprofile.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
}

this.Caseprofile.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

this.Caseprofile.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

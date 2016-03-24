this.Hearings = new Mongo.Collection("hearings");

this.Hearings.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user", "junior"]);
}

this.Hearings.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

this.Hearings.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

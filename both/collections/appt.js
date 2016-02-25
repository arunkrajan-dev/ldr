this.Appt = new Mongo.Collection("appt");

this.Appt.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
}

this.Appt.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

this.Appt.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

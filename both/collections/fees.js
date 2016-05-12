this.Fees = new Mongo.Collection("fees");

this.Fees.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
}

this.Fees.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

this.Fees.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

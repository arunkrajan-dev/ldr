this.Tasks = new Mongo.Collection("tasks");

this.Tasks.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
}

this.Tasks.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

this.Tasks.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
}

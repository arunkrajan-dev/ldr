this.Hearings = new Mongo.Collection("hearings");

this.Hearings.userCanInsert = function(userId, doc) {
	return true;
}

this.Hearings.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Hearings.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

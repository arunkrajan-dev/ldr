this.Users.userCanRemove = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
}
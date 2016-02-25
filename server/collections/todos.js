Tasks.allow({
	insert: function (userId, doc) {
		return Tasks.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Tasks.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Tasks.userCanRemove(userId, doc);
	}
});

Tasks.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	if(!doc.ownerId) doc.ownerId = userId;
});

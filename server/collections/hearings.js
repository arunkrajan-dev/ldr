Hearings.allow({
	insert: function (userId, doc) {
		return Hearings.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Hearings.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Hearings.userCanRemove(userId, doc);
	}
});

Hearings.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Hearings.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Hearings.before.remove(function(userId, doc) {
	
});

Hearings.after.insert(function(userId, doc) {
	
});

Hearings.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Hearings.after.remove(function(userId, doc) {
	
});

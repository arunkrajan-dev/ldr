Logs.allow({
	insert: function (userId, doc) {
		return Logs.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Logs.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Logs.userCanRemove(userId, doc);
	}
});

Logs.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;
	doc.calendarId = Random.hexString(25);

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Logs.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;
});




 
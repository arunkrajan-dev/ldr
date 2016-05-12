Fees.allow({
	insert: function (userId, doc) {
		return Fees.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Fees.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Fees.userCanRemove(userId, doc);
	}
});

Fees.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;
});

Fees.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;
});

Fees.before.remove(function(userId, doc) {
	
});

Fees.after.insert(function(userId, doc) {});

Fees.after.update(function(userId, doc, fieldNames, modifier, options) {});

Fees.after.remove(function(userId, doc) {});

Caseprofile.allow({
	insert: function (userId, doc) {
		return Caseprofile.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Caseprofile.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Caseprofile.userCanRemove(userId, doc);
	}
});

Caseprofile.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
if(!doc.totalAmount) doc.totalAmount = 0;
});

Caseprofile.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Caseprofile.before.remove(function(userId, doc) {
	
});

Caseprofile.after.insert(function(userId, doc) {
	
});

Caseprofile.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Caseprofile.after.remove(function(userId, doc) {
	
});

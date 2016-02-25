Appt.allow({
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

Appt.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;
	doc.calendarId = Random.hexString(25);
	if(!doc.ownerId) doc.ownerId = userId;
});

Appt.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;
});

Appt.before.remove(function(userId, doc) {
	
});

Appt.after.insert(function(userId, doc) {
	console.log("[INFO] After insert Appointment: " + JSON.stringify(doc, null, 4));
	if(insertCalEvent(doc.calendarId, doc.description + " | appt", " ", doc.location, doc.apptDate))
        console.log("[INFO] Appointment Added to google calendar");
});

Appt.after.update(function(userId, doc, fieldNames, modifier, options) {
    // console.log("After update case profile: " + JSON.stringify(doc, null, 4));
    // if(updateCalEvent(doc.calendarId, doc.caseId + " | Filing", "Client: " + doc.clientName, doc.court, doc.filingDate))
    //     console.log("Event updated in google calendar");
});

Appt.after.remove(function(userId, doc) {
	console.log("[INFO] After remove Appointment: " + JSON.stringify(doc, null, 4));
	if(removeCalEvent(doc.calendarId))
        console.log("[INFO] Appointment removed from google calendar");
});

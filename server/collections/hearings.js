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
	doc.calendarId = Random.hexString(25);

	
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
	//Add next Hearing Date
	//if(doc.nextDate.valueOf() >= doc.createdAt.valueOf()) {
		Caseprofile.update({ _id: doc.caseId }, { $set: {"nextHearingDate": doc.nextDate}});
	//	console.log("next hearing date is updated");
	//} else {
	//	console.log("Nope, not greater date" + doc.nextDate);
	//}
	
	//console.log("After insert Hearing: " + JSON.stringify(doc, null, 4));
	var cs = Caseprofile.findOne({_id:doc.caseId}, {});
	
	console.log("Case Detail: " + JSON.stringify(cs, null, 4));
	
	if(insertCalEvent(doc.calendarId, cs.caseId + " | Hearing", "Client: " + cs.clientName + "Previous Bussiness Notes:" + doc.description + "Purpose: " + doc.purpose, cs.court, doc.nextDate))
        console.log("Event Added to google calendar");
});

Hearings.after.update(function(userId, doc, fieldNames, modifier, options) {
	
	//if(doc.nextDate.valueOf() >= doc.createdAt.valueOf()) {
		//Caseprofile.update({ _id: doc.caseId }, { $set: {"nextHearingDate": doc.nextDate}});
	//	console.log("next hearing date is updated");
	//} else {
	//	console.log("Nope, not greater date" + doc.nextDate);
	//}
	
	//console.log("After update Hearing: " + JSON.stringify(doc, null, 4));
	var cs = Caseprofile.findOne({_id:doc.caseId}, {});
	console.log("Case Detail: " + JSON.stringify(cs, null, 4));
	
	if(updateCalEvent(doc.calendarId, cs.caseId + " | Hearing", "Client: " + cs.clientName + "Previous Bussiness Notes:" + doc.description + "Purpose: " + doc.purpose, cs.court, doc.nextDate))
        console.log("Event Added to google calendar");
});

Hearings.after.remove(function(userId, doc) {
	//console.log("After remove Hearing: " + JSON.stringify(doc, null, 4));
	Caseprofile.update({ _id: doc.caseId }, { $set: {"nextHearingDate": doc.businessDate}});
	if(removeCalEvent(doc.calendarId))
        console.log("Event removed from google calendar");
});

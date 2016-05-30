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

	if(Users.isInRoles(userId, ["junior"])) {
		var cs = Caseprofile.findOne({_id:doc.caseId}, {});
		doc.approvalMsg = cs.caseId + " by " + Meteor.user().username + "(" + Meteor.user().profile.name + ")";
		doc.approved = "no";
		doc.ownerId = Meteor.user().seniorId;
	} else {
		doc.approved = "yes";
		doc.ownerId = userId;
	}
	//if(!doc.ownerId) doc.ownerId = userId;
	console.log("[INFO] Document owner Id ", doc.ownerId);
});

Hearings.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;
});

Hearings.before.remove(function(userId, doc) {
	
});

Hearings.after.insert(function(userId, doc) {
	if(doc.nextDate.valueOf() > moment().valueOf()) {
		Caseprofile.update({ _id: doc.caseId }, { $set: {"nextHearingDate": doc.nextDate}});
	}
	if(Users.isInRoles(userId, ["junior"])) {

		// No functionality as of now
	} else {
		
		//Add the event to google calendar
		var cs = Caseprofile.findOne({_id:doc.caseId}, {});
		doc.calendarId = Random.hexString(25);
		if(insertCalEvent(doc.calendarId, cs.caseId + "(" + cs.caseNumber+ ")" + " | Hearing", "Client: " + cs.clientName + "Previous Bussiness Notes:" + doc.description + "Purpose: " + doc.purpose, cs.court, doc.nextDate))
	    	console.log("[INFO] Event inserted to Google Calendar");
	
		//update the calendarId to case profile
		Caseprofile.update({ _id: doc.caseId }, { $set: {"calendarId": doc.calendarId}});
	}
});

Hearings.after.update(function(userId, doc, fieldNames, modifier, options) {
	if(Users.isInRoles(userId, ["junior"])) {
		Caseprofile.update({ _id: doc.caseId }, { $set: {"nextHearingDate": doc.nextDate}});
		// No functionality as of now
	} else {	
		
		//Set next hearing date
		var cs = Caseprofile.findOne({_id:doc.caseId}, {});
		if(cs.nextHearingDate) {
			if(doc.nextDate.valueOf() > cs.nextHearingDate.valueOf()) {
				Caseprofile.update({ _id: doc.caseId }, { $set: {"nextHearingDate": doc.nextDate}});
			}
		} else {
			Caseprofile.update({ _id: doc.caseId }, { $set: {"nextHearingDate": doc.nextDate}});
		}
		
		//google calendar event
		if(doc.calendarId) {
			
			//update google calendar event
			if(updateCalEvent(doc.calendarId, cs.caseId + "(" + cs.caseNumber+ ")" + " | Hearing", "Client: " + cs.clientName + "Previous Bussiness Notes:" + doc.description + "Purpose: " + doc.purpose, cs.court, doc.nextDate))
		        console.log("[INFO] Event updated to google calendar");
		} else {
			
			//Create new google calendar event
			doc.calendarId = Random.hexString(25);
			if(insertCalEvent(doc.calendarId, cs.caseId + "(" + cs.caseNumber+ ")" + " | Hearing", "Client: " + cs.clientName + "Previous Bussiness Notes:" + doc.description + "Purpose: " + doc.purpose, cs.court, doc.nextDate))
		    	console.log("[INFO] Event inserted to Google Calendar");			
			
			//update the calendarId to case profile
			Caseprofile.update({ _id: doc.caseId }, { $set: {"calendarId": doc.calendarId}});
		}
	}
});

Hearings.after.remove(function(userId, doc) {
	
	//todo get only last hearing date
	var cs = Caseprofile.findOne({_id:doc.caseId}, {});	
	
	//modify only if the delete affects last hearing date
	if(doc.nextDate.getTime() == cs.nextHearingDate.getTime()) {
		Caseprofile.update({ _id: doc.caseId }, { $set: {"nextHearingDate": doc.businessDate}});
	}
	
	//Remove google calendar event
	if(doc.calendarId) {
		if(removeCalEvent(doc.calendarId))
	        console.log("[INFO] Event removed from google calendar");
	}
});

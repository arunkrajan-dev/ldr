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
	doc.calendarId = Random.hexString(25);

	
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
	if(!Courts.find({name: doc.court}).count()) {
        Courts.insert({name: doc.court});
        console.log("New court name added: " + doc.court);
    }
    
    if(!Represent.find({type: doc.representing}).count()) {
        Represent.insert({type: doc.representing});
    }
    
    if(!Relationship.find({type: doc.relationship}).count()) {
        Relationship.insert({type: doc.relationship});
    }
	console.log("After insert case profile: " + JSON.stringify(doc, null, 4));
	if(insertCalEvent(doc.calendarId, doc.caseId + "(" + doc.caseNumber + ")" +  " | Filing", "Client: " + doc.clientName, doc.court, doc.filingDate))
        console.log("Event Added to google calendar");
});

Caseprofile.after.update(function(userId, doc, fieldNames, modifier, options) {
	if(!Courts.find({name: doc.court}).count()) {
        Courts.insert({name: doc.court});
        console.log("New court name added: " + doc.court);
    }
    
    if(!Represent.find({type: doc.representing}).count()) {
        Represent.insert({type: doc.representing});
    }
    
    if(!Relationship.find({type: doc.relationship}).count()) {
        Relationship.insert({type: doc.relationship});
    }
    // console.log("After update case profile: " + JSON.stringify(doc, null, 4));
    // if(updateCalEvent(doc.calendarId, doc.caseId + " | Filing", "Client: " + doc.clientName, doc.court, doc.filingDate))
    //     console.log("Event updated in google calendar");
});

Caseprofile.after.remove(function(userId, doc) {
	//console.log("After remove case profile: " + JSON.stringify(doc, null, 4));
	if(removeCalEvent(doc.calendarId))
        console.log("Event removed from google calendar");
});

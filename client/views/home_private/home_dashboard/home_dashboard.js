Template.HomeDashboard.helpers({
	"noCaseNumber": function() {
		return Caseprofile.find({caseNumber: ""}).count();
	},
	"noNextHearing": function() {
		return Caseprofile.find({nextHearingDate: null}).count();
	}, 
	"fyaCount": function() {
		return Caseprofile.find({ nextHearingDate:{ $lte:new Date()} }, {}).count();	
	},
	"total": function() {
		return Caseprofile.find({}).count();
	}
});
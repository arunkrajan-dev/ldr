this.CaseprofileDetailsHearingsController = RouteController.extend({
	template: "CaseprofileDetails",
	

	yieldTemplates: {
		'CaseprofileDetailsHearings': { to: 'CaseprofileDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("CaseprofileDetails"); this.render("loading", { to: "CaseprofileDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("hearings", this.params.caseId),
			Meteor.subscribe("caseprofile_details", this.params.caseId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			hearings: Hearings.find({caseId:this.params.caseId}, {sort:[["lastDate","desc"]]}),
			caseprofile_details: Caseprofile.findOne({_id:this.params.caseId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
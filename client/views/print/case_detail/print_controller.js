this.CaseprofileDetailsPrintController = RouteController.extend({
	template: "CaseprofileDetailsPrint",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("caseprofile_details", this.params.caseId),
			Meteor.subscribe("hearings_print", this.params.caseId)
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
			caseprofile_details: Caseprofile.findOne({_id:this.params.caseId}, {}),
			hearings_details: Hearings.find({caseId:this.params.caseId}, {}).fetch()
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
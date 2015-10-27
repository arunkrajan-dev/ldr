this.CaseprofileDetailsController = RouteController.extend({
	template: "CaseprofileDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('caseprofile.details.hearings', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
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
			caseprofile_details: Caseprofile.findOne({_id:this.params.caseId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
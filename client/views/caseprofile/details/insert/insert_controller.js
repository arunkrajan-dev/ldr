this.CaseprofileDetailsInsertController = RouteController.extend({
	template: "CaseprofileDetails",
	

	yieldTemplates: {
		'CaseprofileDetailsInsert': { to: 'CaseprofileDetailsSubcontent'}
		
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
			Meteor.subscribe("hearings_empty"),
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
			hearings_empty: Hearings.findOne({_id:null}, {}),
			caseprofile_details: Caseprofile.findOne({_id:this.params.caseId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
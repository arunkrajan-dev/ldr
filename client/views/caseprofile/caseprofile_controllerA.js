this.CaseprofileControllerA = RouteController.extend({
	template: "Caseprofile",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		//this.redirect('fya.detailsInsert');
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("caseprofileA_list"),
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
			caseprofile_list: Caseprofile.find({"archived":"archived"}, {sort:[["caseId","desc"]]}),
			archived: 'yes'
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
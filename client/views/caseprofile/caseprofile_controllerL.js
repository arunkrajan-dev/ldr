this.CaseprofileControllerL = RouteController.extend({
	template: "CaseprofileL",
	

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
			Meteor.subscribe("caseprofile_limitation")
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
			caseprofile_list: Caseprofile.find({}, {sort:[["caseId","desc"]]}),
			limitaion: 'yes'
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
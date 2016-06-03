this.CaseprofileController = RouteController.extend({
	template: "Caseprofile",
	

	yieldTemplates: {
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render();} else { this.render("loading"); }
		//this.redirect('fya.detailsInsert');
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("caseprofile_mini_list"),
			Meteor.subscribe("court_list"),
			Meteor.subscribe("appt_list")
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
			caseprofile_list: Caseprofile.find({}, {sort:[["modifiedAt","desc"]]}),
			fya_list: Caseprofile.find({ nextHearingDate:{ $lte:new Date()} }, {}),
			today_list: Caseprofile.find({ nextHearingDate:{ $gte:new Date()} }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
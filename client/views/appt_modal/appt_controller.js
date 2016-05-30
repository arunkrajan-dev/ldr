this.ApptController = RouteController.extend({
	template: "Caseprofile",
	

	yieldTemplates: {
		'apptModal': { to: 'Appointment'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		//if(this.isReady()) {this.render("apptModal", { to: "Appointment" }); } else { this.render("loading"); }
		if(this.isReady()) { this.render(); } else { this.render("Caseprofile"); this.render("loading", { to: "Appointment" });}
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
			caseprofile_list: Caseprofile.find({}, {sort:[["caseId","desc"]]}),
			fya_list: Caseprofile.find({ nextHearingDate:{ $lte:new Date()} }, {})			
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
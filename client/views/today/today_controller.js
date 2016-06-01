this.PrintTodayController = RouteController.extend({
	template: "Print_Today_List",
	

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
			Meteor.subscribe("caseprofile_today_list"),
			Meteor.subscribe("hearings_today_list")
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
			today_list: Caseprofile.find({}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
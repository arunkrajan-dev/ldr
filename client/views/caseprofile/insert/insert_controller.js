this.CaseprofileInsertController = RouteController.extend({
	template: "CaseprofileInsert",
	

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
			Meteor.subscribe("caseprofile_empty"),
			Meteor.subscribe("caseprofile_list"),
			Meteor.subscribe("court_list"),
			Meteor.subscribe("represent_list"),
			Meteor.subscribe("relationship_list")
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
			caseprofile_empty: Caseprofile.findOne({_id:null}, {}),
			caseprofile_list: Caseprofile.find({}, {sort:[["caseId","desc"]]})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
Template.caseLog.helpers({
    "caseLogs": function() {
    	Meteor.subscribe("logs", this.params.caseId);
    	return Logs.find({}).fetch();
    }
});

Template.caseLog.events({
	"submit": function(e, t) {
		e.preventDefault();

		var self = this;

		function submitAction(msg) {
			var fyaHearingInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(fyaHearingInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
					}; break;
				}
				Session.set('lastUpdated', new Date());
			}
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			alert (msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
			    values.caseId = self.params.caseId;
			    console.log("Before Insert Id Val returned from caseId Session: " + values.caseId);
				newId = Logs.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	}, 
	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Logs.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	}	
});
var pageSession = new ReactiveDict();

Template.apptModal.helpers({
    "getApptDetail":function(){
        return Appt.find({}, {sort:[["apptDate","desc"]]}).fetch();
    },
    "infoMessage": function() {
		return pageSession.get("apptInsertFormInfoMessage");
	}
});
Template.apptModal.rendered = function() {
	Meteor.subscribe("appt_list");
	pageSession.set("apptInsertFormInfoMessage", "");
}

Template.apptModal.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("apptInsertFormInfoMessage", "");
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
						pageSession.set("apptInsertFormInfoMessage", "");
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
				newId = Appt.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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
						Appt.remove({ _id: me._id });
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
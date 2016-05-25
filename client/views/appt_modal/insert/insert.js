var pageSession = new ReactiveDict();

Template.ApptInsertForm.rendered = function() {
	
	Meteor.typeahead.inject();
	pageSession.set("apptInsertInsertFormInfoMessage", "");
	pageSession.set("apptInsertInsertFormErrorMessage", "");
	
	initDateTimePickers();

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.ApptInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("apptInsertInsertFormInfoMessage", "");
		pageSession.set("apptInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var apptInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(apptInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("apptInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			//window.open(Router.url("caseprofile.details", { caseId: newId}), 'GoogleWindow', 'resizable=0, menubar=0, locationbar=0, width=1200, height=900');
			// Router.go("caseprofile#appoitment");
			bootbox.hideAll();
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("apptInsertInsertFormErrorMessage", message);
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
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}
});

Template.ApptInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("apptInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("apptInsertInsertFormErrorMessage");
	}
});

var initDateTimePickers = function() {
	$(".input-group.date").each(function() {
		$(this).find("input[type='text']").datetimepicker({
			format: 'DD/MM/YYYY',
			});
	});
};
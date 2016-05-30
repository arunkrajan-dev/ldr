var pageSession = new ReactiveDict();


Template.ApptEditForm.rendered = function() {
	
	debugger;
	pageSession.set("apptEditFormInfoMessage", "");
	pageSession.set("apptEditFormErrorMessage", "");
	
	initDateTimePickers();
	// $(".input-group.date").each(function() {
	// 	$(this).find("input[type='text']").datetimepicker({
	// 		format: 'DD/MM/YYYY',
	// 		});
	// });
	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.ApptEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("apptEditFormInfoMessage", "");
		pageSession.set("apptEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var apptEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(apptEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("apptEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("appt", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("apptEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Appt.update({ _id: t.data.appointment._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("appt", {});
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

Template.ApptEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("apptEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("apptEditFormErrorMessage");
	}
	
});

var initDateTimePickers = function() {
	$(".input-group.date").each(function() {
		$(this).find("input[type='text']").datetimepicker({
			format: 'DD/MM/YYYY',
			});
	});
};
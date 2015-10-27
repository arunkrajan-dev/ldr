var pageSession = new ReactiveDict();

Template.CaseprofileDetails.rendered = function() {
	
};

Template.CaseprofileDetails.events({
	
});

Template.CaseprofileDetails.helpers({
	
});

Template.CaseprofileDetailsDetailsForm.rendered = function() {
	

	pageSession.set("caseprofileDetailsDetailsFormInfoMessage", "");
	pageSession.set("caseprofileDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.CaseprofileDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("caseprofileDetailsDetailsFormInfoMessage", "");
		pageSession.set("caseprofileDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var caseprofileDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(caseprofileDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("caseprofileDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("caseprofileDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("caseprofile", {});
	}

	
});

Template.CaseprofileDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("caseprofileDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caseprofileDetailsDetailsFormErrorMessage");
	}
	
});

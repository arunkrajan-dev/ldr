var pageSession = new ReactiveDict();

Template.CaseprofileEdit.rendered = function() {
	
};

Template.CaseprofileEdit.events({
	
});

Template.CaseprofileEdit.helpers({
	
});

Template.CaseprofileEditEditForm.rendered = function() {
	

	pageSession.set("caseprofileEditEditFormInfoMessage", "");
	pageSession.set("caseprofileEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		$(this).find("input[type='text']").datetimepicker({
			format: 'DD/MM/YYYY h:mm a',
			sideBySide: true
			});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.CaseprofileEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("caseprofileEditEditFormInfoMessage", "");
		pageSession.set("caseprofileEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var caseprofileEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(caseprofileEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("caseprofileEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("caseprofile", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("caseprofileEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Caseprofile.update({ _id: t.data.caseprofile_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("caseprofile", {});
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

Template.CaseprofileEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("caseprofileEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caseprofileEditEditFormErrorMessage");
	}
	
});

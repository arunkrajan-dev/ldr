var pageSession = new ReactiveDict();

Template.CaseprofileDetailsEdit.rendered = function() {
	
};

Template.CaseprofileDetailsEdit.events({
	
});

Template.CaseprofileDetailsEdit.helpers({
	
});

Template.CaseprofileDetailsEditEditForm.rendered = function() {
	

	pageSession.set("caseprofileDetailsEditEditFormInfoMessage", "");
	pageSession.set("caseprofileDetailsEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		$(this).find("input[type='text']").datetimepicker({
			format: 'DD/MM/YYYY h:mm a',
			});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.CaseprofileDetailsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("caseprofileDetailsEditEditFormInfoMessage", "");
		pageSession.set("caseprofileDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var caseprofileDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(caseprofileDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("caseprofileDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("caseprofile.details", {caseId: self.params.caseId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("caseprofileDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Hearings.update({ _id: t.data.hearing._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("caseprofile.details", {caseId: this.params.caseId});
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

Template.CaseprofileDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("caseprofileDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caseprofileDetailsEditEditFormErrorMessage");
	}
	
});

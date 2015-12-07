var pageSession = new ReactiveDict();

Template.CaseprofileDetailsInsert.rendered = function() {
	
};

Template.CaseprofileDetailsInsert.events({
	
});

Template.CaseprofileDetailsInsert.helpers({
	
});

Template.CaseprofileDetailsInsertInsertForm.rendered = function() {
	

	pageSession.set("caseprofileDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("caseprofileDetailsInsertInsertFormErrorMessage", "");
	
//	$('#datetimepicker12').datetimepicker({
 //               inline: true,
//	});
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

Template.CaseprofileDetailsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("caseprofileDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("caseprofileDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var caseprofileDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(caseprofileDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("caseprofileDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("caseprofile.details", {caseId: self.params.caseId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("caseprofileDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.caseId = self.params.caseId;

				newId = Hearings.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CaseprofileDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("caseprofileDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caseprofileDetailsInsertInsertFormErrorMessage");
	}
	
});

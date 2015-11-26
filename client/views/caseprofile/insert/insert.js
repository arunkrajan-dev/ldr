var pageSession = new ReactiveDict();

Template.CaseprofileInsert.rendered = function() {
	
};

Template.CaseprofileInsert.events({
	
});

Template.CaseprofileInsert.helpers({
	
});

Template.CaseprofileInsertInsertForm.rendered = function() {
	

	pageSession.set("caseprofileInsertInsertFormInfoMessage", "");
	pageSession.set("caseprofileInsertInsertFormErrorMessage", "");

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

Template.CaseprofileInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("caseprofileInsertInsertFormInfoMessage", "");
		pageSession.set("caseprofileInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var caseprofileInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(caseprofileInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("caseprofileInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("caseprofile.details", {caseId: newId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("caseprofileInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Caseprofile.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CaseprofileInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("caseprofileInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caseprofileInsertInsertFormErrorMessage");
	}, 
	'nextCaseId': function() { var max = 0; var caseIds = caseprofile.find({}, { fields: { caseId: 1 }}).fetch(); _.each(caseIds, function(doc) { var intNum = parseInt(doc.caseId); if(!isNaN(intNum) && intNum > max) max = intNum; }); return max + 1; },
	'court': function() {
		console.log("Court db insert" + JSON.stringify(Court.find().fetch(), null, 4));
		return Court.find().fetch().map(function(it){ return it.name; });	
	}
});
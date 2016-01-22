var pageSession = new ReactiveDict();

Template.CaseprofileInsert.rendered = function() {
	
};

Template.CaseprofileInsert.events({
	
});

Template.CaseprofileInsert.helpers({
	
});

Template.CaseprofileInsertInsertForm.rendered = function() {
	
	Meteor.typeahead.inject();
	pageSession.set("caseprofileInsertInsertFormInfoMessage", "");
	pageSession.set("caseprofileInsertInsertFormErrorMessage", "");
	
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
	},
	"keyup #dob": function(e, t) {
		console.log("Input even triggered");
		t.find("#age").value = "test";
	}
});

Template.CaseprofileInsertInsertForm.helpers({
	nba: function() {
    return Courts.find().fetch().map(function(it){ return it.name; });
    },
    represent: function() {
    return Represent.find().fetch().map(function(it){ return it.type; });
    },
    relationship: function() {
    return Relationship.find().fetch().map(function(it){return it.title});	
    },
	"infoMessage": function() {
		return pageSession.get("caseprofileInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caseprofileInsertInsertFormErrorMessage");
	}, 
	'nextCaseId': function() { var max = 0; var caseIds = caseprofile.find({}, { fields: { caseId: 1 }}).fetch(); _.each(caseIds, function(doc) { var intNum = parseInt(doc.caseId); if(!isNaN(intNum) && intNum > max) max = intNum; }); return max + 1; }
});

var initDateTimePickers = function() {
	$(".input-group.date").each(function() {
		$(this).find("input[type='text']").datetimepicker({
			format: 'DD/MM/YYYY',
			});
	});
	
	//this.$('#picker-1, #picker-2').datetimepicker();
    
    $("#dob").on("dp.change", function (e) {
        console.log(e.date);
        var years = moment().diff(e.date, 'years');
        $('#age').val(years);
    });
};
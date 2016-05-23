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
	},
	"change #limitation": function(e, t) {
		
		$('#limitationDate').val(moment($('#judgementDate').val(), "DD/MM/YYYY").add($('#limitation').val(), 'days').format("(ddd) DD/MM/YYYY"));
		var date1 = new Date();
		var date2 = new Date(moment($('#limitationDate').val(), "(ddd) DD/MM/YYYY"));
		var timeDiff = date2.getTime() - date1.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		var txt = "";
		if(diffDays == 0) {
			txt = "Today";
		} else if(diffDays == 1) {
			txt = "tomorrow";
		} else if(diffDays == -1) {
			txt = "YesterDay";
		} else if(diffDays < 0) {
			txt = (diffDays * -1) + " Days Exceeded";
		} else {
			txt = diffDays + " Days More";
		}
		$('#limitationDiff').text(txt);
		debugger;

		//$('#limitationDiff').text(moment($('#limitationDate').val(), "DD/MM/YYYY").fromNow());
	},
	"keyup #limitation": function(e, t) {
		debugger;
		$('#limitationDate').val(moment($('#judgementDate').val(), "DD/MM/YYYY").add($('#limitation').val(), 'days').format("(ddd) DD/MM/YYYY"));
		var date1 = new Date();
		var date2 = new Date(moment($('#limitationDate').val(), "(ddd) DD/MM/YYYY"));
		var timeDiff = date2.getTime() - date1.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		var txt = "";
		if(diffDays == 0) {
			txt = "Today";
		} else if(diffDays == 1) {
			txt = "tomorrow";
		} else if(diffDays == -1) {
			txt = "YesterDay";
		} else if(diffDays < 0) {
			txt = (diffDays * -1) + " Days Exceeded";
		} else {
			txt = diffDays + " Days More";
		}
		$('#limitationDiff').text(txt);
	}	
});

Template.CaseprofileEditEditForm.helpers({
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
		return pageSession.get("caseprofileEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caseprofileEditEditFormErrorMessage");
	}
	
});

var initDateTimePickers = function() {
	$(".input-group.date").each(function() {
		$(this).find("input[type='text']").datetimepicker({
			format: 'DD/MM/YYYY',
			});
	});
	
	//this.$('#picker-1, #picker-2').datetimepicker();

	$('#judgementDate').on("dp.change", function(e) {
		$('#limitationDate').val(moment(e.date).add($('#limitation').val(), 'days').format("(ddd) DD/MM/YYYY"));
		var date1 = new Date();
		var date2 = new Date(moment($('#limitationDate').val(), "(ddd) DD/MM/YYYY"));
		var timeDiff = date2.getTime() - date1.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		var txt = "";
		if(diffDays == 0) {
			txt = "Today";
		} else if(diffDays == 1) {
			txt = "tomorrow";
		} else if(diffDays == -1) {
			txt = "YesterDay";
		} else if(diffDays < 0) {
			txt = (diffDays * -1) + " Days Exceeded";
		} else {
			txt = diffDays + " Days More";
		}
		$('#limitationDiff').text(txt);
	}); 
	
    $("#dob").on("dp.change", function (e) {
        //console.log(e.date);
        var years = moment().diff(e.date, 'years');
        $('#age').val(years);
    });
};
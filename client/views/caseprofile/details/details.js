var pageSession = new ReactiveDict();

Template.CaseprofileDetails.rendered = function() {
	
};

Template.CaseprofileDetails.events({
	
});

Template.CaseprofileDetails.helpers({
	
});

Template.CaseprofileDetailsDetailsForm.rendered = function() {
	
	// var heightTallest = Math.max.apply(null, $(".panel-card").map(function ()
	// {
	// 	return $(this).outerHeight();
	// }).get());
	// $('.panel-card').css({ height: heightTallest + 'px' });
	
	pageSession.set("caseprofileDetailsDetailsFormInfoMessage", "");
	pageSession.set("caseprofileDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "dd/mm/yyyy";
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
	},
	
	"click #dataview-archive-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: 
			'<div class="form-group  field-archive form-center">' +
				'<label for="opNotes">Archive Comment</label>' +
				'<div class="input-div">' + 
					'<input type="text" name="archiveMsg" id="archiveMsg" value="" class="form-control">' +
					'<span id="help-text" class="help-block"></span>' +
					'<span id="error-text" class="help-block">' +
					'</span></div></div>',
			title: "Move to Archive",
			animate: false,
			buttons: {
				success: {
					label: "Move",
					className: "btn-success",
					callback: function() {
						var msg = $('#archiveMsg').val();
						Caseprofile.update({ _id: t.data.caseprofile_details._id }, { $set: {'archived': 'archived', 'archivedMsg': msg} }, function(e) { if(e) alert(e);});
					}
				},
				danger: {
					label: "Cancel",
					className: "btn-default"
				}
			}
		});
		return false;
	},

	"click #dataview-restore-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: 'Are you sure want to Restore?',
			title: "Restore from Archive",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Caseprofile.update({ _id: t.data.caseprofile_details._id }, { $unset: {'archived': '', 'archivedMsg': ''} }, function(e) { if(e) alert(e);});
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

Template.CaseprofileDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("caseprofileDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caseprofileDetailsDetailsFormErrorMessage");
	},
    "getClientAddress":function(value, rel, name) {
        //var name2 = value.split(",");
        if(!rel)
        	rel="";
        return Spacebars.SafeString(value.replace(',', ', <small>' + rel + ' ' + name + '</small><br/><i class="fa fa-map-marker">  </i>'));
        //return name2[0];
    },
    "getClientName":function(value, rel, name) {
        var name2 = value.split(",");
        return name2[0];
    }	    
});
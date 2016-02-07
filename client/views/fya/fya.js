
Template.fyaDetailsInsert.rendered = function() {
	//pageSession.set("fyaHearingInsertFormInfoMessage", "test");
	//pageSession.set("fyaHearingInsertFormErrorMessage", "test");
	
	// $(".input-group.date").each(function() {
	// $(this).find("input[type='text']").datetimepicker({
	// 	format: 'DD/MM/YYYY h:mm a',
	// 	});
	// });
	//console.log("Render called");
	initDateTimePickers();
	 this.autorun(function(){
	 	$('#nextDate').data("DateTimePicker").minDate($('#lastDate').val());
	 	//console.log("Last Date", $('#lastDate').val());
        //console.log("From autorun", Session.get('lastUpdated')); //--->Line1
    });
};

Template.fyaDetailsInsert.events({
	"submit": function(e, t) {
		alert("clicked");
		e.preventDefault();
	//	pageSession.set("fyaHearingInsertFormInfoMessage", "check");
	//	pageSession.set("fyaHearingInsertFormErrorMessage", "check");

		var self = this;

		function submitAction(msg) {
			var fyaHearingInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(fyaHearingInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
	//					pageSession.set("fyaHearingInsertFormInfoMessage", message);
					}; break;
				}
				//console.log("Rendering Template fyaHearingInsert");
				Session.set('lastUpdated', new Date());
				//Router.go("caseprofile", {});
				//$('#fyaHearingInsertDiv').html(Blaze.render(Template.fyaHearingInsert));
			}

			//alert("saved");
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
	//		pageSession.set("fyaHearingInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				newId = Hearings.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	}	
});

Template.fyaDetailsInsert.helpers({
	"infoMessage": function() {
	//	return pageSession.get("fyaHearingInsertFormInfoMessage");
	},
	"errorMessage": function() {
	//	return pageSession.get("fyaHearingInsertFormErrorMessage");
	}, 
	"setMaxDate": function(value){
		//console.log("MaxDate Set " + value);
		//$('#nextDate').data("DateTimePicker").minDate(value);
	}
});

var initDateTimePickers = function() {
	$(".input-group.date").each(function() {
		$(this).find("input[type='text']").datetimepicker({
			format: 'DD/MM/YYYY h:mm a',
			});
	});
	
	// //this.$('#picker-1, #picker-2').datetimepicker();
    
 //   $("#dob").on("dp.change", function (e) {
 //       console.log(e.date);
 //       var years = moment().diff(e.date, 'years');
 //       $('#age').val(years);
 //   });
    
    
   // $('#lastDate').datetimepicker({
			// format: 'DD/MM/YYYY h:mm a'
			// });
   // $('#nextDate').datetimepicker({
   // 	format: 'DD/MM/YYYY h:mm a',
   //     useCurrent: false //Important! See issue #1075
   // });
   // $("#lastDate").on("dp.change", function (e) {
   //     $('#nextDate').data("DateTimePicker").minDate(e.date);
   // });
   // $("#nextDate").on("dp.change", function (e) {
   //     $('#lastDate').data("DateTimePicker").maxDate(e.date);
   // });
};
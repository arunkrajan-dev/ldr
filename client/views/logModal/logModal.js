Template.logModal.helpers({
    "getCaseDetail":function(){
        var idVal = Session.get("selectedCaseId");
        console.log("Id Val returned from caseId Session: " + idVal);
        var cs = Logs.find({caseId: idVal}).fetch();
        console.log("Get Case Detail in Logs: " + JSON.stringify(cs, null, 4));
        return cs;
    },
    "getCaseTitle":function(){
    	return Session.get("selectedcaseTitle");
    }
});

Template.logModal.events({
	"submit": function(e, t) {
		e.preventDefault();

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
					}; break;
				}
				Session.set('lastUpdated', new Date());
				alert("Saved");
			}
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			alert (msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
			    values.caseId = Session.get("selectedCaseId");
			    console.log("Before Insert Id Val returned from caseId Session: " + values.caseId);
				newId = Logs.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	}, 
	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Logs.remove({ _id: me._id });
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
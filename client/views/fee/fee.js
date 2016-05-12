var pageSession = new ReactiveDict();

Template.Fees.helpers({
    "getFees":function(){
    	Meteor.subscribe("fees", this.params.caseId);
        return Fees.find({}, {sort:[["receivedOn","desc"]]}).fetch();
    },
    "infoMessage": function() {
		return pageSession.get("apptInsertFormInfoMessage");
	},
	"total": function() {
	    //var l=liste.rows.length;
		debugger;
	    var i;
	    var den=0;
	    for (i=0;i<l;i++) {
	        den += parseInt(liste.rows[i].cells[7].innerHTML, 10);
	    }
	    return den;
	}
});
Template.Fees.rendered = function() {
	pageSession.set("apptInsertFormInfoMessage", "");
}

Template.Fees.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("apptInsertFormInfoMessage", "");
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
						pageSession.set("apptInsertFormInfoMessage", "");
					}; break;
				}
				Session.set('lastUpdated', new Date());
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
			    values.caseId = self.params.caseId;
			    console.log("Before Insert Id Val returned from caseId Session: " + values.caseId);
				newId = Fees.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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
						Appt.remove({ _id: me._id });
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
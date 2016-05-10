
Template.temptab.events({
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
						Caseprofile.remove({ _id: t.data.caseprofile_details._id });
						Router.go("caseprofile", {});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("caseprofile.edit", {caseId: t.data.caseprofile_details._id});
		return false;
	},
	"click .create-gdrive": function(e, t) {
	  	console.log("[INFO] CreateFolder is called to create folder ", t.data.caseprofile_details.caseId, t.data.caseprofile_details._id);	
	  	Meteor.call("createGdriveFolder", "LDR " + t.data.caseprofile_details.caseId, t.data.caseprofile_details._id, function(error, r) {
	    	console.log("[Result] ", r);	
    	})
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
	},
	
	"click #sendMail-button": function(e, t) {
		e.preventDefault();
		Session.set("caseProfileId", t.data.caseprofile_details._id);
		Session.set("hearingId", "");
		//console.log("hearing sendmail is clicked " + this._id);
		$('#sendMailModal').modal('show');
		return false;
	},
	
});
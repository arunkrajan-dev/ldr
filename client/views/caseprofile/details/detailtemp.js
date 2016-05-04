
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
	}    
});
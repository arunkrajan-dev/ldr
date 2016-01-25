Template.gdrive.helpers({
	"listGdriveFiles": function() {
		Meteor.call("uploadToGdrive");
	    return "FileList";
	}
});



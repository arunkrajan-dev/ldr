Template.SearchCaseFile.rendered = function() {
	Meteor.typeahead.inject();
};

Template.SearchCaseFile.helpers({
    search: function(query, sync, callback) {
      Meteor.call('search', query, {}, function(err, res) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Response", res);
        callback(res);
      });
    },
	selected: function(event, suggestion, datasetName) {
	    // event - the jQuery event object
	    // suggestion - the suggestion object
	    // datasetName - the name of the dataset the suggestion belongs to
	    // TODO your event handler here
	    console.log("Selected", suggestion.id);
	    Router.go("caseprofile.details", {caseId: suggestion.id});
	},
});
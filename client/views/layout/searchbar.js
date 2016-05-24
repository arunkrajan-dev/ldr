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
        callback(res);
      });
    },
	selected: function(event, suggestion, datasetName) {
	    Router.go("caseprofile.details", {caseId: suggestion.id});
	},
});
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
	    window.open(Router.url("caseprofile.details", { caseId: suggestion.id}), 'GoogleWindow', 'resizable=0, menubar=0, locationbar=0, width=1200, height=900');
	},
});
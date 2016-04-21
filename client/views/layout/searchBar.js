Template.SearchCaseFile.rendered = function() {
	Meteor.typeahead.inject();
};

Template.SearchCaseFile.helpers({
	teams: function() {
	Meteor.subscribe("court_list");
	return [
	      {
	        name: 'Courts',
	        valueKey: 'name',
	        display: 'name',
	        local: function() { return Courts.find().fetch(); },
	        header: '<h6 class="league-name">in Courts</h6>',
	        template: 'searchCourt'
	      },
	      {
	        name: 'CaseTitle',
	        valueKey: 'caseId',
	        display: 'caseId',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<h6 class="disabled">with Case Title</h6>',
	        template: 'searchCaseTitle'
	      },
	      {
	        name: 'CaseNumber',
	        valueKey: 'caseNumber',
	        display: 'caseNumber',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<h6 class="disabled">with Case Number</h6>',
	        template: 'searchCaseTitle'
	      },	      
	      {
	        name: 'Representing',
	        valueKey: 'type',
	        display: 'type',
	        local: function() { return Represent.find().fetch(); },
	        header: '<h6 class="league-name">Representing as </h6>',
	        template: 'searchRepresent'
	      }
	];
    }
});
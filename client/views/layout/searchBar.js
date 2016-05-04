Template.SearchCaseFile.rendered = function() {
	Meteor.typeahead.inject();
};

Template.SearchCaseFile.events({
	"keydown #dateview-controls-courtfilter-group": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
alert("fine");
debugger;
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
alert("fine");
debugger;
			return false;
		}

		return true;
	}
})
Template.SearchCaseFile.helpers({
	teams: function() {
	Meteor.subscribe("court_list");
	return [
	      {
	        name: 'CaseTitle',
	        valueKey: 'caseId',
	        display: 'caseId',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching Case Title</strong>',
	        template: 'searchCaseTitle'
	      },
	      {
	        name: 'CaseNumber',
	        valueKey: 'caseNumber',
	        display: 'caseNumber',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching Case Number</strong>',
	        template: 'searchCaseTitle'
	      },
	      {
	        name: 'client',
	        valueKey: 'clientName',
	        display: 'clientName',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching clientName & Address </strong>',
	        template: 'searchClientName'
	      },
	      {
	        name: 'clientFather',
	        valueKey: 'fatherName',
	        display: 'fatherName',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong">matching fatherName</strong>',
	        template: 'searchCaseTitle'
	      },
	      {
	        name: 'clientPhone',
	        valueKey: 'phone',
	        display: 'phone',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching phone</strong>',
	        template: 'searchPhone'
	      },
	      {
	        name: 'clientEmail',
	        valueKey: 'email',
	        display: 'email',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching email</strong>',
	        template: 'searchCaseTitle'
	      },
	      {
	        name: 'notes',
	        valueKey: 'notes',
	        display: 'notes',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching notes</strong>',
	        template: 'searchCaseTitle'
	      },
	      {
	        name: 'clientNotes',
	        valueKey: 'clientNotes',
	        display: 'clientNotes',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching clientNotes</strong>',
	        template: 'searchCaseTitle'
	      },	      
	      {
	        name: 'opName',
	        valueKey: 'opName',
	        display: 'opName',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching opName</strong>',
	        template: 'searchCaseTitle'
	      },
	      {
	        name: 'opAdvocate',
	        valueKey: 'opAdvocate',
	        display: 'opAdvocate',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching opAdvocate</strong>',
	        template: 'searchCaseTitle'
	      },
	      {
	        name: 'opNotes',
	        valueKey: 'opNotes',
	        display: 'opNotes',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching opNotes</strong>',
	        template: 'searchCaseTitle'
	      }    
	];
    }
});
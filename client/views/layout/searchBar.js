Template.SearchCaseFile.rendered = function() {
	Meteor.typeahead.inject();
};

Template.SearchCaseFile.events({
	"keydown #dateview-controls-courtfilter-group": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			return false;
		}

		return true;
	},
	"click .tt-suggestion": function(e, t) {
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
	        template: 'searchCaseNumber'
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
	        template: 'searchClientFatherName'
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
	        template: 'searchEmail'
	      },
	      {
	        name: 'court',
	        valueKey: 'court',
	        display: 'court',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching court</strong>',
	        template: 'searchByCourt'
	      },
	      {
	        name: 'notes',
	        valueKey: 'notes',
	        display: 'notes',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching notes</strong>',
	        template: 'searchNotes'
	      },
	      {
	        name: 'clientNotes',
	        valueKey: 'clientNotes',
	        display: 'clientNotes',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching clientNotes</strong>',
	        template: 'searchClientNotes'
	      },	      
	      {
	        name: 'opName',
	        valueKey: 'opName',
	        display: 'opName',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching opName</strong>',
	        template: 'searchOpName'
	      },
	      {
	        name: 'opAdvocate',
	        valueKey: 'opAdvocate',
	        display: 'opAdvocate',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching opAdvocate</strong>',
	        template: 'searchOpAdv'
	      },
	      {
	        name: 'opNotes',
	        valueKey: 'opNotes',
	        display: 'opNotes',
	        local: function() { return Caseprofile.find().fetch(); },
	        header: '<strong>matching opNotes</strong>',
	        template: 'searchOpNotes'
	      }    
	];
    }
});
Template.backup.events(
    {
        "click #backup": function(e, t) {
            var caseprofile_list = Caseprofile.find({}).fetch();
            var hearings_list = Hearings.find({}).fetch();
            var court_list = Courts.find({}).fetch();
            var relationship_list = Relationship.find({}).fetch();
            var represent_list = Represent.find({}).fetch();
            downloadLocalResource(JSON.stringify(caseprofile_list) + '\n' + JSON.stringify(hearings_list) + '\n' + JSON.stringify(court_list) + '\n' + JSON.stringify(relationship_list) + '\n' + JSON.stringify(represent_list) , "backup", "application/octet-stream");
        }
    });
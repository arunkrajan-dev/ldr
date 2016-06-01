Template.Print_Today_List.rendered = function() {
    window.print();
};

Template.Print_Today_List.helpers({
    "hearingsDetail": function(aCaseId) {
        return Hearings.find({caseId:aCaseId}, {}); 
    }
});
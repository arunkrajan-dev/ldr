Template.sendMailModalT.helpers({
    "getClientName":function(){
        var name = Session.get("selectedClientName");
        var name2 = name.split(",");
        return name2[0];
    },
    "getEmail":function(){
        return Session.get("selectedEmail");        
    },
    "getCaseId":function(){
        return Session.get("selectedCaseId");
    }
});
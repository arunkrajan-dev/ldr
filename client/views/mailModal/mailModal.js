Template.sendMailModalT.helpers({
    "getClientName":function(value){
        var name2 = value.split(",");
        return name2[0];
    },
    "getUserName":function(){
        return Meteor.user().username;
    },
    "getCaseId":function(){
        return Session.get("selectedCaseId");
    },
    "getMsg":function(){
        return `Monday:&#10;Tuesday:&#10;Wednesday:&#10;Thursday:&#10;Friday:&#10;Saturday:&#10;Sunday:`;
    },
    "getCaseDetail":function(){
        var idVal = Session.get("caseProfileId");
        //console.log("Id Val: " + idVal);
        var cs = Caseprofile.findOne({_id:idVal}, {});
        //console.log("Get Case Detail in hearing: " + JSON.stringify(cs, null, 4));
        return cs;
    },
    "getHearing":function(){
        var idVal = Session.get("hearingId");
        //console.log("Id Val: " + idVal);
        var cs = Hearings.findOne({_id:idVal}, {});
        //console.log("Get Hearing Detail in hearing: " + JSON.stringify(cs, null, 4));
        return cs;
    },
});

Template.sendMailModalT.events({
	"click #sendMail": function(e) {
	    e.preventDefault();
	    alert("Mail sent");
	    //console.log("Send mail clicked " + JSON.stringify(e, null, 4));
	    var opt = {
	            from: 'arunsugan08@gmail.com',
                to: $('#to').val(),
                 subject: $('#sub').val(),
                 text: $('#msg').val()
         };
         Meteor.call('sendMail', opt);
    //console.log("Sendmail button is cliecked" + $('#msg').val());
        $('#sendMailModal').modal('hide');
        return false;
	}
});
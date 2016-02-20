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
         //Meteor.call('sendMail', opt);
         
        var str = "Content-Type: text/plain; charset=\"UTF-8\"\n" +
            "MIME-Version: 1.0\n" +
            "Content-Transfer-Encoding: 7bit\n" +
            "to:"+  $('#to').val() +"\n" +
            "from: "+ Meteor.user().profile.email +"\n" +
            "subject: "+  $('#sub').val() +"\n\n" +

         $('#msg').val();
  
         Meteor.call('sendGmail', str);
         console.log("send gmail " + str);
    //console.log("Sendmail button is cliecked" + $('#msg').val());
        $('#sendMailModal').modal('hide');
        return false;
	}
});

Template.sendQuickMail.helpers({
    "getClientName":function(value){
        var name2 = value.split(",");
        return name2[0];
    },
    "caseDetail":function(){
        var idVal = Session.get("caseProfile_Id");
        //console.log("Id Val: " + idVal);
        var cs = Caseprofile.findOne({_id:idVal}, {});
        //console.log("Get Case Detail in hearing: " + JSON.stringify(cs, null, 4));
        return cs;
    }
});

Template.sendQuickMail.events({
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
         //Meteor.call('sendMail', opt);
         
        var str = "Content-Type: text/plain; charset=\"UTF-8\"\n" +
            "MIME-Version: 1.0\n" +
            "Content-Transfer-Encoding: 7bit\n" +
            "to:"+  $('#to').val() +"\n" +
            "from: "+ Meteor.user().profile.email +"\n" +
            "subject: "+  $('#sub').val() +"\n\n" +

         $('#msg').val();
  
         Meteor.call('sendGmail', str);
         console.log("send gmail " + str);
    //console.log("Sendmail button is cliecked" + $('#msg').val());
        $('#sendQuickMailModal').modal('hide');
        return false;
	}
});
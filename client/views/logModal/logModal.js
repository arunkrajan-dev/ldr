Template.logModal.helpers({
    "getCaseDetail":function(){
        var idVal = Session.get("selectedCaseId");
        //console.log("Id Val: " + idVal);
        var cs = Caseprofile.findOne({_id:idVal}, {});
        //console.log("Get Case Detail in hearing: " + JSON.stringify(cs, null, 4));
        return cs;
    }
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
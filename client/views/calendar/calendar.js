
    Template.calendar.helpers({
        options: function() {
            Session.set('prevPage', "calendar");
            console.log("Options is invoked", JSON.stringify(Caseprofile.find().fetch().map(function(it){return {title:it.caseId, date: it.filingDate};}), null, 4));
            // console.log("Options is invoked", JSON.stringify(Hearings.find().fetch().map(function(it){
            //     return {
            //         title: Caseprofile.find({_id:it.caseId}).fetch().map(function(it){return it.caseId}), 
            //         date: it.businessDate};
            // }), null, 4));
            var eventsList = [];
            var hearingsList = [];
            var str;
            Caseprofile.find().forEach(function(it){
                console.log("case list ", JSON.stringify(it, null, 4));
                //str = "#" + (Math.floor(Math.random() * 205) + 51).toString(16) + "" + (Math.floor(Math.random() * 205) + 51).toString(16) + "" + (Math.floor(Math.random() * 205) + 51).toString(16);
                console.log("color: " + str);
                eventsList.push({title: "(F) " + it.caseId, date: moment(it.filingDate).format(), color: '#00ff00', textColor: '#000', url: "/caseprofile/details/"+it._id+"/hearings"});
                eventsList = eventsList.concat(Hearings.find({caseId:it._id}).fetch().map(function(h){
                    return {
                        title: "(H) " + h.purpose + "-" + it.caseId, 
                        date: moment(h.nextDate).format(),
                        color: "#ff6600",
                        textColor: '#000',
                        url: "/caseprofile/details/"+it._id+"/hearings"
                    };
                    }));
                console.log("Hearing list ", JSON.stringify(hearingsList, null, 4));
               // eventsList.push(hearingsList);
            });
            
            eventsList = eventsList.concat(Appt.find({}).fetch().map(function(it){
                return {
                    title: "(A) " + it.description, 
                    date: moment(it.apptDate).format(),
                    color: "#00ccff",
                    textColor: '#000',
                };
            }));

            console.log("eventsList ", JSON.stringify(eventsList, null, 4));
            //var eventsList = Caseprofile.find().fetch().map(function(it){return {title:it.caseId, date: it.filingDate};});
            return {
                events: eventsList,
            }
        }
    });
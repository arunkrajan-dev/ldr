
this.insertCalEvent = function (id, s, d, l, sd, ed) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    //console.log("Giigke cakebder ubser event");
    try {
    Meteor.http.post(url, {
        'headers' : { 
          'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
          'Content-Type': 'application/json' 
        },
        'data': {
          "id":id.toLowerCase(),
          "summary": "Ldr:" + s,
          "description": d,
          "location": l,
          "start": {
            "dateTime": moment(sd).format("YYYY-MM-DDTHH:mm:ssZ"),
          },
          "end": {
            "dateTime": moment(sd).format("YYYY-MM-DDTHH:mm:ssZ"),
          },
        }
      });
    } catch(e){
        console.log("Error in calendar insert: " + e);
    } finally {
      return true;  
    }
}; 

this.updateCalEvent = function (id, s, d, l, sd, ed) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id.toLowerCase();
    console.log("google calender update event " + url);
    try {
    Meteor.http.put(url, {
        'headers' : { 
          'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
          'Content-Type': 'application/json' 
        },
        'data': {
          //"id":id.toLowerCase(),
          "summary": "LDR:" + s,
          "description": d,
          "location": l,
          "start": {
            "dateTime": moment(sd).format("YYYY-MM-DDTHH:mm:ssZ"),
          },
          "end": {
            "dateTime": moment(sd).format("YYYY-MM-DDTHH:mm:ssZ"),
          },
        }
      });
    } catch(e) {
        console.log("Error in calendar update: " + e);
    } finally {
      return true;  
    }
    
}; 

this.removeCalEvent = function (id) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id.toLowerCase();
    console.log("google calender remove event " + url);
    try {
    Meteor.http.del(url, {
        'headers' : { 
          'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
          'Content-Type': 'application/json' 
        }
      });
    return true;
    } catch(e) {
      console.log("Error in reomve calendar event: " + e);
    } finally {
      return true;
    }
}; 
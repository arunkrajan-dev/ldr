
this.insertCalEvent = function (id, s, d, l, sd, ed) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    console.log("====== START - Google Calendar Insert =======");
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
    } catch(error){
        console.log("***** [ERROR] in calendar insert -  " + error);
        if (error && error.response && error.response.statusCode == 401) {
		      console.log("[INFO] Calling ExangeRefresh Token ");
		      Meteor.call('exchangeRefreshToken', function (error) {
		    	console.log("[INFO] Exchange call back return msg - ", error);
		    		    	if (error)
		    		    		return error;
		    		    	console.log("[INFO] Calling insertCalEvent after token refersh", id, s, d, l, sd, ed);
		    		    	insertCalEvent(id, s, d, l, sd, ed);
		    		    });
		    	}
    } finally {
      console.log("===== END - Google Canledar Insert =====");
      return true;  
    }
}; 

this.updateCalEvent = function (id, s, d, l, sd, ed) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id.toLowerCase();
    console.log("===== START - Google calender update event [" + url + "]=====");
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
    } catch(error) {
        console.log("[INFO] Error in calendar update: " + error);
	    	if (error && error.response && error.response.statusCode == 401) {
	    	  console.log("[INFO] Calling ExangeRefresh Token ");
		    		    Meteor.call('exchangeRefreshToken', function (error) {
		    		    	console.log("[INFO] Exchange call back return msg - ", error);
		    		    	if (error)
		    		    		return error;
		    		    	console.log("[INFO] Call updateCalEvent after token refersh", id, s, d, l, sd, ed);
		    		    	updateCalEvent(id, s, d, l, sd, ed);
		    		    });
    }
    } finally {
      console.log("===== END - Google Calendar Update =====");
      return true;  
    }
    
}; 

this.removeCalEvent = function (id) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id.toLowerCase();
    console.log("===== START - google calender remove event [" + url + "]=====");
    try {
    Meteor.http.del(url, {
        'headers' : { 
          'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
          'Content-Type': 'application/json' 
        }
      });
    return true;
    } catch(error) {
      console.log("[INFO] Error in reomve calendar event: " + error);
	    	if (error && error.response && error.response.statusCode == 401) {
	    	  console.log("[INFO] Calling ExangeRefresh Token ");
		    		    Meteor.call('exchangeRefreshToken', function (error) {
		    		    	console.log("[INFO] Exchange call back return msg - ", error);
		    		    	if (error)
		    		    		return error;
		    		    	console.log("Call removeCalEvent after token refersh", id);
		    		    	removeCalEvent(id);
		    		    });
	  }
    } finally {
      console.log("===== END - Google Calendar Remove =====");
      return true;
    }
}; 
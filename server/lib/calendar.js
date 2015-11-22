
this.insertCalEvent = function (id, s, d, l, sd, ed) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    console.log("Insert id ", id.toLowerCase());
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
    return true;
}; 

this.updateCalEvent = function (id, s, d, l, sd, ed) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id.toLowerCase();
    console.log("google calender update event " + url);
    Meteor.http.post(url, {
        'headers' : { 
          'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
          'Content-Type': 'application/json' 
        },
        'data': {
          //"id":id.toLowerCase(),
          "summary": "Ldr" + s,
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
    return true;
}; 

this.removeCalEvent = function (id) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id.toLowerCase();
    console.log("google calender remove event " + url);
    Meteor.http.post(url, {
        'headers' : { 
          'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
          'Content-Type': 'application/json' 
        },
        'data': {
        }
      });
    return true;
}; 

this.ISODateString = function (d) {
 
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z';
};

this.pad = function (n){ return n<10 ? '0'+n : n };
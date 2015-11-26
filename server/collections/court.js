Court = new Meteor.Collection("Court");

//Court.insert({name:'Chennai High Court'});
//Court.insert({name:'Madurai High Court'});
//Court.insert({name:'Chennai civil Court'});
//Court.insert({name:'Chennai Family Court'});

console.log("Court db" + JSON.stringify(Court.find().fetch(), null, 4));
if(!Relationship.find().count()) {
    Relationship.insert({title: "S/O"});
    Relationship.insert({title: "W/O"});
    Relationship.insert({title: "D/O"});
}
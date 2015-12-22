if(!Represent.find().count()) {
    Represent.insert({type: "Petitioner"});
    Represent.insert({type: "Respondent"});
    Represent.insert({type: "Plaintiff"});
    Represent.insert({type: "Defendant"});
    Represent.insert({type: "Complainant"});
    Represent.insert({type: "Accused"});
    Represent.insert({type: "Appllant"});
    Represent.insert({type: "Opposite Party"});
    Represent.insert({type: "Third Party"});
}
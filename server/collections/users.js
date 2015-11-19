Users.allow({	
    remove: function (userId, doc) {
		return Users.userCanRemove(userId, doc);
	}
});

//Accounts.validateNewUser(function(user){
  //  console.log ("Validate " + user);
    // if(Users.isInRoles(Meteor.userId(), ["admin"])) return user;
    // throw new Meteor.Error(403, "User is not in admin list");
//});
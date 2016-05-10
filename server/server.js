var verifyEmail = false;


Accounts.config({ sendVerificationEmail: verifyEmail });

Meteor.startup(function() {

	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	//
	// Setup OAuth login service configuration (read from Meteor.settings)
	//
	// Your settings file should look like this:
	//
	// {
	//     "oauth": {
	//         "google": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         },
	//         "github": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         }
	//     }
	// }
	//
	if(Accounts && Accounts.loginServiceConfiguration && Meteor.settings && Meteor.settings.oauth && _.isObject(Meteor.settings.oauth)) {
		// google
		if(Meteor.settings.oauth.google && _.isObject(Meteor.settings.oauth.google)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "google"
			});

			var settingsObject = Meteor.settings.oauth.google;
			settingsObject.service = "google";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// github
		if(Meteor.settings.oauth.github && _.isObject(Meteor.settings.oauth.github)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "github"
			});

			var settingsObject = Meteor.settings.oauth.github;
			settingsObject.service = "github";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// linkedin
		if(Meteor.settings.oauth.linkedin && _.isObject(Meteor.settings.oauth.linkedin)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "linkedin"
			});

			var settingsObject = Meteor.settings.oauth.linkedin;
			settingsObject.service = "linkedin";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// facebook
		if(Meteor.settings.oauth.facebook && _.isObject(Meteor.settings.oauth.facebook)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "facebook"
			});

			var settingsObject = Meteor.settings.oauth.facebook;
			settingsObject.service = "facebook";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// twitter
		if(Meteor.settings.oauth.twitter && _.isObject(Meteor.settings.oauth.twitter)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "twitter"
			});

			var settingsObject = Meteor.settings.oauth.twitter;
			settingsObject.service = "twitter";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// meteor
		if(Meteor.settings.oauth.meteor && _.isObject(Meteor.settings.oauth.meteor)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "meteor-developer"
			});

			var settingsObject = Meteor.settings.oauth.meteor;
			settingsObject.service = "meteor-developer";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
	}

	
});

Meteor.methods({
	"createUserAccount": function(options) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.seniorId) userOptions.seniorId = options.seniorId;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;
		if(options.profile && options.profile.email) userOptions.email = options.profile.email;

		Accounts.createUser(userOptions);
	},
	"updateUserAccount": function(userId, options) {
		// only admin or users own profile
		if(!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		// non-admin user can change only profile
		if(!Users.isAdmin(Meteor.userId())) {
			var keys = Object.keys(options);
			if(keys.length !== 1 || !options.profile) {
				throw new Meteor.Error(403, "Access denied.");
			}
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;

		if(options.profile && options.profile.email) userOptions.email = options.profile.email;
		if(options.roles) userOptions.roles = options.roles;

		if(userOptions.email) {
			var email = userOptions.email;
			delete userOptions.email;
			userOptions.emails = [{ address: email }];
		}

		var password = "";
		if(userOptions.password) {
			password = userOptions.password;
			delete userOptions.password;
		}

		if(userOptions) {
			Users.update(userId, { $set: userOptions });
		}

		if(password) {
			Accounts.setPassword(userId, password);
		}
	},

	"sendMail": function(options) {
		this.unblock();
		
	  //if (!Meteor.user())
    	  //throw new Meteor.Error(403, "User not logged in");
    	  
		//console.log("Send mail clicked " + JSON.stringify(options, null, 4));
		Email.send(options);
	},
	
	"sendGmail": function(str) {
		this.unblock();
			console.log("===== START - Send Mail ===== ");
		    var url = "https://www.googleapis.com/gmail/v1/users/me/messages/send";
		    
		    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        
		    try {
		    //console.log(" == Send Gmail Start == ", str, encodedMail);
		    Meteor.http.post(url, {
		        'headers' : { 
		          	'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
		          	'Content-Type': 'application/json' 
		        },
		        'content': JSON.stringify({
					"raw": encodedMail
				})
		      });
		    } catch(error){
		    	console.log("[ERROR] in calendar insert: " + error);
		    	if (error && error.response && error.response.statusCode == 401) {
					console.log("[INFO] calling exchange refresh token");
		    		    Meteor.call('exchangeRefreshToken', function (error) {
		    		    	console.log("Exchang call back - ", error);
		    		    	if (error)
		    		    		return error;
		    		    	console.log("[INFO] Calling sendGmail after token refersh", str);
		    		    	Meteor.call('sendGmail', str);
		    		    });
		    	}
		    } finally {
		      console.log("===== END - Send Gmail =====");
		      return true;  
		    }
	}, 
    
    // Search result for Client Search Bar    
        search: function(query, options) {
            options = options || {};
            // guard against client-side DOS: hard limit to 50
            if (options.limit) {
                options.limit = Math.min(50, Math.abs(options.limit));
            } else {
                options.limit = 50;
            }

            var searchList = [];
            searchList = searchList.concat(Caseprofile.find({"caseId": new RegExp(query,"i")}).fetch().map(function(it){
            	return {
            		value: it.caseId,
            		match: "<b>Title: </b>" + it.caseId,
            		id: it._id,
            		caseId: it.caseId,
            		caseNumber: it.caseNumber
            	};
            }));

            searchList = searchList.concat(Caseprofile.find({"clientName": new RegExp(query,"i")}).fetch().map(function(it){
            	return {
            		value: it.clientName,
            		match: "<b>Client Name & Address: </b>" + it.clientName,
            		id: it._id,
            		caseId: it.caseId,
            		caseNumber: it.caseNumber
            	};
            }));

            searchList = searchList.concat(Caseprofile.find({"fatherName": new RegExp(query,"i")}).fetch().map(function(it){
            	return {
            		value: it.fatherName,
            		match: "<b>" + it.relationship + "</b>" + it.fatherName,
            		id: it._id,
            		caseId: it.caseId,
            		caseNumber: it.caseNumber
            	};
            }));

            searchList = searchList.concat(Caseprofile.find({"phone": new RegExp(query,"i")}).fetch().map(function(it){
            	return {
            		value: it.phone,
            		match: "<b>Phone: </b>" + it.phone,
            		id: it._id,
            		caseId: it.caseId,
            		caseNumber: it.caseNumber
            	};
            }));

            searchList = searchList.concat(Caseprofile.find({"court": new RegExp(query,"i")}).fetch().map(function(it){
            	return {
            		value: it.court,
            		match: "<b>court: </b>" + it.court,
            		id: it._id,
            		caseId: it.caseId,
            		caseNumber: it.caseNumber
            	};
            }));
            
            return searchList;
        },
        
	exchangeRefreshToken: function() {
    this.unblock();
    console.log("===== START - Exchange Refresh token =====");
    user = Meteor.user();

    var config = Accounts.loginServiceConfiguration.findOne({service: "google"});
    if (! config) {
      console.log("[ERROR] Google service not configured.");
      throw new Meteor.Error(500, "Google service not configured.");
    }

    if (! user.services || ! user.services.google || ! user.services.google.refreshToken) {
      console.log("[ERROR] Refresh token not found.");
      throw new Meteor.Error(500, "Refresh token not found.");
    }
    
    try {
      console.log("Inside try block");
      var result = Meteor.http.call("POST",
        "https://accounts.google.com/o/oauth2/token",
        {
          params: {
            'client_id': config.clientId,
            'client_secret': config.secret,
            'refresh_token': user.services.google.refreshToken,
            'grant_type': 'refresh_token'
          }
      });
    } catch (e) {
      var code = e.response ? e.response.statusCode : 500;
      console.log('[ERROR] Unable to exchange google refresh token.', e);
      throw new Meteor.Error(code, 'Unable to exchange google refresh token.', e.response)
    }
    console.log("Result ", result);
    if (result.statusCode === 200) {
      console.log("[INFO] Token refresh success, call meteor update");
      Meteor.users.update(user._id, { 
        '$set': { 
          'services.google.accessToken': result.data.access_token,
          'services.google.expiresAt': (+new Date) + (1000 * result.data.expires_in),
        }
      });
      console.log("===== START - Exchange Refresh token =====");
      return result.data;
    } else {
      console.log('[ERROR] Unable to exchange google refresh token.');
      throw new Meteor.Error(result.statusCode, 'Unable to exchange google refresh token.', result);
    }
  }
});

Accounts.onCreateUser(function (options, user) {
	console.log("[INFO] ===== on create user Start ===== " );	
	if(!user.roles){
		if(Meteor.users.find().count()) {
			user.roles = ["user"];	
		} else {
			console.log("Creating new admin user");
			user.roles = ["admin"];	
			return user;
		}
	}
	console.log("[INFO] User role: " + user.roles);	
	console.log("[INFO] Options: " + JSON.stringify(options, null, 4));	
	
	user.seniorId = options.seniorId;
	
	console.log("[INFO] User: " + JSON.stringify(user, null, 4));	
	//Allow only admin to create new user
	if(Users.isInRoles(Meteor.userId(), ["admin"])) return user;
	
	//If user is created through service, merge it to already 
	//created account for the user by admin
    if (user.services) {
			var email = user.services["google"].email;
			
            if (!email)
                throw new Meteor.Error(403, "Email not found");
 			
 			var existingUser = Meteor.users.findOne({'emails.address': email});
 			
            // see if any existing user has this email address, otherwise create new
            if (!existingUser)
            	throw new Meteor.Error(403, "Please request admin to add your mail in user list");
 
            // Remove existing user and create new account
            Meteor.users.remove({_id: existingUser._id}); // remove existing record
            return user;                          // record is re-inserted
    }
});

Accounts.validateLoginAttempt(function(info) {

	// reject users with role "blocked"
	if(info.user && Users.isInRole(info.user._id, "blocked")) {
		throw new Meteor.Error(403, "Your account is blocked.");
	}

  if(verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified ) {
			throw new Meteor.Error(499, "E-mail not verified.");
  }

	return true;
});


Users.before.insert(function(userId, doc) {
	if(doc.emails && doc.emails[0] && doc.emails[0].address) {
		doc.profile = doc.profile || {};
		doc.profile.email = doc.emails[0].address;
	} else {
		// oauth
		if(doc.services) {
			// google e-mail
			if(doc.services.google && doc.services.google.email) {
				doc.profile = doc.profile || {};
				doc.profile.email = doc.services.google.email;
			} else {
				// github e-mail
				if(doc.services.github && doc.services.github.accessToken) {
					var github = new GitHub({
						version: "3.0.0",
						timeout: 5000
					});

					github.authenticate({
						type: "oauth",
						token: doc.services.github.accessToken
					});

					try {
						var result = github.user.getEmails({});
						var email = _.findWhere(result, { primary: true });
						if(!email && result.length && _.isString(result[0])) {
							email = { email: result[0] };
						}

						if(email) {
							doc.profile = doc.profile || {};
							doc.profile.email = email.email;
						}
					} catch(e) {
						console.log(e);
					}
				} else {
					// linkedin email
					if(doc.services.linkedin && doc.services.linkedin.emailAddress) {
						doc.profile = doc.profile || {};
						doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;
						doc.profile.email = doc.services.linkedin.emailAddress;
					} else {
						if(doc.services.facebook && doc.services.facebook.email) {
							doc.profile = doc.profile || {};
							doc.profile.email = doc.services.facebook.email;
						} else {
							if(doc.services.twitter && doc.services.twitter.email) {
								doc.profile = doc.profile || {};
								doc.profile.email = doc.services.twitter.email;
							} else {
								if(doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
									doc.profile = doc.profile || {};
									doc.profile.email = doc.services["meteor-developer"].emails[0].address;
								}
							}
						}
					}
				}
			}
		}
	}
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
	if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
		modifier.$set.profile.email = modifier.$set.emails[0].address;
	}
});

Accounts.onLogin(function (info) {
	
});

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset_password/' + token);
};

Accounts.urls.verifyEmail = function (token) {
	return Meteor.absoluteUrl('verify_email/' + token);
};

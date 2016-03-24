var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.Login.rendered = function() {
	
	$("input[autofocus]").focus();
};

Template.Login.created = function() {
	pageSession.set("errorMessage", "");	
};

Template.Login.events({
	"submit #login_form": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var submit_button = $(t.find(":submit"));

		var login_email = t.find('#login_email').value;//.trim();
		var login_password = t.find('#login_password').value;

		// check email
		// if(!isValidEmail(login_email))
		// {
		// 	pageSession.set("errorMessage", "Please enter your e-mail address.");
		// 	t.find('#login_email').focus();
		// 	return false;
		// }

		//check user name
		// if(!login_email)
		// {
		// 	pageSession.set("errorMessage", "Please enter your e-mail/username.");
		// 	t.find('#login_email').focus();
		// 	return false;
		// }
		
		// check password
		if(login_password == "")
		{
			pageSession.set("errorMessage", "Please enter your password.");
			t.find('#login_email').focus();
			return false;
		}

		submit_button.button("loading");
		alert(login_email);
		Meteor.loginWithPassword({"username": login_email}, login_password, function(err) {
			submit_button.button("reset");
			if (err)
			{
				pageSession.set("errorMessage", err.message);
				return false;
			}
		});
		return false; 
	},

	"click #login-with-google": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");
		
		console.log("Login with Google JS");
		Meteor.loginWithGoogle(
			{
				requestPermissions: ["email", "https://www.googleapis.com/auth/calendar", 
					"https://www.googleapis.com/auth/gmail.send", "https://mail.google.com/", 
					"https://www.googleapis.com/auth/drive.file"],
				requestOfflineToken: true
			},
			function(err) {
				button.button("reset");
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-github": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithGithub(
			{
				requestPermissions: ["public_repo", "user:email"]
			},
			function(err) {
				button.button("reset");
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-linkedin": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithLinkedin(
			{
				requestPermissions: ["r_emailaddress"]
			},
			function(err) {
				button.button("reset");
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-facebook": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithFacebook(
			{
				requestPermissions: ["email"]
			},
			function(err) {
				button.button("reset");
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-twitter": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithTwitter(
			{
				requestPermissions: ["email"]
			},
			function(err) {
				button.button("reset");
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-meteor": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithMeteorDeveloperAccount(
			{
				requestPermissions: ["email"]
			},
			function(err) {
				button.button("reset");
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	}
	
});

Template.Login.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	}
	
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
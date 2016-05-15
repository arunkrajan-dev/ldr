this.App = {};
this.Helpers = {};

Meteor.startup(function() {
	//Meteor.absoluteUrl.defaultOptions.rootUrl = "https://mtr4-arunsugan.c9users.io/";
		/* Back to Top */
	if ( ($(window).height() + 100) < $(document).height() ) {
	    $('#top-link-block').removeClass('hidden').affix({
	        // how far to scroll down before link "slides" into view
	        offset: {top:100}
	    });
	}
	
	console.log("Startup - scrolltop");
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	// $('.scrollToTop').click(function(){
	// 	$('html, body').animate({scrollTop : 0},800);
	// 	return false;
	// });
	
	// $(window).scroll(function() {
	// 	if ( $(window).scrollTop() > 350 ) {
	// 		$("#top-link-block").show();
	// 	}
	// else{
	// 	$("#top-link-block").hide();
	// }
	// });
});

App.logout = function() {
	Meteor.logout(function(err) {
	});
};

this.menuItemClass = function(routeName) {
	if(!routeGranted(routeName)) {
		return "hidden";
	}

	if(!Router.current() || !Router.current().route) {
		return "";
	}

	if(!Router.routes[routeName]) {
		return "";
	}

	var currentPath = Router.routes[Router.current().route.getName()].handler.path;
	var routePath = Router.routes[routeName].handler.path;

	if(routePath === "/") {
		return (currentPath == routePath || Router.current().route.getName().indexOf(routeName + ".") == 0) ? "active" : "";
	}

	return currentPath.indexOf(routePath) === 0 ? "active" : "";
};

Helpers.menuItemClass = function(routeName) {
	return menuItemClass(routeName);
};

Helpers.userFullName = function() {
	var name = "";
	if(Meteor.user() && Meteor.user().profile)
		name = Meteor.user().profile.name;
	return name;
};

Helpers.userEmail = function() {
	var email = "";
	if(Meteor.user() && Meteor.user().profile)
		email = Meteor.user().profile.email;
	return email;
};

Helpers.randomString = function(strLen) {
	return Random.id(strLen);
};

Helpers.secondsToTime = function(seconds, timeFormat) {
	return secondsToTime(seconds, timeFormat);
};

Helpers.integerDayOfWeekToString = function(day) {
	if(_.isArray(day)) {
		var s = "";
		_.each(day, function(d, i) {
			if(i > 0) {
				s = s + ", ";
			}
			s = s + ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d];
		});
		return s;
	}
	return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
};

Helpers.formatDate = function(date, dateFormat) {
	if(!date) {
		return "";
	}

	var f = dateFormat || "dd/mm/yyyy";

	if(_.isString(date)) {
		if(date.toUpperCase() == "NOW") {
			date = new Date();
		}
		if(date.toUpperCase() == "TODAY") {
			d = new Date();
			date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
		}
	}

	return moment(date).format(f);
};

Helpers.formatCalendarDate = function(date) {
	if(!date) {
		return "";
	}
	//fd = moment(date).format("MM-DD-YYYY h:mm a")
	return moment(date).fromNow();
};

Helpers.DaysFromNow = function(date) {
	var date1 = new Date();
	//var date2 = new Date(moment($('#limitationDate').val(), "(ddd) DD/MM/YYYY"));
	var timeDiff = date.getTime() - date1.getTime();
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	if(diffDays == 0) {
		return "Today";
	} else if(diffDays == 1) {
		return "tomorrow";
	} else if(diffDays == -1) {
		return "YesterDay";
	} else if(diffDays < 0) {
		return (diffDays * -1) + " Days Exceeded";
	} else {
		return diffDays + " Days More";
	}
	return diffDays;	
};

Helpers.booleanToYesNo = function(b) {
	return b ? "Yes" : "No";
};

Helpers.integerToYesNo = function(i) {
	return i ? "Yes" : "No";
};

Helpers.integerToTrueFalse = function(i) {
	return i ? "True" : "False";
};

// Tries to convert argument to array
//   array is returned unchanged
//   string "a,b,c" or "a, b, c" will be returned as ["a", "b", "c"]
//   for other types, array with one element (argument) is returned
//   TODO: implement other types to array conversion
Helpers.getArray = function(a) {
	a = a || [];
	if(_.isArray(a)) return a;
	if(_.isString(a)) {
		var array = a.split(",") || [];
		_.each(array, function(item, i) { array[i] = item.trim(); });
		return array;
	}
	if(_.isObject(a)) {
		// what to return? keys or values?
	}

	var array = [];
	array.push(a);
	return array;
};

Helpers.cursorEmpty = function(cursor) {
	return cursor && cursor.count();
};

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});

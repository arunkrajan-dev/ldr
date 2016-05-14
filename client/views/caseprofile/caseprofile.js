var pageSession = new ReactiveDict();

Template.caseProfileFya.helpers({
	"fyaItems": function() {
		return this.fya_list;//(Caseprofile.find({ nextHearingDate:{ $lte:new Date()} }, {}));
	},
	"fyaCount": function() {
		return this.fya_list.count();	
	},
	"lastUpdated": function() {
		if(Session.get('lastUpdated') > "")
			return "Last Updated : " + Session.get('lastUpdated');
	}
});

Template.Caseprofile.rendered = function() {
	
};

Template.Caseprofile.events({
	
});

Template.Caseprofile.helpers({
	
});

var CaseprofileViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CaseprofileViewSearchString");
	var sortBy = pageSession.get("CaseprofileViewSortBy");
	var sortAscending = pageSession.get("CaseprofileViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["court"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var CaseprofileViewExport = function(cursor, fileType) {
	var data = CaseprofileViewItems(cursor);
	var exportFields = ["caseId", "clientName", "representing", "caseType", "filingDate", "notes"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.CaseprofileView.rendered = function() {
	pageSession.set("CaseprofileViewStyle", "table");
	
};

Template.CaseprofileView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("CaseprofileViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("CaseprofileViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("CaseprofileViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("caseprofile.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CaseprofileViewExport(this.caseprofile_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CaseprofileViewExport(this.caseprofile_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CaseprofileViewExport(this.caseprofile_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CaseprofileViewExport(this.caseprofile_list, "json");
	},
    "keyup #SearchDualList": function (e, t) {
                e.preventDefault();
                console.log("search dual list");
                var me = $('#SearchDualList');
                console.log("Search text - ", me.val())
                var code = e.keyCode || e.which;
                if (code == '9') return;
                if (code == '27') me.val(null);
                var $rows = $(e.target).closest('.dual-list').find('.table-row');
                console.log('Selected row - ', $rows);
                var val = $.trim(me.val()).replace(/ +/g, ' ').toLowerCase();
                console.log("Value ==", val);
                $rows.show().filter(function () {
                    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                    console.log("==text", text);
                    return !~text.indexOf(val);
                }).hide();
                return false;
    }
	
});

Template.CaseprofileView.helpers({

	"insertButtonClass": function() {
		return Caseprofile.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.caseprofile_list || this.caseprofile_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.caseprofile_list && this.caseprofile_list.count() > 0;
	},
	"isNotFound": function() {
		return this.caseprofile_list && pageSession.get("CaseprofileViewSearchString") && CaseprofileViewItems(this.caseprofile_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CaseprofileViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CaseprofileViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CaseprofileViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CaseprofileViewStyle") == "gallery";
	}

	
});


Template.CaseprofileViewTable.rendered = function() {
	
};

Template.CaseprofileViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CaseprofileViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CaseprofileViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CaseprofileViewSortAscending") || false;
			pageSession.set("CaseprofileViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CaseprofileViewSortAscending", true);
		}
	}
});

Template.CaseprofileViewTable.helpers({
	"tableItems": function() {
		return CaseprofileViewItems(this.caseprofile_list);
	}
});


Template.CaseprofileViewTableItems.rendered = function() {
	
};

Template.CaseprofileViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("caseprofile.details", {caseId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Caseprofile.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Caseprofile.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("caseprofile.edit", {caseId: this._id});
		return false;
	}
});

Template.CaseprofileViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Caseprofile.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Caseprofile.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.courts.rendered = function() {
    Meteor.typeahead.inject();
};

Template.courts.helpers({
    "courts": function() {
        return Courts.find().fetch();
    },
    "getCount": function(name) {
    	return Caseprofile.find({"court": new RegExp(name, "i") }).count();
    },
    "percent": function(val) {
		//@todo Register this percentage function to global
		return (val/this.caseprofile_list.count()) * 100;
	}
});

Template.courts.events({
        "keyup #SearchDualList": function (e, t) {
                e.preventDefault();
                console.log("search dual list");
                var me = $('#SearchDualList');
                console.log("text ", me.val())
                var code = e.keyCode || e.which;
                if (code == '9') return;
                if (code == '27') me.val(null);
                var $rows = $(e.target).closest('.dual-list').find('.table-row');
                console.log('row', $rows);
                var val = $.trim(me.val()).replace(/ +/g, ' ').toLowerCase();
                console.log("==", val);
                $rows.show().filter(function () {
                    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                    console.log("==text", text);
                    return !~text.indexOf(val);
                }).hide();
                return false;
            },
    "click .list-group": function(e, t) {
        console.log("Target", e.target.title);
        if(e.target.title) {
            pageSession.set("CaseprofileViewSearchString", e.target.title);
            $('#tab-court').addClass('active');
            $('.nav a[href="#all"]').tab('show');
        }
    },
    "click #tab-archive": function(e, t) {
    	
    }
});

Template.presentation.events({
	"click #tab-all": function() {
		pageSession.set("CaseprofileViewSearchString", "");
	}, 	
	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("caseprofile.insert", {});
	}
});

Template.presentation.helpers({
	incompleteCount: function () {
      Meteor.subscribe("tasks_list");
      return Tasks.find({checked: {$ne: true}}).count();
    },
    incompleteApprovalCount: function() {
    	this.hearings = Hearings.find({approved: {$in : ["no", "resend"]}}, {});
    	return Hearings.find({approved: {$in : ["no", "resend"]}}, {}).count();
    },
	appointmentCount: function() {
		return Appt.find({}).count();
	}    
});

Template.insight.helpers({
	"noCaseNumber": function() {
		return Caseprofile.find({caseNumber: ""}).count();
	},
	"noNextHearing": function() {
		return Caseprofile.find({nextHearingDate: null}).count();
	}, 
	"fyaCount": function() {
		return this.fya_list.count();	
	},
	"total": function() {
		return this.caseprofile_list.count();
	},
	"percent": function(val) {
		return (val/this.caseprofile_list.count()) * 100;
	}
})
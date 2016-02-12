var pageSession = new ReactiveDict();

Template.panelView.rendered = function() {
	var heightTallest = Math.max.apply(null, $(".list-group").map(function ()
	{
		return $(this).outerHeight();
	}).get());
	$('.list-group').css({ height: heightTallest + 'px' });
};

Template.Caseprofile.events({
	
});

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
		var searchFields = ["caseId", "clientName", "phone", "email", "dob", "age", "fatherName", "clientNotes", "representing", "caseType", "court", "filingDate", "notes", "opName", "opAdvocate", "opNotes"];
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
	var exportFields = ["caseId", "clientName", "phone", "email", "dob", "age", "fatherName", "clientNotes", "representing", "caseType", "court", "filingDate", "notes", "opName", "opAdvocate", "opNotes"];

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
		//console.log("Complete value ", JSON.stringify(Caseprofile.find({}, {sort:[["caseId","desc"]]}).fetch(), null, 4));
		var all = CaseprofileViewItems(this.caseprofile_list);
		var chunks = [];
		var size =3;
		while(all.length > size){
			chunks.push({row: all.slice(0, size)});
			all = all.slice(size);
		}
		chunks.push({row:all});
		//console.log("Case Profile List " + JSON.stringify(this.caseprofile_list.fetch(), null, 4));
		return chunks;
	}
});


Template.CaseprofileViewTableItems.rendered = function() {
	
};

Template.CaseprofileViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Session.set('selectedClientName', this.clientName);
		Session.set('selectedEmail', this.email);
		Session.set('selectedCaseId', this.caseId);
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
	},
	"click #sendMail-button": function(e, t) {
		e.preventDefault();
		Session.set('selectedClientName', this.clientName);
		Session.set('selectedEmail', this.email);
		Session.set('selectedCaseId', this.caseId);
		//console.log("Mail Clicked");
		$('#sendMailModal').modal('show');
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
	},
	"stringSplit": function(str, options) {
    if(str){
      var ret = "";
      
      var tempArr = str.trim().split(options.hash["delimiter"]);

      for(var i=0; i < tempArr.length; i++)
      {
        ret = ret + options.fn(tempArr[i]);
      }

      return ret;
    }
  }
});

Template.panelView.events({
	"click .panel-footer": function(e, t) {
		e.preventDefault();
		Session.set('selectedClientName', this.clientName);
		Session.set('selectedEmail', this.email);
		Session.set('selectedCaseId', this.caseId);
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
	},
	"click #sendMail-button": function(e, t) {
		e.preventDefault();
		Session.set('selectedClientName', this.clientName);
		Session.set('selectedEmail', this.email);
		Session.set('selectedCaseId', this.caseId);
		//console.log("Mail Clicked");
		$('#sendMailModal').modal('show');
		return false;
	},
	"click .show-log": function(e, t) {
		e.preventDefault();
		Session.set('selectedCaseId', this._id);
		Session.set('selectedcaseTitle', this.caseId);
		//console.log("selected Case ID session ", this._id);
		$('#logModal').modal('show');
		return false;
	},
	"click .notes": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: me.notes,
			//title: "Delete",
			animate: false
			// buttons: {
			// 	success: {
			// 		label: "Yes",
			// 		className: "btn-success",
			// 		callback: function() {
			// 			Caseprofile.remove({ _id: me._id });
			// 		}
			// 	},
			// 	danger: {
			// 		label: "No",
			// 		className: "btn-default"
			// 	}
			// }
		});
		return false;
	}
});

Template.panelView.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Caseprofile.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Caseprofile.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},
	"stringSplit": function(str, options) {
    if(str){
      var ret = "";
      
      var tempArr = str.trim().split(options.hash["delimiter"]);

      for(var i=0; i < tempArr.length; i++)
      {
        ret = ret + options.fn(tempArr[i]);
      }

      return ret;
    }
  },
  "getClientName":function(value){
        var name2 = value.split(",");
        return name2[0];
    }
});

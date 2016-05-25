var pageSession = new ReactiveDict();

Template.apptModal.helpers({
    "getApptDetail":function(){
        return Appt.find({}, {sort:[["apptDate","asc"]]}).fetch();
    },
    "infoMessage": function() {
		return pageSession.get("apptInsertFormInfoMessage");
	}
});
Template.apptModal.rendered = function() {
	Meteor.subscribe("appt_list");
	pageSession.set("apptInsertFormInfoMessage", "");
}

Template.apptModal.events({
	"click #appt-insert-button": function(e, t) {
		e.preventDefault();
		//Router.go("appt.insert", {});
		//e.preventDefault();
		var me = this;
		bootbox.dialog({
			message:  "<div id='dialogAnchor'></div>",
			title: "Add New Appointment",
			animate: false
		});
		Blaze.render(Template.ApptInsert, $("#dialogAnchor")[0])
		return false;		
	},
	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: true,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Appt.remove({ _id: me._id });
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
	"keyup #SearchApptInput": function(e, t) {
		e.preventDefault();
		console.log("search dual list");
		var me = $('#SearchApptInput');
		console.log("text ", me.val())
		var code = e.keyCode || e.which;
		if (code == '9') return;
		if (code == '27') me.val(null);
		var $rows = $(e.target).closest('.dual-list').find('.table-row');
		console.log('row', $rows);
		var val = $.trim(me.val()).replace(/ +/g, ' ').toLowerCase();
		console.log("==", val);
		$rows.show().filter(function() {
			var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
			console.log("==text", text);
			return !~text.indexOf(val);
		}).hide();
		return false;
	}
	
});
Template.courts.rendered = function() {
    meteor.typeahead.inject();
};

Template.courts.helpers({
    "courts": function() {
        return Courts.find().fetch();
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
                var $rows = $(e.target).closest('.dual-list').find('.list-group a');
                console.log('row', $rows);
                var val = $.trim(me.val()).replace(/ +/g, ' ').toLowerCase();
                console.log("==", val);
                $rows.show().filter(function () {
                    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                    console.log("==text", text);
                    return !~text.indexOf(val);
                }).hide();
                return false;
            }
});
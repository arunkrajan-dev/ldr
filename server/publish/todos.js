Meteor.publish('tasks_list', function() {
    return Tasks.find({});
});

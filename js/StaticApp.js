(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/StaticApp.js                                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.startup(function () {                                           // 1
  Meteor.disconnect();                                                 // 2
});                                                                    //
                                                                       //
Tasks = new Ground.Collection(null);                                   // 5
                                                                       //
Template.body.helpers({                                                // 7
  tasks: function () {                                                 // 8
    // Show newest tasks at the top                                    //
    return Tasks.find({}, { sort: { createdAt: -1 } });                // 10
  }                                                                    //
});                                                                    //
                                                                       //
Template.body.events({                                                 // 14
  "submit .new-task": function (event) {                               // 15
    // Prevent default browser form submit                             //
    event.preventDefault();                                            // 17
                                                                       //
    // Get value from form element                                     //
    var text = event.target.text.value;                                // 20
                                                                       //
    // Insert a task into the collection                               //
    Tasks.insert({                                                     // 23
      text: text,                                                      // 24
      createdAt: new Date() // current time                            // 25
    });                                                                //
                                                                       //
    // Clear form                                                      //
    event.target.text.value = "";                                      // 29
  }                                                                    //
});                                                                    //
                                                                       //
Template.task.events({                                                 // 33
  "click .toggle-checked": function () {                               // 34
    // Set the checked property to the opposite of its current value   //
    Tasks.update(this._id, {                                           // 36
      $set: { checked: !this.checked }                                 // 37
    });                                                                //
  },                                                                   //
  "click .delete": function () {                                       // 40
    Tasks.remove(this._id);                                            // 41
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

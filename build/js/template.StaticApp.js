(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, HTML.Raw('\n    <header>\n      <h1>Todo List</h1>\n \n      <form class="new-task">\n        <input type="text" name="text" placeholder="Type to add new tasks">\n      </form>\n    </header>\n \n    '), HTML.UL("\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("tasks"));
  }, function() {
    return [ "\n        ", Spacebars.include(view.lookupTemplate("task")), "\n      " ];
  }), "\n    "), "\n  ");
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("task");
Template["task"] = new Template("Template.task", (function() {
  var view = this;
  return HTML.LI({
    "class": function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("checked"));
      }, function() {
        return "checked";
      });
    }
  }, HTML.Raw('\n    <button class="delete">&times;</button>\n \n    '), HTML.INPUT({
    type: "checkbox",
    checked: function() {
      return Spacebars.mustache(view.lookup("checked"));
    },
    "class": "toggle-checked"
  }), "\n \n    ", HTML.SPAN({
    "class": "text"
  }, Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n  ");
}));

}).call(this);

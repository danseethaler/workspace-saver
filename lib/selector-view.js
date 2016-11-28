var MySelectListView, SelectListView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SelectListView = require('atom-space-pen-views').SelectListView;

MySelectListView = (function(superClass) {
  extend(MySelectListView, superClass);

  function MySelectListView() {
    return MySelectListView.__super__.constructor.apply(this, arguments);
  }

  MySelectListView.prototype.initialize = function() {
    MySelectListView.__super__.initialize.apply(this, arguments);
    this.addClass('overlay from-top');
    this.setItems(['Hello', 'World']);
    if (this.panel == null) {
      this.panel = atom.workspace.addModalPanel({
        item: this
      });
    }
    this.panel.show();
    return this.focusFilterEditor();
  };

  MySelectListView.prototype.viewForItem = function(item) {
    return "<li>" + item + "</li>";
  };

  MySelectListView.prototype.confirmed = function(item) {
    return console.log(item + " was selected");
  };

  MySelectListView.prototype.cancelled = function() {
    return console.log("This view was cancelled");
  };

  return MySelectListView;

})(SelectListView);

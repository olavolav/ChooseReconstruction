app.FilterView = Backbone.View.extend({
  tagName: 'li',
  className: 'filter',
  template: _.template($('#category-template').html()),
  
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    _.bindAll(this, 'click_in_neutral_button', 'click_in_yes_button', 'click_in_no_button');
  },
  
  render: function() {
    // alert("DEBUG: rendering category "+this.model.get("name"));
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  },
  
  events: {
    // Defining events via inactive buttons also makes sure that nothing happens if
    // click happens on active buttons
    "click .filter-btn-neutral-inactive": "click_in_neutral_button",
    "click .filter-btn-yes-inactive": "click_in_yes_button",
    "click .filter-btn-no-inactive": "click_in_no_button"
  },
  
  click_in_neutral_button: function() { this.click_in_filter_buttons(0); },
  click_in_yes_button: function() { this.click_in_filter_buttons(1); },
  click_in_no_button: function() { this.click_in_filter_buttons(-1); },
  
  click_in_filter_buttons: function(new_value) {
    // alert("DEBUG: click_in_filter_buttons, new_value = "+new_value);
    this.model.set('value', new_value);
  }
  
});

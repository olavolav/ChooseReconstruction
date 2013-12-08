app.FilterView = Backbone.View.extend({
  tagName: 'li',
  className: 'filter',
  template: _.template($('#category-template').html()),
  
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    _.bindAll(this, 'click_in_neutral_button', 'click_in_yes_button', 'click_in_no_button', 'show_help_text', 'hide_help_text', 'toggle_help_text');
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
    "click .filter-btn-yes-active": "click_in_yes_button",
    "click .filter-btn-no-inactive": "click_in_no_button",
    "click .filter-btn-no-active": "click_in_no_button",
    "mouseover .filter_tooltip_icon": "show_help_text",
    "mouseleave .filter_tooltip_icon": "hide_help_text",
    // same for touch screens
    "click .filter_tooltip_icon": "toggle_help_text"
  },
  
  click_in_neutral_button: function() { this.click_in_filter_buttons(0); },
  click_in_yes_button: function() { this.click_in_filter_buttons(1); },
  click_in_no_button: function() { this.click_in_filter_buttons(-1); },
  
  click_in_filter_buttons: function(new_value) {
    // alert("DEBUG: click_in_filter_buttons, new_value = "+new_value);
    if(new_value !== this.model.get('value')) {
      this.model.set('value', new_value);
    } else {
      // this is if the user clicked on an active filter
      this.model.set('value', 0);
    }
  },
  
  show_help_text: function() {
    // alert(this.model.get('help_text'));
    this.$el.find('.filter_help_text').show();
  },
  
  hide_help_text: function() {
    this.$el.find('.filter_help_text').hide();
  },
  
  toggle_help_text: function() {
    if(this.$el.find('.filter_help_text').css('display') === 'none') {
      this.show_help_text();
    } else {
      this.hide_help_text();
    }
  }
  
});

app.FilterView = Backbone.View.extend({
  tagName: 'li',
  className: 'filter',
  template: _.template($('#category-template').html()),
  
  render: function() {
    // alert("DEBUG: rendering category "+this.model.get("name"));
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  },
  
  events: {
    "click .filter-btn": "click_in_filter_buttons"
  },
  
  click_in_filter_buttons: function() {
    alert("DEBUG: click_in_filter_buttons");
  },
  
  filter_setting_right_now: function() {
    return this.$el.find('select').val();
  },
  
  launch_filtering: function(event) {
    // alert("DEBUG: change in filter value for category "+this.model.get("name"));
    var match_count = methods.apply_filter();
    categories.render_filter_stats(match_count);
  }
  
});

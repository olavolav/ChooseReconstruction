app.ReconstructionMethodView = Backbone.View.extend({
  tagName: 'li',
  className: 'rec_method',
  template: _.template($('#method-template').html()),
  
  initialize: function() {
    this.listenTo(this.model, 'change:matches_current_filters', this.filter_matching_state_has_changed);
    _.bindAll(this, 'filter_matching_state_has_changed', 'hide', 'show');
  },
  
  render: function() {
    // alert("DEBUG: rendering category "+this.model.get("name"));
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  },
  
  filter_matching_state_has_changed: function(model, value) {
    // alert("DEBUG: call to ReconstructionMethodView::filter_matching_state_has_changed");
    if(value === true) {
      this.show();
    } else {
      this.hide();
    }
  },
  
  hide: function() {
    // alert("hide");
    // this.$el.addClass('hidden-method');
    // this.$el.fadeTo(500, 0.2);
    this.$el.fadeTo(500, 0.2, function() {
      $(this).addClass('hidden-method');
    });
  },
  
  show: function() {
    // alert("show");
    this.$el.fadeTo(500, 1);
    this.$el.removeClass('hidden-method');
  }
  
});

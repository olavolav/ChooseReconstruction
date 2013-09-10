app.FilterSection = Backbone.View.extend({
  el: $('#criteria'),
  
  initialize: function(list) {
    this.collection = list;
    _.bindAll(this, 'render_filter');
    this.render();
  },
  
  render: function() {
    this.collection.each(function( item ) {
      this.render_filter( item );
    }, this );
  },
  
  render_filter: function( item ) {
    var filter_view = new app.FilterView({
      model: item
    });
    this.$el.append( filter_view.render().el );
  }
  
});

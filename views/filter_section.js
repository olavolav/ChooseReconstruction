app.FilterSection = Backbone.View.extend({
  el: $('#criteria'),
  
  stats_field: $('#filterstats'),
  stats_field_template: _.template($('#filterstats-template').html()),
  
  initialize: function(list) {
    this.collection = list;
    _.bindAll(this, 'render', 'render_filter', 'render_match_stats');
    // this.stats_field = $('#filterstats');
    app.bind('new_filters_applied', this.render_match_stats);
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
  },
  
  render_match_stats: function(count) {
    this.stats_field.html(this.stats_field_template({nr: count}));
  }
  
});

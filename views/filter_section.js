app.FilterSection = Backbone.View.extend({
  el: $('#criteria'),
  data_type_filter_el: $('#criteria-data-types'),
  feature_filter_el: $('#criteria-features'),
  
  stats_field: $('#filterstats'),
  stats_field_template: _.template($('#filterstats-template').html()),
  
  initialize: function(list) {
    this.collection = list;
    _.bindAll(this, 'render', 'render_feature_filter', 'render_data_type_filter', 'render_match_stats');
    // this.stats_field = $('#filterstats');
    app.bind('new_filters_applied', this.render_match_stats);
    this.render();
  },
  
  render: function() {
    this.collection.select_data_type_filters().each(function( item ) {
      // alert("rendering '"+item.get('name')+"' as data type filter...");
      this.render_data_type_filter( item );
    }, this );
    
    this.collection.select_feature_filters().each(function( item ) {
      // alert("rendering '"+item.get('name')+"' as feature filter...");
      this.render_feature_filter( item );
    }, this );
  },
  
  render_data_type_filter: function( item ) {
    var filter_view = new app.FilterView({
      model: item
    });
    this.data_type_filter_el.append( filter_view.render().el );
  },
  
  render_feature_filter: function( item ) {
    var filter_view = new app.FilterView({
      model: item
    });
    this.feature_filter_el.append( filter_view.render().el );
  },
  
  render_match_stats: function(count) {
    this.stats_field.html(this.stats_field_template({nr: count}));
  }
  
});

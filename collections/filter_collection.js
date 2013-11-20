app.FilterList = Backbone.Collection.extend({
  model: app.Filter,
  el: $('#criteria'),
  filter_stats_template: _.template($('#filterstats-template').html()),
  filter_element: $('#filterstats'),
  
  initialize: function() {
    _.bindAll(this, 'generate_from_method_collection', 'select_data_type_filters', 'select_feature_filters', 'trigger_new_search', 'register', 'render_filter_stats');
    this.listenTo(this, 'change', this.trigger_new_search);
  },
  
  generate_from_method_collection: function(method_list) {
    var coll = this;
    // alert("DEBUG: call to generate_from_method_collection with "+method_list.length+" methods.");
    // register properties as future filter categories
    method_list.each(function(one_method) {
      // alert("DEBUG: "+one_method.get('name'));
      _(one_method.get("properties")).each(function(value, key) {
        // alert("DEBUG: "+key);
        coll.register(key);
      });
    });
  },
  
  select_data_type_filters: function() {
    return _(this.select(function(f){
      return f.get('data_type_filter') === true;
    }));
  },
  
  select_feature_filters: function() {
    return _(this.select(function(f){ return f.get('data_type_filter') === false; }));
  },
  
  trigger_new_search: function() {
    // alert("DEBUG: call to FilterList::trigger_new_search");
    // send an event to the method section that the filter settings have changed
    app.trigger('new_filter_settings', this.models);
  },
  
  register: function(c_name) {
    var c_names_so_far_collected = this.pluck("name");
    var c_name_already_present = false;

    if(c_names_so_far_collected.length) {
      if( _(c_names_so_far_collected).contains(c_name) ) {
        c_name_already_present = true;
      }
    }
    
    if(!c_name_already_present) {
      // A bit of a hack: We specify the filter type by the name
      var looks_like_data_filter = (c_name.substring(0, 10) === "Works with");
      // alert("DEBUG: found new category: "+c_name+", looks_like_data_filter = "+looks_like_data_filter);
      var new_c = new app.Filter({
        'name': c_name,
        'data_type_filter': looks_like_data_filter
      });
      this.add(new_c);
    }
  },
  
  render_filter_stats: function(match_count) {
    this.filter_element.html(this.filter_stats_template({nr: match_count}));
  }
  
});

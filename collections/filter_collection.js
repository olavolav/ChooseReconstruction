app.FilterList = Backbone.Collection.extend({
  model: app.Filter,
  el: $('#criteria'),
  filter_stats_template: _.template($('#filterstats-template').html()),
  filter_element: $('#filterstats'),
  
  initialize: function() {
    _.bindAll(this, 'generate_from_method_collection', 'register', 'render_filter_stats');
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
  
  register: function(c_name) {
    var c_names_so_far_collected = this.pluck("name");
    var c_name_already_present = false;

    if(c_names_so_far_collected.length) {
      if( _(c_names_so_far_collected).contains(c_name) ) {
        c_name_already_present = true;
      }
    }
    
    if(!c_name_already_present) {
      // alert("DEBUG: found new category: "+c_name);
      var new_c = new app.Filter({"name" : c_name});
      this.add(new_c);
    }
  },
  
  render_filter_stats: function(match_count) {
    this.filter_element.html(this.filter_stats_template({nr: match_count}));
  }
  
});

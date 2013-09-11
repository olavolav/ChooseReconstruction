app.ReconstructionMethodList = Backbone.Collection.extend({
  model: app.ReconstructionMethod,
  
  initialize: function() {
    _.bindAll(this, 'apply_filter');
    app.bind('new_filter_settings', this.apply_filter);
  },
  
  apply_filter: function(filter_collection) {
    // alert("DEBUG: call to ReconstructionMethodList::apply_filter");
    var matching_method_count = 0;
    _(this.models).each( function(mod) {
      // var mod = this; // the model we are examining right now
      var all_categories_okay = true;
      
      _(filter_collection).each( function(filter) {
        // var categ = this; // the category we are checking right now
        // alert(filter.get('name'));
        // var f_value = categ.get('value');
        
        var match_here = filter.can_match_method_right_now(mod);
        // alert(filter.get('name')+" match: "+match_here);
        if(!match_here) {
          all_categories_okay = false;
          // alert("DEBUG: "+mod.get('name')+" is _not_ a match");
          return false;
        }
      });
      if(all_categories_okay) {
        // alert("DEBUG: "+mod.get('name')+" is a match");
        // mod.view.show();
        mod.set('matches_current_filters', true);
        matching_method_count++;
      } else {
        // mod.view.hide();
        mod.set('matches_current_filters', false);
      }
    });
    app.trigger('new_filters_applied', matching_method_count);
    return matching_method_count;
  }
  
});


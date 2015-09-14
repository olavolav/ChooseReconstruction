app.ReconstructionMethodList = Backbone.Collection.extend({
  model: app.ReconstructionMethod,

  initialize: function() {
    _.bindAll(this, 'apply_filter');
    app.bind('new_filter_settings', this.apply_filter);
  },

  apply_filter: function(filter_collection) {
    var matching_method_count = 0;
    _(this.models).each( function(mod) {
      var all_categories_okay = true;

      _(filter_collection).each( function(filter) {
        var match_here = filter.can_match_method_right_now(mod);

        if(!match_here) {
          all_categories_okay = false;
          return false;
        }
      });

      if(all_categories_okay) {
        mod.set('matches_current_filters', true);
        matching_method_count++;
      } else {
        mod.set('matches_current_filters', false);
      }
    });
    
    app.trigger('new_filters_applied', matching_method_count);
    return matching_method_count;
  }

});

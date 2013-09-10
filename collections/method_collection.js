app.ReconstructionMethodList = Backbone.Collection.extend({
  model: app.ReconstructionMethod,
  
  apply_filter: function() {
    var matching_method_count = 0;
    _(this.models).each( function(mod) {
      // var mod = this; // the model we are examining right now
      var all_categories_okay = true;
      
      _(categories.models).each( function(categ) {
        // var categ = this; // the category we are checking right now
        // alert(categ);
        var f_value = categ.view.filter_setting_right_now();
        
        var match_here = categ.can_match_method_right_now(mod, f_value);
        if(!match_here) {
          all_categories_okay = false;
          return false;
        }
      });
      if(all_categories_okay) {
        mod.view.show();
        matching_method_count++;
      } else {
        mod.view.hide();
      }
    });
    return matching_method_count;
  }
  
});

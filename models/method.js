app.ReconstructionMethod = Backbone.Model.extend({
  
  defaults: function() {
    return {
      name: "Anonymous method",
      properties: {}
      // verified_by_author: false
    };
  },
  
  initialize: function(settings) {
    // add default variables, if they had not been set as parameter to the constructor
    this.set("properties", $.extend({}, DEFAULT_METHOD_PROPERTIES, this.get("properties")));

    this.view = new app.ReconstructionMethodView({model: this});
    methods.add(this);
    
    // // register properties as future filter categories
    // _(this.get("properties")).each( function(value, key) { categories.register(key); } );
  }
  
});

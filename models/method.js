app.ReconstructionMethod = Backbone.Model.extend({

  defaults: function() {
    return {
      name: "Anonymous method",
      properties: {},
      verified_by_author: false,
      matches_current_filters: true, // initially, show all methods
      description: "(description missing)",
      code_repositories: null
    };
  },

  initialize: function(settings) {
    // add default variables, if they had not been set as parameter to the constructor
    this.set("properties", $.extend({}, app.DEFAULT_METHOD_PROPERTIES, this.get("properties")));
  }

});

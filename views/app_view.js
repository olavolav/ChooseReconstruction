app.AppView = Backbone.View.extend({

  el: $('body'),
  statsTemplate: _.template($('#stats-template').html()),

  initialize: function(methods, filters) {
    this.header = $('header');
    this.footer = $('footer .method_count');
    this.filter_section = new app.FilterSection(filters);
    this.methods_section = new app.MethodSection(methods);
    this.methods_count = methods.length;

    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    this.footer.html(this.statsTemplate({nr: this.methods_count}));
  }

});

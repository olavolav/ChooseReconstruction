app.AppView = Backbone.View.extend({
  
  el: $('body'),
  statsTemplate: _.template($('#stats-template').html()),
  
  initialize: function(methods, filters) {
    // alert("init app.");
    this.header = $('header');
    this.footer = $('footer');
    this.filter_section = new app.FilterSection(filters);
    this.methods_section = new app.MethodSection(methods);
    
    this.render();
  },
  
  render: function() {
    // alert("rendering the app.");
    this.footer.html(this.statsTemplate({nr: methods.length}));
  }
  
});

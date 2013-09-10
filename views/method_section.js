app.MethodSection = Backbone.View.extend({
  el: $('#choice_tree'),
  
  initialize: function(list) {
    this.collection = list;
    _.bindAll(this, 'render_method');
    this.render();
  },
  
  render: function() {
    this.collection.each(function(item) {
      this.render_method(item);
    }, this );
  },
  
  render_method: function(item) {
    // alert("render_method called for model "+item.get('name'));
    var method_view = new app.ReconstructionMethodView({
      model: item
    });
    this.$el.append( method_view.render().el );
  }
  
});

app.ModalView = Backbone.View.extend({
  el: $('#modal'),
\  template: _.template($('#modal-template').html()),
  
  initialize: function() {
    _.bindAll(this, 'render', 'show', 'hide');
  },
  
  render: function() {
    // alert("DEBUG: rendering modal for "+this.model.get("name"));
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  },
  
  events: {
    'keydown': 'hide',
    'click': 'hide'
  },
  
  show: function() {
    // alert("DEBUG: showing modal for "+this.model.get("name"));
    this.render();
    $("body").addClass("modal_is_open");
  },
  
  hide: function() {
    // alert("hiding modal... (t.b.d.)");
    $("body").removeClass("modal_is_open");
  }
  
});

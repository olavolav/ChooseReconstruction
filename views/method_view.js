app.ReconstructionMethodView = Backbone.View.extend({
  tagName: 'li',
  className: 'rec_method',
  template: _.template($('#method-template').html()),
  
  render: function() {
    // alert("render called for method view of "+this.model.get('name'));
    // assemble properties list string
    var prop = _.reduce(this.model.get("properties"), function(memo, value, key) {
      return memo+"<li>"+key+": "+(value ? "Yes" : "No")+"</li>";
    }, "");
    
    this.$el.html( this.template({
      "name" : this.model.get("name"),
      "properties_list" : prop,
      "reference_url" : this.model.get("reference_url")
    }));
    
    // switch on 'verified' flag
    if(this.model.get("verified_by_author")) {
      // alert("DEBUG: method "+this.model.get("name")+" was verified by the author.");
      this.$el.find('.verified_symbol').show();
    }
    return this;
  },
  
  hide: function() {
    this.$el.fadeTo(500, 0.2);
  },
  
  show: function() {
    this.$el.fadeTo(500, 1);
  }
  
});

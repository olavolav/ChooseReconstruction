app.Filter = Backbone.Model.extend({
  
  defaults: function() {
    return {
      name: "unknown",
      filter_value: 0
    };
  },
  
  initialize: function() {
    // categories.add(this);
    this.view = new app.FilterView({model: this});
  },
  
  matches_name: function(c_name) {
    return this.get("name") == c_name;
  },
  
  can_match_method_right_now: function(m_model, filter_value) {
    if(filter_value == '-') return true;
    if(filter_value == 'Yes' && m_model.get("properties")[this.get("name")] == true) return true;
    if(filter_value == 'No' && m_model.get("properties")[this.get("name")] == false) return true;
    return false;
  }
  
});

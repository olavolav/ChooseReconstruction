app.Filter = Backbone.Model.extend({
  
  initialize: function() {
    _.bindAll(this, 'matches_name', 'can_match_method_right_now');
  },
  
  defaults: function() {
    return {
      name: "unknown",
      value: 0 // default filter setting: neutral
    };
  },
  
  matches_name: function(c_name) {
    return this.get("name") == c_name;
  },
  
  can_match_method_right_now: function(m_model) {
    if(this.get('value') === 0) return true;
    if(this.get('value') === 1 && m_model.get("properties")[this.get("name")] === true) return true;
    if(this.get('value') === -1 && m_model.get("properties")[this.get("name")] === false) return true;
    return false;
  }
  
});

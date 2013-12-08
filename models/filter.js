app.Filter = Backbone.Model.extend({
  
  initialize: function() {
    _.bindAll(this, 'can_match_method_right_now');
  },
  
  defaults: function() {
    return {
      name: "unknown",
      help_text: null,
      value: 0, // default filter setting: neutral (0)
      // other settings: on (1) and for features filters: off (-1)
      data_type_filter: false // true for 'Works with X' filters
    };
  },
  
  can_match_method_right_now: function(m_model) {
    if(this.get('value') === 0) return true;
    if(this.get('value') === 1 && m_model.get("properties")[this.get("name")] === true) return true;
    if(this.get('value') === -1 && m_model.get("properties")[this.get("name")] === false) return true;
    return false;
  }
  
});

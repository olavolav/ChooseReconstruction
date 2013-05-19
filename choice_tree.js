// This is the source file for the ChooseReconstructions site, written using
// Backbone.js. The whole thing is completely static, all the content is
// hard-coded at the end of this file.
//
// by Olav Stetter, 2013


/** @depend jquery-1.7.2.min.js
  * @depend underscore-min.js
  * @depend backbone.js
  */

$(document).ready(function(){
  // alert("document ready.");
  
  var DEFAULT_METHOD_PROPERTIES = {
    "non-linear" : false,
    "can work with single cell resolution" : false,
    "can work with macro scale resolution" : false,
    "can work with calcium fluorescence data" : false,
    "can work with spike data" : false,
    "can work with anatomical data" : false,
    "can work with fMRI data" : false,
    "model-free" : false,
    "yields the ground truth, no approximation" : false
  };
  
  // define individual methods
  var ReconstructionMethod = Backbone.Model.extend({
    
    defaults: function() {
      return {
        name: "Anonymous method",
        properties: {}
        // verified_by_author: false
      };
    },
    
    initialize: function(settings) {
      // add default variables, if they had not been set as parameter to the constructor
      var met = this;
      var temp_props = met.get("properties");
      _.each(DEFAULT_METHOD_PROPERTIES, function(value, key) {
        if(typeof(temp_props[key]) == "undefined") {
          // alert("DEBUG: adding default value to "+met.get("name")+", namely "+key+" : "+value);
          temp_props[key] = value; // add default value
        }
      });
      met.set("properties", temp_props);
      
      // alert("initialized method: "+this.get("name"));
      this.view = new ReconstructionMethodView({model: this});
      methods.add(this);
      
      // register properties as future filter categories
      _.each(this.get("properties"), function(value, key){categories.register(key)} );
    }
    
  });
  
  // define container class for all methods
  var ReconstructionMethodList = Backbone.Collection.extend({
    model: ReconstructionMethod,
    
    apply_filter: function() {
      _.each(this.models, function(mod) {
        // var mod = this; // the model we are examining right now
        var all_categories_okay = true;
        
        _.each(categories.models, function(categ) {
          // var categ = this; // the category we are checking right now
          // alert(categ);
          var f_value = categ.view.filter_setting_right_now();
          
          var match_here = categ.can_match_method_right_now(mod, f_value);
          if(!match_here) {
            all_categories_okay = false;
            return false;
          }
        });
        if(all_categories_okay) {
          mod.view.show();
        } else {
          mod.view.hide();
        }
      });
    }
  });
  
  // create list of methods
  var methods = new ReconstructionMethodList();
  
  // define view for methods
  var ReconstructionMethodView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#method-template').html()),
    // template: _.template('<h2><%= name %></h2>'),
    
    initialize: function() {
      // alert("initializing view for method: "+this.model.get("name"));
      // create a new list item for this method
      $('#choice_tree').append('<li class="rec_method">Rendering method...</li>');
      this.$el = $('#choice_tree').find('li').eq(-1);
      this.render();
    },
    
    events: {
      'mouseenter': 'hover_on',
      'mouseleave': 'hover_off'
    },
    
    render: function() {
      // alert("rendering view for method: "+this.model.get("name"));
      
      // assemble proprties list string
      var prop = _.reduce(this.model.get("properties"), function(memo, value, key){ return memo+"<li>"+key+": "+(value ? "Yes" : "No")+"</li>"; }, "")
      // alert("DEBUG: prop = "+prop);
      
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
    },
    
    hover_on: function() {
      this.$el.addClass('method_hover');
    },
    
    hover_off: function() {
      this.$el.removeClass('method_hover');
    },
    
    hide: function() {
      // this.$el.fadeOut();
      this.$el.fadeTo(500, 0.2);
    },
    
    show: function() {
      this.$el.fadeTo(500, 1);
    }
    
  });
  
  // define one of categories that a method can have
  var Category = Backbone.Model.extend({
    
    defaults: function() {
      return {name : "unknown"}
    },
    
    initialize: function() {
      categories.add(this);
      this.view = new CategoryView({model: this});
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
  
  // define container class for all categories
  var CategoryList = Backbone.Collection.extend({
    model: Category,
    el: $('#criteria'),
    
    register: function(c_name) {
      var c_names_so_far_collected = this.pluck("name");
      var c_name_already_present = false;

      if(c_names_so_far_collected.length) {
        if(_.contains(c_names_so_far_collected, c_name)) {
          c_name_already_present = true;
        }
      }
      
      if(!c_name_already_present) {
        // alert("DEBUG: found new category: "+c_name);
        var new_c = new Category({"name" : c_name});
        this.add(new_c);
      }
    }
    
    // apply_filter: function(c_name, value) {
    //   // alert("DEBUG: applying new filter: "+c_name+" -> "+value);
    // }
    
  });
  
  // create list of categories
  var categories = new CategoryList();
  
  // define view for categories
  var CategoryView = Backbone.View.extend({
    template: _.template($('#category-template').html()),
    
    initialize: function() {
      this.render();
    },
    
    render: function() {
      // alert("DEBUG: rendering category "+this.model.get("name"));
      $("#criteria").append(this.template(this.model.toJSON()));
      this.$el = $('#criteria').find('li').eq(-1);
    },
    
    events: {
      "change select": "launch_filtering"  
    },
    
    filter_setting_right_now: function() {
      return this.$el.find('select').val();
    },
    
    launch_filtering: function(event) {
      // alert("DEBUG: change in filter value for category "+this.model.get("name"));
      methods.apply_filter();
    }
    
  });
  
  // define the app view itself
  var AppView = Backbone.View.extend({
    
    el: $('body'),
    statsTemplate: _.template($('#stats-template').html()),
    
    initialize: function() {
      // alert("init app.");
      this.header = $('header');
      this.footer = $('footer');
      this.render();
    },
    
    render: function() {
      // alert("rendering the app.");
      // categories.render();
      this.footer.html(this.statsTemplate({nr: methods.length}));
    }
    
  });
  
  
  
  // declare reconstruction methods and their features
  new ReconstructionMethod({name: "Cross-Correlation", properties: {
      "can work with single cell resolution" : true,
      "can work with calcium fluorescence data" : true,
      "can work with macro scale resolution" : true
    },
    reference_url : 'http://en.wikipedia.org/wiki/Correlation_and_dependence'
  });
  new ReconstructionMethod({name: "Mutual Information", properties: {
      "can work with single cell resolution" : true,
      "non-linear" : true,
      "model-free" : true,
      "can work with spike data" : true
    },
    reference_url : 'http://en.wikipedia.org/wiki/Mutual_information'
  });
  new ReconstructionMethod({name: "Granger Causality", properties: {
      "can work with single cell resolution" : true,
      "can work with macro scale resolution" : true
    },
    reference_url : 'http://en.wikipedia.org/wiki/Correlation_and_dependence'
  });
  new ReconstructionMethod({name: "Transfer Entropy", properties: {
      "non-linear" : true,
      "can work with single cell resolution" : true,
      "model-free" : true,
      "can work with spike data" : true
    },
    reference_url : 'http://prl.aps.org/abstract/PRL/v85/i2/p461_1'
  });
  new ReconstructionMethod({name: "Generalized Transfer Entropy", properties: {
      "non-linear" : true,
      "can work with single cell resolution" : true,
      "can work with calcium fluorescence data" : true,
      "model-free" : true,
      "can work with spike data": true
    },
    reference_url : 'http://www.ploscompbiol.org/article/info:doi/10.1371/journal.pcbi.1002653',
    verified_by_author : true
  });
  new ReconstructionMethod({name: "Bayesian Inference", properties: {
      "non-linear" : true,
      "can work with single cell resolution" : true,
      "can work with calcium fluorescence data" : true
    },
    reference_url : 'http://projecteuclid.org/DPubS?service=UI&version=1.0&verb=Display&handle=euclid.aoas/1310562720'
  });
  new ReconstructionMethod({name: "Anatomical Reconstruction", properties: {
      "can work with single cell resolution" : true,
      "can work with anatomical data" : true,
      "model-free" : true
    },
    reference_url : 'http://www.springerlink.com/index/10.1007/s10827-012-0390-z'
  });
  new ReconstructionMethod({name: "Tensor Diffusion Imaging", properties: {
      "can work with anatomical data" : true,
      "can work with macro scale resolution" : true
    },
    reference_url : 'http://www.pnas.org/content/109/28/11372.short'
  });
  new ReconstructionMethod({name: "Patch Clamp", properties: {
      "can work with single cell resolution" : true,
      "yields the ground truth, no approximation" : true
    },
    reference_url : 'http://www.annualreviews.org/doi/pdf/10.1146/annurev.ph.46.030184.002323'
  });
  
  
  // start app
  var app = new AppView;
  
});

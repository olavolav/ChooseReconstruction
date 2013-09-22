var app = app || {};
_.extend(app, Backbone.Events); // to enable observer role of EventDispatcher


var DEFAULT_METHOD_PROPERTIES = {
  "non-linear" : false,
  "can work with single cell resolution" : false,
  "can work with macro scale resolution" : false,
  "can work with calcium fluorescence data" : false,
  "can work with spike data" : false,
  "can work with anatomical data" : false,
  "can work with fMRI data" : false,
  "model-free" : false,
  "has been tested in simulations": false,
  "has been applied to real data": false
};

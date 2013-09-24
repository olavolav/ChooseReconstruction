var app = app || {};
_.extend(app, Backbone.Events); // to enable observer role of EventDispatcher


var DEFAULT_METHOD_PROPERTIES = {
  "Non-linear" : false,
  "Can work with single cell resolution" : false,
  "Can work with macro scale resolution" : false,
  "Can work with calcium fluorescence data" : false,
  "Can work with spike data" : false,
  "Can work with anatomical data" : false,
  "Can work with fMRI data" : false,
  "Model-free" : false,
  "Has been tested in simulations": false,
  "Has been applied to real data": false
};

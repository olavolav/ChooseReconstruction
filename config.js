var app = app || {};
_.extend(app, Backbone.Events); // to enable observer role of EventDispatcher


var DEFAULT_METHOD_PROPERTIES = {
  "Non-linear" : false,
  "Works with single cell resolution" : false,
  "Works with macro scale resolution" : false,
  "Works with calcium fluorescence data" : false,
  "Works with spike data" : false,
  "Works with anatomical data" : false,
  "Works with fMRI data" : false,
  "Model-free" : false,
  "Has been tested in simulations": false,
  "Has been applied to real data": false
};

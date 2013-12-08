var app = app || {};
_.extend(app, Backbone.Events); // to enable observer role of EventDispatcher


app.FILTER_DEFINITIONS = {
  "Non-linear": {
    'default': false,
    'help_text': 'The method does not rely on a linearity asumption of neuronal dynamics, i.e. can capture non-linear interactions.'
  },
  "Works with single cell resolution": {
    'default': false,
    'help_text': 'The method has been used in at least one peer-reviewed journal for network reconstruction at single neuron level.'
  },
  "Works with macro scale resolution": {
    'default': false,
    'help_text': 'The method has been used in at least one peer-reviewed journal for network reconstruction of connectivity between brain regions.'
  },
  "Works with calcium fluorescence data": {
    'default': false,
    'help_text': 'The method has been used in at least one peer-reviewed journal for network reconstruction based on calcium imaging data.'
  },
  "Works with spike data": {
    'default': false,
    'help_text': 'The method has been used in at least one peer-reviewed journal for network reconstruction based on spike times, for example from a multi-electrode array.'
  },
  "Works with anatomical data": {
    'default': false,
    'help_text': 'The method has been used in at least one peer-reviewed journal for network reconstruction based on electron-microscopy images of thin slices of neuronal tissue.'
  },
  "Works with fMRI data": {
    'default': false,
    'help_text': 'The method has been used in at least one peer-reviewed journal for network reconstruction based on MRI recordings.'
  },
  "Works with EEG data": {
    'default': false,
    'help_text': 'The method has been used in at least one peer-reviewed journal for network reconstruction based on multi-electrode EEG recordings.'
  },
  "Model-free": {
    'default': false,
    'help_text': 'The method makes no assumptions about the underlying neuronal dynamics, which can be a strength if an appropriate model for all or some neurons is not known.'
  },
  "Has been tested in simulations": {
    'default': false,
    'help_text': 'The method has been applied and benchmarked, in at least one peer-reviewed journal, to simulated neuronal data (in silice).'
  },
  "Has been applied to real data": {
    'default': false,
    'help_text': 'The method has been applied and benchmarked, in at least one peer-reviewed journal, to recordings of (biological) neuronal data (in vitro or in vivo).'
  },
  "Standard method": {
    'default': false,
    'help_text': 'The method has been used in at least 10 peer-reviewed publications.'
  }
};

app.DEFAULT_METHOD_PROPERTIES = {};
_(app.FILTER_DEFINITIONS).map( function(properties, name) {
  app.DEFAULT_METHOD_PROPERTIES[name] = properties['default'];
});

app.FILTER_HELP_TEXTS = {};
_(app.FILTER_DEFINITIONS).map( function(properties, name) {
  app.FILTER_HELP_TEXTS[name] = properties['help_text'];
});

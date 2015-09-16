var app = app || {};

app.methods = new app.ReconstructionMethodList();

// declare reconstruction methods and their features
app.methods.add( new app.ReconstructionMethod({name: "Cross-Correlation",
  properties: {
    "Works with single cell resolution": true,
    "Works with calcium fluorescence data": true,
    "Works with macro scale resolution": true,
    "Works with fMRI data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true,
    "Standard method": true
  },
  description: 'Correlation is a standard method to quantify the statistical similarity between time series. Asymmetry in the direction is achieved by introducing a time-lag. Nevertheless, correlation does not imply causation.',
  references: {'Wikipedia article': 'http://en.wikipedia.org/wiki/Correlation_and_dependence'},
  code_repositories: {'As part of the TE-Causality package (C++)': 'https://github.com/olavolav/TE-Causality', 'Matlab function xcorr': 'http://www.mathworks.com/help/signal/ref/xcorr.html'}
}));

app.methods.add( new app.ReconstructionMethod({name: "Mutual Information",
  properties: {
    "Works with single cell resolution": true,
    "Non-linear": true,
    "Model-free": true,
    "Works with spike data": true,
    "Works with macro scale resolution": true,
    "Works with fMRI data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true,
    "Standard method": true
  },
  description: 'As the non-linear generalization of Cross-correlation, Mutual Information has become a standard estimator in the neurosciences.',
  references: {
    'Wikipedia article': 'http://en.wikipedia.org/wiki/Mutual_information',
    'Margolin, A.A., Nemenman, I., Basso, K., Wiggins, C., Stolovitzky, G., Favera, R.D., and Califano, A. (2006). ARACNE: An algorithm for the reconstruction of gene regulatory networks in a mammalian cellular context. BMC Bioinformatics 7, S7.': 'http://www.ncbi.nlm.nih.gov/pubmed/16723010',
    'Quinn, C.J., Coleman, T.P., Kiyavash, N., and Hatsopoulos, N.G. (2010). Estimating the directed information to infer causal relationships in ensemble neural spike train recordings. J Comput Neurosci 30, 17–44.': 'http://www.springerlink.com/index/10.1007/s10827-010-0247-2'},
  code_repositories: {'As part of the TE-Causality package (C++)': 'https://github.com/olavolav/TE-Causality'}
}));

app.methods.add( new app.ReconstructionMethod({name: "Incremental Mutual Information",
  properties: {
    "Works with single cell resolution": true,
    "Non-linear": true,
    "Model-free": true,
    "Works with spike data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true
  },
  description: 'Incremental Mutual Information is a modification of Mutual Information which conditions out temporal dependencies in the responses of neurons, to better disambiguate different connectivity motifs.',
  references: {
    'Singh, A., and Lesica, N.A. (2010). Incremental mutual information: A new method for characterizing the strength and dynamics of connections in neuronal circuits. PLoS Comput Biol 6, e1001035.': 'http://dx.plos.org/10.1371/journal.pcbi.1001035.g005'},
  verified_by_author: "Abhinav Singh"
}));

app.methods.add( new app.ReconstructionMethod({name: "Granger Causality",
  properties: {
    "Works with single cell resolution": true,
    "Works with macro scale resolution": true,
    "Works with spike data": true,
    "Works with fMRI data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true,
    "Standard method": true
  },
  description: 'Clive Granger described causality as improved prediction, and in that sense is Granger Causality a causal estimator in a linear auto-regressive framework.',
  references: {
    'Wikipedia article': 'http://en.wikipedia.org/wiki/Granger_causality',
    'Granger, C. (1969). Investigating causal relations by econometric models and cross-spectral methods. Econometrica 37, 424–438.': 'http://www.jstor.org/stable/1912791',
    'Cadotte, A.J., DeMarse, T.B., He, P., and Ding, M. (2008). Causal measures of structure and plasticity in simulated and living neural networks. PLoS One 3, e3355.': 'http://dx.plos.org/10.1371/journal.pone.0003355.t002',
    'Ladroue, C., Guo, S., Kendrick, K., and Feng, J. (2009). Beyond element-wise interactions: Identifying complex interactions in biological processes. PLoS One 4, e6899.': 'http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2746320/',
    'Nedungadi, A.G., Rangarajan, G., Jain, N., and Ding, M. (2009). Analyzing multiple spike trains with nonparametric Granger causality. J Comput Neurosci 27, 55–64.': 'http://link.springer.com/article/10.1007/s10827-008-0126-2'
  },
  code_repositories: {'As part of the TE-Causality package (C++)': 'https://github.com/olavolav/TE-Causality'}
}));

app.methods.add( new app.ReconstructionMethod({name: "Transfer Entropy",
  properties: {
    "Non-linear": true,
    "Works with single cell resolution": true,
    "Works with macro scale resolution": true,
    "Model-free": true,
    "Works with spike data": true,
    "Works with fMRI data": true,
    "Works with EEG data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true,
    "Standard method": true
  },
  description: 'Introduced by Thomas Schreiber in 2000, Transfer Entropy is the non-linear version of Granger Causality.',
  references: {
    'Schreiber, T. (2000). Measuring information transfer. Phys Rev Lett 85, 461–464.': 'http://prl.aps.org/abstract/PRL/v85/i2/p461_1',
    'Kaiser, A., and Schreiber, T. (2002). Information transfer in continuous processes. Physica D 166, 43–62.': 'http://apps.isiknowledge.com/full_record.do?product=WOS&search_mode=GeneralSearch&qid=1&SID=T1c9EmHIiJ92Ak5mN7j&page=1&doc=4',
    'Besserve, M., Schölkopf, B., Logothetis, N.K., and Panzeri, S. (2010). Causal relationships between frequency bands of extracellular signals in visual cortex revealed by an information theoretic analysis. J Comput Neurosci 29, 547–566.': 'http://www.ncbi.nlm.nih.gov/pubmed/20396940'
  },
  code_repositories: {'As part of the TE-Causality package (C++)': 'https://github.com/olavolav/TE-Causality', 'Trentool (Matlab toolbox)': 'http://www.trentool.de/'}
}));

app.methods.add( new app.ReconstructionMethod({name: "Incremental Transfer Entropy",
  properties: {
    "Non-linear": true,
    "Model-free": true
  },
  description: 'Incremental TE is an extension of TE that identifies the inputs to a given neuron by gradually building up the statistically significant set of source neurons.',
  references: {
    'Lizier, J., and Rubinov, M. (2012). Multivariate construction of effective computational networks from observational data. Pre-print from mis.mpg.de.': 'http://www.mis.mpg.de/publications/preprints/2012/prepr2012-25.html'
  },
  verified_by_author: "Joseph Lizier"
}));

app.methods.add( new app.ReconstructionMethod({name: "Generalized Transfer Entropy",
  properties: {
    "Non-linear": true,
    "Works with single cell resolution": true,
    "Works with calcium fluorescence data": true,
    "Model-free": true,
    "Works with spike data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true
  },
  description: 'Generalized Transfer Entropy was developed for neural systems that are state-dependent, for example bursting networks. It can also allow for interactions that are faster than the recording resolution, like calcium imaging data.',
  references: {'Stetter, O., Battaglia, D., Soriano, J., and Geisel, T. (2012). Model-free reconstruction of excitatory neuronal connectivity from calcium imaging signals. PLoS Comput Biol 8, e1002653.': 'http://www.ploscompbiol.org/article/info:doi/10.1371/journal.pcbi.1002653', 'Orlandi, J.G., Stetter, O., Soriano, J., Geisel, T., and Battaglia, D. (2013). Transfer Entropy reconstruction and labeling of neuronal connections from simulated calcium imaging. arXiv 1309.4287.': 'http://arxiv.org/abs/1309.4287'},
  code_repositories: {'C++': 'https://github.com/olavolav/TE-Causality', 'MatLab': 'https://github.com/olavolav/GTE-Challenge'},
  verified_by_author: "Olav Stetter"
}));

app.methods.add( new app.ReconstructionMethod({name: "Bayesian Inference (Calcium)",
  properties: {
    "Non-linear": true,
    "Works with single cell resolution": true,
    "Works with calcium fluorescence data": true,
    "Has been tested in simulations": true
  },
  description: 'Using statistical inference, Mishchencko et al. reconstruct synaptic networks from population calcium imaging data using a two step approach: First infer the spike times, then infer the parameters of an assumed Generalized Linear Model to get at the synaptic weights.',
  references: {'Mishchencko, Y., Vogelstein, J.T., and Paninski, L. (2011). A Bayesian approach for inferring neuronal connectivity from calcium fluorescent imaging data. Ann Appl Stat 5, 1229–1261.': 'http://scinetcentral.com/~mishchenko/preprint-bayes.pdf'},
  code_repositories: {'NETFIT (Matlab package)': 'http://scinetcentral.com/~mishchenko/NETFIT_package.zip'},
  verified_by_author: "Yuriy Mishchenko"
}));

app.methods.add( new app.ReconstructionMethod({name: "Anatomical Reconstruction",
  properties: {
    "Works with single cell resolution": true,
    "Works with anatomical data": true,
    "Model-free": true,
    "Has been applied to real data": true
  },
  description: 'Based on high-resolution transmission electron microscopy imaging of series of thin slices of neural tissue, a set of image processing tools had been developed for automated following of axons and dendrites in stacks of such images and producing dense 3D reconstruction of the content of small blocks of neuronal tissue at nanometer scale. Potentially, this approach can allow reconstructing physical connectivity in neural tissue by identifying synapses in electron microscopic images and tracing respective axons and dendrites to their associated cell bodies.',
  references: {'Mishchenko, Y., and Paninski, L. (2012). A Bayesian compressed-sensing approach for reconstructing neural connectivity from subsampled anatomical data. J Comput Neurosci, In press.': 'http://www.springerlink.com/index/10.1007/s10827-012-0390-z'},
  verified_by_author: "Yuriy Mishchenko"
}));

app.methods.add( new app.ReconstructionMethod({name: "Generalized Linear Model",
  properties: {
    "Works with single cell resolution": true,
    "Non-linear": true,
    "Works with spike data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true,
    "Standard method": true
  },
  description: 'Assuming a Generalized Linear Model for the neurons and using spike data as source, synapses can be extracted from the resulting connectivity kernels.',
  references: {'Pillow, J., Shlens, J., Paninski, L., Sher, A., and Litke, A. (2008). Spatio-temporal correlations and visual signalling in a complete neuronal population. Nature 454, 995–1000.': 'http://www.nature.com/nature/journal/v454/n7207/abs/nature07140.html'},
  code_repositories: {'Matlab function': 'http://www.mathworks.com/help/stats/generalized-linear-models_btq_wnf-1.html'},
  verified_by_author: 'Jonathan Pillow'
}));

app.methods.add( new app.ReconstructionMethod({name: "Dynamical Cascades",
  properties: {
    "Works with single cell resolution": true,
    "Non-linear": true,
    "Works with spike data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true
  },
  description: 'In a simple cascade model, the high-dimensional inference problem can be reduced to a smaller set of putitative connections per neuron, which can then be solved statistically.',
  references: {'Pajevic, S., and Plenz, D. (2009). Efficient network reconstruction from dynamical cascades identifies small-world topology of neuronal avalanches. PLoS Comput Biol 5, e1000271.': 'http://www.ploscompbiol.org/article/info%3Adoi%2F10.1371%2Fjournal.pcbi.1000271'}
}));

app.methods.add( new app.ReconstructionMethod({name: "Dynamical Causal Modeling",
  properties: {
    "Non-linear": true,
    "Works with macro scale resolution": true,
    "Works with fMRI data" : true,
    "Works with EEG data": true,
    "Has been tested in simulations": true,
    "Has been applied to real data": true,
    "Standard method": true
  },
  description: 'Developed for fMRI data sets, coupling parameters are inferred in a Bayesian framework assuming a bilinear nature of the nodes in the system.',
  references: {
    'Scholarpedia article': 'http://www.scholarpedia.org/article/Dynamic_causal_modeling',
    'Friston, K.J., Harrison, L., and Penny, W. (2003). Dynamic causal modelling. NeuroImage 19, 1273–1302.': 'http://www.sciencedirect.com/science/article/pii/S1053811903002027',
    'Friston, K.J., Bastos, A., Litvak, V., Stephan, K.E., Fries, P. and Moran, R. (2012). DCM for complex-valued data: Cross-spectra, coherence and phase-delays. NeuroImage 59, 439-455.': 'http://www.sciencedirect.com/science/article/pii/S1053811911008251',
    'List of publications using DCM (Wellcome Trust Centre for Neuroimaging)': 'http://www.fil.ion.ucl.ac.uk/spm/doc/biblio/Keyword/DCM.html'
  },
  code_repositories: {'Matlab': 'http://www.fil.ion.ucl.ac.uk/spm/software/'},
  verified_by_author: "Guillaume Flandin"
}));

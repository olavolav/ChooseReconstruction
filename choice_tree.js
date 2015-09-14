// This is the source file for the ChooseReconstructions site, written using
// Backbone.js. The whole thing is completely static, all the content is
// hard-coded at the end of this file.
//
// by Olav Stetter, 2013


/** @depend lib/jquery-1.7.2.min.js
  * @depend lib/underscore-min.js
  * @depend lib/backbone.js
  * @depend config.js
  * @depend models/method.js
  * @depend models/filter.js
  * @depend collections/method_collection.js
  * @depend collections/filter_collection.js
  * @depend views/method_view.js
  * @depend views/filter_view.js
  * @depend views/method_section.js
  * @depend views/filter_section.js
  * @depend views/modal_view.js
  * @depend views/app_view.js
  * @depend fixtures/methods.js
*/



var app = app || {};
// _.extend(app, Backbone.Events); // to enable observer role of EventDispatcher


app.filters = new app.FilterList();
app.filters.generate_from_method_collection(app.methods);

// start app
new app.AppView(app.methods, app.filters);

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-framework7/lib/tgi-interface-framework7.source.js
 */
/**
 * Constructor
 */
var Framework7Interface = function (args) {
  if (false === (this instanceof Interface)) throw new Error('new operator required');
  args = args || {};
  args.name = args.name || '(unnamed)';
  args.description = args.description || 'a Framework7Interface';
  args.vendor = args.vendor || null;
  var i;
  var unusedProperties = getInvalidProperties(args, ['name', 'description', 'vendor']);
  var errorList = [];
  for (i = 0; i < unusedProperties.length; i++) errorList.push('invalid property: ' + unusedProperties[i]);
  if (errorList.length > 1)
    throw new Error('error creating Interface: multiple errors');
  if (errorList.length) throw new Error('error creating Interface: ' + errorList[0]);
  // default state
  this.startCallback = null;
  this.stopCallback = null;
  this.mocks = [];
  this.mockPending = false;
  // args ok, now copy to object
  for (i in args) this[i] = args[i];
};
Framework7Interface.prototype = Object.create(Interface.prototype);
/**
 * Methods
 */
Framework7Interface.prototype.canMock = function () {
  return this.vendor ? true : false;
};
Framework7Interface.prototype.start = function (application, presentation, callBack) {
  if (!(application instanceof Application)) throw new Error('Application required');
  if (!(presentation instanceof Presentation)) throw new Error('presentation required');
  if (typeof callBack != 'function') throw new Error('callBack required');
  this.application = application;
  this.presentation = presentation;
  this.startCallback = callBack;
  if (!this.vendor) throw new Error('Error initializing Framework7');
  try {
    if (!Framework7Interface._f7) {
      Framework7Interface._f7 = new this.vendor();
    }
  } catch (e) {
    throw new Error('Error initializing Framework7: ' + e);
  }
  /**
   * Add needed html to DOM
   */
  this.doc = {}; // Keep DOM element IDs here todo move all variables of Framework7Interface in here to avoid future namespace collisions
  if (this.presentation.get('contents').length)
    this.htmlNavigation();
  this.htmlViews();
};
Framework7Interface.prototype.dispatch = function (request, response) {
  if (false === (request instanceof Request)) throw new Error('Request required');
  if (response && typeof response != 'function') throw new Error('response callback is not a function');
  var requestHandled = false;
  try {
    if (this.application) {
      if (request.type == 'Command' && request.command.type == 'Presentation') {
        console.log('framework7Interface.showView');
        framework7Interface.showView(request.command);
        // this.activatePanel(request.command);

        requestHandled = true;
      } else {
        requestHandled = !this.application.dispatch(request);
      }
    }
    if (!requestHandled && this.startcallback) {
      this.startcallback(request);
    }
  } catch (e) {
    if (this.startcallback) {
      this.startcallback(e);
    }
  }
};


/**
 * DOM helper
 */
Framework7Interface.addEle = function (parent, tagName, className, attributes) {
  var ele = document.createElement(tagName);
  if (className && className.length)
    ele.className = className;
  if (attributes)
    for (var i in attributes)
      if (attributes.hasOwnProperty(i)) ele.setAttribute(i, attributes[i]);
  parent.appendChild(ele);
  return ele;
};

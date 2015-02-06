/**---------------------------------------------------------------------------------------------------------------------
 * lib/tgi-interface-framework7-navigation.source.js
 */
Framework7Interface.prototype.htmlNavigation = function () {
  var addEle = Framework7Interface.addEle;
  var self = this;

  /**
   * Main View
   */
  document.body.innerHTML = '' +
  '<div class="statusbar-overlay"></div>' + // Status bar overlay for full screen mode (PhoneGap)
  '<div class="panel-overlay"></div>'; // Panels overlay
  this.views = addEle(document.body, 'div', 'views', {id: 'views'});// F7 Views Div
  this.viewMain = addEle(this.views, 'div', 'view view-main', {id: 'viewMain'});// Tell F7 this is the main view
  /**
   * Navbar
   */
  this.navBar = addEle(this.viewMain, 'div', 'navBar', {id: 'navBar'}); // Top NavBar
  this.navBarInner = addEle(this.navBar, 'div', 'navbar-inner', {id: 'navBarInner'}); // NavBar Inner
  this.brand = addEle(this.navBarInner, 'div', 'center sliding', {id: 'brand'}); // NavBar Inner
  this.brand.style.left = "126.5px";
  this.brand.innerText = this.application.get('brand');

  //this.renderNavBar();
  //this.renderPages();   // Content based on toolbar selected
  //this.renderToolBar(); // Changes pages when icon selected

  // f7 thingy
  //this.f7mainView = this.f7.addView('.view-main', {
  //  dynamicNavbar: true
  //});

  // put toolbar back when on main index view
  //this.f7.onPageBeforeAnimation('index', function (page) {
  //  self.f7mainView.showToolbar();
  //});

  this.refreshNavigation();
};

Framework7Interface.prototype.refreshNavigation = function () {
};


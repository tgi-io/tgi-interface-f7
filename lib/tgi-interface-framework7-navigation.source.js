/**---------------------------------------------------------------------------------------------------------------------
 * lib/tgi-interface-framework7-navigation.source.js
 */
Framework7Interface.prototype.htmlNavigation = function () {
  var addEle = Framework7Interface.addEle;

  /**
   * Main View
   */
  document.body.innerHTML = '' +
  '<div class="statusbar-overlay"></div>' + // Status bar overlay for full screen mode (PhoneGap)
  '<div class="panel-overlay"></div>'; // Panels overlay
  this.views = addEle(document.body, 'div', 'views', {id: 'views'});// F7 Views Div
  this.viewMain = addEle(this.views, 'div', 'view view-main', {id: 'viewMain'});// Tell F7 this is the main view
  /**
   * Nav Bar (Top)
   */
  this.navBar = addEle(this.viewMain, 'div', 'navbar', {id: 'navBar'}); // Top NavBar
  this.navBarInner = addEle(this.navBar, 'div', 'navbar-inner', {id: 'navBarInner'}); // NavBar Inner
  //this.brand = addEle(this.navBarInner, 'div', 'center sliding', {id: 'brand'}); // NavBar Inner
  this.leftOfBrand = addEle(this.navBarInner, 'div', 'left'); // placeholder for proper alignment
  this.brand = addEle(this.navBarInner, 'div', 'center', {id: 'brand'}); // Brand
  this.rightOfBrand = addEle(this.navBarInner, 'div', 'right');  // placeholder for proper alignment
  //this.brand.style.left = "126.5px"; // todo fix by centering correctly
  this.brand.innerText = this.application.get('brand');
  /**
   * Pages
   */
  this.pages = addEle(this.viewMain, 'div', 'pages navbar-through toolbar-through', {id: 'pages'});
  this.dataPage = addEle(this.pages, 'div', 'page', {id: 'dataPage'});
  this.pageContent = addEle(this.dataPage, 'div', 'page-content', {id: 'pageContent'});
  this.tabs = addEle(this.pageContent, 'div', 'tabs', {id: 'tabs'});
  /**
   * Fake page for now
   */
  this.fakePage1 = addEle(this.tabs, 'div', 'tab', {id: 'tab1'});
  for (var i = 0; i < 10; i++) {
    addEle(this.fakePage1, 'div', 'content-block-title').innerHTML = 'fakePage1';
    addEle(this.fakePage1, 'div', 'content-block').innerHTML = 'This is a fake page.  What else can I say about it.' +
    '  It\'s not real first of all.  It is just a fake page.';
  }
  addEle(this.fakePage1, 'div', 'content-block-title').innerHTML = 'Summary';
  addEle(this.fakePage1, 'div', 'content-block').innerHTML = 'This is a fake page.  What else can I say about it.' +
  '  It\'s not real first of all.  It is just a fake page.';

  this.fakePage2 = addEle(this.tabs, 'div', 'tab', {id: 'tab2'});
  addEle(this.fakePage2, 'div', 'content-block-title').innerHTML = 'NUMBER TWO';
  addEle(this.fakePage2, 'div', 'content-block').innerHTML = 'This is a fake page AGAIN!!!!!!!!!!  What else can I say about it.' +
  '  It\'s not real first of all.  It is just a fake page.';

  Framework7Interface._f7.hideNavbar(this.navBar);
  Framework7Interface._f7.showNavbar(this.navBar);
  /**
   * Toolbar (Bottom)
   */
  this.toolBar = addEle(this.viewMain, 'div', 'toolbar tabbar tabbar-labels', {id: 'toolBar'});
  this.toolBarInner = addEle(this.toolBar, 'div', 'toolbar-inner', {id: 'toolBarInner'});
  this.refreshToolbar();
};
Framework7Interface.prototype.refreshToolbar = function () {
  var framework7Interface = this;
  var addEle = Framework7Interface.addEle;
  var $$ = Dom7;
  /**
   * (re)initialize structure
   */
  framework7Interface.toolBarInner.innerHTML = '';
  framework7Interface.toolBarTabs = [];
  /**
   * Prep main menu
   */
  var menuContents = framework7Interface.presentation.get('contents');
  var menuCount = 0; // Count only menu items
  for (var menuItem in menuContents)
    if (menuContents.hasOwnProperty(menuItem) && typeof menuContents[menuItem] != 'string')
      menuCount++;
  /**
   * determine max icons that can fit
   */
  var iconMaxFit = 6;
  var baseIconWidth = 64;
  if (framework7Interface.toolBar.clientWidth > 400) baseIconWidth = 96;
  if (framework7Interface.toolBar.clientWidth > 768) baseIconWidth = 112;
  if (framework7Interface.toolBar.clientWidth) iconMaxFit = Math.floor(framework7Interface.toolBar.clientWidth / baseIconWidth);
  var needMore = (menuCount > iconMaxFit);
  var iconsToShow = needMore ? iconMaxFit : menuCount;
  var iconsShowing = 0;
  /**
   * Need to track what is shown for when "more..." page rendered
   * todo get framework7Interface from tequila
   */
  /**
   * create each toolbar link
   */
  for (menuItem in menuContents)
    if (menuContents.hasOwnProperty(menuItem) && typeof menuContents[menuItem] != 'string') {
      addLink(menuContents[menuItem]);
      if (++iconsShowing >= iconsToShow) break;
    }
  if (needMore)
    addLink(new Command({name: 'more', icon: 'fa-ellipsis-h'}));


  function addLink(item) {
    var link = {
      command: item,
      id: null,
      htmlElement: null,
      htmlCreated: false
    };
    framework7Interface.toolBarTabs.push(link);
    link.id = 'tbLink' + (framework7Interface.toolBarTabs.length);
    link.htmlElement = addEle(framework7Interface.toolBarInner, 'a', 'tab-link', {id: link.id, href: '#'});
    link.htmlElement.innerHTML = '<i class="fa ' + (item.icon || 'fa-circle-thin') + ' fa-lg"></i><span class="tabbar-label">' + item.name + '</span>';
    $$('#' + link.id).on('click', function () {
      var htmlID = $$(this).attr('id');
      var toolBarTab = parseInt(right(htmlID, htmlID.length-6))-1;
      executeCommand(framework7Interface.toolBarTabs[toolBarTab].command);
    });
  }

  function executeCommand(command) {
    framework7Interface.application.info('executeCommand: ' + command);
  }


  ///**
  // * Fake links
  // */
  //addEle(this.toolBarInner, 'a', 'tab-link', {href: '#tab1'}).innerHTML = '<i class="fa fa-shirtsinbulk fa-lg"></i><span class="tabbar-label">Shirt</span>';
  //addEle(this.toolBarInner, 'a', 'tab-link', {href: '#tab2'}).innerHTML = '<i class="fa fa-facebook-official fa-lg"></i><span class="tabbar-label">facebook</span>';
  //var btn = addEle(this.toolBarInner, 'a', 'tab-link', {
  //  id: 'btnz',
  //  href: '#'
  //}).innerHTML = '<i class="fa fa-train fa-lg"></i><span class="tabbar-label">Train</span>';
  //Framework7Interface._f7.showTab('#tab1');
  //$$('#btnz').on('click', function (e) {
  //  Framework7Interface._f7.showTab('#tab1');
  //  self.application.info('yo');
  //});
};


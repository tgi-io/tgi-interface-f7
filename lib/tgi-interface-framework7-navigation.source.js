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
  this.brand.innerText = this.application.get('brand');

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
  framework7Interface.toolBarCommands = [];
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
   * todo Need to track what is shown for when "more..." page rendered
   */
  /**
   * create each toolbar link
   */
  var moreMenu = [];
  for (menuItem in menuContents)
    if (menuContents.hasOwnProperty(menuItem) && typeof menuContents[menuItem] != 'string') {
      if (iconsShowing < iconsToShow) {
        iconsShowing++;
        addLink(menuContents[menuItem]);
      } else {
        moreMenu.push(menuContents[menuItem]);
      }
    }
  if (needMore) {
    addLink(new Command({name: 'more', icon: 'fa-ellipsis-h', type: 'Menu', contents: moreMenu}));
  }


  function addLink(item) {
    var link = {
      command: item,
      domElement: null,
      id: null, // id for domElement so we can find in DOM
      primaryView: null, // views are lazy created
      subMenu: [] // if needed for nested menus
    };
    framework7Interface.toolBarCommands.push(link);
    link.id = 'tbLink' + (framework7Interface.toolBarCommands.length);
    link.domElement = addEle(framework7Interface.toolBarInner, 'a', 'tab-link', {id: link.id, href: '#'});
    link.domElement.innerHTML = '<i class="fa ' + (item.icon || 'fa-circle-thin') + ' fa-lg"></i><span class="tabbar-label">' + item.name + '</span>';
    $$('#' + link.id).on('click', function () {
      var htmlID = $$(this).attr('id');
      var toolBarCommandNo = parseInt(right(htmlID, htmlID.length - 6)) - 1;
      executeLink(framework7Interface.toolBarCommands[toolBarCommandNo]);
    });
  }

  function executeLink(toolBarCommand) {
    var command = toolBarCommand.command;
    switch (command.type) {
      case 'Procedure':
        command.execute();
        break;
      case 'Menu':
        framework7Interface.showView(toolBarCommand);
        break;
      case 'Stub':
        framework7Interface.application.ok('This feature is not available.', function () {
        });
        break;
      default:
        framework7Interface.application.ok('Sorry can\'t handle that command type yet\n\n' + JSON.stringify(command.type), function () {
        });
        break;
    }
  }


};
Framework7Interface.prototype.highlightToolBarCommand = function (toolBarCommand) {
  var $$ = Dom7;
  for (var i = 0; i < this.toolBarCommands.length; i++) {
    var cmd = this.toolBarCommands[i];
    $$(cmd.domElement).removeClass('active');
  }
  $$(toolBarCommand.domElement).addClass('active');
};
Framework7Interface.prototype.updateBrand = function (text) {
  this.brand.innerText = text;
};

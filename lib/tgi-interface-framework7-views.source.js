/**---------------------------------------------------------------------------------------------------------------------
 * lib/tgi-interface-framework7-views.source.js
 */
Framework7Interface.prototype.htmlViews = function () {
  var framework7Interface = this;
  var addEle = Framework7Interface.addEle;
  var $$ = Dom7;
  /**
   * F7 Pages container, because we use fixed-through navbar and toolbar, it has additional appropriate classes
   */
  framework7Interface.pages = addEle(framework7Interface.viewMain, 'div', 'pages navbar-through toolbar-through', {id: 'pages'}); // F7 Pages container
  framework7Interface.dataPage = addEle(framework7Interface.pages, 'div', 'page', {
    id: 'dataPage',
    'data-page': 'index'
  }); // F7 data-page
  framework7Interface.pageContent = addEle(framework7Interface.dataPage, 'div', 'page-content', {id: 'pageContent'}); // F7 page-content
  framework7Interface.tabs = addEle(framework7Interface.pageContent, 'div', 'tabs', {id: 'tabs'}); // F7 tabs
  /**
   * Starter page
   */
  var starterPage = addEle(framework7Interface.tabs, 'div', 'tab active', {id: 'starterPage'});
  addEle(starterPage, 'div', 'content-block-title').innerHTML = framework7Interface.application.get('brand');
  framework7Interface.tempLog = addEle(starterPage, 'div', 'content-block');
  framework7Interface.tempLog.innerHTML = 'Touch the icons below to explore!';
};
Framework7Interface.prototype.showView = function (toolBarCommand) {
  var framework7Interface = this;
  var addEle = Framework7Interface.addEle;
  var $$ = Dom7;
  var command = toolBarCommand.command;
  /**
   * Lazy Create DOM stuff
   */
  if (!toolBarCommand.primaryView) {
    toolBarCommand.primaryView = addEle(framework7Interface.tabs, 'div', 'tab');
    switch (command.type) {
      case 'Menu':
        createMenuView(toolBarCommand.command.contents);
        break;
      default:
        addEle(toolBarCommand.primaryView, 'div', 'content-block-title').innerHTML = toolBarCommand.command.name;
        toolBarCommand.primaryViewBlock = addEle(toolBarCommand.primaryView, 'div', 'content-block');
        toolBarCommand.primaryViewBlock.innerHTML = JSON.stringify(toolBarCommand.command);
        break;
    }
  }
  /**
   * Create menu views
   */
  function createMenuView(menu) {
    var contentBlock = addEle(toolBarCommand.primaryView, 'div', 'content-block');
    var listBlock = addEle(contentBlock, 'div', 'list-block');
    for (var i = 0; i < menu.length; i++) {
      var item = menu[i];
      var ul = addEle(listBlock, 'ul');
      if (typeof item == 'string') {
        if (item != '-')
          addEle(ul, 'p').innerHTML = item;
      } else {
        var link = {
          command: item,
          domElement: null,
          id: null
        };
        toolBarCommand.subMenu.push(link);
        link.id = toolBarCommand.id + '-' + (toolBarCommand.subMenu.length);
        var li = addEle(ul, 'li');
        link.domElement = addEle(li, 'a', 'item-link', {id: link.id, href: '#'});
        var itemContent = addEle(link.domElement, 'div', 'item-content');
        var itemMedia = addEle(itemContent, 'div', 'item-media');
        var itemInner = addEle(itemContent, 'div', 'item-inner');
        addEle(itemMedia, 'i', 'fa ' + (item.icon || 'fa-beer') + ' fa-lg');
        addEle(itemInner, 'div', 'item-title').innerHTML = item.name;
        $$('#' + link.id).on('click', function () {
          var htmlID = $$(this).attr('id');
          var dash = htmlID.indexOf('-') + 1;
          var rootID = left(htmlID, dash - 1);
          var toolBarCommandNo = parseInt(right(rootID, rootID.length - 6)) - 1;
          var subMenuNo = parseInt(right(htmlID, htmlID.length - dash)) - 1;
          executeLink(framework7Interface.toolBarCommands[toolBarCommandNo].subMenu[subMenuNo]);
        });
      }
    }
    function executeLink(toolBarCommand) { // BROKEN - NOT
      var command = toolBarCommand.command;
      switch (command.type) {
        case 'Function':
        case 'Procedure':
          command.execute();
          break;
        case 'Stub':
          framework7Interface.application.ok('The ' + command.name + ' feature is not available.', function () {
          });
          break;
        default:
          framework7Interface.application.ok('Sorry can\'t handle that command type yet\n\n' + JSON.stringify(command.type), function () {
          });
          break;
      }
    }

  }

  /**
   * Reflect view state
   */
  framework7Interface.activateView(toolBarCommand.primaryView);
  framework7Interface.updateBrand(command.name);
  framework7Interface.highlightToolBarCommand(toolBarCommand);
};
Framework7Interface.prototype.activateView = function (view) {
  var $$ = Dom7;
  $$('#starterPage').removeClass('active');
  for (var i = 0; i < this.toolBarCommands.length; i++) {
    var cmd = this.toolBarCommands[i];
    $$(cmd.primaryView).removeClass('active');
  }
  $$(view).addClass('active');
};

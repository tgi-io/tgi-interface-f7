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
  framework7Interface.tempLog.innerHTML = 'Touch the icons below to explore!'; // todo app overide generic nature of this
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
      case 'Presentation':
        createPresentationView(toolBarCommand.command.contents);
        break;
      default:
        addEle(toolBarCommand.primaryView, 'div', 'content-block-title').innerHTML = toolBarCommand.command.name;
        toolBarCommand.primaryViewBlock = addEle(toolBarCommand.primaryView, 'div', 'content-block');
        toolBarCommand.primaryViewBlock.innerHTML = JSON.stringify(toolBarCommand.command);
        break;
    }
  }
  /**
   * Create presentation view
   */
  function createPresentationView(presentation) {
    console.log('createPresentationView: ' + presentation);
    var contents = presentation.get('contents');
    var contentBlock = addEle(toolBarCommand.primaryView, 'div', 'content-block-presentation');
    var i;
    var buttonRow, buttonsInRow = 0;
    for (i = 0; i < contents.length; i++) {
      // String markdown or separator '-'
      if (typeof contents[i] == 'string') {
        if (contents[i] == '-') {
          addEle(contentBlock, 'HR');
        } else {
          var txtDiv = addEle(contentBlock, 'div');
          txtDiv.innerHTML = marked(contents[i]);
        }
      }
      if (contents[i] instanceof Command) {
        renderCommand(contents[i]);
      }

    }
    /**
     * function to render Attribute
     */
    function renderAttribute(attribute) {

    }

    /**
     * function to render Command
     */
    function renderCommand(commandButton) {

      var icon = commandButton.icon;
      var className = commandButton.theme || 'default';
      if (className == 'default')
        className = 'default-presentation';

      if (!icon) {
        switch (commandButton.type) {
          case "Menu":
            icon = 'fa-th-large';
            break;
          case "Presentation":
            icon = 'fa-building';
            break;
          case "Function":
            icon = 'fa-gear';
            break;
          case "Procedure":
            icon = 'fa-gears';
            break;
          default:
            icon = 'fa-square-o';
            break;
        }
      }
      if (!buttonRow) {
        buttonRow = addEle(contentBlock, 'div', 'row button-row');
      }
      var buttonCol = addEle(buttonRow, 'div', 'col-50');
      var buttonAnchor = addEle(buttonCol, 'a', 'button no-select button-' + className);
      buttonAnchor.innerHTML = '<i class="fa ' + icon + '">&nbsp</i>' + commandButton.name;
      if (++buttonsInRow >= 2) {
        buttonRow = undefined;
      }
      $$(buttonAnchor).on('click', function (event) {
        commandButton.execute(framework7Interface);
        event.preventDefault();
      });
    }
  }

  /**
   * Create menu views
   */
  function createMenuView(menu) {
    var listBlock = addEle(toolBarCommand.primaryView, 'div', 'list-block');
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
          var dashizzle = framework7Interface.toolBarCommands[toolBarCommandNo].subMenu[subMenuNo];
          dashizzle.command.execute(framework7Interface);
        });
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

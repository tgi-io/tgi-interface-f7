/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/test/html-play.js
 **/
var tgi = TGI.CORE();
var f7 = new (TGI.INTERFACE.FRAMEWORK7().Framework7Interface)({vendor: Framework7});
var app = new tgi.Application({interface: f7});
var nav = new tgi.Presentation();
app.setInterface(f7);
app.set('brand', 'Presentation');
app.setPresentation(nav);

/**
 * Default (Minimal) Presentation
 */
var defaultPresentation = new tgi.Presentation();
defaultPresentation.set('contents', ['i got nothin']);
var defaultCommand = new tgi.Command({
  name: 'Default',
  type: 'Presentation',
  contents: defaultPresentation
});

/**
 * Beer Presentation (Spam)
 */
var beerPresentation = new tgi.Presentation();
var bottles = [];
for (var beer = 99; beer > 0; beer--) bottles.push('' + beer + ' bottles of beer on the wall, ' +
  beer + ' bottles of beer. Take one down, pass it around, ' +
  (beer - 1) + ' bottles of beer on the wall...');
beerPresentation.set('contents', bottles);
var beerCommand = new tgi.Command({
  name: 'Beer',
  type: 'Presentation',
  theme: 'warning',
  icon: 'fa-beer',
  contents: beerPresentation
});

/**
 * Info only
 */
var infoPresentation = new tgi.Presentation();
infoPresentation.set('contents', [
  '#Info',
  'This is themed `info` with an icon *(glyphicon-info-sign)*.',
  '-',
  'Note the divider above and below to understand _read the code Luke_',
  '-',
  'Also this uses **markdown** for `cool` stuff.'
]);
var infoCommand = new tgi.Command({
  name: 'Info',
  type: 'Presentation',
  theme: 'info',
  icon: 'fa-info',
  contents: infoPresentation
});
var gotItCommand = new tgi.Command({
  name: 'GotIt',
  type: 'Function',
  theme: 'danger',
  icon: 'fa-thumbs-up',
  contents: function () {
    app.info('OK, I got it!');
  }
});

var loginCommand = new tgi.Command({
  name: 'Login',
  type: 'Function',
  theme: 'info',
  icon: 'fa-sign-in',
  contents: function () {
    app.info('This is a fake button.');
  }
});

/**
 * Command only
 */
var commandPresentation = new tgi.Presentation();
commandPresentation.set('contents', [
  '#Command',
  'Including `Command` objects in presentation contents will render as buttons.',
  defaultCommand,
  infoCommand,
  beerCommand,
  loginCommand,
  '###Note',
  'Commands are all grouped and rendered at bottom of panel',
  gotItCommand

]);
var commandCommand = new tgi.Command({
  name: 'Command',
  type: 'Presentation',
  theme: 'danger',
  icon: 'fa-cog',
  contents: commandPresentation
});



/**
 * Attribute (Minimal) Presentation
 */
var attributePresentation = new tgi.Presentation();
attributePresentation.set('contents', [
  '###INSTRUCTIONS\nEnter some stuff then push some buttons.',
  '-',
  new tgi.Attribute({name: 'firstName', label: 'First Name', type: 'String(20)', value: 'John'}),
  new tgi.Attribute({name: 'lastName', label: 'Last Name', type: 'String(25)', value: 'Doe'}),
  new tgi.Attribute({name: 'address', label: 'Address', type: 'String(50)'}),
  new tgi.Attribute({name: 'city', label: 'City', type: 'String(35)'}),
  new tgi.Attribute({name: 'state', label: 'State', type: 'String(2)'}),
  new tgi.Attribute({name: 'zip', label: 'Zip Code', type: 'String(10)', placeHolder: '#####-####'}),
  '###More stuff',
  new tgi.Attribute({name: 'password', label: 'Password', type: 'String(20)', hint: {password: true}}),
  new tgi.Attribute({name: 'birthDate', label: 'Birth Date', type: 'Date', value: new Date()}),
  new tgi.Attribute({name: 'drink', type: 'String(25)', quickPick: ['Water', 'Coke', 'Coffee']}),
  new tgi.Attribute({name: 'sex', type: 'Boolean', value: true}),
  new tgi.Attribute({name: 'drugs', type: 'Boolean', value: false}),
  new tgi.Attribute({name: 'IQ', type: 'Number', value: 100}),
  '-',
  infoCommand,
  beerCommand,
  commandCommand,
  defaultCommand



]);
var attributeCommand = new tgi.Command({
  name: 'Attribute',
  type: 'Presentation',
  theme: 'success',
  icon: 'fa-list-alt',
  contents: attributePresentation
});

/**
 * Navigation
 */
nav.set('contents', [
  infoCommand,
  beerCommand,
  commandCommand,
  attributeCommand,
  defaultCommand,
  defaultCommand,
  defaultCommand,
  defaultCommand,
  defaultCommand,
  defaultCommand
]);

/**
 * Start the app
 */
app.start(function (request) {
  app.info('app got ' + request);
});
attributeCommand.execute(f7);

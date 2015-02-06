/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-framework7/test/html-play.js
 **/

var tgi = TGI.CORE();
var f7 = new (TGI.INTERFACE.FRAMEWORK7().Framework7Interface)({vendor: Framework7});
var app = new tgi.Application({interface: f7});
var nav = new tgi.Presentation();

app.setInterface(f7);
app.set('brand', 'TGI Play');
app.setPresentation(nav);

/**
 * Commands
 */
var name,
  isDude,
  color;
var userQuerieCommand = new tgi.Command({
  name: 'User Queries', type: 'Procedure', contents: new tgi.Procedure({
    tasks: [
      function () {
        var task = this;
        app.ask('What is first your name?', new tgi.Attribute({name: 'name'}), function (reply) {
          if (!reply)
            userQuerieCommand.abort();
          else {
            name = reply;
            task.complete();
          }
        });
      },
      function () {
        var task = this;
        app.yesno(name + ' are you a dude?', function (reply) {
          isDude = reply;
          task.complete();
        });
      },
      function () {
        var task = this;
        app.choose('OK ' + (isDude ? 'mr. ' : 'ms. ') + name + ', please pick a color.\nany color..\n\nplease pick one now', ['red', 'green', 'blue', 'black', 'white'], function (choice) {
          if (!choice)
            userQuerieCommand.abort();
          else {
            color = choice;
            task.complete();
          }
        });
      },
      function () {
        var task = this;
        app.ok(name + ' is a ' + color + (isDude ? ' dude.' : ' chick.') + '\n\n*** THE END ***', function () {
          task.complete();
        });
      }
    ]
  })
});
userQuerieCommand.onEvent('*', function (event) {
  if (event == 'Aborted') {
    app.info('ok fine be that way');
  }
});
// Create a function command
var funcCommand = new tgi.Command({name: 'Function', type: 'Function', contents: function () {
  window.alert("Hello! I am an alert box!!");
}});

// Create a procedure command
var procCommand = new tgi.Command({name: 'Procedure', type: 'Procedure', contents: new tgi.Procedure()});

// Stub commands
var stubMoe = new tgi.Command({name: 'Moe', description: 'Moses Horwitz', theme: 'primary', icon: 'fa-coffee'});
var stubLarry = new tgi.Command({name: 'Larry', description: 'Louis Fienberg', theme: 'info', icon: 'fa-beer'});
var stubCurly = new tgi.Command({name: 'Curly', description: 'Jerome Lester Horwitz', theme: 'warning', icon: 'fa-glass'});

// Create sample presentation
var pres = new tgi.Presentation();
pres.set('contents', [
  '####INSTRUCTIONS\n\n' +
  'Enter some stuff then push some buttons.',
  '-',
  new tgi.Attribute({name: 'firstName', label: 'First Name', type: 'String(20)', value: 'John'}),
  new tgi.Attribute({name: 'lastName', label: 'Last Name', type: 'String(25)', value: 'Doe'}),
  new tgi.Attribute({name: 'address', label: 'Address', type: 'String(50)'}),
  new tgi.Attribute({name: 'city', label: 'City', type: 'String(35)'}),
  new tgi.Attribute({name: 'state', label: 'State', type: 'String(2)'}),
  new tgi.Attribute({name: 'zip', label: 'Zip Code', type: 'String(10)', placeHolder: '#####-####'}),
  new tgi.Attribute({name: 'birthDate', label: 'Birth Date', type: 'Date', value: new Date()}),
  new tgi.Attribute({name: 'drink', type: 'String(25)', quickPick:['Water','Coke','Coffee']}),
  new tgi.Attribute({name: 'sex', type: 'Boolean', value: true}),
  new tgi.Attribute({name: 'drugs', type: 'Boolean', value: false}),
  new tgi.Attribute({name: 'IQ', type: 'Number', value: 100}),
  '-',
  funcCommand,
  procCommand,
  stubMoe,
  stubLarry,
  stubCurly

]);
var presCommand = new tgi.Command({name: 'Presentation', type: 'Presentation', contents: pres});
var commands =   new tgi.Command({name: 'Commands', type: 'Menu', contents: [
  'Command Types',
  '-',
  new tgi.Command({name: 'Stub', type: 'Stub'}),
  presCommand,
  funcCommand,
  procCommand
]})

/**
 * Navigation
 */
nav.set('contents', [
  new tgi.Command({name: 'Stooges', type: 'Menu', contents: [
    'The Three Stooges',
    '-',
    stubMoe,
    stubLarry,
    stubCurly
  ]}),
  commands,
  userQuerieCommand,
  '-',
  new tgi.Command({name: 'Account'})
]);

/**
 * Start the app
 */
app.start(function (request) {
  app.info('app got ' + JSON.stringify(request));
});
app.info("What's up?");

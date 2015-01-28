/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-framework7/lib/tgi-interface-framework7.spec.js
 */

spec.testSection('Interfaces');
spec.test('tgi-core/lib/interfaces/tgi-core-interfaces-repl.spec.js', 'Framework7Interface', 'Framework7 Interface', function (callback) {
  var coreTests = spec.mute(false);
  spec.heading('Framework7Interface', function () {
    spec.paragraph('The Framework7Interface uses  Framework7 (http://www.idangero.us/framework7) to create a IOS 7+ type of UI.');
    spec.paragraph('Core tests run: ' + JSON.stringify(coreTests));
    spec.paragraph('This doc may be outdated since tests run in browser.  See source code for more info.');
    spec.heading('CONSTRUCTOR', function () {
      spec.runnerInterfaceConstructor(Framework7Interface);
      spec.example('must supply vendor in constructor', Error('Error initializing Framework7'), function () {
        new Framework7Interface().start(new Application(), new Presentation(), function () {
        });
      });
    });
    spec.runnerInterfaceMethods(Framework7Interface);
    spec.heading('METHODS', function () {
      spec.paragraph('meh');
    });
    spec.heading('INTEGRATION', function () {
      spec.paragraph('blah');
    });
  });
});

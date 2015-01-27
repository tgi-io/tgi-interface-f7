/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-framework7/lib/tgi-interface-framework7.spec.js
 */

spec.testSection('Interfaces');
spec.test('tgi-core/lib/interfaces/tgi-core-interfaces-repl.spec.js', 'Framework7Interface', 'Framework7 Interface', function (callback) {
  spec.heading('Framework7Interface', function () {
    spec.paragraph('The Framework7Interface uses  Framework7 (http://www.idangero.us/framework7) to create a IOS 7+ type of UI.');
    spec.heading('CONSTRUCTOR', function () {
      spec.runnerInterfaceConstructor(Framework7Interface);
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
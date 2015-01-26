/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-f7/lib/tgi-interface-f7.spec.js
 */

spec.testSection('Interfaces');
spec.test('tgi-core/lib/interfaces/tgi-core-interfaces-repl.spec.js', 'F7Interface', 'Read Evaluate Print Loop Interface', function (callback) {
  spec.heading('F7Interface', function () {
    spec.paragraph('The F7Interface is a Read Evaluate Print Loop Interface.');
    spec.heading('CONSTRUCTOR', function () {
      spec.runnerInterfaceConstructor(F7Interface);
    });
    spec.runnerInterfaceMethods(F7Interface);
    spec.heading('METHODS', function () {
      spec.paragraph('meh');
    });
    spec.heading('INTEGRATION', function () {
      spec.paragraph('blah');
    });
  });
});

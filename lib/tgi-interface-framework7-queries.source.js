/**---------------------------------------------------------------------------------------------------------------------
 * lib/tgi-interface-framework7-queries.source.js
 */
Framework7Interface.prototype.info = function (text) {
  if (!text || typeof text !== 'string') throw new Error('text required');
  Framework7Interface._f7.addNotification({title: 'Information', message: text, hold:3000});
};
Framework7Interface.prototype.done = function (text) {
  if (!text || typeof text !== 'string') throw new Error('text required');
  Framework7Interface._f7.addNotification({title: 'Success', message: text, hold:3000});
};
Framework7Interface.prototype.warn = function (text) {
  if (!text || typeof text !== 'string') throw new Error('text required');
  Framework7Interface._f7.addNotification({title: 'Warning', message: text, hold:3000});
};
Framework7Interface.prototype.err = function (text) {
  if (!text || typeof text !== 'string') throw new Error('text required');
  Framework7Interface._f7.addNotification({title: 'ERROR', message: text, hold:3000});
};
Framework7Interface.prototype.ok = function (prompt, callback) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (typeof callback != 'function') throw new Error('callback required');
  if (this.okPending) {
    delete this.okPending;
    callback();
  } else {
    Framework7Interface._f7.alert(prompt.replace(/\n/g,'<br>'), this.application.get('brand'), function () {
      callback();
    });
  }
};
Framework7Interface.prototype.yesno = function (prompt, callback) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (typeof callback != 'function') throw new Error('callback required');
  if (this.yesnoPending) {
    delete this.yesnoPending;
    callback(this.yesnoResponse);
  } else {
    Framework7Interface._f7.modal({
      text:prompt.replace(/\n/g,'<br>'),
      title: this.application.get('brand'),
      verticalButtons: true,
      buttons: [{
        text: 'Yes',
        onClick: function () {
          callback(true);
        }
      },{
        text: 'No',
        onClick: function () {
          callback(false);
        }
      }]
    });
  }
};
Framework7Interface.prototype.ask = function (prompt, attribute, callback) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (false === (attribute instanceof Attribute)) throw new Error('attribute or callback expected');
  if (typeof callback != 'function') throw new Error('callback required');
  if (this.askPending) {
    delete this.askPending;
    callback(this.askResponse);
  } else {
    Framework7Interface._f7.prompt(prompt.replace(/\n/g,'<br>'), this.application.get('brand'),
      function (answer) {
        callback(answer);
      },
      function () {
        callback();
      }
    );
  }
};
Framework7Interface.prototype.choose = function (prompt, choices, callback) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (false === (choices instanceof Array)) throw new Error('choices array required');
  if (!choices.length) throw new Error('choices array empty');
  if (typeof callback != 'function') throw new Error('callback required');
  if (this.choosePending) {
    delete this.choosePending;
    callback(Interface.firstMatch(this.chooseResponse, choices));
  } else {
    var groups = [];
    groups.push([{text: prompt.replace(/\n/g,'<br>'), label: true}]);
    if (choices.length > 0) groups.push([{text: choices[0], onClick: cb0}]);
    if (choices.length > 1) groups.push([{text: choices[1], onClick: cb1}]);
    if (choices.length > 2) groups.push([{text: choices[2], onClick: cb2}]);
    if (choices.length > 3) groups.push([{text: choices[3], onClick: cb3}]);
    if (choices.length > 4) groups.push([{text: choices[4], onClick: cb4}]);
    if (choices.length > 5) groups.push([{text: choices[5], onClick: cb5}]);
    if (choices.length > 6) groups.push([{text: choices[6], onClick: cb6}]);
    if (choices.length > 7) groups.push([{text: choices[7], onClick: cb7}]);
    if (choices.length > 8) groups.push([{text: choices[8], onClick: cb8}]);
    if (choices.length > 9) groups.push([{text: choices[9], onClick: cb9}]);
    if (choices.length > 10) throw new Error('max choices reached in choose');
    groups.push([{text: 'Cancel', color: 'red', onClick: cbCancel}]);
    Framework7Interface._f7.actions(groups);
  }
  /**
   * Since framework does not return any info in callback
   */
  function cbCancel() {
    callback();
  }

  function cb0() {
    callback(choices[0]);
  }

  function cb1() {
    callback(choices[1]);
  }

  function cb2() {
    callback(choices[2]);
  }

  function cb3() {
    callback(choices[3]);
  }

  function cb4() {
    callback(choices[4]);
  }

  function cb5() {
    callback(choices[5]);
  }

  function cb6() {
    callback(choices[6]);
  }

  function cb7() {
    callback(choices[7]);
  }

  function cb8() {
    callback(choices[8]);
  }

  function cb9() {
    callback(choices[9]);
  }
};
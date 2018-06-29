// usage: node dakoku.js enter|leave user_id password

var Nightmare = require('nightmare');
var vo = require('vo');

module.exports = function(action, user, password) {
  var btnSelector = action === 'enter' ? '#btnStInput' : '#btnEtInput';

  return vo(function* () {
    console.log('execute nightmare');
    var nightmare = Nightmare({
      show: false, // if you need to debug, change to true this option.
      webPreferences: {
        webSecurity:false
      },
      waitTimeout: 10000,
      executionTimeout: 10000
    });
    var iframe_url = yield nightmare
      .goto('https://teamspirit.cloudforce.com/')
      .wait('#idcard-identity')
      .type('#idcard-identity', user)
      .type('#password', password)
      .click('#Login')
      .wait(3000)
      .wait('iframe')
      .evaluate(function () {
        return document.getElementsByTagName('iframe')[1].getAttribute('src');
      });
    yield nightmare
      .goto(iframe_url)
      .wait(3000)
      .wait(btnSelector)
      .click(btnSelector)
      .wait(3000)
      .end();
  });
};

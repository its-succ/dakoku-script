// usage: node dakoku.js enter|leave user_id password

var Nightmare = require('nightmare');
var vo = require('vo');

var action = process.argv[2]
var user = process.argv[3]
var password = process.argv[4]

var btnSelector = action === 'enter' ? '#btnStInput' : '#btnEtInput'

vo(function* () {
  var nightmare = Nightmare({
    show: false, // if you need to debug, change to true this option.
    webPreferences: {
      webSecurity:false
    },
    waitTimeout: 5000,
    executionTimeout: 5000
  })
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
})(function (err, result) {
  if (err) return console.log(err);
  console.log(result);
});


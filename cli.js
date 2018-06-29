// usage: npm run cli enter|leave user_id password

const action = process.argv[2];
const user = process.argv[3];
const password = process.argv[4];
const dakoku = require('./dakoku');

dakoku(action, user, password)((err, result) => {
  if (err) return console.log(err);
  console.log(result);
});

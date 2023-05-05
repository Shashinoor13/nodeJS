const fs = require('fs');

function servePage(pagePath, res) {
  const readStream = fs.createReadStream(`./Pages/${pagePath}.html`, 'utf-8');
  readStream.pipe(res);
}

module.exports = {
  servePage
};

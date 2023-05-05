const fs = require('fs');

function servePage(pagePath, res, PORT_NUMBER) {
  console.log(`Currently on Page http://localhost:${PORT_NUMBER}/${pagePath}`);
  const readStream = fs.createReadStream(`./Pages/${pagePath}.html`, 'utf-8');
  readStream.pipe(res);
}

module.exports = {
  servePage
};

const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const config = dotenv.parse(fs.readFileSync(path.join(__dirname, '../.env')))

module.exports = config
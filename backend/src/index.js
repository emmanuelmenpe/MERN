require('dotenv').config();
const app = require('./app');
require('./database');

async function main() {
    await app.listen(app.get('port'));//de app obtener el valor de port
    console.log('Server on port', app.get('port'));
}

main(); 
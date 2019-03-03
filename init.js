var DB = require('./model/db');

async function main() {
    var result = await DB.insert('admin', { "username": "admin", "password": "admin" });
    console.log(result.result);
}
main();
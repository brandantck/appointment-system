const knex = require("knex");

const { setTypeParser, builtins } = require("pg").types;

const typesToReset = [builtins.DATE, builtins.TIME];
// Return types as plain str
function resetPgDateParsers() {
  for (const pgType of typesToReset) {
    setTypeParser(pgType, (val) => String(val));
  }
}
resetPgDateParsers();

module.exports = knex({
  client: "postgres",
  connection: {
    user: process.env.POSTGRES_USER,
    host: process.env.PG_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.PG_PORT,
  },
});

const createBase = require("./base");

const name = "";
const tableName = "";
const selectableProps = ["id", "username", "email", "updated_at", "created_at"];

module.exports = (knex) => {
  const base = createBase({ knex, name, tableName, selectableProps });

  return { ...base };
};

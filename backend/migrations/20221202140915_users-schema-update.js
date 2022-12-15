/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();

    tbl.text("name", 128).notNullable().unique();
    tbl.text("password", 250).notNullable();
    tbl.text("role", 250).notNullable();
    tbl.text("createdat", 250).notNullable();   
    tbl.text("updatedat", 250);  
    tbl.text("token", 400);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users"); 
};

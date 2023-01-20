/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("companies", tbl => {
        tbl.increments();
    
        tbl.text("name", 128).notNullable().unique();
        tbl.text("shortName", 128).notNullable().unique();
        tbl.text("contactId", 250).notNullable();
        tbl.text("businessEntity", 250).notNullable();
        tbl.text("createdat", 250).notNullable();   
        tbl.text("updatedat", 250);  
        tbl.text("type", 250).notNullable();   
        tbl.specificType("capital", 'BLOB').notNullable(); 
        tbl.text("status", 128);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("companies"); 
};

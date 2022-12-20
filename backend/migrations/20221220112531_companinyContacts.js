/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("companyContacts", tbl => {
        tbl.increments();
    
        tbl.text("firstname", 128).notNullable();
        tbl.text("lastname", 128).notNullable();
        tbl.text("email", 250).notNullable();
        tbl.text("patronymic", 250);
        tbl.text("createdat", 250).notNullable();   
        tbl.text("updatedat", 250);  
        tbl.text("phone", 128);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("companyContacts"); 
};

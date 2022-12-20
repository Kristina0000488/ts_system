/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('companies').del()
  await knex('companies').insert([
    {
      id: 1, 
      name: '"ООО Reebok gym"', 
      shortName: "Reebok gym", 
      createdat: "2020-11-21T08:03:00Z", 
      contactId: "16", 
      status: "active", 
      businessEntity: "ООО",
      type: [
        "agent", 
        "contractor"
      ], 
    }
  ]);
};
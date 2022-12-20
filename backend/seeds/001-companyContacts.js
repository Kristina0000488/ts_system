/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('companyContacts').del()
  await knex('companyContacts').insert([
    {
      id: 1, 
      createdat: "2020-11-21T08:03:00Z", 
      email: "grigoriev@reebokgym.com",
      firstname: "Сергей",
      lastname: "Григорьев",
      patronymic: "Петрович",
      phone: "79162165588",
    },
  ]);
};

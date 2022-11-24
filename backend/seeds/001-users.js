/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'user', password: 'user', role: "user", createdat: '2015-03-12T00:00:00Z'},
    {id: 2, name: 'alex', password: '123', role: "user", createdat: '2015-03-11T00:00:00Z'},
    {id: 3, name: 'admin', password: '000', role: "admin", createdat: '2015-03-10T00:00:00Z'}
  ]);
};
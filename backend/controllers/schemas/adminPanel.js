const typeString = { type: 'string' };

const headerSchema = {
    type: 'object',
    required: ['token'],
    properties: {
      token: typeString,
    },
};

const user = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: typeString,
    body: typeString,
  },
};
/*
const getUsersSchema = {
  response: {
    200: {
      type: 'array',
      items: user,
    },
  },
};

const getUserSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: user,
  },
};
*/
const addUserSchema = {
    headers: headerSchema,
    body: {
      type: 'object',
      required: ['title', 'body'],
      properties: {
        title: { type: 'number' },// typeString,
        body: { type: 'number' }// typeString, typeString,
      },
    },
    response: {
      200: { type: 'number' }, // sending a simple message as string
    },
};

const updateUserSchema = {
  body: {
    type: 'object',
    required: ['title', 'body'],
    properties: {
      title: { type: 'number' },
      body: { type: 'number' },
    },
  },
  params: {
    id: { type: 'number' },
  },
  response: {
    200: { type: 'number' }, // a simple message will be sent
  },
};

const deleteUserSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: { type: 'number' },
  },
};

module.exports = {
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
};
/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  connection: "mysql",
  tableName: 'users',
  autoCreatedAt: true,
  autoUpdatedAt: true,
  autoPK: true,


  attributes: {

    name: {
      type: "string",
      required: "true",
      size: 250
    },
    email: {
      type:"email",
      unique:true,
      required: true
    }



  }
};


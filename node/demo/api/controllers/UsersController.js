/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function (req, res) {

    var username = req.param('username');
    var password = req.param('password');

    Users.findOne({
      where: {
        name: username,
        password: password
      }
    })
      .exec(function (err, users) {

        if (err) {
          return res.json(err);
        }

        return res.json(users);

      });


    //req.session.authenticated = true;
    //  delete req.session.login;


  }

};


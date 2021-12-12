const Datastore = require("nedb");
let db = {};
db.users = new Datastore("users.db");
db.users.loadDatabase();

exports.Crud_registar = (email, password) => {
    return new Promise((resolve, reject) => {
      data = { email: email, password: password };
      db.users.insert(data, (err, dados) => {
        if (err) {
          reject(null);
        } else {
          resolve(dados);
        }
      });
    });
  };

exports.cRud_login = (email) => {
  return new Promise((resolve, reject) => {
    db.users.findOne(
      {
        email: email,
      },
      (err, dados) => {
        if (err) {
          reject("Utilizador não encontrado!");
        } else {
          resolve(dados);
        }
      }
    );
  });
};
var orm = require("../config/orm.js");

var new_restaurant = {
  all: function (cb) {
    orm.all("restaurants", function (res) {
      cb(res);
    });
  },
  create: function (cols, vals, cb) {
    orm.create("restaurants", cols, vals, function (res) {
      cb(res);
    });
  },

  delete: function (condition, cb) {
    orm.delete("restaurants", condition, function (res) {
      cb(res);
    })
  }
};

module.exports = new_restaurant;
var orm = require("../config/orm.js");

var new_order = {
  all: function (cb) {
    orm.all("order_details", function (res) {
      cb(res);
    });
  },
  create: function (cols, vals, cb) {
    orm.create("order_details", cols, vals, function (res) {
      cb(res);
    });
  },

  delete: function (condition, cb) {
    orm.delete("order_details", condition, function (res) {
      cb(res);
    })
  },

  update: function(objColVals, condition, cb) {
    orm.update("order_details", objColVals, condition, function(res) {
      cb(res);
    });
  },
};


module.exports = new_order;
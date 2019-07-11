var orm = require("../config/orm.js");

var menu_items = {
    all: function(cb) {
        orm.all("menu_items", function(res) {
          cb(res);
        });
      },
    create: function (cols, vals, cb) {
        orm.create("menu_items", cols, vals, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
      orm.delete("menu_items", condition, function (res) {
        cb(res);
      })
    }
};

module.exports = menu_items;
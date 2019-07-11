var orm = require("../config/orm.js");

var account = {

    create: function (cols, vals, cb) {
        orm.create("accounts", cols, vals, function (res) {
            cb(res);
        });
    },
    all: function (cb) {
        orm.all("accounts", function (res) {
            cb(res);
        });
    },
    selectWhere: function (conditions, cb) {
        orm.selectWhere(conditions, function (res) {
            cb(res);
        })
    }
};



module.exports = account;
var express = require("express");
var path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var fast_rest = require("../models/fast_rest.js");
var menu_items = require("../models/menu_items.js");
var new_restaurant = require("../models/new_rest.js");
var new_order = require("../models/new_order.js");
var connection = require('../config/connection');
var router = express.Router();

// run QR Code Scanner
router.get("/qrscanner", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/code_scanner.html"));
});

//create new account
router.get("/create-acct", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/create_new_acct.html"));
});

// create menu for new rest
router.get("/create-menu", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/create_new_menu.html"));
});

//create new rest-s
router.get("/create-restaurant", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/create_new_rest.html"));
})

// login a user
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

// displays menu items for a restaurant
router.get("/menu-items", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/checkout.html"));
});

// displays menu items for a restaurant
router.get("/owner-menu", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/owner_menu.html"));
});
// shows my restaurants
router.get("/my-restaurants", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/my_restaurants.html"));
});

//page for owners contain list of rest-s and menues
router.get("/owner", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/owners.html"));
});

router.get("/order", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/kitchen.html"));
});







//create new user account
router.post("/api/accounts", function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err,
        hash) {
        fast_rest.create([
            "firstName", "lastName", "login", "password", "email", "role"
        ], [
                req.body.firstName, req.body.lastName, req.body.login, hash, req.body.email, req.body.role
            ], function (result) {
                res.json({ result });
            });
    });
});


//login user with bycrypt
router.post('/api/login', function (req, response) {
    fast_rest.selectWhere({
        "login": req.body.login,
        // "password": req.body.password
    }, function (data) {
        if (data) {

            var userPassword = req.body.password.toString();
            var hash = data[0].password;
            console.log(userPassword);
            console.log(hash);

            bcrypt.compare(userPassword, hash, function (err, res) {
                if (res == true) {
                    console.log("match");
                    response.json(data);
                } else {
                    console.log("doesn't match");
                }
            });
        } else {
            console.log("doesn't exist!");
            res.redirect("/");
        }
    });
});

//login user without bcrypt

// connection.query("SELECT * FROM accounts WHERE login = ? and password = ?",
//     [login, password],
//     function (err, data) {
//         console.log('yooooooo', err, data);
//         if (err) {
//             console.log(err)
//         } else if (!data.length) {
//             res.json({ err: 'Invalid Username/Password' })
//         } else {
//             res.json(data);
//         }
//     }
// )
// });

// accounts data
router.get("/data", function (req, res) {
    account.all(function (data) {
        res.json({ accounts: data });
    });
});

// create a new restaurant
router.post("/api/restaurants", function (req, res) {
    console.log('req, bodyyyy', req.body)
    new_restaurant.create([
        "restaurant_name", "location", "email", "phone_number", "image_url", "owner_id"
    ], [
            req.body.restaurant_name, req.body.location, req.body.email, req.body.telephone, req.body.image_url, req.body.owner_id
        ], function (result) {
            res.json({ result });
        });
});

//return all rest data
router.get("/restaurants", function (req, res) {
    new_restaurant.all(function (data) {
        res.json({ new_restaurant: data });
    });
});

// get restaurants by owner_id
router.get("/api/restaurants/owners/:owner_id", function (req, res) {
    var ownerId = req.params.owner_id
    connection.query("SELECT * FROM restaurants WHERE owner_id = ?", [ownerId],
        function (err, data) {
            if (err) {
                console.log(err)
            } else {
                res.json(data)
            }
        }
    )
});

// delete restaurant
router.delete("/api/restaurants/:id", function (req, res) {
    var condition = "restaurant_id = " + req.params.id;;

    new_restaurant.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// get a single restaurant
router.get("/api/restaurants/:id", function (req, res) {
    var id = req.params.id
    connection.query("SELECT * FROM restaurants WHERE restaurant_id = ?",
        [id],
        function (err, data) {
            if (err) {
                console.log(err)
            } else {
                res.json(data[0])
            }
        }
    )
});

// create a menu item
router.post("/api/menu-items", function (req, res) {
    menu_items.create([
        "restaurant_id", "category", "item_name", "price", "ingredients", "image_url",
    ], [
            req.body.restaurant_id, req.body.category, req.body.item_name, req.body.price, req.body.ingredients, req.body.image_url
        ], function (result) {
            res.json({ result });
        });
});
//return all menu items
router.get("/api/menu-items", function (req, res) {
    menu_items.all(function (data) {
        res.json({ menu_items: data });
    });
});

//return all orderes items
router.get("/api/owner-menu", function (req, res) {
    menu_items.all(function (data) {
        res.json({ menu_items: data });
    });
});
//delete items from the menu from  owner's page
router.delete("/api/owner-menu/:id", function (req, res) {
    var condition = "item_id = " + req.params.id;
    console.log(condition);
    menu_items.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
})




// Get menu items by restaurant id
router.get("/api/restaurants/:id/menu-items", function (req, res) {
    var id = req.params.id
    connection.query("SELECT * FROM menu_items WHERE restaurant_id = ?",
        [id],
        function (err, data) {
            if (err) {
                console.log(err)
            } else {
                res.json(data)
            }
        }
    )
});


//orders
router.post("/api/order/", function (req, res) {
    // console.log("inside order req controller");
    // console.log(new_order);
    // console.log('req, bodyyyy', req.body)
    new_order.create([
         "total_price", "item_name", "quantity"
    ], [
             req.body.total_price, req.body.item_name, req.body.quantity
        ], function (result) {
            res.json({ result });
        });
});

router.get("/api/order", function (req, res) {
    new_order.all(function (data) {
        res.json({ accounts: data });
    });
});
//delete order
router.delete("/api/order/:id", function (req, res) {
    var condition = "item_id = " + req.params.id;

    new_order.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//update status of order 
router.put("/api/order/:id", function (req, res) {
    var condition = "item_id = " + req.params.id;
    // console.log("condition", condition);

    new_order.update({
        ready: true
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
})


// Export routes for server.js to use.
module.exports = router;

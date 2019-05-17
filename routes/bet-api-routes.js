// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the bets
  app.get("/api/bets", function(req, res) {
    var query = {};
    console.log(req.query);
    console.log("req.query");
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Bet.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbBet) {
      res.json(dbBet);
    });
  });

  // Get route for retrieving a single bet
  app.get("/api/bets/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Bet.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbBet) {
      res.json(dbBet);
    });
  });

  // POST route for saving a new bet
  app.post("/api/bets", function(req, res) {
    db.Bet.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/bets/:id", function(req, res) {
    db.Bet.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/bets", function(req, res) {
    db.Bet.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};

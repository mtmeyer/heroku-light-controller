  var express = require("express");
  var bodyParser = require("body-parser");
  var mongodb = require("mongodb");
  var ObjectID = mongodb.ObjectID;

  var BRIGHTNESS_COLLECTION = "brightness";

  var app = express();
  app.use(bodyParser.json());

  // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
  var db;

  // Connect to the database before starting the application server.
  mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
      var port = server.address().port;
      console.log("App now running on port", port);
    });
  });

  // BRIGHTNESS API ROUTES BELOW

  // Generic error handler used by all endpoints.
  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }


  app.get("/api/brightness", function(req, res) {
    db.collection(BRIGHTNESS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get brightness.");
      } else {
        res.status(200).json(docs);
      }
    });
  });

  app.put("/api/brightness/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(BRIGHTNESS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update brightness");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

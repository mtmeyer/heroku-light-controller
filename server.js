
var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),

    // Mongoose Schema definition
    Schema = new mongoose.Schema({
      id       : String,
      title    : String,
      completed: Boolean
    }),

    Todo = mongoose.model('Todo', Schema);

MONGOLAB_URI="mongodb://heroku_7x1v9nrh:291c34epnjjk272us7r3ru85p6@ds159493.mlab.com:59493/heroku_7x1v9nrh";

mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

express()
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

  .get('/api/brightness', function (req, res) {
    Todo.find( function ( err, todos ){
      res.json(200, todos);
    });
  })

  .post('/api/brightness', function (req, res) {
    var brightness = new Brightness( req.body );
    brightness.id = brightness._id;
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);

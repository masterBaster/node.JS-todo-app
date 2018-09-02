const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Connect to the database
mongoose.connect('mongodb://test:test666@ds143242.mlab.com:43242/todo');

//Create a schema as interface
const todoSchema = new mongoose.Schema({
    item: String
});

//Create a model witch is based on schema
const Todo = mongoose.model('Todo', todoSchema);

//let itemOne = Todo({item: 'get flowers'}).save(function(err){
//   if (err) throw err;
// console.log('item saved...');
//}) 

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'go to the gym'}];

module.exports = function(app){

    app.get('/todo', function(req, res){
        //get data from mongodb and pass it into view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        })
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data form the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        })
    });
}   
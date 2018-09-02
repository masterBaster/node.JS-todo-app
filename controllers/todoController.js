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

let itemOne = Todo({item: 'get flowers'}).save(function(err){
    if (err) throw err;
    console.log('item saved...');
}) 


var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'go to the gym'}];

module.exports = function(app){

    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });
    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
}   
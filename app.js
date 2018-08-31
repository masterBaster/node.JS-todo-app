let express = require('express');
let todoController = require('./controllers/todoController');

let app = express();

//fire controllers
todoController(app);

//set up template engine
app.set('view engine', 'ejs');

//set up static files
app.use(express.static('./public'));

//listen to port
let port = 3000;
app.listen(port);
console.log(`you are listening to port ${port}`);
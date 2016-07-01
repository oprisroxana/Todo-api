var express    = require ('express'),
   bodyParser  = require ('body-parser');

var app        = express(),
    PORT       = process.env.PORT || 3000,
    todoNextId = 1,
    todos      = [];

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('<h2> ToDo API Root </h2>');
});

// GET /todos
app.get('/todos', function(req, res){
  res.json(todos);
});

//GET todos/:id
app.get('/todos/:id', function(req, res){
  var todoId =parseInt(req.params.id, 10) ;
  var match;
for (var i = 0; i < todos.length; i++) {
   if (todos[i].id === todoId){
     match = todos[i];
   }
 }
 if (match){
   res.json(match);
 }else{
   res.status(404).send();
 }
});

//------POST /TODOS
app.post('/todos', function (req, res) {
  var body = req.body;
      body.id = todoNextId;
      todoNextId++;
      // same as body.id = todoNextId++;
      todos.push(body);
     console.log("Body was pushed to todos array");
  res.json(body);
});

 app.listen(PORT, function(){
   console.log("Express listening on port " + PORT + '!');
 });

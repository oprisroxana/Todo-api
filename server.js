var express = require ('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [
  {
    id : 1,
    description : 'Meet mom for lunch',
    completed : false,
  },
  {
    id : 2,
    description : 'Go to market',
    completed : false,
  },
  {
    id : 3,
    description : 'Learn something new',
    completed : false,
  },
  {
    id : 4,
    description : '30 minutes workout',
    completed : false,
  }
];

// get /todos
app.get('/todos', function(req, res){
  res.json(todos);
});

//get todos/:id
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
  //res.send('Asking for todo with id of ' + req.params.id);
});






app.get('/', function(req, res){
  res.send('<h2> ToDo API Root </h2>');
});
 app.listen(PORT, function(){
   console.log("Express listening on port " + PORT + '!');
 });

var express    = require ('express'),
   bodyParser  = require ('body-parser'),
   _           = require ('underscore');

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
  var match =  _.findWhere(todos, {id :todoId});
     if (match){
       res.json(match);
     }else{
       res.status(404).send();
     }
    });

//------POST /TODOS
      app.post('/todos', function (req, res) {

      var body = _.pick(req.body, "description", "completed");
      if ( !_.isBoolean(body.completed) ||  !_.isString(body.description) || body.description.trim().length === 0 ){
        return res.status(400).send();
      }

      body.description = body.description.trim();
      body.id = todoNextId++;
      todos.push(body);
      res.json(body);
});

 app.listen(PORT, function(){
   console.log("Express listening on port " + PORT + '!');
 });

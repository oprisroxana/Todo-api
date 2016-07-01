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
  var queryParams = req.query;
  var filteredTodos = todos;

   if (queryParams.hasOwnProperty('completed') &&  queryParams.completed === "true") {
     filteredTodos = _.where(filteredTodos, {completed : true });
   } else if (queryParams.hasOwnProperty('completed') &&  queryParams.completed === "false"){
     filteredTodos = _.where(filteredTodos, {completed : false });
   }

  res.json(filteredTodos);
});

//GET todos/:id
app.get('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10) ;
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


// DELETE /todos/:id

  app.delete('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var match =  _.findWhere(todos, {id :todoId});
    if (!match){
      res.status(404).json({ "error" : "No todo found with that id"});
    } else {
      todos = _.without(todos, match);
      res.send(match);
     }
  });

  // PUT  /todos/:id
  app.put('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var match =  _.findWhere(todos, {id :todoId});
    var body = _.pick(req.body, "description", "completed");
    var validAttr = {};

    if (!match) {
      return res.status(400).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
      validAttr.completed = body.completed;
    }else if (body.hasOwnProperty('completed')) {
      return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length !== 0) {
      validAttr.description = body.description;
    }else if (body.hasOwnProperty('description')) {
      return res.status(400).send();
    }

     _.extend(match, validAttr);

    res.json(match);

  });


 app.listen(PORT, function(){
   console.log("Express listening on port " + PORT + '!');
 });

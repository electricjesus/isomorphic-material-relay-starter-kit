export class Todo extends Object {}
export class User extends Object {}

var usersById = {
  [ 0 ]: new User( ), // Anonymous
  [ 1 ]: new User( ),
  [ 2 ]: new User( ),
};

// Mock todo data
var todosById = {};
var todoIdsByUser = {
  [0]: [ ],
  [1]: [ ],
  [2]: [ ],
};

var nextTodoId = 0;
DS_ToDo_add( 0, 'Anonymous Taste JavaScript', true );
DS_ToDo_add( 1, 'jack Buy a unicorn', false );
DS_ToDo_add( 2, 'jill Minify CSS', false );

export function DS_ToDo_add( user_id, text, complete )
{
  var todo = new Todo( );

  todo.complete = !!complete;
  todo.id = `${nextTodoId++}`;
  todo.text = text;

  todosById[ todo.id ] = todo;

  todoIdsByUser[ user_id ].push( todo.id );

  return todo.id;
}

export function DS_ToDo_statusUpdate( id, complete )
{
  var todo = DS_ToDo_get( id );
  todo.complete = complete;
}

export function DS_ToDo_get( id )
{
  return todosById[ id ];
}

export function DS_ToDo_list_getForUser( user_id, status = 'any' )
{
  console.log( ' DS_ToDo_list_getForUser user_id=' + user_id );

  var todos = todoIdsByUser[ user_id ].map( id => todosById[ id ] );

  if( status === 'any' )
    return todos;

  let statusCheck = ( status === 'completed' );
  return todos.filter( todo => todo.complete === statusCheck );
}

export function DS_User_get( id )
{
  return usersById[ id ];
}

export function DO_ToDo_list_updateMarkAllForUser( user_id, complete )
{
  var changedTodos = [];
  DS_ToDo_list_getForUser( user_id ).forEach(todo => {
    if (todo.complete !== complete) {
      todo.complete = complete;
      changedTodos.push(todo);
    }
  });
  return changedTodos.map(todo => todo.id);
}

export function DS_ToDo_deleteForUser( user_id, id )
{
  var todoIndex = todoIdsByUser[ user_id ].indexOf( id );

  if( todoIndex !== -1 )
    todoIdsByUser[ user_id ].splice( todoIndex, 1 );

  delete todosById[ id ];
}

export function DS_ToDo_list_deleteCompletedForUser( user_id )
{
  var todosToRemove = DS_ToDo_list_getForUser( user_id ).filter( todo => todo.complete );
  todosToRemove.forEach( todo => DS_ToDo_deleteForUser( user_id, todo.id ) );
  return todosToRemove.map( todo => todo.id );
}

export function DS_ToDo_updateRename( id, text )
{
  var todo = DS_ToDo_get( id );
  todo.text = text;
}

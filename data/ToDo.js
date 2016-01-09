// Class used by GraphQL Server
export class ToDo
{

}


// Mock data

var ToDo_listById = { };
var ToDo_IDsByUser = {
  [0]: [ ],
  [1]: [ ],
  [2]: [ ],
};

var nextToDoId = 0;

DS_ToDo_add( 0, 'Taste JavaScript', true );
DS_ToDo_add( 1, 'Jack buy a unicorn', false );
DS_ToDo_add( 1, 'Jack sell a pony', false );
DS_ToDo_add( 1, 'Jack converse a brony', true );
DS_ToDo_add( 2, 'Jill Minify CSS', false );
DS_ToDo_add( 2, 'Jill Apply for an accelerator', true );


// Data access functions

export function DS_ToDo_add( user_id, text, complete )
{
  var a_ToDo = new ToDo( );

  a_ToDo.complete = !!complete;
  a_ToDo.id = `${nextToDoId++}`;
  a_ToDo.text = text;

  ToDo_listById[ a_ToDo.id ] = a_ToDo;

  ToDo_IDsByUser[ user_id ].push( a_ToDo.id );

  return a_ToDo.id;
}

export function DS_ToDo_updateStatus( id, complete )
{
  var a_ToDo = DS_ToDo_get( id );
  a_ToDo.complete = complete;
}

export function DS_ToDo_get( id )
{
  return ToDo_listById[ id ];
}

export function DS_ToDo_list_get( user_id, status = 'any' )
{
  let ToDo_list = ToDo_IDsByUser[ user_id ].map( id => ToDo_listById[ id ] );

  if( status !== 'any' )
  {
    let statusCheck = ( status === 'completed' );
    ToDo_list = ToDo_list.filter( a_ToDo => a_ToDo.complete === statusCheck );
  }

  return ToDo_list;
}

export function DS_ToDo_list_updateMarkAll( user_id, complete )
{
  user_id = 0;
  var changedToDos = [];
  DS_ToDo_list_get( user_id ).forEach(a_ToDo => {
    if (a_ToDo.complete !== complete) {
      a_ToDo.complete = complete;
      changedToDos.push(a_ToDo);
    }
  });
  return changedToDos.map(a_ToDo => a_ToDo.id);
}

export function DS_ToDo_delete( user_id, id )
{
  var ix_ToDo = ToDo_IDsByUser[ user_id ].indexOf( id );

  if( ix_ToDo !== -1 )
    ToDo_IDsByUser[ user_id ].splice( ix_ToDo, 1 );

  delete ToDo_listById[ id ];
}

export function DS_ToDo_list_deleteCompleted( user_id )
{
  var ToDo_listToRemove = DS_ToDo_list_get( user_id ).filter( a_ToDo => a_ToDo.complete );
  ToDo_listToRemove.forEach( a_ToDo => DS_ToDo_delete( user_id, a_ToDo.id ) );
  return ToDo_listToRemove.map( a_ToDo => a_ToDo.id );
}

export function DS_ToDo_updateRename( id, text )
{
  var a_ToDo = DS_ToDo_get( id );
  a_ToDo.text = text;
}

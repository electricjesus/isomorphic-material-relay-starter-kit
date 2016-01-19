import { runQuery, runQueryOneResult, runQueryNoResult } from './_client.js';

import ToDo from '../model/ToDo'



// ->->-> To be removed later

import generateUUID from './generateUUID'
// Helper function to make sure we get our proper FK ID values
// The are constant so that we can use our cookies between server restarts
export function DA_User_GetUUIDByID( id )
{
  if( id === 0 )
  return '00000000-0000-0000-0000-000000000000'; // Anonymous user uses UUID also
  if( id === 1 )
    return 'd362e1df-1fa8-466b-b311-af90b2a71e8e';
  if( id === 2 )
    return '33171548-39d3-45d8-ab5c-5eedefe01dfc';
}


// Mock data

var ToDo_listById = { };
var ToDo_id_by_User_id = { };
ToDo_id_by_User_id[ DA_User_GetUUIDByID( 0 ) ] = [ ];
ToDo_id_by_User_id[ DA_User_GetUUIDByID( 1 ) ] = [ ];
ToDo_id_by_User_id[ DA_User_GetUUIDByID( 2 ) ] = [ ];

// <-<-<- To be removed later


// Data access functions

export function DA_ToDo_add( fields )
{
  const id = generateUUID( );
  let cqlText = 'INSERT INTO "ToDo" (id, "ToDo_User_id", "ToDo_Text", "ToDo_Complete" ) VALUES (?, ?, ?, false);';
  let cqlParams = [
    generateUUID( ),
    fields.ToDo_User_id,
    fields.ToDo_Text,
  ];
  return runQueryNoResult( cqlText, cqlParams ).then( ( ) => id );
}

export function DA_ToDo_update( id, fields )
{
  // We will not update ToDo_User_id since it makes no sense to update it
  let cqlText = 'UPDATE "ToDo" SET ';

  let followingItem = false;

  if( 'ToDo_Text' in fields )
  {
    cqlText += '"ToDo_Text" = ?';
    cqlParams.push( fields.ToDo_Text );
    followingItem = true;
  }
  if( followingItem ) cqlText += ', ';
  if( 'ToDo_Complete' in fields )
  {
    cqlText += '"ToDo_Complete" = ?';
    cqlParams.push( fields.ToDo_Complete );
    followingItem = true;
  }

  cqlText += ' WHERE id = ?;';
  cqlParams.push( id );

  return runQueryNoResult( cqlText, cqlParams );
}

export function DA_ToDo_get( id )
{
  const cqlText = 'SELECT * FROM "ToDo" WHERE id = ?;';
  const cqlParams = [ id ];

  return runQueryOneResult( ToDo, cqlText, cqlParams );
}

export function DA_ToDo_delete( User_id, id )
{
  const cqlText = 'DELETE FROM "ToDo" WHERE id = ?;';
  const cqlParams = [ id ];

  return runQueryOneResult( ToDo, cqlText, cqlParams );
}

export function DA_ToDo_list_get( User_id, status )
{
  let cqlText = 'SELECT * FROM "ToDo" WHERE "ToDo_User_id" = ?';
  let cqlParams = [ User_id ];

  if( status != 'any' )
  {
    // Allow filtering is OK since there won't be that many ToDos per user anyway.
    cqlText += ' AND "ToDo_Complete" = ? ALLOW FILTERING';
    cqlParams.push( status === 'completed' );
  }

  cqlText += ';';

  return runQuery( ToDo, cqlText, cqlParams );
}

// ->->-> To be modified later

export function DA_ToDo_list_updateMarkAll( User_id, ToDo_Complete )
{
  // TODO this needs to be done in CQL
  User_id = 0;
  var changedToDos = [];
  DA_ToDo_list_get( User_id ).forEach(a_ToDo => {
    if (a_ToDo.ToDo_Complete !== ToDo_Complete) {
      a_ToDo.ToDo_Complete = ToDo_Complete;
      changedToDos.push(a_ToDo);
    }
  });
  return changedToDos.map(a_ToDo => a_ToDo.id);
}

export function DA_ToDo_list_deleteCompleted( User_id )
{
  // TODO this needs to be done in CQL
  var ToDo_listToRemove = DA_ToDo_list_get( User_id ).filter( a_ToDo => a_ToDo.ToDo_Complete );
  ToDo_listToRemove.forEach( a_ToDo => DA_ToDo_delete( User_id, a_ToDo.id ) );
  return ToDo_listToRemove.map( a_ToDo => a_ToDo.id );
}

// <-<-<- To be modified later

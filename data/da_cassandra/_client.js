import squel from 'squel';
import cassandraDriver from 'cassandra-driver';

// Read environment
require( 'dotenv' ).load( );

squel.registerValueHandler( cassandraDriver.types.Uuid, function( uuid ){ return uuid; } );
export const sql = squel;

export const client = new cassandraDriver.Client( { contactPoints: process.env.CASSANDRA_CONNECTION_POINTS.split( ',' ), keyspace: process.env.CASSANDRA_KEYSPACE } );

export function runQuery( objectPrototype, queryText, queryValues )
{
  return new Promise( ( resolve, reject ) =>
  {
    client.execute( queryText, queryValues, ( err, result ) =>
    {
      // TODO process errors: assert.ifError(err);
      const resultAsObjects = [ ];
      const rowCount = result.rows.length;
      for( let ixRow = 0 ; ixRow < rowCount ; ixRow++ )
      {
        let row = result.rows[ ixRow ];
        resultAsObjects.push( new objectPrototype( row ) );
      }
      console.log( "runQuery: " + JSON.stringify( resultAsObjects ) );
      resolve( resultAsObjects );
    } );
  } );
}

export function runQueryOneResult( objectPrototype, queryText, queryValues )
{
  console.log( "runQueryOneResult [" + queryText + "] params=" + JSON.stringify( queryValues ) );
  return new Promise( ( resolve, reject ) =>
  {
    client.execute( queryText, queryValues, ( err, result ) =>
    {
      // TODO process errors: assert.ifError(err);
      console.log( "runQueryOneResult [" + queryText + "] params=" + JSON.stringify( queryValues ) + " err=" + JSON.stringify( err ) + " result=" + JSON.stringify( result ) );
      if( result.rows.length > 0 )
      {
        const retObj = new objectPrototype( result.rows[ 0 ] );
        resolve( retObj );
      }
      else
        resolve( null );
    } );
  } );
}

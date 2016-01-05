// Class used by GraphQL Server
export class Compendium
{
  constructor( )
  {
    this.CompText1 = "I am first with five";
    this.CompText2 = "Then seven in the middle";
    this.CompText3 = "Five again to end";
  }
}


// Mock data

var Compendium_listById = { };
var Compendium_IDsByUser = {
  [0]: [ ],
  [1]: [ ],
  [2]: [ ],
};

var nextCompendiumId = 0;

DS_Compendium_add( 0 );
DS_Compendium_add( 1 );
DS_Compendium_add( 2 );


// Data access functions

export function DS_Compendium_add( user_id )
{
  var a_Compendium = new Compendium( );

  a_Compendium.id = `${nextCompendiumId++}`;

  Compendium_listById[ a_Compendium.id ] = a_Compendium;

  Compendium_IDsByUser[ user_id ].push( a_Compendium.id );

  return a_Compendium.id;
}

export function DS_Compendium_update( id, CompText1, CompText2, CompText3  )
{
  var a_Compendium = DS_Compendium_get( id );

  a_Compendium.CompText1 = CompText1;
  a_Compendium.CompText2 = CompText2;
  a_Compendium.CompText3 = CompText3;
}

export function DS_Compendium_get( id )
{
  return Compendium_listById[ id ];
}

export function DS_Compendium_list( user_id )
{
  return Compendium_IDsByUser[ user_id ].map( id => Compendium_listById[ id ] );

  return result;
}

// Class used by GraphQL Server
export class Compendium
{
  constructor( )
  {
    this.Compendium_FirstTextInput = "I am first with five";
    this.Compendium_RangedNumber = 35;
    this.Compendium_Excitement = 3;
    this.Compendium_FollowUpQuestion = "Then seven in the middle";
    this.Compendium_FavoriteMammal = 3;
    this.Compendium_FavoriteMammalOtherText = "";
    this.Compendium_LastText = "Five again to end";
    this.Compendium_LikedSunset_Ocean = false;
    this.Compendium_LikedSunset_Lake = false;
    this.Compendium_LikedSunset_Mountains = false;
    this.Compendium_LikedSunset_Plains = false;
    this.Compendium_LikedSunset_Purple = false;
    this.Compendium_LikedSunset_Green = false;
    this.Compendium_LikedSunset_Other = false;
    this.Compendium_LikedSunset_OtherText = "";
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

export function DS_Compendium_update(
  id,
  Compendium_FirstTextInput,
  Compendium_RangedNumber,
  Compendium_Excitement,
  Compendium_FollowUpQuestion,
  Compendium_FavoriteMammal,
  Compendium_FavoriteMammalOtherText,
  Compendium_LastText,
  Compendium_LikedSunset_Ocean,
  Compendium_LikedSunset_Lake,
  Compendium_LikedSunset_Mountains,
  Compendium_LikedSunset_Plains,
  Compendium_LikedSunset_Purple,
  Compendium_LikedSunset_Green,
  Compendium_LikedSunset_Other,
  Compendium_LikedSunset_OtherText,
)
{
  var a_Compendium = DS_Compendium_get( id );

  a_Compendium.Compendium_FirstTextInput          = Compendium_FirstTextInput;
  a_Compendium.Compendium_RangedNumber            = Compendium_RangedNumber;
  a_Compendium.Compendium_Excitement              = Compendium_Excitement;
  a_Compendium.Compendium_FollowUpQuestion        = Compendium_FollowUpQuestion;
  a_Compendium.Compendium_FavoriteMammal          = Compendium_FavoriteMammal;
  a_Compendium.Compendium_FavoriteMammalOtherText = Compendium_FavoriteMammalOtherText;
  a_Compendium.Compendium_LastText                = Compendium_LastText;
  a_Compendium.Compendium_LikedSunset_Ocean       = Compendium_LikedSunset_Ocean;
  a_Compendium.Compendium_LikedSunset_Lake        = Compendium_LikedSunset_Lake;
  a_Compendium.Compendium_LikedSunset_Mountains   = Compendium_LikedSunset_Mountains;
  a_Compendium.Compendium_LikedSunset_Plains      = Compendium_LikedSunset_Plains;
  a_Compendium.Compendium_LikedSunset_Purple      = Compendium_LikedSunset_Purple;
  a_Compendium.Compendium_LikedSunset_Green       = Compendium_LikedSunset_Green;
  a_Compendium.Compendium_LikedSunset_Other       = Compendium_LikedSunset_Other;
  a_Compendium.Compendium_LikedSunset_OtherText   = Compendium_LikedSunset_OtherText;
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

import generateUUID from './generateUUID'
import { DA_User_GetUUIDByID } from './User';
import Compendium from '../model/Compendium'

// Mock data

var Compendium_listById = { };
var Compendium_IDsByUser = { };
Compendium_IDsByUser[ DA_User_GetUUIDByID( 0 ) ] = [ ];
Compendium_IDsByUser[ DA_User_GetUUIDByID( 1 ) ] = [ ];
Compendium_IDsByUser[ DA_User_GetUUIDByID( 2 ) ] = [ ];

for( let User_id = 0 ; User_id < 3; User_id++ )
  DA_Compendium_add( {
    id: generateUUID( ),
    User_id: DA_User_GetUUIDByID( User_id ),
    Compendium_FirstTextInput: "I am first with five",
    Compendium_RangedNumber: 35,
    Compendium_Excitement: 3,
    Compendium_FollowUpQuestion: "Then seven in the middle",
    Compendium_FavoriteMammal: 3,
    Compendium_FavoriteMammalOtherText: "",
    Compendium_LastText: "Five again to end",
    Compendium_LikedSunset_Ocean: false,
    Compendium_LikedSunset_Lake: false,
    Compendium_LikedSunset_Mountains: false,
    Compendium_LikedSunset_Plains: false,
    Compendium_LikedSunset_Purple: false,
    Compendium_LikedSunset_Green: false,
    Compendium_LikedSunset_Other: false,
    Compendium_LikedSunset_OtherText: "",
  } );


// Data access functions

export function DA_Compendium_add( fields )
{
  var a_Compendium = new Compendium( fields );

  Compendium_listById[ a_Compendium.id ] = a_Compendium;
  Compendium_IDsByUser[ a_Compendium.User_id ].push( a_Compendium.id );

  return a_Compendium.id;
}

export function DA_Compendium_update( id, fields )
{
  var a_Compendium = DA_Compendium_get( id );

  a_Compendium.Compendium_FirstTextInput          = fields.Compendium_FirstTextInput;
  a_Compendium.Compendium_RangedNumber            = fields.Compendium_RangedNumber;
  a_Compendium.Compendium_Excitement              = fields.Compendium_Excitement;
  a_Compendium.Compendium_FollowUpQuestion        = fields.Compendium_FollowUpQuestion;
  a_Compendium.Compendium_FavoriteMammal          = fields.Compendium_FavoriteMammal;
  a_Compendium.Compendium_FavoriteMammalOtherText = fields.Compendium_FavoriteMammalOtherText;
  a_Compendium.Compendium_LastText                = fields.Compendium_LastText;
  a_Compendium.Compendium_LikedSunset_Ocean       = fields.Compendium_LikedSunset_Ocean;
  a_Compendium.Compendium_LikedSunset_Lake        = fields.Compendium_LikedSunset_Lake;
  a_Compendium.Compendium_LikedSunset_Mountains   = fields.Compendium_LikedSunset_Mountains;
  a_Compendium.Compendium_LikedSunset_Plains      = fields.Compendium_LikedSunset_Plains;
  a_Compendium.Compendium_LikedSunset_Purple      = fields.Compendium_LikedSunset_Purple;
  a_Compendium.Compendium_LikedSunset_Green       = fields.Compendium_LikedSunset_Green;
  a_Compendium.Compendium_LikedSunset_Other       = fields.Compendium_LikedSunset_Other;
  a_Compendium.Compendium_LikedSunset_OtherText   = fields.Compendium_LikedSunset_OtherText;
}

export function DA_Compendium_get( id )
{
  return Compendium_listById[ id ];
}

export function DA_Compendium_list( user_id )
{
  return Compendium_IDsByUser[ user_id ].map( id => Compendium_listById[ id ] );

  return result;
}

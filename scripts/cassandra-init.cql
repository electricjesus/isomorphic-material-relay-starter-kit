DROP KEYSPACE IF EXISTS imrsk;

CREATE KEYSPACE imrsk
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE imrsk;

CREATE TABLE "User"(
  id uuid PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "User_DisplayName" varchar,
  "User_ProfilePhoto" varchar,
  "User_Email" varchar,
);

CREATE INDEX "User_username_ix"
ON "User"( username );

insert into "User"( id, "username", "password", "User_DisplayName", "User_ProfilePhoto", "User_Email" )
values( d362e1df-1fa8-466b-b311-af90b2a71e8e, 'jack', 'secret', 'Jack Dacub', '/profile_photos/jack.jpg', 'jack@example.com' );

insert into "User"( id, "username", "password", "User_DisplayName", "User_ProfilePhoto", "User_Email" )
values( 33171548-39d3-45d8-ab5c-5eedefe01dfc, 'jill', 'birthday', 'Jill Dabear', '/profile_photos/jill.jpg', 'jill@example.com' );

CREATE TABLE "Compendium"(
  "id" uuid PRIMARY KEY,
  "Compendium_User_id" uuid,
  "Compendium_FirstTextInput" varchar,
  "Compendium_RangedNumber" int,
  "Compendium_Excitement" int,
  "Compendium_FollowUpQuestion" varchar,
  "Compendium_FavoriteMammal" int,
  "Compendium_FavoriteMammalOtherText" varchar,
  "Compendium_LastText" varchar,
  "Compendium_LikedSunset_Ocean" boolean,
  "Compendium_LikedSunset_Lake" boolean,
  "Compendium_LikedSunset_Mountains" boolean,
  "Compendium_LikedSunset_Plains" boolean,
  "Compendium_LikedSunset_Purple" boolean,
  "Compendium_LikedSunset_Green" boolean,
  "Compendium_LikedSunset_Other" boolean,
  "Compendium_LikedSunset_OtherText" varchar,
);

CREATE INDEX "Compendium_Compendium_User_id_ix"
ON "Compendium"( "Compendium_User_id" );

CREATE TABLE "ToDo"(
  "id" uuid PRIMARY KEY,
  "ToDo_User_id" uuid,
  "ToDo_Text" varchar,
  "ToDo_Complete" boolean,
);

CREATE INDEX "ToDo_ToDo_User_id_ix"
ON "ToDo"( "ToDo_User_id" );

DROP KEYSPACE IF EXISTS imrsk;

CREATE KEYSPACE imrsk
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE imrsk;

CREATE TABLE "User"(
  id uuid PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "displayName" varchar,
  "email" varchar,
);

CREATE INDEX User_username_ix
ON "User"( username );

insert into "User"( id, "username", "password", "displayName", "email" )
values( d362e1df-1fa8-466b-b311-af90b2a71e8e, 'jack', 'secret', 'Jack Myuser', 'jack@example.com' );

insert into "User"( id, "username", "password", "displayName", "email" )
values( 33171548-39d3-45d8-ab5c-5eedefe01dfc, 'jill', 'birthday', 'Jill Daccount', 'jill@example.com' );

CREATE TABLE "Compendium"(
  id uuid PRIMARY KEY,
  "User_id" varchar,
  "FirstTextInput" varchar,
  "RangedNumber" int,
  "Excitement" int,
  "FollowUpQuestion" varchar,
  "FavoriteMammal" int,
  "FavoriteMammalOtherText" varchar,
  "LastText" varchar,
  "LikedSunset_Ocean" boolean,
  "LikedSunset_Lake" boolean,
  "LikedSunset_Mountains" boolean,
  "LikedSunset_Plains" boolean,
  "LikedSunset_Purple" boolean,
  "LikedSunset_Green" boolean,
  "LikedSunset_Other" boolean,
  "LikedSunset_OtherText" varchar,
);

CREATE INDEX User_User_id_ix
ON "Compendium"( User_id );

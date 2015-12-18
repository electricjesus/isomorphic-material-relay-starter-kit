import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jwt-simple';

import User from '../data/User';

// passport.use( new passportLocal.Strategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

let auth = express( );
auth.use( bodyParser.json( ) );

auth.post('/', function(req, res, next) {
  console.log( "serving AUTH" );
  console.log( JSON.stringify( req.body ) );      // your JSON
  let username = req.body.username;
  let password = req.body.password;
  console.log( "username=" + username );
  console.log( "password=" + password);
  User.findByUserName( username, function(err, user) {
    if (err)
      return res.status( 401 ).json( { error: 'Error while looking for user' } );
    if ( ! user )
      return res.status( 401 ).json( { error: 'Incorrect user' } );
    else if( ! ( user.password == password ) )
      return res.status( 401 ).json( { error: 'Incorrect password' } );
    else
    {
      // User has authenticated correctly thus we create a JWT token
      var token = jwt.encode( { username: 'somedata'}, "TBD: Make this a setting tokenSecret" );
      res.json({ token : token });
    }
  });

  // passport.authenticate('local', function(err, user, info) {
  //   if (err) { return next(err) }
  //   if (!user) {
  //     return res.status( 401 ).json( { error: 'message' });
  //   }
  //
  //   //user has authenticated correctly thus we create a JWT token
  //   var token = jwt.encode({ username: 'somedata'}, tokenSecret);
  //   res.json({ token : token });
  //
  // })(req, res, next);
});


export default auth;

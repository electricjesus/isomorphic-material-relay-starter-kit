/* @flow weak */

import {GraphQLObjectType} from "graphql";


// ->->-> Viewer mutations imports

import Viewer_update from "../mutation/Viewer_update";
import Viewer_updatePassword from "../mutation/Viewer_updatePassword";

// <-<-<- Viewer mutations imports


export default new GraphQLObjectType( {
  name: 'Mutation',
  fields: {

    // ->->-> Viewer mutations

    Viewer_update: Viewer_update,
    Viewer_updatePassword: Viewer_updatePassword,

    // <-<-<- Viewer mutations

  },
} );

import {GraphQLObjectType} from "graphql";

import Compendium_update from "../mutation/Compendium_update";

import ToDo_add from "../mutation/ToDo_add";
import ToDo_updateStatus from "../mutation/ToDo_updateStatus";
import ToDo_list_updateMarkAll from "../mutation/ToDo_list_updateMarkAll";
import ToDo_list_deleteCompleted from "../mutation/ToDo_list_deleteCompleted";
import ToDo_delete from "../mutation/ToDo_delete";
import ToDo_updateRename from "../mutation/ToDo_updateRename";


export default new GraphQLObjectType( {
  name: 'Mutation',
  fields: {

    Compendium_update: Compendium_update,

    ToDo_add: ToDo_add,
    ToDo_updateStatus: ToDo_updateStatus,
    ToDo_list_updateMarkAll: ToDo_list_updateMarkAll,
    ToDo_list_deleteCompleted: ToDo_list_deleteCompleted,
    ToDo_delete: ToDo_delete,
    ToDo_updateRename: ToDo_updateRename,

  },
} );

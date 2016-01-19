// Class used by GraphQL Server
export default class ToDo
{
  constructor( fields )
  {
    this.id = fields.id;
    this.User_id = fields.User_id;
    this.ToDo_Text = fields.ToDo_Text;
    this.ToDo_Complete = fields.ToDo_Complete;
  }
}

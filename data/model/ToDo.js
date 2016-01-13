// Class used by GraphQL Server
export default class ToDo
{
  constructor( fields )
  {
    this.id = fields.id;
    this.User_id = fields.User_id;
    this.text = fields.text;
    this.complete = fields.complete;
  }
}

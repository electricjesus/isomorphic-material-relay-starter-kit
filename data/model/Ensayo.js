// Class used by GraphQL Server
export default class Ensayo
{
  constructor( fields )
  {
    this.id = fields.id;
    this.Ensayo_User_id = fields.Ensayo_User_id;
    this.Ensayo_Title = fields.Ensayo_Title;
    this.Ensayo_Keywords = fields.Ensayo_Keywords;
    this.Ensayo_Content = fields.Ensayo_Content;
  }
}

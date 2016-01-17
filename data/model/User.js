// Class used by GraphQL Server
export default class User
{
  constructor( fields )
  {
    this.id = fields.id;
    this.username = fields.username;
    this.password = fields.password;
    this.displayname = fields.displayname;
    this.email = fields.email;
  }
}

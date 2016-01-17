// Class used by GraphQL Server
export default class User
{
  constructor( fields )
  {
    this.id = fields.id;
    this.username = fields.username;
    this.password = fields.password;
    this.displayName = fields.displayName;
    this.email = fields.email;
  }
}

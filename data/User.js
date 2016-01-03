// Class used by GraphQL Server
export class User
{
  constructor( id, username, password, displayName, emails )
  {
    this.id = id;
    this.username = username;
    this.password = password;
    this.displayName = displayName;
    this.emails = emails;
  }
}


// Mock data

var usersById = [
  new User( 0, '', '', 'Anonymous', [ ] ),
  new User( 1, 'jack', 'secret', 'Jack', [ { value: 'jack@example.com' } ] ),
  new User( 2, 'jill', 'birthday', 'Jill', [ { value: 'jill@example.com' } ] ),
];


// Data access functions

export function DS_User_getByUserName( username )
{
  for( let i = 0, len = usersById.length; i < len; i++ )
  {
    let record = usersById[ i ];
    if( record.username === username )
      return record;
  }

  return null;
}

export function DS_User_get( id )
{
  return usersById[ id ];
}

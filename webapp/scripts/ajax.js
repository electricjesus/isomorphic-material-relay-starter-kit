export ajaxSimpleJSONPost( url, jsondata, callback )
{
  console.log('ajaxSimpleJSONPost: posting to ' + url + ', ' + JSON.stringify( jsondata ) );

  var xhr = new XMLHttpRequest( );
  xhr.open( 'POST', url );
  xhr.setRequestHeader( 'Content-Type', 'application/json' );

  xhr.onreadystatechange = function( )
  {
    if( xhr.readyState == 4 && xhr.status == 200 )
    {
      console.log('ajaxSimpleJSONPost: response from ' + url + ', ' + xhr.responseText;
      callback( xhr.responseText );
    }
  }

  xhr.send( JSON.stringify( jsondata ) );
}

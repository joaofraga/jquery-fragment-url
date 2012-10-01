/*
 * Manipulate URL fragments
 * @author João Gabriel - jgfraga[at]gmail.com
 * @param hash string - the hash name
 * @param exec function - function to execute
 */

jQuery.fragmentUrl = function( hash, exec ) {

  if( typeof hash === 'undefined' || typeof exec === 'undefined' ) {
    return;
  }
  else
  {

    if( typeof window.hashEvents !== 'object' ) {

      window.hashEvents = {};

      var executeHashChangeEvent = function(){

        var hrefHash = window.location.hash;

        if ( typeof window.hashEvents[hrefHash] === 'function' ) {
          window.hashEvents[hrefHash]();
        }

      };

      if( "onhashchange" in window ) {
        window.onhashchange = function(){
          executeHashChangeEvent();
        };
      } else {
        var storedHash = window.location.hash;
        window.setInterval(function(){
          if( window.location.hash !== storedHash ){
            storedHash = window.location.hash;
            executeHashChangeEvent();
          }
        }, 100);
      }

      window.onload = function(){
        executeHashChangeEvent();
      };

    }

    hash = ( hash.indexOf("#") !== -1 ) ? hash : "#" + hash;
    window.hashEvents[hash] = exec;

  }
};

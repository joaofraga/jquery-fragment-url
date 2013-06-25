/*
 * Manipulate URL fragments
 * @author João Gabriel - jgfraga[at]gmail.com
 * @param hash string - the hash name
 * @param callback function - function to execute
 */

(function($){
  
  window.hashChanged = function(hash){
    try {
      window.hashCallbacks[hash](hash);
    } catch(err) {
      return false;
    }
  }

  var FragmentUrl = function(options) {
    var defaults = {},
        opts = $.extend(defaults, options);
    window.hashCallbacks = window.hashCallbacks || [];

    if( typeof opts['callback'] !== 'function' || typeof opts["hash"] === 'undefined' ){
      return false;
    }

    var hash = (opts["hash"].indexOf("#") !== -1) ? opts["hash"] : "#" + opts["hash"];

    window.hashCallbacks[hash] = opts["callback"];

    return true;
  }

  /* Event handler, observe waiting for hash change */
  var HashObserver = function(){

    // Execute hash event if pages load with hash
    $(window).load(function(){
      if(window.location.hash.length > 0){
        window.hashChanged(window.location.hash);
      }  
    })

    // Verify if browser can handle hash change from default;
    if( "onhashchange" in window ) {
      window.onhashchange = function(){
        // Executes callback
        window.hashChanged(window.location.hash);
      };
      return true;
    } 

    // Implements hash change event observer;
    // store a hash for comparison in future
    var storedHash = "";

    // use setInterval to look for hash change every 100 miliseconds
    window.setInterval( function(){
      if( window.location.hash !== storedHash ){
        // Change stored hash
        storedHash = window.location.hash;
        // Executes callback
        window.hashChanged(storedHash);
      }
    }, 100);

  }();

  $.fragment = function(options){
    var fragmentUrl = new FragmentUrl(options);
  }

}(jQuery));

'use strict';

// Audio Players
var audio_player = (function()
{
  // Get Audio Element parents on page
  var query     = '.js-songs';
  var songlists = document.querySelectorAll( query );


  /**
   * Private functions
  */

  // Delegates the event to a child
  var delegate_event = function( DOMEvent, selector )
  {
    var context = DOMEvent.target;

    if ( !context || !context.classList.contains( selector ) )
      return

    return context;
  }

  // Pauses / Plays the audio track
  var toggle_state = function( DOMEvent )
  {
    // Get Button and player
    var button = delegate_event( DOMEvent, 'js-toggle-state' );
    if ( !button ) { return };

    var audio  = button.parentNode.querySelector( '.js-audio' );

    // Toggle Button State
    button.classList.toggle( 'fa-play' );
    button.classList.toggle( 'fa-pause' );

    audio.play();
  }


  /**
   * Initialize Event Listeners
  */
  Array.prototype.forEach.call( songlists, function( el )
  {
    el.addEventListener( 'click', toggle_state )
  });


  /**
   * Public methods
  */
  return
}());



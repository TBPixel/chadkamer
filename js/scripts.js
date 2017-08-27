(function()
{
  'use strict';

  /**
   * Utilities
  */

    // Event Delegation
    function get_event_target( e )
    {
      var e = e || window.event;        // event
      var t = e.target || e.srcElement; // target

      // Safari bug
      if ( t.nodeType == 3 )
        t = t.parentNode;

      return t;
    }


    // Climb DOM for parent node by selector
    Element.prototype.querySelectorParent = function( selector )
    {
      var parent = null;
      var p      = this.parentNode;

      while ( p.querySelector( selector ) === null )
      {
        parent = p;
        p      = p.parentNode;

        // Break of no parents left to climb ( document )
        if ( p === null ) { break; }
      }

      return parent;
    };


  /**
   * Audio Player
   * Class for handling multiple audio players
  */
    function AudioPlayer( container )
    {
      this.container = container;
      this.audio     = container.querySelector( '.js-audio' );
      this.controls  = container.querySelector( '.js-controls' );

      this.audio.addEventListener( 'timeupdate', this.update.bind( this ), false );

      this.controls.addEventListener( 'click', function( e )
      {
        var target = get_event_target( e );

        // Play/Pause
        if ( target.classList.contains( 'js-toggle-state' ) )
          this.toggle_state();


      }.bind( this ) );
    }


    AudioPlayer.prototype.reset_player = function()
    {
      this.audio.currentTime = 0;

      var playpause = this.controls.querySelector( '.js-toggle-state' );
      playpause.classList.remove( 'fa-pause' );
      playpause.classList.add( 'fa-play' );
    };


    AudioPlayer.prototype.update = function()
    {
      var percent = Math.floor( ( 100 / this.audio.duration ) * this.audio.currentTime );

      if ( this.audio.ended )
        this.reset_player();
    };


    AudioPlayer.prototype.toggle_state = function()
    {
      // Toggle Button State
      var playpause = this.controls.querySelector( '.js-toggle-state' );
      playpause.classList.toggle( 'fa-play' );
      playpause.classList.toggle( 'fa-pause' );

      // Toggle audio state
      if ( this.audio.paused )
        this.audio.play();
      else
        this.audio.pause();
    };


  // Create new AudioPlayer for music
  var songs   = document.querySelectorAll( '.song' );
  var players = [];

  Array.prototype.forEach.call( songs, function( container )
  {
    players.push( new AudioPlayer( container ) );
  });

}());

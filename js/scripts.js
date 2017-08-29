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


  /**
   * Audio Player
   * Class for handling multiple audio players
  */
    function AudioPlayer( container )
    {
      this.container = container;
      this.audio     = container.querySelector( '.js-audio' );
      this.controls  = {
        parent:       container.querySelector( '.js-controls' ),
        toggle_state: container.querySelector( '.js-toggle-state' ),
        progress:     container.querySelector( '.js-progress' ),
        progress_bar: container.querySelector( '.js-progress-bar' ),
        scrubber:     container.querySelector( '.js-scrubber' )
      };
      this.mouse_state = 'tap'; // tap, drag

      this.audio.volume = 0.1; // Test code

      this.audio.addEventListener( 'timeupdate', this.update.bind( this ), false );

      this.controls.toggle_state.addEventListener( 'click', this.toggle_state.bind( this ) );
      this.controls.progress.addEventListener( 'mousedown', this.move_scrubber.bind( this ) );
      document.addEventListener( 'mousemove', this.drag_scrubber.bind( this ) );
      document.addEventListener( 'mouseup', this.release_scrubber.bind( this ) );
    }


    AudioPlayer.prototype.move_scrubber = function( event, pos )
    {
      var pos    = pos || null;
      var offset = this.controls.progress.getBoundingClientRect().left + (this.controls.scrubber.offsetWidth / 2);

      if ( event.type === 'mousedown' )
      {
        this.mouse_state = 'drag';
      }

      // Scrubbing Audio
      if ( event.type !== 'timeupdate' )
      {
        if ( !this.audio.paused )
          this.toggle_state();

        var pos = event.clientX - offset;
      }

      // Update Progress Bar
      var bar_width = this.controls.progress_bar.offsetWidth;
      var progress_fraction = Math.round(( 100 * pos ) / bar_width ) / 100;
      this.controls.progress_bar.style.transform = 'scaleX( '+ progress_fraction +' )';
      // Update Scrubber
      this.controls.scrubber.style.transform = 'translate( '+ Math.round( pos ) +'px, -50% )';

    };


    AudioPlayer.prototype.drag_scrubber = function( event )
    {
      if ( this.mouse_state === 'drag' ) this.move_scrubber( event );
    }


    AudioPlayer.prototype.release_scrubber = function( event )
    {
      if ( this.mouse_state !== 'drag' )
        return;

      this.mouse_state = 'tap';

      // Play audio from new positon
      var offset  = this.controls.progress.getBoundingClientRect().left + (this.controls.scrubber.offsetWidth / 2);
      var mouse_x = event.clientX - offset;
      var width   = this.controls.progress.offsetWidth;

      var fraction = mouse_x / width;

      var new_time = this.audio.duration * fraction;

      this.audio.currentTime = new_time;

      if ( this.audio.paused )
        this.toggle_state();
    }


    AudioPlayer.prototype.reset_player = function()
    {
      this.audio.currentTime = 0;

      this.controls.toggle_state.classList.remove( 'fa-pause' );
      this.controls.toggle_state.classList.add( 'fa-play' );
    };


    AudioPlayer.prototype.update = function( event )
    {
      var progress_fraction = Math.round(( 100 * this.audio.currentTime ) / this.audio.duration) / 100;
      var bar_width = this.controls.progress_bar.offsetWidth;
      this.move_scrubber( event, (progress_fraction * bar_width) );

      if ( this.audio.ended )
        this.reset_player();
    };


    AudioPlayer.prototype.toggle_state = function()
    {
      // Toggle Button State
      this.controls.toggle_state.classList.toggle( 'fa-play' );
      this.controls.toggle_state.classList.toggle( 'fa-pause' );

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

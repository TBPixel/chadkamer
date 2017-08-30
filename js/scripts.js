(function()
{
  'use strict';

  /**
   * Utilities
  */

    // Event Delegation
    function getEventTarget( e )
    {
      var e = e || window.event;        // event
      var t = e.target || e.srcElement; // target

      // Safari bug
      if ( t.nodeType == 3 )
        t = t.parentNode;

      return t;
    }


    // Pass multiple css classes for toggling
    Element.prototype.toggleClasses = function()
    {
      for ( var i = 0; i < arguments.length; i++ )
        this.classList.toggle( arguments[i] );
    }


  /**
   *
  */
    function AudioControls( container )
    {
      // Nodes
      this.container = container;
      this.playpause = container.querySelector( '.js-playpause' );
      this.progress  = container.querySelector( '.js-progress' );
      this.tracker   = container.querySelector( '.js-tracker' );
      this.scrubber  = container.querySelector( '.js-scrubber' );
    }


    AudioControls.prototype.calcScrubberOffset = function( e )
    {
      return this.progress.getBoundingClientRect().left + (this.scrubber.offsetWidth / 2);
    };


    AudioControls.prototype.reset = function()
    {
      this.playpause.classList.remove( 'fa-pause' );
      this.playpause.classList.add( 'fa-play' );
    };


    AudioControls.prototype.moveScrubber = function( pos )
    {
      pos = Math.min( Math.max( pos, 0 ), this.progress.offsetWidth );
      this.scrubber.style.transform = 'translate( '+ Math.round( pos ) +'px, -50% )';
    };


    AudioControls.prototype.moveTracker = function( pos )
    {
      pos = Math.min( Math.max( pos, 0 ), this.progress.offsetWidth );
      var tracker_width = this.tracker.offsetWidth;
      var progress_fraction = Math.round(( 100 * pos ) / tracker_width ) / 100;

      this.tracker.style.transform = 'scaleX( '+ progress_fraction +' )';
    };


  /**
   * Audio Player
   * Class for handling multiple audio players
  */
    function AudioPlayer( container )
    {
      // Nodes
      this.container = container;
      this.audio     = container.querySelector( '.js-audio' );
      this.controls = new AudioControls( container.querySelector( '.js-controls' ) );

      // States
      this.states = {
        isScrubbing: false,
        prevState: 'paused'
      };

      // Events
      this.audio.addEventListener( 'timeupdate', this.update.bind( this ) );

      // Settings
      this.audio.volume = 0.1; // Test code
    }


    AudioPlayer.prototype.toggleScrubbingState = function()
    {
      if ( this.states.isScrubbing === false )
        this.states.isScrubbing = true;
      else
        this.states.isScrubbing = false;
    };


    AudioPlayer.prototype.togglePrevState = function()
    {
      if ( this.states.prevState === 'paused' )
        this.states.prevState = 'playing';
      else
        this.states.prevState = 'paused';
    };


    AudioPlayer.prototype.reset = function()
    {
      this.audio.currentTime = 0;
      this.controls.reset();
    };


    AudioPlayer.prototype.update = function( e )
    {
      var progress_fraction = Math.round(( 100 * this.audio.currentTime ) / this.audio.duration) / 100;
      var tracker_width = this.controls.tracker.offsetWidth;

      var pos = ( progress_fraction * tracker_width );
      this.controls.moveScrubber( pos );
      this.controls.moveTracker( pos );

      if ( this.audio.ended )
        this.reset();
    };


    AudioPlayer.prototype.playpause = function()
    {
      this.controls.playpause.toggleClasses( 'fa-play', 'fa-pause' );

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


  /**
   * Event Bindings
  */
  document.addEventListener( 'click', function( e )
  {
    var target = getEventTarget( e );

    players.forEach( function( audioplayer )
    {

      // Play/Pause Audio Player
      if ( target === audioplayer.controls.playpause )
      {
        audioplayer.togglePrevState();
        audioplayer.playpause();
      }
    });
  });


  document.addEventListener( 'mousedown', function( e )
  {
    var target = getEventTarget( e );

    players.forEach( function( audioplayer )
    {
      // Audio Scrubbing
      if ( (target === audioplayer.controls.progress) || (target === audioplayer.controls.tracker) )
      {
        // Update States
        audioplayer.toggleScrubbingState();

        // Pause Audio
        if ( audioplayer.states.isScrubbing && !audioplayer.audio.paused )
          audioplayer.playpause();

        // Update Scrubber + Progress tracker
        var pos = e.clientX - audioplayer.controls.calcScrubberOffset();
        audioplayer.controls.moveScrubber( pos );
        audioplayer.controls.moveTracker( pos );
      }
    });
  });


  document.addEventListener( 'mousemove', function( e )
  {
    players.forEach( function( audioplayer )
    {

      // Dragging Scrubber
      if ( audioplayer.states.isScrubbing )
      {
        // Update Scrubber + Progress tracker
        var pos = e.clientX - audioplayer.controls.calcScrubberOffset();
        audioplayer.controls.moveScrubber( pos );
        audioplayer.controls.moveTracker( pos );
      }
    });
  });


  document.addEventListener( 'mouseup', function( e )
  {
    players.forEach( function( audioplayer )
    {
      // Do nothing unless scrubbing
      if ( !audioplayer.states.isScrubbing )
        return;

      audioplayer.toggleScrubbingState();

      // Set new time
      var pos = e.clientX - audioplayer.controls.calcScrubberOffset();
      var fraction = pos / audioplayer.controls.progress.offsetWidth;
      var new_time = audioplayer.audio.duration * fraction;
      audioplayer.audio.currentTime = new_time;

      // Resume Audio if relevant
      if ( audioplayer.states.prevState === 'playing' )
        audioplayer.playpause();
    });
  });
}());

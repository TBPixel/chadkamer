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
      this.slider    = container.querySelector( '.js-slider' );
    }


    AudioControls.prototype.calcScrubberOffset = function( e ) { return this.progress.getBoundingClientRect().left + 8; };


    AudioControls.prototype.reset = function()
    {
      this.playpause.classList.remove( 'fa-pause' );
      this.playpause.classList.add( 'fa-play' );
    };


    AudioControls.prototype.moveSlider = function( time ) { this.slider.value = time; };


    AudioControls.prototype.moveTracker = function( time, duration )
    {
      time = time / duration;

      var progress_width = this.progress.offsetWidth;
      var pos = Math.min( Math.max( ( time * progress_width ), 0 ), progress_width );

      var transform = 'translateY( -50% ) scaleX( '+ (pos / progress_width) +' )';
      this.tracker.style.transform       = transform;
      this.tracker.style.webkitTransform = transform;
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
      this.audio.addEventListener( 'durationchange', function()
      {
        this.controls.slider.setAttribute( 'max', this.audio.duration );
      }.bind( this ) );

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
      this.states = {
        isScrubbing: false,
        prevState: 'paused'
      };
      this.controls.reset();
    };


    AudioPlayer.prototype.update = function( e )
    {

      if ( !this.states.isScrubbing )
      {
        this.controls.moveSlider( this.audio.currentTime );
        this.controls.moveTracker( this.audio.currentTime, this.audio.duration );
      }

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
      var slider = audioplayer.controls.slider;

      if ( target === slider )
      {
        // Toggle Scrubbing On
        audioplayer.toggleScrubbingState();

        // Pause Player
        if ( !audioplayer.audio.paused )
          audioplayer.playpause();

        // Update Progress
        audioplayer.controls.moveTracker( slider.value, audioplayer.audio.duration );
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
        // Update progress tracker
        var slider = audioplayer.controls.slider;
        audioplayer.controls.moveTracker( slider.value, audioplayer.audio.duration );
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
      audioplayer.audio.currentTime =  audioplayer.controls.slider.value;

      // Resume Audio if relevant
      if ( audioplayer.states.prevState === 'playing' )
        audioplayer.playpause();
    });
  });
}());

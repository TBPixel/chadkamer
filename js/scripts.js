(function()
{
  'use strict';

  // Social Navigation Background
  var social = {
    hero:   document.querySelector( '.hero' ),
    footer: document.querySelector( '.page__footer' ),
    social: document.querySelector( '.social' ),

    callback: function()
    {
      // Gather element heights and scrollbar offset
      var heroHeight   = this.hero.offsetHeight;
      var socialHeight = this.social.offsetHeight;
      var scroll       = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // Calculate limit
      var limit = heroHeight - socialHeight;

      // Modify footer class
      if ( scroll > limit ) { this.footer.classList.add( 'page__footer--background' ); }
      else { this.footer.classList.remove( 'page__footer--background' ); }
    }
  };
  window.addEventListener( 'scroll', _.throttle( social.callback.bind( social ), 1000 ) );
})();

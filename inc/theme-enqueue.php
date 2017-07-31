<?php

  function chadkamer_enqueue()
  {
    // Site stylesheet
    wp_enqueue_style( 'chadkamer-style', get_stylesheet_uri() );

    // Web Font Loader
    wp_enqueue_script( 'chadkamer-webfontloader', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', [], true );

    // Remove scripts and styles from front-end
    if ( !is_admin() ) {
      wp_deregister_script( 'wp-embed' );
      wp_deregister_script( 'jquery' );
    }
  }
  add_action( 'wp_enqueue_scripts', 'chadkamer_enqueue' );

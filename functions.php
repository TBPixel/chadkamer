<?php
/**
 * ChadKamer functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package chadkamer
 */


  /**
    * Theme Setup
  */
  if ( !function_exists( 'chadkamer_setup' ) )
  {

    function chadkamer_setup()
    {
      // Let WordPress manage the title tag
      add_theme_support( 'title-tag' );

      // Enable Post Thumbnail Support
      add_theme_support( 'post-thumbnails' );

      // Register Navigation Menu's
      register_nav_menus([
        'main'   => 'Main menu',
        'social' => 'Social Media menu'
      ]);

      /*
      * Switch default core markup for search form, comment form, and comments
      * to output valid HTML5.
      */
      add_theme_support( 'html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
      ]);

      /**
      * Add support for core custom logo.
      *
      * @link https://codex.wordpress.org/Theme_Logo
      */
      add_theme_support( 'custom-logo', [
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
      ]);
    }
  }
  add_action( 'after_setup_theme', 'chadkamer_setup' );


  /**
  * Enqueue scripts and styles.
  */
  function chadkamer_enqueue()
  {
    // Site stylesheet
    wp_enqueue_style( 'chadkamer-style', get_stylesheet_uri() );

    // Web Font Loader
    wp_enqueue_script( 'chadkamer-webfontloader', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', [], true );

    // Remove jQuery from all but WordPress admin
    if ( !is_admin() ) wp_deregister_script( 'jquery' );
  }
  add_action( 'wp_enqueue_scripts', 'chadkamer_enqueue' );


  /**
  * Add context data to all page templates in Timber
  */
  function add_to_context( $data )
  {

    $data['menu_main']   = new TimberMenu( 'main' );
    $data['menu_social'] = new TimberMenu( 'social' );

    return $data;
  }
  add_filter( 'timber_context', 'add_to_context' );
?>
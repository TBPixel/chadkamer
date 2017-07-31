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
  * Remove wysywig editor from template pages
  */
  function remove_editor_from_templates()
  {
    if ( !is_admin() ) { return; }

    if ( !isset( $_GET['post'] ) ) { return; }

    /* basename is used for templates that are in the subdirectory of the theme */
    $current_page_template_slug = basename( get_page_template_slug( $_GET['post'] ) );
    var_dump( $current_page_template_slug );

    /* file names of templates to remove the editor on */
    $excluded_template_slugs = [
      'home.php'
    ];

    if ( in_array( $current_page_template_slug, $excluded_template_slugs ) )
    {
      /* remove editor from pages */
      remove_post_type_support( 'page', 'editor' );
    }

  }
  add_action( 'init', 'remove_editor_from_templates' );


  /**
  * Enqueue scripts and styles.
  */
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


  /**
  * Remove Actions
  */
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
?>
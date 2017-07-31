<?php

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

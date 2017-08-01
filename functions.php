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
  require_once 'inc/theme-setup.php';

  /**
  * Admin Init
  */
  require_once 'inc/admin-init.php';

  /**
  * Admin Menu
  */
  require_once 'inc/admin-menu.php';


  /**
  * Init
  */
  require_once 'inc/init.php';


  /**
  * Enqueue scripts and styles.
  */
  require_once 'inc/theme-enqueue.php';


  /**
  * Post Templates
  */
  require_once 'inc/templates.php';


  /**
  * Add context data to all page templates in Timber
  */
  require_once 'inc/timber-setup.php';


  /**
  * Remove Hooks
  */
  require_once 'inc/remove-hooks.php';
?>
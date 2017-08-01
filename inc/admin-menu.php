<?php

  function chadkamer_remove_menus()
  {
    remove_menu_page( 'edit-comments.php' );
    remove_menu_page( 'tools.php' );
  }
  add_action( 'admin_menu', 'chadkamer_remove_menus' );



  function chadkamer_admin_bar_render()
  {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu( 'comments' );
  }
  add_action( 'wp_before_admin_bar_render', 'chadkamer_admin_bar_render' );

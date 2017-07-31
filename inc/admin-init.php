<?php

  function chadkamer_theme_admin_init()
  {
    add_editor_style( 'wysiwyg.css' );
  }
  add_action( 'admin_init', 'chadkamer_theme_admin_init' );

<?php

  // Remove wysiwyg
  function chadkamer_remove_editor_from_templates()
  {
    if ( !is_admin() ) { return; }

    if ( !isset( $_GET['post'] ) ) { return; }

    /* basename is used for templates that are in the subdirectory of the theme */
    $current_page_template_slug = basename( get_page_template_slug( $_GET['post'] ) );

    /* file names of templates to remove the editor on */
    $excluded_template_slugs = [
      'home.php',
    ];

    if ( in_array( $current_page_template_slug, $excluded_template_slugs ) )
    {
      /* remove editor from pages */
      remove_post_type_support( 'page', 'editor' );
    }
  }
  add_action( 'init', 'chadkamer_remove_editor_from_templates' );

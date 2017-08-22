<?php

  function chadkamer_get_cpt_template( $single_template )
  {
    global $post;

    $dir = realpath( __DIR__ . '/..' );
    $cpt_templates = [
      'songs'  => '/templates/single-songs.php',
    ];

    foreach ( $cpt_templates as $cpt => $template )
    {
      if ( $post->post_type === $cpt )
      {
        return "{$dir}{$template}";
      }
    }
  }

  add_filter( 'single_template', 'chadkamer_get_cpt_template' ) ;

<?php

  function add_to_timber_context( $data )
  {

    $data['menu_main']   = new TimberMenu( 'main' );
    $data['menu_social'] = new TimberMenu( 'social' );

    return $data;
  }
  add_filter( 'timber_context', 'add_to_timber_context' );

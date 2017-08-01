<?php
/**
  * Template Name: Contact
  *
  * @package WordPress
  * @subpackage chadkamer
  * @since ChadKamer 1.0
  */

  $context = Timber::get_context();

  // Page Post Context
  $post = new TimberPost();
  $context['post'] = $post;

  Timber::render( 'views/contact.twig', $context );
?>
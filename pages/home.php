<?php
/**
 * Template Name: Homepage
 *
 * @package WordPress
 * @subpackage chadkamer
 * @since ChadKamer 1.0
 */

  $context = Timber::get_context();
  Timber::render( 'views/home.twig', $context );
?>
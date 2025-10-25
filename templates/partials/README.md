# Partials Directory

This directory contains reusable template components (partials) for the Finanpy application.

## Purpose

Partials are small, reusable template snippets that can be included in multiple pages to avoid code duplication.

## Common Partials

- `header.html` - Site header with navigation
- `footer.html` - Site footer
- `messages.html` - Django messages display
- `form_field.html` - Reusable form field rendering
- `pagination.html` - Pagination controls
- `sidebar.html` - Dashboard sidebar navigation

## Usage

Include partials in templates using:
```django
{% include 'partials/header.html' %}
```

## Structure

All partials should be self-contained and accept context variables when needed.

# Public Templates Directory

This directory contains templates for public-facing pages (accessible without authentication).

## Purpose

Public templates are used for pages that don't require user authentication, such as:

- Landing page / Home page
- Login page
- Registration page
- Password reset pages
- About page
- Contact page
- Terms of service
- Privacy policy

## Structure

All public templates should extend from `base.html` and use the public layout components.

## Example Templates

- `home.html` - Landing page
- `login.html` - User login form
- `register.html` - User registration form
- `password_reset.html` - Password reset form
- `about.html` - About Finanpy page

## Usage

Public templates should not require `@login_required` decorator on their views.

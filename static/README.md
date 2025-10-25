# Static Files Directory

This directory contains static assets (CSS, JavaScript, images) for the Finanpy application.

## Directory Structure

```
static/
├── css/          # Stylesheets (TailwindCSS output)
├── js/           # JavaScript files
├── images/       # Image assets (logos, icons, etc.)
└── src/          # Source files for compilation (TailwindCSS input)
```

## Configuration

Static files are configured in `core/settings.py`:

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'  # For production collectstatic
```

## Development

In development, Django serves static files automatically from the `static/` directory.

Access static files in templates:
```django
{% load static %}
<link rel="stylesheet" href="{% static 'css/styles.css' %}">
<script src="{% static 'js/app.js' %}"></script>
<img src="{% static 'images/logo.png' %}" alt="Logo">
```

## TailwindCSS

The project uses TailwindCSS for styling. Configuration is in `tailwind.config.js`.

Build CSS:
```bash
npm run build:css
```

Watch mode for development:
```bash
npm run watch:css
```

## Production

For production deployment, collect all static files:
```bash
python manage.py collectstatic --noinput
```

This copies all static files to the `STATIC_ROOT` directory (staticfiles/) which should be served by your web server (nginx, Apache) or CDN.

## Best Practices

1. Keep static files organized by type (css/, js/, images/)
2. Use versioning or cache-busting for production
3. Optimize images before adding to repository
4. Minify CSS and JS for production
5. Use {% static %} template tag, never hardcode paths

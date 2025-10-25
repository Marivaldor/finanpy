# Images Directory

This directory contains image assets for the Finanpy application.

## Purpose

Store static images including:
- Logo and branding
- Icons and favicons
- UI graphics and illustrations
- Background images
- Placeholder images

## Image Types

```
images/
├── logo.png            # Main application logo
├── favicon.ico         # Browser favicon
├── icons/              # UI icons (if not using icon fonts)
├── backgrounds/        # Background images
└── placeholders/       # Placeholder images
```

## Usage in Templates

```django
{% load static %}
<img src="{% static 'images/logo.png' %}" alt="Finanpy Logo">
```

## Optimization

Before adding images to the repository:
1. Compress images using tools like TinyPNG or ImageOptim
2. Use appropriate formats (PNG for transparency, JPG for photos, SVG for vectors)
3. Provide multiple sizes for responsive images when needed
4. Use WebP format for better compression (with fallbacks)

## Best Practices

1. Keep file sizes small (< 500KB for most images)
2. Use descriptive filenames (e.g., `logo-primary.png` not `img1.png`)
3. Include `alt` text in templates for accessibility
4. Use SVG for icons when possible
5. Organize by type in subdirectories
6. Don't commit user-uploaded images here (use media/ directory)

# JavaScript Directory

This directory contains JavaScript files for the Finanpy application.

## Purpose

Store custom JavaScript code for client-side functionality, including:
- Form validation and interactivity
- AJAX requests for dynamic content
- Chart rendering (for financial dashboards)
- UI animations and transitions
- Utility functions

## Structure

Organize JavaScript files by feature or component:
```
js/
├── app.js              # Main application JavaScript
├── forms.js            # Form handling and validation
├── charts.js           # Chart configuration (Chart.js)
├── transactions.js     # Transaction-related functionality
├── utils.js            # Utility functions
└── components/         # Reusable components
```

## Usage in Templates

```django
{% load static %}
<script src="{% static 'js/app.js' %}"></script>
```

## Best Practices

1. Use modern ES6+ JavaScript
2. Keep functions modular and reusable
3. Add comments for complex logic
4. Handle errors gracefully
5. Use async/await for asynchronous operations
6. Validate user input on client and server side
7. Avoid inline JavaScript in templates

## Dependencies

External libraries should be managed via npm and included in package.json.

# TailwindCSS Configuration Guide

**Document:** TailwindCSS Setup and Configuration
**Project:** Finanpy
**Date:** 25 de Outubro de 2025
**Status:** Complete

---

## Overview

This document describes the complete TailwindCSS v3.4.18 setup for the Finanpy Django project. TailwindCSS provides a utility-first CSS framework that enables rapid UI development with a modern dark theme design system.

---

## Installation Summary

### Prerequisites
- Node.js v22.17.1
- npm v10.9.2
- Python 3.13+
- Django 5.2+

### Installed Packages
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.18"
  }
}
```

---

## Project Structure

```
finanpy/
├── static/
│   ├── src/
│   │   └── input.css          # TailwindCSS source file with directives
│   └── css/
│       └── output.css         # Compiled CSS (24.7 KB, generated)
├── templates/
│   ├── base.html              # Base template with TailwindCSS
│   └── test.html              # Test page demonstrating components
├── tailwind.config.js         # Tailwind configuration
├── package.json               # npm configuration with build scripts
└── .gitignore                 # Updated to exclude node_modules and output.css
```

---

## Configuration Files

### 1. tailwind.config.js

Location: `C:\Dev-projects\finanpy\tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './users/templates/**/*.html',
    './profiles/templates/**/*.html',
    './accounts/templates/**/*.html',
    './categories/templates/**/*.html',
    './transactions/templates/**/*.html',
    './core/templates/**/*.html',
    './static/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for Finanpy dark theme
        primary: {
          500: '#667eea',
          600: '#5568d3',
          700: '#4453b8',
        },
        secondary: {
          500: '#764ba2',
          600: '#63408a',
          700: '#523672',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
```

**Key Features:**
- Scans all Django templates across apps
- Custom primary/secondary color palette
- Dark mode enabled via class strategy
- Configured for Django project structure

---

### 2. static/src/input.css

Location: `C:\Dev-projects\finanpy\static\src\input.css`

```css
/* Finanpy - TailwindCSS Input File */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles for dark theme */
@layer base {
  body {
    @apply bg-slate-900 text-slate-100;
  }
}

/* Custom component styles */
@layer components {
  /* Primary gradient button */
  .btn-primary {
    @apply px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200;
  }

  /* Secondary button */
  .btn-secondary {
    @apply px-6 py-3 bg-slate-700 text-slate-100 font-semibold rounded-lg border border-slate-600 hover:bg-slate-600 transition-all duration-200;
  }

  /* Card component */
  .card {
    @apply bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6 hover:shadow-2xl transition-all duration-300;
  }

  /* Input field */
  .input {
    @apply w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200;
  }

  /* Badge for income */
  .badge-income {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30;
  }

  /* Badge for expense */
  .badge-expense {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30;
  }
}

/* Custom utility classes */
@layer utilities {
  .gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .gradient-text {
    @apply bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent;
  }
}
```

**Custom Components:**
- `.btn-primary` - Primary gradient button
- `.btn-secondary` - Secondary outlined button
- `.card` - Dark theme card component
- `.input` - Styled form input
- `.badge-income` - Green badge for income
- `.badge-expense` - Red badge for expense
- `.gradient-text` - Gradient text effect

---

### 3. package.json Build Scripts

Location: `C:\Dev-projects\finanpy\package.json`

```json
{
  "scripts": {
    "build": "npx tailwindcss -i ./static/src/input.css -o ./static/css/output.css",
    "build:watch": "npx tailwindcss -i ./static/src/input.css -o ./static/css/output.css --watch",
    "build:minify": "npx tailwindcss -i ./static/src/input.css -o ./static/css/output.css --minify"
  }
}
```

**Available Commands:**
- `npm run build` - Build CSS once
- `npm run build:watch` - Watch for changes and rebuild automatically
- `npm run build:minify` - Build minified CSS for production

---

### 4. Django Settings Configuration

Location: `C:\Dev-projects\finanpy\core\settings.py`

```python
# Templates configuration
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],  # Added templates directory
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Static files configuration
STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]  # Added static directory
```

---

### 5. .gitignore Updates

Added to `.gitignore`:

```gitignore
# Node.js and TailwindCSS
node_modules/
package-lock.json

# TailwindCSS generated files
static/css/output.css
```

---

## Usage Guide

### Development Workflow

#### 1. Building CSS for Development

```bash
# One-time build
npm run build

# Watch mode (auto-rebuild on changes)
npm run build:watch
```

#### 2. Running Django Server

```bash
python manage.py runserver
```

Access the test page at: `http://localhost:8000/test/`

#### 3. Production Build

```bash
# Minified CSS for production deployment
npm run build:minify
```

---

## Base Template Structure

The base template (`templates/base.html`) includes:

1. **HTML Structure:**
   - Dark mode enabled via `class="dark"` on `<html>` tag
   - Responsive viewport meta tag
   - TailwindCSS output.css loaded via `{% static 'css/output.css' %}`

2. **Navigation:**
   - Responsive navbar with gradient logo
   - Mobile-friendly menu structure
   - User profile icon placeholder

3. **Messages Framework:**
   - Django messages integration
   - Color-coded alerts (success/error/info)
   - SVG icons for visual feedback

4. **Content Area:**
   - Centered max-width container (7xl)
   - Responsive padding
   - Block structure for child templates

5. **Footer:**
   - Sticky footer design
   - Copyright information

---

## Design System Components

### Color Palette

```css
/* Dark Theme Backgrounds */
bg-slate-900  /* Primary background */
bg-slate-800  /* Secondary background (cards) */
bg-slate-700  /* Tertiary background (inputs) */

/* Text Colors */
text-slate-100  /* Primary text */
text-slate-300  /* Secondary text */
text-slate-400  /* Muted text */

/* Status Colors */
text-green-500  /* Income/Success */
text-red-500    /* Expense/Error */
text-amber-500  /* Warning */
text-blue-500   /* Info */

/* Custom Colors */
from-indigo-500 to-purple-600  /* Primary gradient */
```

### Typography

```css
/* Font Sizes */
text-xs   /* 12px */
text-sm   /* 14px */
text-base /* 16px */
text-lg   /* 18px */
text-xl   /* 20px */
text-2xl  /* 24px */
text-3xl  /* 30px */
text-4xl  /* 36px */

/* Font Weights */
font-normal    /* 400 */
font-semibold  /* 600 */
font-bold      /* 700 */
```

### Spacing

```css
/* Padding */
p-4  /* 1rem / 16px */
p-6  /* 1.5rem / 24px */
p-8  /* 2rem / 32px */

/* Margin */
mb-4 /* 1rem / 16px */
mb-6 /* 1.5rem / 24px */
mb-8 /* 2rem / 32px */

/* Gap */
gap-4 /* 1rem / 16px */
gap-6 /* 1.5rem / 24px */
gap-8 /* 2rem / 32px */
```

### Responsive Breakpoints

```css
sm:  640px   /* Small devices */
md:  768px   /* Medium devices */
lg:  1024px  /* Large devices */
xl:  1280px  /* Extra large devices */
2xl: 1536px  /* 2X Extra large devices */
```

---

## Test Page Components

The test page (`templates/test.html`) demonstrates:

1. **Buttons:**
   - Primary gradient button (`.btn-primary`)
   - Secondary button (`.btn-secondary`)
   - Success button (green)
   - Danger button (red)

2. **Badges:**
   - Income badge (`.badge-income`)
   - Expense badge (`.badge-expense`)
   - Status badges (active, pending)

3. **Cards:**
   - Standard card (`.card`)
   - Gradient card (stats)
   - Statistics card with icons

4. **Forms:**
   - Input fields (`.input`)
   - Labels with proper styling
   - Focus states

5. **Tables:**
   - Responsive table design
   - Hover effects
   - Color-coded values (income/expense)

6. **Alerts:**
   - Success messages
   - Error messages
   - Warning messages

---

## Troubleshooting

### CSS Not Loading

**Issue:** Styles not applied to templates

**Solution:**
1. Verify `output.css` exists: `ls static/css/output.css`
2. Check Django static files configuration in `settings.py`
3. Run `npm run build` to regenerate CSS
4. Restart Django development server

### Build Errors

**Issue:** `npm run build` fails

**Solution:**
1. Verify TailwindCSS is installed: `npm list tailwindcss`
2. Reinstall if needed: `npm install -D tailwindcss@3`
3. Check `tailwind.config.js` syntax
4. Verify paths in `content` array are correct

### Classes Not Appearing

**Issue:** TailwindCSS classes in templates not being compiled

**Solution:**
1. Check template paths in `tailwind.config.js` content array
2. Run `npm run build` after adding new templates
3. Use `npm run build:watch` during development for auto-rebuild

### Node.js Not Found

**Issue:** `npm` or `node` commands not recognized

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart terminal/command prompt
3. Verify installation: `node --version` and `npm --version`

---

## Performance Considerations

### Development
- Use `npm run build:watch` to auto-rebuild on changes
- Keep CSS file size manageable by only including used classes
- TailwindCSS tree-shakes unused classes automatically

### Production
- Always use `npm run build:minify` for production
- Output CSS is optimized to include only classes used in templates
- Current compiled size: ~24.7 KB (with test page)
- Expected production size: 15-30 KB depending on components used

### Optimization Tips
1. Avoid using too many arbitrary values (e.g., `w-[137px]`)
2. Use Tailwind's built-in utilities when possible
3. Create component classes (in input.css) for repeated patterns
4. Purge unused CSS in production builds (automatic with v3+)

---

## Integration with Django Apps

### Adding TailwindCSS to New Apps

When creating new Django apps, ensure templates are scanned:

1. **Update `tailwind.config.js`:**
   ```javascript
   content: [
     './templates/**/*.html',
     './your_new_app/templates/**/*.html',  // Add this line
   ]
   ```

2. **Rebuild CSS:**
   ```bash
   npm run build
   ```

3. **Create templates using base.html:**
   ```django
   {% extends 'base.html' %}
   {% block content %}
   <!-- Your content here -->
   {% endblock %}
   ```

---

## Custom Component Development

### Creating New Components

1. **Add to `static/src/input.css`:**
   ```css
   @layer components {
     .my-component {
       @apply bg-slate-800 p-4 rounded-lg;
     }
   }
   ```

2. **Rebuild CSS:**
   ```bash
   npm run build
   ```

3. **Use in templates:**
   ```html
   <div class="my-component">
     Content here
   </div>
   ```

### Component Naming Convention
- Use kebab-case: `.btn-primary`, `.card-stats`
- Prefix by type: `.btn-*`, `.badge-*`, `.input-*`
- Keep names descriptive and consistent

---

## Verification Commands

### Check Installation
```bash
# Verify Node.js and npm
node --version  # Expected: v22.17.1
npm --version   # Expected: 10.9.2

# Verify TailwindCSS installation
npm list tailwindcss  # Expected: tailwindcss@3.4.18

# Check generated CSS file
ls -lh static/css/output.css  # Expected: ~24.7 KB
```

### Test CSS Loading
```bash
# Start Django server
python manage.py runserver

# Visit test page
# Browser: http://localhost:8000/test/

# Should display:
# - Dark theme background (slate-900)
# - Gradient "Finanpy" logo
# - Styled buttons, cards, and components
# - Responsive layout
```

### Verify Build Process
```bash
# Build CSS
npm run build

# Expected output:
# "Done in XXXms" (no errors)

# Check file was updated
ls -lh static/css/output.css
```

---

## Next Steps

After completing TailwindCSS setup:

1. **Continue with Task 3:** Create templates directory structure
2. **Task 4:** Configure Django basic settings (language, timezone)
3. **Task 5:** Create Django apps and models
4. **Task 6:** Implement authentication views with TailwindCSS
5. **Task 7:** Build dashboard with styled components

---

## References

- [TailwindCSS Official Documentation](https://tailwindcss.com/docs)
- [TailwindCSS with Django Guide](https://tailwindcss.com/docs/guides/django)
- [Dark Mode Configuration](https://tailwindcss.com/docs/dark-mode)
- [Customizing Colors](https://tailwindcss.com/docs/customizing-colors)
- [Content Configuration](https://tailwindcss.com/docs/content-configuration)

---

## Changelog

**2025-10-25:**
- Initial TailwindCSS v3.4.18 configuration
- Created base template with dark theme
- Configured Django static files
- Added custom component library
- Created test page for verification
- All 10 subtasks completed successfully

---

**End of Document**

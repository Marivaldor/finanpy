# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Finanpy** is a personal finance management web application built with Django 5+ and Python 3.13+. It's a full-stack application that allows users to manage bank accounts, categorize transactions, and view financial insights through an interactive dashboard.

**Key Characteristics:**
- Pragmatic, lean approach (no over-engineering)
- Portuguese Brazilian interface
- Dark theme with modern design (TailwindCSS)
- SQLite database (development), ready for PostgreSQL migration
- Email-based authentication (not username)
- Multi-tenant ready (users own their own data)

**Official Documentation:** See `docs/README.md` for complete guidelines.

---

## Architecture

### Core Structure

```
finanpy/
├── core/              # Django settings, URLs, WSGI config
├── users/             # Custom user model (email authentication)
├── profiles/          # Extended user profile
├── accounts/          # Bank accounts management
├── categories/        # Transaction categories
├── transactions/      # Financial transactions (income/expense)
├── docs/              # Project documentation
├── manage.py          # Django CLI
├── requirements.txt   # Python dependencies
├── PRD.md            # Product requirements
└── .env.example      # Environment template
```

### Database Schema

**Five core models** (all have `created_at` and `updated_at` fields):

1. **CustomUser** (users app)
   - Extends Django's `AbstractUser`
   - Uses `email` as `USERNAME_FIELD` (not username)
   - Password validation: minimum 8 characters, PBKDF2 hashing

2. **Profile** (profiles app)
   - One-to-one with CustomUser (auto-created via signal)
   - Fields: first_name, last_name, phone, bio

3. **Account** (accounts app)
   - One-to-many with CustomUser
   - Types: checking, savings, investment, wallet
   - `balance` field auto-updated by transaction signals
   - `is_active` boolean for soft-deletion pattern

4. **Category** (categories app)
   - One-to-many with CustomUser
   - Types: income, expense
   - `color` field (hex color for UI)
   - `is_default` marks system-created categories
   - Unique constraint: `(user, name, category_type)`
   - Cannot be deleted if transactions exist (PROTECT)

5. **Transaction** (transactions app)
   - Many-to-one with CustomUser, Account, Category
   - Types: income, expense
   - `amount` always positive (type determines sign)
   - Auto-updates Account.balance on save/delete via signals
   - Foreign key to Category uses `PROTECT` (prevents category deletion)

**Key Relationship:**
- All data is user-scoped: `Model.objects.filter(user=request.user)`
- Transactions automatically update account balances through Django signals
- Categories cannot be deleted if they have associated transactions

### App Responsibilities

| App | Purpose | Key Features |
|-----|---------|--------------|
| **users** | Authentication | Email-based login, custom user model, password management |
| **profiles** | Extended user info | Name, phone, bio, auto-created via signal |
| **accounts** | Financial accounts | Multiple account types, balance tracking, soft delete |
| **categories** | Transaction organization | Categorize by type, colors, custom + default |
| **transactions** | Financial records | Income/expense tracking, auto-balance updates |

### Data Flow

1. User registers → CustomUser + Profile created (signal-based)
2. User creates Account → Balance set to initial value
3. User creates Transaction → Account.balance auto-updated via post_save signal
4. User edits Transaction → Balance recalculated, Account.updated_at refreshed
5. User deletes Transaction → Balance adjusted via pre_delete signal

---

## Essential Commands

### Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start development server
python manage.py runserver

# Create admin user
python manage.py createsuperuser

# Access admin interface
# http://localhost:8000/admin/
```

### Testing

```bash
# Run all tests
python manage.py test

# Run tests for specific app
python manage.py test accounts

# Run specific test class
python manage.py test accounts.tests.AccountTestCase

# Verbosity 2 for detailed output
python manage.py test --verbosity=2
```

### Code Quality

```bash
# Check project integrity (required before commits)
python manage.py check

# PEP 8 linting (required before commits)
flake8 .

# Format code automatically (optional)
black .
```

### Database Inspection

```bash
# Django shell for queries
python manage.py shell

# Example: Create account in shell
from accounts.models import Account
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.first()
Account.objects.create(user=user, name="Test", account_type="checking")
```

### Migrations

```bash
# Show migration status
python manage.py showmigrations

# Create empty migration
python manage.py makemigrations --empty accounts --name add_field

# Revert to specific migration
python manage.py migrate accounts 0003
```

### Deployment Prep

```bash
# Collect static files (production only)
python manage.py collectstatic --noinput

# Check deployment readiness
python manage.py check --deploy
```

---

## Code Style & Conventions

### Naming & Format

- **Python classes**: PascalCase (`CustomUser`, `AccountManager`)
- **Python functions/methods**: snake_case (`get_user_balance()`)
- **Variables**: snake_case (`user_email`, `total_amount`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ATTEMPTS`, `DEFAULT_CURRENCY`)
- **Strings**: Always single quotes (`'string'`) except when contains single quote
- **Line length**: Max 79 characters (PEP 8)
- **Indentation**: 4 spaces (never tabs)

### Model Patterns

Every model must have:
```python
class MyModel(models.Model):
    # Fields...
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Display Name'
        ordering = ['-created_at']  # or ['-updated_at']

    def __str__(self):
        return self.name  # or meaningful representation
```

### View Patterns

**Always enforce user ownership:**
```python
# ✓ Correct - user-scoped query
account = get_object_or_404(Account, pk=pk, user=request.user)

# ✗ Wrong - no user check
account = Account.objects.get(pk=pk)
```

**Always protect views:**
```python
@login_required
def account_detail(request, pk):
    # ...
    pass

# Or for CBV:
class AccountDetailView(LoginRequiredMixin, DetailView):
    # ...
    pass
```

**Always provide feedback:**
```python
messages.success(request, 'Conta criada com sucesso!')
messages.error(request, 'Erro ao processar.')
```

### Import Order

```python
# 1. Standard library
from datetime import datetime
import os

# 2. Third-party (blank line before)
import requests

# 3. Django (blank line before)
from django.db import models
from django.contrib.auth.models import AbstractUser

# 4. Local (blank line before)
from .models import Account
from .managers import CustomUserManager
```

---

## Signals & Automation

Key automatic behaviors implemented via Django signals:

### Profile Auto-Creation
**File:** `profiles/signals.py`
```python
@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
```

### Transaction Auto-Balance Update
**File:** `transactions/signals.py` (to be implemented)
- On `post_save`: Update Account.balance based on transaction type
- On `pre_delete`: Adjust Account.balance when transaction deleted
- On `post_save` (edit): Handle transfer between accounts

**Logic:**
- Income transaction: `account.balance += amount`
- Expense transaction: `account.balance -= amount`
- Always use `F()` expressions for database-level atomicity

---

## Frontend Patterns

### Templates
- All templates inherit from `base.html` (not created yet)
- Template naming: `app_name/model_action.html`
  - Examples: `account_list.html`, `transaction_form.html`, `account_detail.html`
- Always use `{% csrf_token %}` in POST forms
- Always use dynamic URLs: `{% url 'app:name' %}` (never hardcode paths)

### TailwindCSS Integration
- Dark theme: Use `bg-slate-800`, `text-slate-100` defaults
- Primary gradient: `bg-gradient-to-r from-indigo-500 to-purple-600`
- Status colors: green (income), red (expense/inactive), amber (warning)
- See `docs/08-design-system.md` for complete component library

### Context Variables
Use consistent naming:
```python
context = {
    'account': account,              # Single object
    'accounts': accounts,            # List of objects
    'page_obj': page_obj,            # Pagination
    'total_balance': total_balance,  # Aggregate values
}
```

---

## Security & Validation

### User Data Isolation
Every query must filter by logged-in user:
```python
# Always filter by user to prevent data leakage
User.objects.filter(user=request.user)
Account.objects.filter(user=request.user)
Category.objects.filter(user=request.user)
Transaction.objects.filter(user=request.user)
```

### Authentication
- Use `@login_required` decorator (FBV) or `LoginRequiredMixin` (CBV)
- Never skip this check, even if view seems internal
- Check `request.user.is_authenticated` in edge cases

### Validation
- Always validate input on server-side (client validation is optional)
- Use Django forms for CSRF protection and validation
- Test with `python manage.py check` before commits

### Database Transactions
For critical operations (especially balance updates):
```python
from django.db import transaction

with transaction.atomic():
    # Update balance atomically
    account.balance += amount
    account.save()
```

---

## Testing

### Test Location
Tests go in each app's `tests.py` file.

### Test Structure
```python
from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class AccountTestCase(TestCase):
    def setUp(self):
        """Create test fixtures"""
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )

    def test_create_account(self):
        """Test account creation"""
        account = Account.objects.create(
            user=self.user,
            name='Test Account'
        )
        self.assertEqual(account.name, 'Test Account')
```

### Running Tests
```bash
python manage.py test                    # All tests
python manage.py test accounts           # Single app
python manage.py test accounts.tests.AccountTestCase  # Single class
python manage.py test --verbosity=2      # Detailed output
```

---

## Common Development Tasks

### Adding a New Field to Model
1. Edit model in `app_name/models.py`
2. Run `python manage.py makemigrations app_name`
3. Run `python manage.py migrate`
4. Register in admin if needed (update `admin.py`)
5. Update templates if field is displayed

### Creating a New View
1. Create view in `app_name/views.py`
2. Add URL pattern in `app_name/urls.py` or `core/urls.py`
3. Create template in `app_name/templates/app_name/`
4. Always use `@login_required` for authenticated views
5. Always filter querysets by `request.user`

### Adding Transaction Type Logic
**Important:** Transaction amounts are always stored as positive.
- Income: `amount = 100` (added to balance)
- Expense: `amount = 100` (subtracted from balance)
- The `transaction_type` field determines the operation

---

## Git Workflow

### Branch Naming
```
feature/description-here       # New features
bugfix/description-here        # Bug fixes
docs/description-here          # Documentation
refactor/description-here      # Code refactoring
```

### Commit Messages
Follow pattern: `<type>(<scope>): <subject>`
```
feat(accounts): add account balance history
fix(transactions): correct balance calculation for transfers
docs(setup): update installation instructions
refactor(models): simplify queryset filters
```

### Before Committing
```bash
python manage.py check
flake8 .
python manage.py test
```

### Pull Request Process
1. Branch from `develop`
2. Make commits with clear messages
3. Rebase if needed: `git rebase origin/develop`
4. Push to origin
5. Open PR to `develop` (not `main`)
6. Address review feedback

---

## Environment Configuration

See `.env.example` for template. Required variables:
```
DEBUG=True|False
SECRET_KEY=<long-random-string>
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
LANGUAGE_CODE=pt-br
TIME_ZONE=America/Sao_Paulo
```

**Never commit `.env`** - use `.env.example` only.

---

## Performance Considerations

### Query Optimization
- Use `select_related()` for ForeignKey fields
- Use `prefetch_related()` for reverse relations
- Avoid N+1 queries: test with `django-debug-toolbar` (future)
- Use pagination for large querysets (default: 20 items per page)

### Database Indexes
- User fields are naturally indexed (FK)
- Consider index on `transaction_date` for queryset filtering
- Consider index on `created_at` for ordering

### Static Files
- CSS compiled from TailwindCSS (future config)
- Use `{% static 'path/to/file' %}` in templates
- Static files served by Django in development, by nginx in production

---

## Known Limitations & Future Work

### Current MVP Scope
- No multi-account transfers yet (transactions are single-account)
- No recurring transactions (manual entry required)
- No export/import features
- SQLite only (PostgreSQL migration path available)
- No email notifications (ready for future integration)

### Database Migration Path
When scaling to PostgreSQL:
```bash
pip install psycopg2-binary
# Update settings.py with new database config
python manage.py migrate --database=postgresql
```

---

## Documentation Reference

Key files for understanding the project:
- `PRD.md` - Complete requirements and user stories
- `docs/README.md` - Documentation index
- `docs/02-estrutura-projeto.md` - Architecture details
- `docs/04-models.md` - Model field reference
- `docs/03-padroes-codigo.md` - Code style guide
- `docs/10-git-versionamento.md` - Git workflow

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `core/settings.py` | Django configuration, app registration |
| `core/urls.py` | Main URL router |
| `*/models.py` | Data models (CustomUser, Account, etc) |
| `*/views.py` | View logic and request handlers |
| `*/admin.py` | Admin interface customization |
| `*/signals.py` | Automated actions (Profile/Balance updates) |
| `requirements.txt` | Python dependencies |
| `manage.py` | Django CLI |
| `.env.example` | Environment template |

---

## Debugging Tips

### Debug Shell
```bash
python manage.py shell
>>> from accounts.models import Account
>>> Account.objects.filter(user__email='user@example.com')
>>> account = Account.objects.get(pk=1)
>>> account.balance  # Check balance
>>> account.transaction_set.all()  # Related transactions
```

### Print Debugging
```python
import logging
logger = logging.getLogger(__name__)
logger.info(f'Debug: {variable}')
```

### Database Inspection
```bash
python manage.py dbshell
sqlite> SELECT * FROM accounts_account WHERE user_id = 1;
```

---

## Last Updated

25 de Outubro de 2025

For the most current information, refer to `docs/README.md` and the PRD.md.

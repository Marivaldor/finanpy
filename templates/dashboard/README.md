# Dashboard Templates Directory

This directory contains templates for authenticated user dashboard area.

## Purpose

Dashboard templates are used for pages that require user authentication and display user-specific financial data.

## Structure

All dashboard templates should:
- Extend from `base.html`
- Require `@login_required` decorator on their views
- Display user-scoped data only
- Include dashboard navigation/sidebar

## Example Templates

- `home.html` - Main dashboard overview
- `accounts_list.html` - User's bank accounts
- `transactions_list.html` - Transaction history
- `categories_list.html` - User's categories
- `profile.html` - User profile management
- `settings.html` - User settings

## Data Security

All views rendering dashboard templates MUST filter data by `request.user` to ensure data isolation.

Example:
```python
@login_required
def dashboard_view(request):
    accounts = Account.objects.filter(user=request.user)
    return render(request, 'dashboard/home.html', {'accounts': accounts})
```

# Padrões de Código

Convenções e padrões de programação do projeto Finanpy.

## Convenções Gerais

### Nomenclatura

#### Classes
Use **PascalCase**:
```python
class CustomUser(AbstractUser):
    pass

class AccountManager(models.Manager):
    pass
```

#### Funções e Métodos
Use **snake_case**:
```python
def get_total_balance():
    pass

def calculate_monthly_expenses(user):
    pass
```

#### Variáveis
Use **snake_case**:
```python
user_email = 'user@example.com'
total_amount = 1000.00
is_active = True
```

#### Constantes
Use **UPPER_SNAKE_CASE**:
```python
MAX_ATTEMPTS = 5
DEFAULT_CURRENCY = 'BRL'
ACCOUNT_TYPES = [('checking', 'Conta Corrente')]
```

### Aspas

**Sempre use aspas simples** (single quotes):
```python
# Correto ✓
user = User.objects.get(email='user@example.com')
name = 'João Silva'

# Incorreto ✗
user = User.objects.get(email="user@example.com")
name = "João Silva"
```

**Exceção**: Quando a string contém aspas simples:
```python
message = "It's a beautiful day"
```

### Imports

Ordene os imports nesta sequência:

1. **Standard library** (Python nativo)
2. **Third-party** (pacotes externos)
3. **Django** (framework)
4. **Local** (seu projeto)

Separe cada grupo com uma linha em branco. Ordene alfabeticamente:

```python
# Standard library
from datetime import datetime
from decimal import Decimal

# Third-party
import requests

# Django
from django.contrib.auth.models import AbstractUser
from django.db import models

# Local
from .managers import CustomUserManager
```

---

## Padrões Django

### Models

#### Estrutura Básica

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    '''
    Custom user model with email authentication.
    '''
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
        ordering = ['-created_at']

    def __str__(self):
        return self.email
```

#### Campos Obrigatórios

Todo model deve ter:
- `created_at = models.DateTimeField(auto_now_add=True)`
- `updated_at = models.DateTimeField(auto_now=True)`

```python
class Account(models.Model):
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    # ... outros campos
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### Choices

Use tuplas para choices e documente:

```python
class Account(models.Model):
    ACCOUNT_TYPES = [
        ('checking', 'Conta Corrente'),
        ('savings', 'Poupança'),
        ('investment', 'Investimento'),
        ('wallet', 'Carteira'),
    ]

    account_type = models.CharField(
        max_length=20,
        choices=ACCOUNT_TYPES,
        default='checking'
    )
```

#### Método `__str__`

Sempre implemente para debugging:

```python
def __str__(self):
    return f'{self.name} ({self.account_type})'
```

#### Meta Class

Sempre inclua:

```python
class Meta:
    verbose_name = 'Conta'
    verbose_name_plural = 'Contas'
    ordering = ['-created_at']
    # unique_together = [['user', 'name']]  # se necessário
```

### Views

#### Function-Based Views

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages

@login_required
def account_list(request):
    '''List all accounts for current user.'''
    accounts = request.user.account_set.all()
    context = {'accounts': accounts}
    return render(request, 'accounts/account_list.html', context)

@login_required
def account_create(request):
    '''Create new account.'''
    if request.method == 'POST':
        # Processar formulário
        messages.success(request, 'Conta criada com sucesso!')
        return redirect('account_list')

    return render(request, 'accounts/account_form.html')
```

#### Class-Based Views

```python
from django.views import View
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy

class AccountListView(LoginRequiredMixin, ListView):
    '''List all accounts for current user.'''
    model = Account
    template_name = 'accounts/account_list.html'
    context_object_name = 'accounts'
    paginate_by = 20

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)
```

### Admin

#### Registrar Models

```python
from django.contrib import admin
from .models import Account

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'account_type', 'user', 'created_at')
    list_filter = ('account_type', 'created_at')
    search_fields = ('name', 'user__email')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('user', 'name', 'account_type')
        }),
        ('Detalhes', {
            'fields': ('balance', 'description', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
```

### URLs

#### Padrão de Nomes

Use nomes descritivos em minúsculas com underscore:

```python
from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.account_list, name='account_list'),
    path('<int:pk>/', views.account_detail, name='account_detail'),
    path('create/', views.account_create, name='account_create'),
    path('<int:pk>/edit/', views.account_update, name='account_update'),
    path('<int:pk>/delete/', views.account_delete, name='account_delete'),
]
```

---

## Formatação

### Comprimento de Linhas

Máximo de **79 caracteres** por linha (PEP 8):

```python
# Correto ✓
user = User.objects.filter(
    is_active=True,
    created_at__gte=start_date
).first()

# Evitar ✗
user = User.objects.filter(is_active=True, created_at__gte=start_date).first()
```

### Indentação

Use **4 espaços** (não tabs):

```python
# Correto ✓
if condition:
    do_something()

# Incorreto ✗
if condition:
  do_something()  # 2 espaços
```

### Espaçamento

Dois espaços em branco entre definições de classe e função no nível superior:

```python
class Account(models.Model):
    pass


class Category(models.Model):
    pass
```

---

## Comentários e Docstrings

### Docstrings

Use docstrings em classes e funções importantes:

```python
def get_user_balance(user):
    '''
    Calculate the total balance of all user accounts.

    Args:
        user: CustomUser instance

    Returns:
        Decimal: Total balance across all accounts
    '''
    return sum(acc.balance for acc in user.account_set.all())
```

### Comentários Inline

Use para explicar lógica complexa:

```python
# Calcula receitas e despesas separadamente para comparação
income = Transaction.objects.filter(
    user=user,
    transaction_type='income'
).aggregate(total=models.Sum('amount'))['total'] or 0

expense = Transaction.objects.filter(
    user=user,
    transaction_type='expense'
).aggregate(total=models.Sum('amount'))['total'] or 0
```

---

## Boas Práticas

### 1. DRY (Don't Repeat Yourself)

Não repita código:

```python
# Incorreto ✗
balance_jan = Account.objects.filter(user=user, created_at__month=1).aggregate(...)
balance_feb = Account.objects.filter(user=user, created_at__month=2).aggregate(...)
balance_mar = Account.objects.filter(user=user, created_at__month=3).aggregate(...)

# Correto ✓
def get_monthly_balance(user, month):
    return Account.objects.filter(
        user=user,
        created_at__month=month
    ).aggregate(total=models.Sum('balance'))
```

### 2. Validação em Models

Implemente validações no model quando possível:

```python
from django.core.exceptions import ValidationError

class Account(models.Model):
    balance = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0
    )

    def clean(self):
        if self.balance < 0:
            raise ValidationError('Balance cannot be negative')
```

### 3. Use QuerySets Eficientemente

Minimize queries ao banco:

```python
# Evitar N+1 problem
# Incorreto ✗
for account in accounts:
    print(account.user.email)  # Query por conta

# Correto ✓
accounts = accounts.select_related('user')
for account in accounts:
    print(account.user.email)  # Sem queries adicionais
```

### 4. Permissions e Security

Sempre verifique permissões:

```python
@login_required
def account_detail(request, pk):
    account = get_object_or_404(Account, pk=pk, user=request.user)
    # account pertence ao usuário logado
    return render(request, 'accounts/account_detail.html', {'account': account})
```

---

## Linting e Formatação

### Flake8

Para verificar conformidade com PEP 8:

```bash
pip install flake8
flake8 .
```

### Black (Opcional)

Para formatação automática:

```bash
pip install black
black .
```

---

## Próximos Passos

- Consulte [Models](./04-models.md) para detalhes específicos de models
- Veja [Views e URLs](./05-views-urls.md) para padrões de views
- Leia [Comandos Úteis](./09-comandos-uteis.md) para ferramentas de desenvolvimento

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

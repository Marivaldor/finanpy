# Views e URLs

Padrões de views e roteamento do Finanpy.

## Estrutura Geral

Cada app do Finanpy segue este padrão:

```
app_name/
├── views.py         # Lógica das views
├── urls.py          # Roteamento
└── templates/       # Templates HTML
    └── app_name/
        ├── model_list.html
        ├── model_detail.html
        ├── model_form.html
        └── ...
```

---

## Convenções de Nomes

### URLs (em urls.py)

Use nomes descritivos em minúsculas com underscore:

```python
urlpatterns = [
    path('', views.account_list, name='account_list'),
    path('<int:pk>/', views.account_detail, name='account_detail'),
    path('create/', views.account_create, name='account_create'),
    path('<int:pk>/edit/', views.account_update, name='account_update'),
    path('<int:pk>/delete/', views.account_delete, name='account_delete'),
]
```

### Templates

```
account_list.html      # Listagem
account_detail.html    # Detalhe
account_form.html      # Criar e editar
account_confirm_delete.html  # Confirmação de exclusão
```

### Context

Use nomes descritivos no context:

```python
context = {
    'accounts': accounts,      # Lista de objetos
    'account': account,        # Objeto único
    'total_balance': 5000.00,  # Cálculos
}
```

---

## Padrão de Views

### 1. Listagem (GET)

```python
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Account

@login_required
def account_list(request):
    '''List all accounts for current user.'''
    accounts = Account.objects.filter(user=request.user)
    context = {'accounts': accounts}
    return render(request, 'accounts/account_list.html', context)
```

**Com paginação**:

```python
from django.core.paginator import Paginator

@login_required
def account_list(request):
    '''List all accounts for current user (paginated).'''
    accounts = Account.objects.filter(user=request.user)

    paginator = Paginator(accounts, 20)  # 20 por página
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {'page_obj': page_obj}
    return render(request, 'accounts/account_list.html', context)
```

### 2. Detalhe (GET)

```python
from django.shortcuts import render, get_object_or_404

@login_required
def account_detail(request, pk):
    '''Show account details.'''
    account = get_object_or_404(Account, pk=pk, user=request.user)
    context = {'account': account}
    return render(request, 'accounts/account_detail.html', context)
```

### 3. Criar (GET + POST)

```python
from django.shortcuts import render, redirect
from django.contrib import messages

@login_required
def account_create(request):
    '''Create new account.'''
    if request.method == 'POST':
        name = request.POST.get('name')
        account_type = request.POST.get('account_type')
        balance = request.POST.get('balance', 0)

        # Validações
        if not name:
            messages.error(request, 'Nome é obrigatório.')
            return render(request, 'accounts/account_form.html')

        # Criar conta
        account = Account.objects.create(
            user=request.user,
            name=name,
            account_type=account_type,
            balance=balance
        )

        messages.success(request, 'Conta criada com sucesso!')
        return redirect('accounts:account_detail', pk=account.pk)

    context = {
        'account_types': Account.ACCOUNT_TYPES,
    }
    return render(request, 'accounts/account_form.html', context)
```

### 4. Atualizar (GET + POST)

```python
@login_required
def account_update(request, pk):
    '''Update existing account.'''
    account = get_object_or_404(Account, pk=pk, user=request.user)

    if request.method == 'POST':
        account.name = request.POST.get('name', account.name)
        account.account_type = request.POST.get('account_type', account.account_type)
        account.description = request.POST.get('description', '')
        account.is_active = request.POST.get('is_active') == 'on'

        # Validações
        if not account.name:
            messages.error(request, 'Nome é obrigatório.')
            return render(request, 'accounts/account_form.html', {'account': account})

        account.save()
        messages.success(request, 'Conta atualizada com sucesso!')
        return redirect('accounts:account_detail', pk=account.pk)

    context = {
        'account': account,
        'account_types': Account.ACCOUNT_TYPES,
    }
    return render(request, 'accounts/account_form.html', context)
```

### 5. Deletar (GET + POST)

```python
@login_required
def account_delete(request, pk):
    '''Delete account.'''
    account = get_object_or_404(Account, pk=pk, user=request.user)

    if request.method == 'POST':
        name = account.name
        account.delete()
        messages.success(request, f'Conta "{name}" deletada com sucesso!')
        return redirect('accounts:account_list')

    context = {'account': account}
    return render(request, 'accounts/account_confirm_delete.html', context)
```

---

## Class-Based Views

Alternativa moderna usando CBV:

```python
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.contrib import messages

class AccountListView(LoginRequiredMixin, ListView):
    '''List all accounts for current user.'''
    model = Account
    template_name = 'accounts/account_list.html'
    context_object_name = 'accounts'
    paginate_by = 20

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)

class AccountDetailView(LoginRequiredMixin, DetailView):
    '''Show account details.'''
    model = Account
    template_name = 'accounts/account_detail.html'
    context_object_name = 'account'

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)

class AccountCreateView(LoginRequiredMixin, CreateView):
    '''Create new account.'''
    model = Account
    template_name = 'accounts/account_form.html'
    fields = ['name', 'account_type', 'balance', 'description']
    success_url = reverse_lazy('accounts:account_list')

    def form_valid(self, form):
        form.instance.user = self.request.user
        messages.success(self.request, 'Conta criada com sucesso!')
        return super().form_valid(form)

class AccountUpdateView(LoginRequiredMixin, UpdateView):
    '''Update existing account.'''
    model = Account
    template_name = 'accounts/account_form.html'
    fields = ['name', 'account_type', 'description', 'is_active']

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)

    def get_success_url(self):
        return reverse_lazy('accounts:account_detail', kwargs={'pk': self.object.pk})

    def form_valid(self, form):
        messages.success(self.request, 'Conta atualizada com sucesso!')
        return super().form_valid(form)

class AccountDeleteView(LoginRequiredMixin, DeleteView):
    '''Delete account.'''
    model = Account
    template_name = 'accounts/account_confirm_delete.html'
    success_url = reverse_lazy('accounts:account_list')

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)

    def delete(self, request, *args, **kwargs):
        messages.success(request, f'Conta "{self.object.name}" deletada com sucesso!')
        return super().delete(request, *args, **kwargs)
```

---

## URLs

### Estrutura de Arquivos

```
app_name/
├── urls.py
└── views.py

core/
└── urls.py (principal)
```

### urls.py Principal (core/)

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('categories/', include('categories.urls')),
    path('transactions/', include('transactions.urls')),
    path('profiles/', include('profiles.urls')),
]
```

### urls.py da App

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

### URLs com Class-Based Views

```python
from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.AccountListView.as_view(), name='account_list'),
    path('<int:pk>/', views.AccountDetailView.as_view(), name='account_detail'),
    path('create/', views.AccountCreateView.as_view(), name='account_create'),
    path('<int:pk>/edit/', views.AccountUpdateView.as_view(), name='account_update'),
    path('<int:pk>/delete/', views.AccountDeleteView.as_view(), name='account_delete'),
]
```

---

## Segurança

### Autenticação

Use decorator `@login_required` em views protegidas:

```python
from django.contrib.auth.decorators import login_required

@login_required
def account_detail(request, pk):
    # Apenas usuários autenticados
    pass
```

Para CBV, use `LoginRequiredMixin`:

```python
from django.contrib.auth.mixins import LoginRequiredMixin

class AccountDetailView(LoginRequiredMixin, DetailView):
    # Apenas usuários autenticados
    pass
```

### Autorização

Sempre verifique se o objeto pertence ao usuário:

```python
# Incorreto ✗ - Qualquer usuário acessa qualquer conta
account = Account.objects.get(pk=pk)

# Correto ✓ - Apenas contas do usuário logado
account = get_object_or_404(Account, pk=pk, user=request.user)
```

### CSRF Protection

Django ativa automaticamente. Use `{% csrf_token %}` em formulários:

```html
<form method="post">
    {% csrf_token %}
    <!-- campos do formulário -->
</form>
```

---

## Mensagens de Feedback

Use django.contrib.messages para feedback visual:

```python
from django.contrib import messages

# Sucesso
messages.success(request, 'Operação realizada com sucesso!')

# Erro
messages.error(request, 'Erro ao processar a requisição.')

# Aviso
messages.warning(request, 'Atenção: esta ação não pode ser desfeita.')

# Info
messages.info(request, 'Informação importante.')
```

Em templates:

```html
{% if messages %}
    {% for message in messages %}
        <div class="alert alert-{{ message.tags }}">
            {{ message }}
        </div>
    {% endfor %}
{% endif %}
```

---

## Redirecionamentos

Use `redirect()` após POST bem-sucedido:

```python
from django.shortcuts import redirect
from django.urls import reverse

# Redirecionar para URL nomeada
return redirect('accounts:account_list')

# Redirecionar com argumentos
return redirect('accounts:account_detail', pk=account.pk)

# Redirecionar para URL absoluta
return redirect(reverse('accounts:account_list'))
```

---

## Filtros e Buscas

### Filtro por Período

```python
from datetime import date, timedelta

@login_required
def transaction_list(request):
    transactions = Transaction.objects.filter(user=request.user)

    # Filtro de período
    period = request.GET.get('period', 'month')
    today = date.today()

    if period == 'week':
        start_date = today - timedelta(days=7)
    elif period == 'month':
        start_date = today.replace(day=1)
    elif period == 'year':
        start_date = today.replace(month=1, day=1)
    else:
        start_date = None

    if start_date:
        transactions = transactions.filter(transaction_date__gte=start_date)

    context = {'transactions': transactions}
    return render(request, 'transactions/transaction_list.html', context)
```

### Busca

```python
from django.db.models import Q

@login_required
def transaction_search(request):
    transactions = Transaction.objects.filter(user=request.user)

    # Busca por descrição
    search = request.GET.get('q', '')
    if search:
        transactions = transactions.filter(
            Q(description__icontains=search) |
            Q(notes__icontains=search)
        )

    context = {'transactions': transactions, 'search': search}
    return render(request, 'transactions/transaction_list.html', context)
```

---

## Próximos Passos

- Consulte [Templates Django](./07-templates-django.md) para templates HTML
- Veja [Admin Django](./06-admin-django.md) para interface administrativa
- Leia [Padrões de Código](./03-padroes-codigo.md) para boas práticas

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

# Admin Django

Guia de configuração e uso da interface administrativa do Django.

## Introdução

O Django Admin é uma interface web para gerenciar modelos. Qualquer model registrado fica disponível para CRUD (Create, Read, Update, Delete).

## Acessar Admin

1. Certifique-se de ter um superusuário:
```bash
python manage.py createsuperuser
```

2. Rode o servidor:
```bash
python manage.py runserver
```

3. Acesse http://localhost:8000/admin/

## Registrar um Model

### Forma Básica

```python
# accounts/admin.py
from django.contrib import admin
from .models import Account

admin.site.register(Account)
```

### Com Customização (Recomendado)

Use o decorator `@admin.register`:

```python
from django.contrib import admin
from .models import Account

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'account_type', 'balance', 'user', 'created_at')
    list_filter = ('account_type', 'is_active', 'created_at')
    search_fields = ('name', 'user__email')
    readonly_fields = ('created_at', 'updated_at', 'balance')
    ordering = ('-created_at',)
```

---

## Opções Principais

### `list_display`

Campos exibidos na listagem:

```python
class AccountAdmin(admin.ModelAdmin):
    # Exibir múltiplos campos
    list_display = ('name', 'account_type', 'balance', 'user', 'created_at')

    # Com método customizado
    list_display = ('name', 'account_type', 'get_balance_formatted', 'user')

    def get_balance_formatted(self, obj):
        return f'R$ {obj.balance:,.2f}'
    get_balance_formatted.short_description = 'Saldo'
```

### `list_filter`

Filtros na lateral direita:

```python
class AccountAdmin(admin.ModelAdmin):
    list_filter = ('account_type', 'is_active', 'created_at')
```

### `search_fields`

Campo de busca (busca por substring):

```python
class AccountAdmin(admin.ModelAdmin):
    # Buscar por nome ou email do usuário
    search_fields = ('name', 'user__email')
```

### `readonly_fields`

Campos apenas de leitura:

```python
class AccountAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
```

### `ordering`

Ordem padrão da listagem:

```python
class AccountAdmin(admin.ModelAdmin):
    # Mais recentes primeiro
    ordering = ('-created_at',)
```

### `fieldsets`

Organiza campos em seções:

```python
class AccountAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('user', 'name', 'account_type')
        }),
        ('Detalhes', {
            'fields': ('balance', 'description', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)  # Seção recolhida
        }),
    )
```

### `fields` e `exclude`

Controlar quais campos aparecem no formulário:

```python
# Mostrar apenas alguns campos
class AccountAdmin(admin.ModelAdmin):
    fields = ('user', 'name', 'account_type', 'balance')

# Excluir campos
class AccountAdmin(admin.ModelAdmin):
    exclude = ('created_at', 'updated_at')
```

### `filter_horizontal` e `filter_vertical`

Para ManyToMany fields:

```python
class CategoryAdmin(admin.ModelAdmin):
    filter_horizontal = ('related_categories',)  # Interface de filtro horizontal
```

### `actions`

Ações customizadas em lote:

```python
class AccountAdmin(admin.ModelAdmin):
    actions = ['make_active', 'make_inactive']

    def make_active(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} contas ativadas.')
    make_active.short_description = 'Ativar contas selecionadas'

    def make_inactive(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} contas desativadas.')
    make_inactive.short_description = 'Desativar contas selecionadas'
```

---

## Exemplos Completos

### CustomUser

```python
# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'date_joined')
    list_filter = ('is_active', 'is_staff', 'date_joined')
    search_fields = ('email', 'first_name', 'last_name')

    fieldsets = (
        ('Autenticação', {'fields': ('email', 'password')}),
        ('Informações Pessoais', {'fields': ('first_name', 'last_name')}),
        ('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Timestamps', {
            'fields': ('date_joined', 'last_login'),
            'classes': ('collapse',)
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

    ordering = ('-date_joined',)
```

### Profile

```python
# profiles/admin.py
from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('get_user_email', 'first_name', 'last_name', 'phone', 'created_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('user__email', 'first_name', 'last_name')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Usuário', {'fields': ('user',)}),
        ('Informações Pessoais', {
            'fields': ('first_name', 'last_name', 'phone', 'bio')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'Email'
```

### Category

```python
# categories/admin.py
from django.contrib import admin
from .models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_category_type_display', 'get_color_preview', 'user', 'is_default', 'created_at')
    list_filter = ('category_type', 'is_default', 'created_at')
    search_fields = ('name', 'user__email')
    readonly_fields = ('created_at', 'updated_at', 'get_color_preview')

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('user', 'name', 'category_type')
        }),
        ('Estilo', {
            'fields': ('color', 'get_color_preview')
        }),
        ('Detalhes', {
            'fields': ('description', 'is_default')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_color_preview(self, obj):
        return f'<div style="width: 20px; height: 20px; background-color: {obj.color}; border-radius: 3px;"></div>'
    get_color_preview.short_description = 'Visualizar Cor'
    get_color_preview.allow_tags = True
```

### Account

```python
# accounts/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Account

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_account_type_display', 'get_balance_formatted', 'get_status_badge', 'user', 'created_at')
    list_filter = ('account_type', 'is_active', 'created_at')
    search_fields = ('name', 'user__email')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('user', 'name', 'account_type')
        }),
        ('Detalhes Financeiros', {
            'fields': ('balance', 'description', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_balance_formatted(self, obj):
        return f'R$ {obj.balance:,.2f}'
    get_balance_formatted.short_description = 'Saldo'

    def get_status_badge(self, obj):
        if obj.is_active:
            color = 'green'
            status = 'Ativa'
        else:
            color = 'red'
            status = 'Inativa'
        return format_html(
            f'<span style="color: {color};">●</span> {status}'
        )
    get_status_badge.short_description = 'Status'
```

### Transaction

```python
# transactions/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('get_description', 'get_amount_colored', 'get_transaction_type', 'account', 'category', 'transaction_date', 'user')
    list_filter = ('transaction_type', 'transaction_date', 'category', 'account')
    search_fields = ('description', 'user__email', 'account__name')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('user', 'account', 'category', 'description')
        }),
        ('Detalhes Financeiros', {
            'fields': ('amount', 'transaction_type', 'transaction_date')
        }),
        ('Observações', {
            'fields': ('notes',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_description(self, obj):
        return obj.description[:50] + '...' if len(obj.description) > 50 else obj.description
    get_description.short_description = 'Descrição'

    def get_amount_colored(self, obj):
        if obj.transaction_type == 'income':
            color = 'green'
            symbol = '+'
        else:
            color = 'red'
            symbol = '-'
        return format_html(
            f'<span style="color: {color}; font-weight: bold;">{symbol} R$ {obj.amount:,.2f}</span>'
        )
    get_amount_colored.short_description = 'Valor'

    def get_transaction_type(self, obj):
        if obj.transaction_type == 'income':
            color = 'green'
            label = 'Receita'
        else:
            color = 'red'
            label = 'Despesa'
        return format_html(
            f'<span style="background-color: {color}; color: white; padding: 3px 8px; border-radius: 3px;">{label}</span>'
        )
    get_transaction_type.short_description = 'Tipo'
```

---

## Dicas e Boas Práticas

### 1. Use `get_*_display()` para Choices

```python
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('description', 'get_transaction_type_display', 'amount')
```

### 2. Links Relacionados

```python
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('description', 'link_to_account', 'amount')

    def link_to_account(self, obj):
        from django.urls import reverse
        url = reverse('admin:accounts_account_change', args=[obj.account.pk])
        return format_html('<a href="{}">{}</a>', url, obj.account.name)
    link_to_account.short_description = 'Conta'
```

### 3. Customizar Lista por Usuário

```python
class AccountAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if not request.user.is_superuser:
            # Usuários não-admin veem apenas suas próprias contas
            qs = qs.filter(user=request.user)
        return qs
```

### 4. Readonly e Editable Dinâmicos

```python
class TransactionAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editando
            return self.readonly_fields + ('user', 'account')
        return self.readonly_fields
```

### 5. Filtros Customizados

```python
from django.contrib.admin import SimpleListFilter

class IsActiveFilter(SimpleListFilter):
    title = 'Status'
    parameter_name = 'status'

    def lookups(self, request, model_admin):
        return [
            ('active', 'Ativas'),
            ('inactive', 'Inativas'),
        ]

    def queryset(self, request, queryset):
        if self.value() == 'active':
            return queryset.filter(is_active=True)
        if self.value() == 'inactive':
            return queryset.filter(is_active=False)

class AccountAdmin(admin.ModelAdmin):
    list_filter = (IsActiveFilter, 'account_type')
```

---

## Permissões

O Django Admin respeita permissões do modelo:

```python
# Em models.py
class Account(models.Model):
    class Meta:
        permissions = [
            ('can_view_balance', 'Can view account balance'),
            ('can_export', 'Can export account data'),
        ]
```

Usar em views ou admin:

```python
if request.user.has_perm('accounts.can_view_balance'):
    # Mostrar saldo
    pass
```

---

## Próximos Passos

- Veja [Views e URLs](./05-views-urls.md) para criar interfaces customizadas
- Consulte [Templates Django](./07-templates-django.md) para templates públicos
- Leia [Padrões de Código](./03-padroes-codigo.md) para boas práticas

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

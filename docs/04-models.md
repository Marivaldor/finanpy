# Models

Documentação detalhada dos models do Finanpy.

## Visão Geral

O Finanpy utiliza 5 models principais organizados em apps especializadas. Todos os models seguem as convenções do Django com campos `created_at` e `updated_at`.

```
CustomUser (users)
    ↓
Profile (profiles)
Account (accounts) ← Transações
Category (categories) ← Transações
Transaction (transactions)
```

---

## CustomUser

**App**: `users`
**Herança**: `AbstractUser`

Modelo customizado para autenticação via email.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `email` | EmailField | ✓ | Email único para login |
| `password` | CharField | ✓ | Senha com hash PBKDF2 |
| `is_active` | BooleanField | ✓ | Controla se usuário pode fazer login |
| `is_staff` | BooleanField | | Acesso ao admin (herdado) |
| `is_superuser` | BooleanField | | Permissões totais (herdado) |
| `first_name` | CharField | | Primeiro nome (herdado) |
| `last_name` | CharField | | Último nome (herdado) |
| `date_joined` | DateTimeField | ✓ | Data de cadastro (herdado) |
| `last_login` | DateTimeField | | Último login (herdado) |

### Configuração Especial

```python
USERNAME_FIELD = 'email'  # Campo para login
REQUIRED_FIELDS = []      # Campos obrigatórios (além do USERNAME_FIELD)
```

### Exemplos de Uso

```python
# Criar novo usuário
user = CustomUser.objects.create_user(
    email='user@example.com',
    password='senha_segura_123'
)

# Login
user = CustomUser.objects.get(email='user@example.com')
user.check_password('senha_segura_123')  # True

# Desativar usuário
user.is_active = False
user.save()
```

---

## Profile

**App**: `profiles`
**Relação**: OneToOneField com CustomUser (auto-criado via signal)

Perfil estendido do usuário com informações adicionais.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `user` | OneToOneField | ✓ | Referência para CustomUser |
| `first_name` | CharField | | Primeiro nome |
| `last_name` | CharField | | Último nome |
| `phone` | CharField | | Telefone para contato |
| `bio` | TextField | | Biografia ou observações |
| `created_at` | DateTimeField | ✓ | Data de criação |
| `updated_at` | DateTimeField | ✓ | Data da última atualização |

### Signals

O Profile é criado automaticamente ao criar um CustomUser via signal:

```python
@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
```

### Exemplos de Uso

```python
# Acessar profile de um usuário
profile = user.profile  # Acesso direto
profile.first_name = 'João'
profile.last_name = 'Silva'
profile.phone = '(11) 98765-4321'
profile.save()

# Criar profile (normalmente automático)
profile = Profile.objects.create(user=user)
```

---

## Account

**App**: `accounts`
**Relação**: ForeignKey com CustomUser

Representa contas bancárias do usuário.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `user` | ForeignKey | ✓ | Proprietário da conta |
| `name` | CharField | ✓ | Nome da conta (ex: "Conta Corrente Itaú") |
| `account_type` | CharField | ✓ | Tipo de conta (choices abaixo) |
| `balance` | DecimalField | ✓ | Saldo atual (atualizado automaticamente) |
| `description` | TextField | | Descrição ou observações |
| `is_active` | BooleanField | ✓ | Se conta está ativa |
| `created_at` | DateTimeField | ✓ | Data de criação |
| `updated_at` | DateTimeField | ✓ | Data da última atualização |

### Choices - account_type

```python
ACCOUNT_TYPES = [
    ('checking', 'Conta Corrente'),
    ('savings', 'Poupança'),
    ('investment', 'Investimento'),
    ('wallet', 'Carteira'),
]
```

### Constraints

- `unique_together`: Geralmente não há (usuário pode ter múltiplas contas com mesmo nome)
- `ordering`: `-created_at` (mais recentes primeiro)

### Exemplos de Uso

```python
# Criar conta
account = Account.objects.create(
    user=user,
    name='Conta Corrente Itaú',
    account_type='checking',
    balance=1000.00,
    is_active=True
)

# Listar contas ativas do usuário
active_accounts = user.account_set.filter(is_active=True)

# Calcular saldo total
total_balance = sum(acc.balance for acc in user.account_set.all())
```

---

## Category

**App**: `categories`
**Relação**: ForeignKey com CustomUser

Categorias para organizar transações.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `user` | ForeignKey | ✓ | Proprietário da categoria |
| `name` | CharField | ✓ | Nome da categoria |
| `category_type` | CharField | ✓ | Tipo: receita ou despesa |
| `color` | CharField | ✓ | Cor em hex (ex: '#3B82F6') |
| `description` | TextField | | Descrição |
| `is_default` | BooleanField | ✓ | Se é categoria padrão do sistema |
| `created_at` | DateTimeField | ✓ | Data de criação |
| `updated_at` | DateTimeField | ✓ | Data da última atualização |

### Choices - category_type

```python
CATEGORY_TYPES = [
    ('income', 'Receita'),
    ('expense', 'Despesa'),
]
```

### Constraints

- `unique_together`: `['user', 'name', 'category_type']` (nome único por tipo)
- `ordering`: `['category_type', 'name']`

### Categorias Padrão

Criadas automaticamente no primeiro login:

**Receitas**:
- Salário
- Freelance
- Investimentos
- Outros

**Despesas**:
- Alimentação
- Transporte
- Moradia
- Saúde
- Lazer
- Educação
- Outros

### Exemplos de Uso

```python
# Criar categoria
category = Category.objects.create(
    user=user,
    name='Alimentação',
    category_type='expense',
    color='#EF4444',
    is_default=True
)

# Listar categorias de receita
income_categories = user.category_set.filter(category_type='income')

# Contar transações por categoria
category_count = category.transaction_set.count()
```

---

## Transaction

**App**: `transactions`
**Relações**: ForeignKey com CustomUser, Account e Category

Representa transações financeiras (receitas e despesas).

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `user` | ForeignKey | ✓ | Proprietário da transação |
| `account` | ForeignKey | ✓ | Conta associada |
| `category` | ForeignKey | ✓ | Categoria (PROTECT on_delete) |
| `description` | CharField | ✓ | Descrição da transação |
| `amount` | DecimalField | ✓ | Valor em reais (positivo) |
| `transaction_type` | CharField | ✓ | Tipo: receita ou despesa |
| `transaction_date` | DateField | ✓ | Data da transação |
| `notes` | TextField | | Observações adicionais |
| `created_at` | DateTimeField | ✓ | Data de criação |
| `updated_at` | DateTimeField | ✓ | Data da última atualização |

### Choices - transaction_type

```python
TRANSACTION_TYPES = [
    ('income', 'Receita'),
    ('expense', 'Despesa'),
]
```

### Constraints

- `on_delete` para Category: `PROTECT` (não permite deletar categoria com transações)
- `ordering`: `-transaction_date` (mais recentes primeiro)
- Índices em: `transaction_date`, `user`, `account`

### Automatismos

**Auto-atualização de balance**:

Ao criar/editar/deletar uma Transaction, o balance da Account é atualizado automaticamente via signals:

```python
# Ao salvar uma receita
transaction = Transaction.objects.create(
    user=user,
    account=account,  # balance = 1000
    amount=500,
    transaction_type='income'
)
# Agora account.balance = 1500

# Ao salvar uma despesa
transaction = Transaction.objects.create(
    user=user,
    account=account,  # balance = 1500
    amount=200,
    transaction_type='expense'
)
# Agora account.balance = 1300
```

### Exemplos de Uso

```python
# Criar receita
income = Transaction.objects.create(
    user=user,
    account=account,
    category=salary_category,
    description='Salário mensal',
    amount=5000.00,
    transaction_type='income',
    transaction_date=date(2025, 10, 25)
)

# Criar despesa
expense = Transaction.objects.create(
    user=user,
    account=account,
    category=food_category,
    description='Mercado',
    amount=150.50,
    transaction_type='expense',
    transaction_date=date(2025, 10, 25)
)

# Filtrar transações do mês
from datetime import date
from dateutil.relativedelta import relativedelta

today = date.today()
month_start = today.replace(day=1)
month_end = (month_start + relativedelta(months=1)) - timedelta(days=1)

transactions = Transaction.objects.filter(
    user=user,
    transaction_date__range=[month_start, month_end]
)

# Totalizar receitas e despesas
from django.db.models import Sum

income_total = Transaction.objects.filter(
    user=user,
    transaction_type='income'
).aggregate(total=Sum('amount'))['total'] or 0

expense_total = Transaction.objects.filter(
    user=user,
    transaction_type='expense'
).aggregate(total=Sum('amount'))['total'] or 0
```

---

## Diagrama de Relacionamentos

```
CustomUser
├── Profile (OneToOne, auto-criado)
├── Account (ForeignKey)
│   └── Transaction (ForeignKey)
├── Category (ForeignKey)
│   └── Transaction (ForeignKey)
└── Transaction (ForeignKey)
    ├── Account (ForeignKey)
    └── Category (ForeignKey)
```

---

## Padrões Comuns

### Filtrar por Usuário Logado

```python
# Em views
accounts = Account.objects.filter(user=request.user)

# No QuerySet
user_transactions = Transaction.objects.filter(user=user)
```

### Validar Propriedade de Objeto

```python
# Garantir que conta pertence ao usuário
account = get_object_or_404(Account, pk=pk, user=request.user)
```

### Cálculos Agregados

```python
# Total de contas
total_balance = Account.objects.filter(
    user=user
).aggregate(total=models.Sum('balance'))['total'] or 0

# Receitas do mês
from django.db.models import Sum
from datetime import date

today = date.today()
month_income = Transaction.objects.filter(
    user=user,
    transaction_type='income',
    transaction_date__month=today.month,
    transaction_date__year=today.year
).aggregate(total=Sum('amount'))['total'] or 0
```

---

## Próximos Passos

- Veja [Views e URLs](./05-views-urls.md) para implementar CRUD
- Consulte [Admin Django](./06-admin-django.md) para configurar interface admin
- Leia [Padrões de Código](./03-padroes-codigo.md) para boas práticas

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

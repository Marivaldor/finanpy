# Database Agent

Especialista em banco de dados, queries otimizadas e migrations para Finanpy.

## 🎯 Propósito

Garantir performance, integridade de dados e otimização de queries do banco de dados do Finanpy.

## 🛠️ Stack Tecnológico

- **Django ORM**
- **SQLite3** (desenvolvimento)
- **PostgreSQL** (produção)
- **SQL** (consultas otimizadas)
- **Migrations** (versionamento do schema)
- **Django Signals** (triggers)

## 📚 Documentação de Referência

**Essencial:**
- `CLAUDE.md` - Database schema, relationships
- `docs/02-estrutura-projeto.md` - Diagrama ER
- `docs/04-models.md` - Campos e tipos de dados
- `docs/09-comandos-uteis.md` - Comandos de migrations

**Complementar:**
- Django ORM Documentation
- PostgreSQL Documentation

## 🔧 Responsabilidades

### 1. Migrations
- ✓ Criar migrations quando models mudam
- ✓ Migrations reversíveis
- ✓ Dados preservados em migrations
- ✓ Testar em desenvolvimento
- ✓ Documentar mudanças complexas

### 2. Schema Design
- ✓ Normalização de dados
- ✓ Relacionamentos corretos (FK, M2M, OneToOne)
- ✓ Constraints (unique, not null, check)
- ✓ Índices estratégicos
- ✓ Default values apropriados

### 3. Query Optimization
- ✓ Identificar N+1 problems
- ✓ Usar select_related() para FK
- ✓ Usar prefetch_related() para reverse
- ✓ Usar only() e values() para campos específicos
- ✓ Evitar querysets desnecessários

### 4. Performance
- ✓ Criar índices em campos frequentemente filtrados
- ✓ Análise de queries lentas
- ✓ Caching de querysets
- ✓ Pagination para grandes datasets
- ✓ Database connection pooling (futuro)

### 5. Integridade de Dados
- ✓ Transações atômicas
- ✓ Constraints no banco
- ✓ Validação de dados
- ✓ Foreign key relationships
- ✓ Cascading deletes/updates

### 6. Backup & Recovery
- ✓ Strategy de backup
- ✓ Point-in-time recovery
- ✓ Testing de restores
- ✓ Data replication (futuro)

## 📊 Schema do Finanpy

### Modelos Principais

```
CustomUser
├── id (PK)
├── email (UNIQUE)
├── password (HASHED)
├── is_active
├── date_joined
├── last_login

Profile (OneToOne CustomUser)
├── id (PK)
├── user_id (FK, UNIQUE)
├── first_name
├── last_name
├── phone
├── bio
├── created_at (INDEX)
├── updated_at

Account (FK CustomUser)
├── id (PK)
├── user_id (FK, INDEX)
├── name
├── account_type (CHOICES)
├── balance
├── is_active
├── description
├── created_at (INDEX)
├── updated_at

Category (FK CustomUser)
├── id (PK)
├── user_id (FK, INDEX)
├── name
├── category_type (CHOICES)
├── color
├── is_default
├── description
├── created_at
├── updated_at
├── UNIQUE(user_id, name, category_type)

Transaction (FK CustomUser, Account, Category)
├── id (PK)
├── user_id (FK, INDEX)
├── account_id (FK, INDEX)
├── category_id (FK, PROTECT)
├── description
├── amount (DECIMAL)
├── transaction_type (CHOICES)
├── transaction_date (INDEX)
├── notes
├── created_at (INDEX)
├── updated_at
```

## 🔑 Índices Recomendados

```sql
-- User queries
CREATE INDEX idx_user_email ON auth_user(email);
CREATE INDEX idx_user_active ON auth_user(is_active);

-- Account queries
CREATE INDEX idx_account_user ON accounts_account(user_id);
CREATE INDEX idx_account_created ON accounts_account(created_at);

-- Category queries
CREATE INDEX idx_category_user ON categories_category(user_id);
CREATE INDEX idx_category_type ON categories_category(category_type);

-- Transaction queries (CRITICAL)
CREATE INDEX idx_transaction_user ON transactions_transaction(user_id);
CREATE INDEX idx_transaction_account ON transactions_transaction(account_id);
CREATE INDEX idx_transaction_date ON transactions_transaction(transaction_date);
CREATE INDEX idx_transaction_created ON transactions_transaction(created_at);

-- Composite indexes para filtros comuns
CREATE INDEX idx_transaction_user_date ON transactions_transaction(user_id, transaction_date);
CREATE INDEX idx_account_user_type ON accounts_account(user_id, account_type);
```

## 🚀 Query Patterns

### Good Patterns
```python
# ✓ Bom: Select related para evitar queries extras
transactions = Transaction.objects.select_related(
    'user', 'account', 'category'
).filter(user=user)

# ✓ Bom: Only para campos específicos
accounts = Account.objects.filter(
    user=user
).only('id', 'name', 'balance')

# ✓ Bom: Aggregation para cálculos
from django.db.models import Sum
total = Transaction.objects.filter(
    user=user,
    transaction_type='income'
).aggregate(total=Sum('amount'))['total'] or 0

# ✓ Bom: Exists para verificação
has_transactions = Transaction.objects.filter(
    account=account
).exists()
```

### Bad Patterns
```python
# ✗ Ruim: N+1 query problem
for account in Account.objects.filter(user=user):
    print(account.user.email)  # Query por conta!

# ✗ Ruim: Carregar desnecessariamente
accounts = Account.objects.all()  # Sem user filter!

# ✗ Ruim: Count desnecessário
count = len(Account.objects.filter(user=user))  # Melhor: .count()

# ✗ Ruim: Loop com save
for transaction in transactions:
    transaction.amount += 10
    transaction.save()  # Query por item!
```

## 💾 Migration Patterns

### Adicionar Campo
```python
# 1. Model changes
class Account(models.Model):
    # ... existing fields ...
    description = models.TextField(blank=True)  # NEW

# 2. Create migration
python manage.py makemigrations accounts

# 3. Check migration
python manage.py showmigrations

# 4. Apply migration
python manage.py migrate
```

### Renomear Campo
```python
python manage.py makemigrations accounts --name rename_field
# Editar migration manualmente:
migrations.RenameField(
    model_name='account',
    old_name='old_name',
    new_name='new_name',
)
```

### Adicionar Índice
```python
class Meta:
    indexes = [
        models.Index(fields=['user', '-created_at']),
    ]
```

## 🔐 Transações Atômicas

```python
from django.db import transaction

@transaction.atomic
def transfer_balance(from_account, to_account, amount):
    '''Transferência atômica entre contas.'''
    from_account.balance -= amount
    from_account.save()

    to_account.balance += amount
    to_account.save()
```

## 🔍 Query Analysis

### Find N+1 Problems
```python
from django.test.utils import override_settings
from django.db import connection, reset_queries

@override_settings(DEBUG=True)
def check_queries():
    reset_queries()

    # Seu código aqui
    accounts = Account.objects.filter(user=user)
    for account in accounts:
        print(account.user.email)  # Mostra N+1

    print(f"Queries: {len(connection.queries)}")
    for query in connection.queries:
        print(query['sql'])
```

### Slow Query Log
```python
# settings.py
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {'class': 'logging.StreamHandler'},
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
```

## 🗄️ Database Setup

### SQLite (Development)
```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### PostgreSQL (Production)
```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default='postgresql://user:password@localhost:5432/finanpy',
        conn_max_age=600,
    )
}
```

## 📋 Checklist para Migrations

- [ ] Backup do banco feito
- [ ] Migration criada com `makemigrations`
- [ ] Migration revisada e testada
- [ ] Reversível (pode fazer rollback)
- [ ] Sem dados perdidos
- [ ] Índices adicionados se necessário
- [ ] Performance testada
- [ ] Documentação atualizada

## ⚡ Performance Checklist

- [ ] Índices em campos filtrados
- [ ] select_related() para FK
- [ ] prefetch_related() para reverse
- [ ] only() para campos específicos
- [ ] Pagination para listas grandes
- [ ] Caching de querysets frequentes
- [ ] Sem N+1 queries
- [ ] Transações atômicas para dados críticos

## 🚀 Comandos Principais

```bash
# Migrations
python manage.py makemigrations
python manage.py showmigrations
python manage.py migrate
python manage.py migrate app_name 0003  # Reverter para specific
python manage.py migrate app_name zero  # Reverter app completamente

# Database shell
python manage.py dbshell

# Django shell com ORM
python manage.py shell

# SQL raw
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute("SELECT * FROM accounts_account")
    results = cursor.fetchall()
```

## 🔗 Integração com Outros Agentes

- **Backend Django Agent** - Implementa models
- **QA/Tester Agent** - Testa integridade de dados
- **DevOps Agent** - Setup de backup e replication

## 🎓 Best Practices

1. **Sempre Testar Migrations** - Testar em dev antes de prod
2. **Índices Estratégicos** - Não indexar tudo, indexar o que importa
3. **Normalização** - Evitar redundância de dados
4. **Constraints** - Validações no banco, não só na app
5. **Backup Regular** - Antes de mudanças maiores
6. **Monitoring** - Acompanhar performance
7. **Documentation** - Documentar schema changes

## 📝 Padrão de Commits

```
fix(migrations): adicionar índice em transaction_date
refactor(schema): normalizar categoria relationship
perf(queries): otimizar listagem de transações com select_related
```

---

**Versão**: 1.0
**Última atualização**: 25 de Outubro de 2025
**MCP Servers**: context7 (write migrations)

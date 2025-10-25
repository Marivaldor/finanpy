# Estrutura do Projeto

Visão geral da organização e estrutura do projeto Finanpy.

## Arquitetura Geral

O Finanpy segue a arquitetura padrão do Django com separação em apps especializados:

```
finanpy/
├── core/                 # Configurações centralizadas
├── users/                # Autenticação e usuários
├── profiles/             # Perfil do usuário
├── accounts/             # Contas bancárias
├── categories/           # Categorias de transações
├── transactions/         # Transações financeiras
├── docs/                 # Documentação
└── manage.py
```

## Descrição dos Apps

### `core/`

Configurações centralizadas do Django.

```
core/
├── settings.py           # Configurações gerais (DEBUG, SECRET_KEY, INSTALLED_APPS, etc)
├── urls.py              # URLs principais do projeto
├── wsgi.py              # Configuração WSGI para produção
└── asgi.py              # Configuração ASGI (futuro)
```

**Principais configurações**:
- `INSTALLED_APPS`: Lista de apps Django instalados
- `DATABASES`: Configuração do banco de dados (SQLite)
- `LANGUAGE_CODE`: Idioma (português brasileiro)
- `TIME_ZONE`: Fuso horário

### `users/`

Gerenciamento de usuários customizados com autenticação via email.

```
users/
├── models.py            # CustomUser (herda de AbstractUser)
├── admin.py             # Configuração admin para usuários
├── views.py             # Views de autenticação
├── tests.py             # Testes unitários
├── migrations/          # Histórico de mudanças no banco
├── apps.py              # Configuração da app
└── __init__.py
```

**Modelo principal**: `CustomUser`
- Autenticação via email (não username)
- Senha com hash seguro (PBKDF2)
- Campos: email, password, is_active, date_joined, last_login

### `profiles/`

Perfil estendido do usuário com informações adicionais.

```
profiles/
├── models.py            # Profile (OneToOneField com User)
├── admin.py             # Configuração admin
├── views.py             # Views de perfil
├── signals.py           # Signals para criar Profile automaticamente
├── tests.py             # Testes unitários
├── migrations/          # Histórico de mudanças
├── apps.py              # Configuração da app
└── __init__.py
```

**Modelo principal**: `Profile`
- OneToOneField com CustomUser (auto-criado via signal)
- Campos: first_name, last_name, phone, bio, created_at, updated_at

### `accounts/`

Gerenciamento de contas bancárias.

```
accounts/
├── models.py            # Account (ForeignKey com User)
├── admin.py             # Configuração admin
├── views.py             # CRUD de contas
├── tests.py             # Testes unitários
├── migrations/          # Histórico de mudanças
├── apps.py              # Configuração da app
└── __init__.py
```

**Modelo principal**: `Account`
- ForeignKey com CustomUser
- Tipos: corrente, poupança, investimento, carteira
- Campos: name, account_type, balance, description, is_active, created_at, updated_at

### `categories/`

Gerenciamento de categorias de transações.

```
categories/
├── models.py            # Category (ForeignKey com User)
├── admin.py             # Configuração admin
├── views.py             # CRUD de categorias
├── tests.py             # Testes unitários
├── migrations/          # Histórico de mudanças
├── apps.py              # Configuração da app
└── __init__.py
```

**Modelo principal**: `Category`
- ForeignKey com CustomUser
- Tipos: receita, despesa
- Campos: name, category_type, color, description, is_default, created_at, updated_at

### `transactions/`

Gerenciamento de transações financeiras.

```
transactions/
├── models.py            # Transaction (ForeignKeys com User, Account, Category)
├── admin.py             # Configuração admin
├── views.py             # CRUD de transações
├── tests.py             # Testes unitários
├── migrations/          # Histórico de mudanças
├── apps.py              # Configuração da app
└── __init__.py
```

**Modelo principal**: `Transaction`
- ForeignKeys com: CustomUser, Account, Category
- Tipos: receita, despesa
- Campos: description, amount, transaction_type, transaction_date, notes, created_at, updated_at
- Atualiza automaticamente o balance da Account

## Fluxo de Dependências

```
users (CustomUser)
  ↓
profiles (Profile → CustomUser)
  ↓
├─→ accounts (Account → CustomUser)
│     ↓
│     transactions (Transaction → Account, Category)
│
└─→ categories (Category → CustomUser)
      ↓
      transactions (Transaction → Category)
```

## Convenções de Arquivos

### Models (`models.py`)

- Uma classe Model por conceito principal
- Herança de `models.Model`
- Campos obrigatórios: `created_at`, `updated_at`
- Método `__str__` obrigatório
- Meta class com `verbose_name`, `ordering`, etc

### Views (`views.py`)

- Podem ser Function-Based Views (FBV) ou Class-Based Views (CBV)
- Decorator `@login_required` para views protegidas
- Redirect após salvar dados
- Context claros e descritivos

### Templates

- Localizados em `app_name/templates/app_name/`
- Nomenclatura: `modelo_acao.html` (ex: `account_list.html`, `account_form.html`)
- Herança de `base.html`

### Tests (`tests.py`)

- Testes de modelos, views e formulários
- Nomenclatura: `TestNomeModelo`
- Cobertura mínima: 80%

## Ciclo de Vida de Dados

### Quando um usuário se cadastra:

1. **CustomUser** é criado no app `users`
2. **Profile** é criado automaticamente via signal no app `profiles`
3. **Categories** padrão são criadas no app `categories`
4. Usuário é redirecionado para dashboard

### Quando uma transação é criada:

1. Dados são validados e salvos em **Transaction**
2. Signal `post_save` atualiza o **balance** da **Account**
3. Transação aparece nas listagens com filtros

---

## Próximos Passos

- Leia [Padrões de Código](./03-padroes-codigo.md) para entender as convenções
- Consulte [Models](./04-models.md) para detalhes sobre os models
- Veja [Views e URLs](./05-views-urls.md) para estrutura de views

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

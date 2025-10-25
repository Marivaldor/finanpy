# Templates Django

Guia de padrões e convenções para templates DTL (Django Template Language).

## Estrutura de Diretórios

```
app_name/
└── templates/
    └── app_name/
        ├── model_list.html
        ├── model_detail.html
        ├── model_form.html
        ├── model_confirm_delete.html
        └── partials/
            ├── navbar.html
            ├── footer.html
            └── messages.html

core/
└── templates/
    ├── base.html
    └── public/
        ├── home.html
        ├── login.html
        └── register.html
```

## Template Base

### base.html

Template raiz que todas as outras herdam:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Finanpy{% endblock %}</title>
    {% block extra_css %}{% endblock %}
</head>
<body>
    {% include "partials/navbar.html" %}

    <main>
        {% include "partials/messages.html" %}
        {% block content %}{% endblock %}
    </main>

    {% include "partials/footer.html" %}
    {% block extra_js %}{% endblock %}
</body>
</html>
```

## Convenções de Nomes

### Arquivos

```
modelo_acao.html

Exemplos:
- account_list.html      # Listagem
- account_detail.html    # Detalhe
- account_form.html      # Criar/editar
- account_confirm_delete.html  # Confirmação
- transaction_list.html
- category_form.html
```

### Context

Use nomes consistentes no context:

```python
# Único
context = {'account': account}

# Lista
context = {'accounts': accounts}

# Paginação
context = {'page_obj': page_obj}

# Múltiplos tipos
context = {
    'accounts': accounts,
    'total_balance': 5000.00,
    'account_types': Account.ACCOUNT_TYPES,
}
```

---

## Padrões Comuns

### 1. Listagem Simples

```html
{% extends "base.html" %}

{% block title %}Contas - Finanpy{% endblock %}

{% block content %}
<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Minhas Contas</h1>
        <a href="{% url 'accounts:account_create' %}" class="btn btn-primary">
            + Nova Conta
        </a>
    </div>

    {% if accounts %}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {% for account in accounts %}
                <div class="card">
                    <h3>{{ account.name }}</h3>
                    <p class="text-gray-500">{{ account.get_account_type_display }}</p>
                    <p class="text-2xl font-bold">R$ {{ account.balance }}</p>
                    <div class="mt-4 flex gap-2">
                        <a href="{% url 'accounts:account_detail' account.pk %}" class="btn btn-sm">Ver</a>
                        <a href="{% url 'accounts:account_update' account.pk %}" class="btn btn-sm">Editar</a>
                        <a href="{% url 'accounts:account_delete' account.pk %}" class="btn btn-sm btn-danger">Deletar</a>
                    </div>
                </div>
            {% endfor %}
        </div>
    {% else %}
        <p class="text-gray-500">Nenhuma conta cadastrada.</p>
    {% endif %}
</div>
{% endblock %}
```

### 2. Detalhe

```html
{% extends "base.html" %}

{% block title %}{{ account.name }} - Finanpy{% endblock %}

{% block content %}
<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">{{ account.name }}</h1>
        <a href="{% url 'accounts:account_list' %}" class="btn btn-secondary">Voltar</a>
    </div>

    <div class="card mb-6">
        <h2 class="text-xl font-semibold mb-4">Informações</h2>
        <dl class="grid grid-cols-2 gap-4">
            <div>
                <dt class="font-semibold">Tipo</dt>
                <dd>{{ account.get_account_type_display }}</dd>
            </div>
            <div>
                <dt class="font-semibold">Saldo</dt>
                <dd class="text-2xl">R$ {{ account.balance }}</dd>
            </div>
            <div class="col-span-2">
                <dt class="font-semibold">Descrição</dt>
                <dd>{{ account.description|default:"—" }}</dd>
            </div>
        </dl>
    </div>

    <div class="flex gap-2">
        <a href="{% url 'accounts:account_update' account.pk %}" class="btn btn-primary">Editar</a>
        <a href="{% url 'accounts:account_delete' account.pk %}" class="btn btn-danger">Deletar</a>
    </div>
</div>
{% endblock %}
```

### 3. Formulário (Criar e Editar)

```html
{% extends "base.html" %}

{% block title %}{% if account %}Editar{% else %}Nova{% endif %} Conta - Finanpy{% endblock %}

{% block content %}
<div class="container mx-auto px-4 py-8 max-w-md">
    <h1 class="text-3xl font-bold mb-6">
        {% if account %}Editar Conta{% else %}Nova Conta{% endif %}
    </h1>

    <form method="post" class="card">
        {% csrf_token %}

        {% if form.non_field_errors %}
            <div class="alert alert-error mb-4">
                {{ form.non_field_errors }}
            </div>
        {% endif %}

        <div class="form-group mb-4">
            <label for="id_name" class="form-label">Nome *</label>
            <input
                type="text"
                id="id_name"
                name="name"
                value="{{ account.name|default:'' }}"
                required
                class="form-input"
                {% if form.name.errors %}aria-invalid="true"{% endif %}
            >
            {% if form.name.errors %}
                <p class="text-red-500 text-sm mt-1">{{ form.name.errors }}</p>
            {% endif %}
        </div>

        <div class="form-group mb-4">
            <label for="id_account_type" class="form-label">Tipo *</label>
            <select id="id_account_type" name="account_type" required class="form-input">
                <option value="">Selecione um tipo</option>
                {% for value, label in account_types %}
                    <option value="{{ value }}" {% if account.account_type == value %}selected{% endif %}>
                        {{ label }}
                    </option>
                {% endfor %}
            </select>
        </div>

        <div class="form-group mb-4">
            <label for="id_balance" class="form-label">Saldo Inicial</label>
            <input
                type="number"
                id="id_balance"
                name="balance"
                value="{{ account.balance|default:0 }}"
                step="0.01"
                min="0"
                class="form-input"
            >
        </div>

        <div class="form-group mb-6">
            <label for="id_description" class="form-label">Descrição</label>
            <textarea
                id="id_description"
                name="description"
                rows="4"
                class="form-input"
            >{{ account.description|default:'' }}</textarea>
        </div>

        <div class="flex gap-2">
            <button type="submit" class="btn btn-primary">
                {% if account %}Atualizar{% else %}Criar{% endif %}
            </button>
            <a href="{% url 'accounts:account_list' %}" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
</div>
{% endblock %}
```

### 4. Confirmação de Exclusão

```html
{% extends "base.html" %}

{% block title %}Confirmar Exclusão - Finanpy{% endblock %}

{% block content %}
<div class="container mx-auto px-4 py-8 max-w-md">
    <div class="card">
        <h1 class="text-2xl font-bold mb-4">Confirmar Exclusão</h1>

        <p class="mb-6">
            Tem certeza que deseja excluir a conta <strong>{{ account.name }}</strong>?
        </p>

        {% if account.transaction_set.exists %}
            <div class="alert alert-warning mb-6">
                <strong>Atenção!</strong> Esta conta possui {{ account.transaction_set.count }} transações.
                Elas também serão deletadas.
            </div>
        {% endif %}

        <form method="post" class="flex gap-2">
            {% csrf_token %}
            <button type="submit" class="btn btn-danger">Confirmar Exclusão</button>
            <a href="{% url 'accounts:account_list' %}" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
</div>
{% endblock %}
```

---

## Partials (Templates Reutilizáveis)

### partials/messages.html

```html
{% if messages %}
    <div class="container mx-auto px-4 py-4">
        {% for message in messages %}
            <div class="alert alert-{{ message.tags }} mb-4">
                {% if message.tags == 'error' %}
                    <span class="icon">❌</span>
                {% elif message.tags == 'success' %}
                    <span class="icon">✓</span>
                {% elif message.tags == 'warning' %}
                    <span class="icon">⚠</span>
                {% else %}
                    <span class="icon">ℹ</span>
                {% endif %}
                {{ message }}
            </div>
        {% endfor %}
    </div>
{% endif %}
```

### partials/navbar.html

```html
<nav class="navbar">
    <div class="container mx-auto px-4 flex justify-between items-center py-4">
        <a href="{% url 'home' %}" class="text-2xl font-bold">Finanpy</a>

        {% if user.is_authenticated %}
            <ul class="nav-menu">
                <li><a href="{% url 'dashboard' %}">Dashboard</a></li>
                <li><a href="{% url 'accounts:account_list' %}">Contas</a></li>
                <li><a href="{% url 'transactions:transaction_list' %}">Transações</a></li>
                <li><a href="{% url 'categories:category_list' %}">Categorias</a></li>
            </ul>

            <div class="user-menu">
                <span>Olá, {{ user.email }}</span>
                <form method="post" action="{% url 'logout' %}" style="display: inline;">
                    {% csrf_token %}
                    <button type="submit" class="btn btn-link">Logout</button>
                </form>
            </div>
        {% else %}
            <div class="auth-links">
                <a href="{% url 'login' %}" class="btn btn-secondary">Login</a>
                <a href="{% url 'register' %}" class="btn btn-primary">Cadastro</a>
            </div>
        {% endif %}
    </div>
</nav>
```

### partials/pagination.html

```html
{% if page_obj.has_other_pages %}
    <div class="pagination">
        <nav class="flex justify-center gap-2 mt-8">
            {% if page_obj.has_previous %}
                <a href="?page=1" class="btn btn-sm">«</a>
                <a href="?page={{ page_obj.previous_page_number }}" class="btn btn-sm">‹</a>
            {% endif %}

            {% for num in page_obj.paginator.page_range %}
                {% if page_obj.number == num %}
                    <span class="btn btn-sm btn-active">{{ num }}</span>
                {% else %}
                    <a href="?page={{ num }}" class="btn btn-sm">{{ num }}</a>
                {% endif %}
            {% endfor %}

            {% if page_obj.has_next %}
                <a href="?page={{ page_obj.next_page_number }}" class="btn btn-sm">›</a>
                <a href="?page={{ page_obj.paginator.num_pages }}" class="btn btn-sm">»</a>
            {% endif %}
        </nav>
    </div>
{% endif %}
```

---

## Filtros e Tags Úteis

### Filtros Django Nativos

```html
<!-- Maiúsculas -->
{{ account.name|upper }}

<!-- Minúsculas -->
{{ account.name|lower }}

<!-- Capitalizar -->
{{ account.name|title }}

<!-- Padrão se vazio -->
{{ account.description|default:"Sem descrição" }}

<!-- Formatação de moeda (em português) -->
{{ account.balance|floatformat:2 }}

<!-- Data formatada -->
{{ account.created_at|date:"d/m/Y H:i" }}

<!-- Truncar texto -->
{{ account.name|truncatewords:5 }}

<!-- Plural -->
{{ accounts|length }} conta{{ accounts|pluralize }}
```

### Tags Django Úteis

```html
<!-- Condicional -->
{% if account.is_active %}
    <span class="badge badge-green">Ativa</span>
{% else %}
    <span class="badge badge-red">Inativa</span>
{% endif %}

<!-- Loop -->
{% for account in accounts %}
    <p>{{ account.name }}</p>
{% empty %}
    <p>Nenhuma conta encontrada.</p>
{% endfor %}

<!-- Loop com índice -->
{% for account in accounts %}
    <p>#{{ forloop.counter }} - {{ account.name }}</p>
{% endfor %}

<!-- Include de template -->
{% include "partials/navbar.html" %}

<!-- Include com contexto -->
{% include "partials/account_card.html" with account=account %}

<!-- Comentário -->
{% comment %}
    Este é um comentário que não será renderizado
{% endcomment %}

<!-- URL reversa -->
<a href="{% url 'accounts:account_detail' account.pk %}">Ver</a>

<!-- Static files -->
<link rel="stylesheet" href="{% static 'css/style.css' %}">
```

---

## Boas Práticas

### 1. Use Nomes Descritivos

```html
<!-- Correto ✓ -->
{% for account in user_accounts %}
    {{ account.name }}
{% endfor %}

<!-- Evitar ✗ -->
{% for a in ua %}
    {{ a.name }}
{% endfor %}
```

### 2. Sempre Use `{% csrf_token %}`

```html
<form method="post">
    {% csrf_token %}
    <!-- campos -->
</form>
```

### 3. Trate Dados Vazios

```html
{% if accounts %}
    {% for account in accounts %}
        {{ account.name }}
    {% empty %}
        <p>Nenhuma conta encontrada.</p>
    {% endfor %}
{% endif %}
```

### 4. URLs Dinâmicas (Não Hardcoded)

```html
<!-- Correto ✓ -->
<a href="{% url 'accounts:account_detail' account.pk %}">Ver</a>

<!-- Evitar ✗ -->
<a href="/accounts/{{ account.pk }}/">Ver</a>
```

### 5. Escapamento Automático (XSS Protection)

```html
<!-- Automático (seguro) -->
<p>{{ user.email }}</p>

<!-- Desabilitar se necessário (cuidado!) -->
<p>{{ html_content|safe }}</p>
```

---

## Exemplo Completo: Listagem com Paginação e Filtros

```html
{% extends "base.html" %}

{% block title %}Transações - Finanpy{% endblock %}

{% block content %}
<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Transações</h1>
        <a href="{% url 'transactions:transaction_create' %}" class="btn btn-primary">
            + Nova Transação
        </a>
    </div>

    <!-- Filtros -->
    <div class="card mb-6">
        <form method="get" class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <label class="form-label">Período</label>
                <select name="period" class="form-input">
                    <option value="month" {% if period == 'month' %}selected{% endif %}>Este Mês</option>
                    <option value="week" {% if period == 'week' %}selected{% endif %}>Esta Semana</option>
                    <option value="year" {% if period == 'year' %}selected{% endif %}>Este Ano</option>
                </select>
            </div>
            <div>
                <label class="form-label">Busca</label>
                <input
                    type="text"
                    name="q"
                    class="form-input"
                    placeholder="Descrição..."
                    value="{{ search }}"
                >
            </div>
            <div>
                <label class="form-label">Tipo</label>
                <select name="type" class="form-input">
                    <option value="">Todos</option>
                    <option value="income" {% if type == 'income' %}selected{% endif %}>Receita</option>
                    <option value="expense" {% if type == 'expense' %}selected{% endif %}>Despesa</option>
                </select>
            </div>
            <div class="flex items-end">
                <button type="submit" class="btn btn-primary w-full">Filtrar</button>
            </div>
        </form>
    </div>

    <!-- Listagem -->
    {% if page_obj %}
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b">
                        <th class="text-left py-2">Data</th>
                        <th class="text-left py-2">Descrição</th>
                        <th class="text-left py-2">Categoria</th>
                        <th class="text-right py-2">Valor</th>
                        <th class="py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {% for transaction in page_obj %}
                        <tr class="border-b hover:bg-gray-50">
                            <td class="py-3">
                                {{ transaction.transaction_date|date:"d/m/Y" }}
                            </td>
                            <td class="py-3">
                                {{ transaction.description }}
                            </td>
                            <td class="py-3">
                                <span class="badge" style="background-color: {{ transaction.category.color }};">
                                    {{ transaction.category.name }}
                                </span>
                            </td>
                            <td class="py-3 text-right font-semibold">
                                {% if transaction.transaction_type == 'income' %}
                                    <span class="text-green-600">+ R$ {{ transaction.amount }}</span>
                                {% else %}
                                    <span class="text-red-600">- R$ {{ transaction.amount }}</span>
                                {% endif %}
                            </td>
                            <td class="py-3 text-center">
                                <a href="{% url 'transactions:transaction_update' transaction.pk %}" class="btn btn-sm">Editar</a>
                                <a href="{% url 'transactions:transaction_delete' transaction.pk %}" class="btn btn-sm btn-danger">Deletar</a>
                            </td>
                        </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>

        <!-- Paginação -->
        {% include "partials/pagination.html" %}
    {% else %}
        <p class="text-gray-500">Nenhuma transação encontrada.</p>
    {% endif %}
</div>
{% endblock %}
```

---

## Próximos Passos

- Consulte [Design System](./08-design-system.md) para componentes e estilos
- Veja [Views e URLs](./05-views-urls.md) para entender o contexto das views
- Leia [Padrões de Código](./03-padroes-codigo.md) para boas práticas

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

# Frontend DTL Agent

Especialista em Django Templates (DTL) e estrutura HTML para Finanpy.

## 🎯 Propósito

Implementar interfaces HTML usando Django Template Language, integrando dados do backend com apresentação clara e acessível.

## 🛠️ Stack Tecnológico

- **Django Template Language (DTL)**
- **HTML5**
- **Django Forms**
- **Django Messages Framework**
- **CSRF Protection**
- **Template Inheritance**

## 📚 Documentação de Referência

**Essencial:**
- `docs/07-templates-django.md` - Padrões DTL detalhados
- `docs/05-views-urls.md` - Context das views
- `docs/04-models.md` - Dados disponíveis
- `docs/08-design-system.md` - Componentes para usar

**Complementar:**
- Django Template Documentation
- Django Forms Documentation

## 🔧 Responsabilidades

### 1. Template Structure
- ✓ Hierarquia correta (base.html, app templates)
- ✓ Herança de templates (extends)
- ✓ Blocos customizáveis (block)
- ✓ Partials reutilizáveis (include)
- ✓ Organização de diretórios

### 2. Template Tags & Filters
- ✓ Lógica com if/else/elif
- ✓ Loops com for/empty
- ✓ Filtros (upper, lower, date, etc)
- ✓ URLs dinâmicas ({% url %})
- ✓ Static files ({% static %})
- ✓ CSRF tokens ({% csrf_token %})
- ✓ Template comments

### 3. Forms Rendering
- ✓ Form fields
- ✓ Validação messages
- ✓ Error handling
- ✓ Input types (text, email, password)
- ✓ Selects, checkboxes, radios
- ✓ Textareas
- ✓ Datepickers

### 4. Context Data
- ✓ Passar dados corretos do backend
- ✓ Nomes descritivos
- ✓ Dados validados antes de render
- ✓ Dicionários estruturados

### 5. Acessibilidade
- ✓ Labels associados a inputs
- ✓ Semantic HTML (nav, main, section)
- ✓ ARIA labels onde necessário
- ✓ Contrast de cores
- ✓ Keyboard navigation

### 6. Performance
- ✓ Minimizar queries no template
- ✓ Cache de templates
- ✓ Lazy loading de imagens
- ✓ Minificação de HTML

## 📁 Estrutura de Templates

```
templates/
├── base.html                     # Template raiz
├── partials/
│   ├── navbar.html              # Menu superior
│   ├── footer.html              # Rodapé
│   ├── messages.html            # Mensagens de feedback
│   ├── pagination.html          # Paginação
│   └── sidebar.html             # Menu lateral
├── public/
│   ├── home.html                # Landing page
│   ├── login.html               # Formulário de login
│   └── register.html            # Formulário de cadastro
├── accounts/
│   ├── account_list.html        # Listagem de contas
│   ├── account_detail.html      # Detalhes da conta
│   ├── account_form.html        # Criar/editar conta
│   └── account_confirm_delete.html
├── categories/
│   ├── category_list.html       # Listagem de categorias
│   ├── category_form.html       # Criar/editar categoria
│   └── category_confirm_delete.html
├── transactions/
│   ├── transaction_list.html    # Listagem de transações
│   ├── transaction_form.html    # Criar/editar transação
│   └── transaction_confirm_delete.html
├── profiles/
│   ├── profile_detail.html      # Perfil do usuário
│   └── profile_form.html        # Editar perfil
└── dashboard/
    └── dashboard.html            # Dashboard principal
```

## 🎨 Padrões DTL

### Base Template
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Finanpy{% endblock %}</title>
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
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

### Child Template
```html
{% extends "base.html" %}

{% block title %}Minhas Contas - Finanpy{% endblock %}

{% block content %}
<div class="container">
    <h1>Minhas Contas</h1>

    {% if accounts %}
        {% for account in accounts %}
            <div class="card">
                <h3>{{ account.name }}</h3>
                <p>{{ account.get_account_type_display }}</p>
                <p>Saldo: R$ {{ account.balance }}</p>
            </div>
        {% empty %}
            <p>Nenhuma conta encontrada.</p>
        {% endfor %}
    {% else %}
        <p>Você não tem contas cadastradas.</p>
    {% endif %}
</div>
{% endblock %}
```

### Template Tags Comuns
```html
{# Condicional #}
{% if user.is_authenticated %}
    <p>Bem-vindo, {{ user.email }}</p>
{% else %}
    <p>Por favor, faça login.</p>
{% endif %}

{# Loop #}
{% for account in accounts %}
    <p>{{ forloop.counter }}: {{ account.name }}</p>
{% empty %}
    <p>Nenhuma conta.</p>
{% endfor %}

{# Filtros #}
{{ account.name|upper }}
{{ transaction.amount|floatformat:2 }}
{{ transaction.created_at|date:"d/m/Y H:i" }}

{# URL dinâmica #}
<a href="{% url 'accounts:account_detail' account.pk %}">Ver</a>

{# Static files #}
<img src="{% static 'images/logo.png' %}" alt="Finanpy">

{# CSRF token (OBRIGATÓRIO em formulários) #}
<form method="post">
    {% csrf_token %}
    <!-- campos do form -->
</form>
```

## 📝 Forms Rendering

### Form Completo
```html
{% extends "base.html" %}

{% block content %}
<div class="container max-w-md">
    <h1>{% if form.instance.pk %}Editar{% else %}Criar{% endif %} Conta</h1>

    <form method="post">
        {% csrf_token %}

        {% if form.non_field_errors %}
            <div class="alert alert-error">
                {{ form.non_field_errors }}
            </div>
        {% endif %}

        {% for field in form %}
            <div class="form-group">
                <label for="{{ field.id_for_label }}" class="form-label">
                    {{ field.label }} {% if field.field.required %}*{% endif %}
                </label>
                {{ field }}
                {% if field.errors %}
                    <p class="form-error">{{ field.errors }}</p>
                {% endif %}
                {% if field.help_text %}
                    <p class="form-help">{{ field.help_text|safe }}</p>
                {% endif %}
            </div>
        {% endfor %}

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <a href="{% url 'accounts:account_list' %}" class="btn btn-secondary">
                Cancelar
            </a>
        </div>
    </form>
</div>
{% endblock %}
```

### Form Field Individual
```html
<div class="form-group">
    <label for="id_name" class="form-label">Nome *</label>
    <input
        type="text"
        id="id_name"
        name="name"
        value="{{ form.instance.name|default:'' }}"
        required
        class="form-input"
    >
    {% if form.name.errors %}
        <p class="form-error">{{ form.name.errors }}</p>
    {% endif %}
</div>
```

## 💬 Mensagens de Feedback

```html
{# partials/messages.html #}
{% if messages %}
    <div class="messages-container">
        {% for message in messages %}
            <div class="alert alert-{{ message.tags }}">
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

## 🔗 Links Dinâmicos

```html
{# SEMPRE usar {% url %}, nunca hardcoded #}

{# URL sem argumentos #}
<a href="{% url 'accounts:account_list' %}">Minhas Contas</a>

{# URL com id #}
<a href="{% url 'accounts:account_detail' account.pk %}">
    {{ account.name }}
</a>

{# URL com múltiplos argumentos (futuro) #}
<a href="{% url 'transactions:transaction_detail' account.pk transaction.pk %}">
    Ver Transação
</a>

{# URL com query string #}
<a href="{% url 'accounts:account_list' %}?sort=name">
    Ordenar por Nome
</a>
```

## 🎯 Nomes de Templates

Padrão: `app_name/model_action.html`

```
Listagem:       account_list.html
Detalhe:        account_detail.html
Criar/Editar:   account_form.html
Confirmação:    account_confirm_delete.html
```

## 📋 Checklist para Template

- [ ] Herda de base.html (ou template parent apropriado)
- [ ] Block title definido
- [ ] CSRF token em formulários POST
- [ ] Links dinâmicos ({% url %})
- [ ] Mensagens de feedback ({% include "partials/messages.html" %})
- [ ] Tratamento de lista vazia ({% empty %})
- [ ] Labels em formulários
- [ ] Validação de erros exibida
- [ ] Acessibilidade (semantic HTML, alt text)
- [ ] Responsividade (classes Tailwind)
- [ ] Comments em seções complexas

## 🔐 Security Checklist

- [ ] {% csrf_token %} em todos os forms
- [ ] Escapamento automático de dados (seguro por padrão)
- [ ] XSS prevention (nunca usar |safe sem revisar)
- [ ] SQL injection prevention (Django ORM)
- [ ] User data validation (backend)

## 🚀 Comandos Principais

```bash
# Rodar servidor (templates são hot-reload)
python manage.py runserver

# Compilar templates (produção)
python manage.py compilemessages

# Collectstatic (produção)
python manage.py collectstatic
```

## 🎓 Boas Práticas

1. **DRY (Don't Repeat Yourself)** - Use includes/extends
2. **Semantic HTML** - `<nav>`, `<main>`, `<section>`, `<article>`
3. **Labels em Inputs** - Sempre asociado (for/id)
4. **Mensagens Claras** - Feedback para usuário
5. **Pagination** - Para listas grandes
6. **Loading States** - Feedback visual
7. **Error Messages** - Específicas e acionáveis
8. **Comments** - HTML complexo precisa explicação

## 🔗 Integração com Outros Agentes

- **Backend Django Agent** - Fornece dados no context
- **Frontend Tailwind Agent** - Estiliza componentes
- **QA/Tester Agent** - Testa renderização e UX

## 📝 Padrão de Commits

```
feat(templates): criar template de listagem de contas
refactor(templates): extrair navbar para partial
fix(forms): corrigir validação de email no formulário
```

## 🆘 Troubleshooting

### Template Not Found
- Verificar pasta `templates/` existe
- Verificar `TEMPLATES['APP_DIRS'] = True` em settings
- Verificar nome exato do arquivo

### CSRF Token Missing
- Sempre adicionar `{% csrf_token %}` em forms POST
- Nunca desabilitar CSRF protection

### Context Not Rendering
- Verificar dados no backend context
- Verificar sintaxe da variável ({{ var }})
- Verificar se view está passando context

---

**Versão**: 1.0
**Última atualização**: 25 de Outubro de 2025
**MCP Servers**: context7 (write templates)

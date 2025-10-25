# Quick Reference - Finanpy

Referência rápida para desenvolvedores do Finanpy. Consulte documentação completa em [README.md](./README.md).

## Setup Rápido

```bash
# Clonar e entrar no projeto
git clone <URL> && cd finanpy

# Ambiente virtual
python -m venv venv && source venv/bin/activate

# Dependências e banco
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser

# Rodar
python manage.py runserver
```

## Estrutura Rápida

```
users/          → Autenticação (CustomUser via email)
profiles/       → Perfil estendido do usuário
accounts/       → Contas bancárias
categories/     → Categorias de transações
transactions/   → Transações (receitas/despesas)
core/           → Configurações do Django
docs/           → Documentação (você está aqui!)
```

## Padrões Rápidos

### Model
```python
class MyModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Nome'
        ordering = ['-created_at']

    def __str__(self):
        return self.name
```

### View
```python
@login_required
def my_view(request, pk):
    obj = get_object_or_404(MyModel, pk=pk, user=request.user)
    if request.method == 'POST':
        messages.success(request, 'Sucesso!')
        return redirect('app:name')
    return render(request, 'app/template.html', {'obj': obj})
```

### URL
```python
urlpatterns = [
    path('', views.list_view, name='list'),
    path('<int:pk>/', views.detail_view, name='detail'),
    path('create/', views.create_view, name='create'),
]
```

### Template
```html
{% extends "base.html" %}
{% block title %}Título{% endblock %}
{% block content %}
    {% if objects %}
        {% for obj in objects %}
            <p>{{ obj.name }}</p>
        {% endfor %}
    {% else %}
        <p>Nenhum encontrado.</p>
    {% endif %}
{% endblock %}
```

## Comandos Essenciais

```bash
# Desenvolvimento
python manage.py runserver          # Rodar servidor
python manage.py migrate            # Aplicar migrações
python manage.py makemigrations     # Criar migrações
python manage.py shell              # Shell Python

# Testes
python manage.py test               # Rodar testes
python manage.py test app.tests     # Testes específicos

# Admin
python manage.py createsuperuser    # Criar admin
http://localhost:8000/admin/        # Acessar admin

# Verificação
python manage.py check              # Verificar integridade
flake8 .                            # Verificar PEP 8
```

## Padrões de Commit

```bash
feat(app): adicionar funcionalidade
fix(app): corrigir bug
docs(app): atualizar documentação
refactor(app): refatorar código
test(app): adicionar testes
```

## Git Workflow

```bash
# Feature
git checkout -b feature/nome
# ... fazer commits ...
git push origin feature/nome
# Abrir PR em GitHub

# Sync
git fetch origin
git rebase origin/develop
```

## Checklist Pré-Commit

- [ ] `python manage.py test` passa
- [ ] `python manage.py check` sem erros
- [ ] `flake8 .` sem problemas
- [ ] Commit message descritiva
- [ ] Sem conflitos com develop

## Componentes Tailwind

```html
<!-- Botão Primário -->
<button class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all">
    Botão
</button>

<!-- Card -->
<div class="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
    Conteúdo
</div>

<!-- Alert -->
<div class="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
    Mensagem
</div>

<!-- Input -->
<input type="text" class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:ring-2 focus:ring-indigo-500">
```

## Models

| Model | Tipo | Descrição |
|-------|------|-----------|
| **CustomUser** | users | Autenticação via email |
| **Profile** | profiles | Dados adicionais do usuário |
| **Account** | accounts | Contas bancárias |
| **Category** | categories | Categorias de transações |
| **Transaction** | transactions | Receitas e despesas |

## URLs Principais

```
/admin/                 → Interface administrativa
/accounts/              → Gestão de contas
/categories/            → Gestão de categorias
/transactions/          → Gestão de transações
```

## Contextos Comuns

```python
context = {
    'object': object,           # Único objeto
    'objects': queryset,        # Lista de objetos
    'page_obj': page_obj,       # Paginação
    'form': form,               # Formulário
    'messages': messages,       # Mensagens
}
```

## Filtros Django

```html
{{ obj.name|upper }}              → MAIÚSCULAS
{{ obj.name|lower }}              → minúsculas
{{ obj.date|date:"d/m/Y" }}       → 25/10/2025
{{ obj.amount|floatformat:2 }}    → 1000.00
{{ list|length }}                 → Número de items
{{ text|truncatewords:5 }}        → Truncar texto
{{ obj.description|default:"—" }} → Valor padrão
```

## Relacionamentos

```
CustomUser (One)
├─ Profile (One)
├─ Account (Many) → Balance é atualizado automaticamente
│  └─ Transaction (Many)
└─ Category (Many) → Não pode ser deletada com transações
   └─ Transaction (Many)
```

## Dicas

1. **Sempre** use `user=request.user` para filtrar objetos
2. **Sempre** use `@login_required` em views protegidas
3. **Sempre** adicione `created_at` e `updated_at` em models
4. **Sempre** use nomes descritivos e em inglês no código
5. **Sempre** herde templates de `base.html`
6. **Sempre** use URLs dinâmicas: `{% url 'app:name' %}`
7. **Sempre** use `get_object_or_404()` ao invés de `.get()`

## Recursos

- [Documentação Completa](./README.md)
- [Setup e Ambiente](./01-setup-ambiente.md)
- [Padrões de Código](./03-padroes-codigo.md)
- [PRD.md](../PRD.md) - Requisitos do projeto
- [Django Docs](https://docs.djangoproject.com/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

---

**Última atualização**: 25 de Outubro de 2025

Veja [README.md](./README.md) para documentação completa.

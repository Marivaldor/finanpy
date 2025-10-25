# Guia de Contribuição

Bem-vindo ao Finanpy! Este guia ajudará você a começar a contribuir com o projeto.

## Índice

1. [Setup Inicial](#setup-inicial)
2. [Antes de Começar](#antes-de-começar)
3. [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
4. [Boas Práticas](#boas-práticas)
5. [Submeter Changes](#submeter-changes)

---

## Setup Inicial

### 1. Clonar Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd finanpy
```

### 2. Setup do Ambiente

Siga [Setup e Ambiente](./01-setup-ambiente.md):

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3. Explorar Documentação

- Leia [Estrutura do Projeto](./02-estrutura-projeto.md)
- Revise [Padrões de Código](./03-padroes-codigo.md)
- Consulte [Models](./04-models.md)

---

## Antes de Começar

### Familiaridade Necessária

- Python 3.13+
- Django 5+
- HTML/CSS (TailwindCSS)
- Git/GitHub
- SQL básico

### Recursos Úteis

- [Django Documentation](https://docs.djangoproject.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [PRD.md](../PRD.md) - Requisitos do projeto

### Comunique-se

Antes de começar uma feature grande:

1. Abra uma Issue descrevendo sua ideia
2. Espere feedback da equipe
3. Inicie desenvolvimento apenas após aprovação

---

## Fluxo de Desenvolvimento

### 1. Criar Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nome-descritivo
```

Nomenclatura:
- `feature/autenticacao-email` - Nova funcionalidade
- `bugfix/calculo-saldo` - Correção de bug
- `docs/setup-instrucoes` - Documentação

### 2. Desenvolver

#### A. Fazer Mudanças

Edite os arquivos necessários:

```
accounts/models.py
accounts/views.py
accounts/admin.py
accounts/tests.py
templates/accounts/account_list.html
```

#### B. Testar Localmente

```bash
# Rodar servidor
python manage.py runserver

# Rodar testes
python manage.py test

# Verificar código
flake8 .

# Checar integridade
python manage.py check
```

#### C. Criar Migrações (se necessário)

```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Fazer Commits

Use o padrão de commit:

```bash
git add arquivo.py
git commit -m "feat(accounts): adicionar novo campo na conta"
```

Guia de commits em [Git e Versionamento](./10-git-versionamento.md).

### 4. Sincronizar com Develop

```bash
git fetch origin
git rebase origin/develop
```

Se houver conflitos:

```bash
# Resolver conflitos nos arquivos
git add arquivo-resolvido.py
git rebase --continue
```

### 5. Push para Remoto

```bash
git push origin feature/nome-descritivo
```

---

## Boas Práticas

### Código

- Siga [Padrões de Código](./03-padroes-codigo.md)
- Use nomes descritivos e em inglês
- Máximo 79 caracteres por linha
- Indente com 4 espaços
- Aspas simples em strings

```python
# ✓ Correto
account = Account.objects.filter(
    user=user,
    is_active=True
).first()

# ✗ Evitar
account = Account.objects.filter(user=user, is_active=True).first()
```

### Models

- Sempre inclua `created_at` e `updated_at`
- Implemente `__str__()`
- Use `Meta` class com `verbose_name`, `ordering`
- Adicione docstrings em models complexos

```python
class Account(models.Model):
    '''Bank account model.'''
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Conta'
        ordering = ['-created_at']

    def __str__(self):
        return self.name
```

### Views

- Use `@login_required` para views protegidas
- Sempre valide que objeto pertence ao usuário
- Use mensagens de feedback (`messages` module)
- Redirecione após POST bem-sucedido

```python
@login_required
def account_delete(request, pk):
    account = get_object_or_404(Account, pk=pk, user=request.user)

    if request.method == 'POST':
        account.delete()
        messages.success(request, 'Conta deletada com sucesso!')
        return redirect('accounts:account_list')

    return render(request, 'accounts/account_confirm_delete.html',
                  {'account': account})
```

### Templates

- Herde de `base.html`
- Use nomes descritivos no contexto
- Sempre use `{% csrf_token %}` em formulários
- Use URLs dinâmicas: `{% url 'name' %}`

```html
{% extends "base.html" %}

{% block title %}Contas - Finanpy{% endblock %}

{% block content %}
<div class="container mx-auto px-4 py-8">
    <h1>Minhas Contas</h1>

    {% if accounts %}
        {% for account in accounts %}
            <p>{{ account.name }}</p>
        {% endfor %}
    {% else %}
        <p>Nenhuma conta cadastrada.</p>
    {% endif %}
</div>
{% endblock %}
```

### Testes

Escreva testes para suas mudanças:

```python
from django.test import TestCase
from .models import Account

class AccountTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='pass123'
        )

    def test_create_account(self):
        account = Account.objects.create(
            user=self.user,
            name='Test Account'
        )
        self.assertEqual(account.name, 'Test Account')
```

---

## Submeter Changes

### 1. Preparar para PR

Certifique-se que:

- [ ] Código está testado localmente
- [ ] Testes passam: `python manage.py test`
- [ ] Sem erros de linting: `flake8 .`
- [ ] Projeto verifica OK: `python manage.py check`
- [ ] Commit messages são descritivas
- [ ] Sem conflitos com `develop`
- [ ] Documentação atualizada (se necessário)

### 2. Abrir Pull Request

No GitHub:

1. Clique em "New Pull Request"
2. Compare `feature/seu-branch` → `develop`
3. Preencha o template:

```markdown
## Descrição
Breve descrição do que foi implementado.

Implementa RFC-123 (ou qualquer contexto relevante).

## Tipo de Mudança
- [ ] Nova funcionalidade (RF-XXX)
- [ ] Correção de bug (bugfix)
- [ ] Refatoração
- [ ] Documentação
- [ ] Outros

## Testing
Descreva como foi testado:
- [ ] Testes unitários adicionados
- [ ] Testado manualmente em development
- [ ] Verificado em navegador

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Comentários adicionados em código complexo
- [ ] Documentação atualizada
- [ ] Testes passam (python manage.py test)
- [ ] Sem erros de linting (flake8)
- [ ] Sem conflitos com develop
```

### 3. Code Review

- Responda aos comentários dos revisores
- Faça ajustes se solicitado
- Force push is OK neste ponto (branch pessoal)

```bash
# Fazer ajustes baseado em feedback
git add arquivo.py
git commit -m "refactor: ajustar baseado em review"
git push origin feature/seu-branch
```

### 4. Merge

Após aprovação, o PR será mergeado em `develop`.

---

## Problemas Comuns

### Conflito de Merge

```bash
# Se rebase falha
git rebase --abort

# Tentar novamente
git fetch origin
git rebase origin/develop
```

### Mudanças Acidentais

```bash
# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Ou desfazer arquivo específico
git checkout arquivo.py
```

### Commit em Branch Errado

```bash
# Criar novo branch correto
git branch feature/nome-correto

# Voltar ao anterior e descartar
git checkout develop
git reset --hard origin/develop
```

---

## Dúvidas?

- Abra uma Issue no GitHub
- Consulte a [Documentação](./README.md)
- Revise o [PRD.md](../PRD.md)
- Pergunte no channel do projeto

---

## Licença

Ao contribuir com o Finanpy, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

---

**Obrigado por contribuir com o Finanpy!** 🎉

Para mais informações, veja [README.md](./README.md).

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

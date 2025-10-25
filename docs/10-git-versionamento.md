# Git e Versionamento

Padrões e práticas de controle de versão do Finanpy.

## Estrutura de Branches

### Branch Principal: `main`

- Código em produção
- Sempre estável
- Requer pull request para merge
- Tags com versões (ex: v1.0.0)

### Branch de Desenvolvimento: `develop`

- Integração de features
- Sempre funcionando (testado)
- Merge de feature branches

### Feature Branches: `feature/*`

```
feature/user-authentication
feature/account-management
feature/dashboard
```

Padrão: `feature/descricao-curta`

### Bug Fix Branches: `bugfix/*`

```
bugfix/login-error
bugfix/balance-calculation
```

Padrão: `bugfix/descricao-do-bug`

### Hotfix Branches: `hotfix/*`

```
hotfix/security-vulnerability
```

Padrão: `hotfix/descricao-critico`

## Fluxo Git (Git Flow)

```
main (v1.0.0) ←─ tag
 ↑
 └─ hotfix/bug ─┘

develop ←─── merge
 ↑
 ├─ feature/feature1 ─┐
 ├─ feature/feature2 ─┤
 └─ feature/feature3 ─┘
```

## Convenções de Commits

### Formato

```
<tipo>(<escopo>): <assunto>

<corpo>

<rodapé>
```

### Tipo

```
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Mudanças na documentação
style:    Mudanças de formatação (sem lógica)
refactor: Refatoração de código
perf:     Melhorias de performance
test:     Adição/modificação de testes
chore:    Tarefas de manutenção
```

### Escopo

Indica a área afetada:

```
feat(auth): implementar login via email
fix(accounts): corrigir cálculo de saldo
docs(setup): atualizar instruções de instalação
```

### Assunto

- Imperativo: "adicionar" em vez de "adicionado"
- Não capitular primeira letra
- Máximo 50 caracteres
- Sem ponto final

### Corpo

Explicação detalhada (máximo 72 caracteres por linha):

```
Implementar autenticação customizada via email. O usuário pode
fazer login usando seu email em vez de username. Senha é
armazenada com hash seguro (PBKDF2).
```

### Rodapé

Para breaking changes e issues:

```
BREAKING CHANGE: alteração significativa na API

Fixes #123
Closes #456
```

## Exemplos de Commits

### Exemplo 1: Feature Simples

```
feat(categories): adicionar cores customizadas

Usuários podem escolher uma cor para cada categoria.
A cor é exibida visualmente na interface.

Implementa RF013 do PRD.
```

### Exemplo 2: Bug Fix

```
fix(transactions): corrigir cálculo de saldo

O saldo não estava sendo atualizado corretamente ao
editar uma transação de uma conta para outra.

Fixes #42
```

### Exemplo 3: Documentação

```
docs(api): documentar endpoints de autenticação

Adiciona exemplos de request/response para os
endpoints de login, cadastro e logout.
```

### Exemplo 4: Refatoração

```
refactor(models): melhorar estrutura de signals

Reorganizar signals para melhor legibilidade.
Sem mudança de funcionalidade.
```

## Workflow Típico

### 1. Criar Branch para Feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nome-feature
```

### 2. Fazer Commits

```bash
# Editar arquivo
git add arquivo.py
git commit -m "feat(app): adicionar funcionalidade"

# Mais um commit
git add outro_arquivo.py
git commit -m "fix(app): corrigir detalhe"
```

### 3. Sincronizar com Develop

```bash
git fetch origin
git rebase origin/develop
```

### 4. Push para Remoto

```bash
git push origin feature/nome-feature
```

### 5. Abrir Pull Request (GitHub)

Título: `Feature: Descrição da Feature`

Descrição:
```
## Descrição
Breve descrição do que foi implementado.

## Relacionado
Fixes #123

## Checklist
- [x] Código testado localmente
- [x] Commits com mensagens descritivas
- [x] Sem conflitos com develop
- [x] Documentação atualizada
```

### 6. Revisar e Merge

Após aprovação:

```bash
# No GitHub, clicar em "Merge pull request"
# Ou via CLI
git checkout develop
git pull origin develop
git merge feature/nome-feature
git push origin develop
```

### 7. Deletar Branch

```bash
# Local
git branch -d feature/nome-feature

# Remoto
git push origin --delete feature/nome-feature
```

## Rebase vs Merge

### Merge (Recomendado para PRs)

```bash
git merge feature/feature-name
```

Preserva histórico completo. Cria merge commit.

**Vantagem**: Histórico visual claro
**Desvantagem**: Histórico pode ficar poluído

### Rebase (Limpar histórico)

```bash
git rebase develop
```

Reaplica commits em cima de develop. Sem merge commit.

**Vantagem**: Histórico linear limpo
**Desvantagem**: Reescreve histórico (cuidado em branches compartilhadas)

## Lidar com Conflitos

### Durante Rebase

```bash
# Conflito durante rebase
# Editar arquivos para resolver

git add arquivo-resolvido.py
git rebase --continue

# Ou cancelar
git rebase --abort
```

### Durante Merge

```bash
# Conflito durante merge
# Editar arquivos para resolver

git add arquivo-resolvido.py
git commit -m "Resolver conflito de merge"
```

## Tags para Versões

### Criar Tag

```bash
# Tag leve (anotação simples)
git tag v1.0.0

# Tag anotada (com mensagem)
git tag -a v1.0.0 -m "Release versão 1.0.0"
```

### Push Tags

```bash
# Tag específica
git push origin v1.0.0

# Todas as tags
git push origin --tags
```

### Listar Tags

```bash
git tag

# Com filtro
git tag -l "v1.*"
```

## Cherry-pick

Copiar commit específico para outro branch:

```bash
# De outro branch
git cherry-pick abc1234

# De outro branch para o atual
git checkout main
git cherry-pick develop~2
```

## Reset e Revert

### Reset (Desfazer commits locais)

```bash
# Soft reset (mantém mudanças staged)
git reset --soft HEAD~1

# Mixed reset (desfaz stage mas mantém mudanças)
git reset --mixed HEAD~1

# Hard reset (CUIDADO! Perde tudo)
git reset --hard HEAD~1
```

### Revert (Desfazer commit público)

```bash
# Cria novo commit que desfaz o anterior
git revert abc1234
```

## Stash (Salvar Mudanças Temporárias)

```bash
# Salvar mudanças
git stash

# Listar stashes
git stash list

# Recuperar stash
git stash pop

# Recuperar stash específico
git stash apply stash@{0}

# Descartar stash
git stash drop stash@{0}
```

## Boas Práticas

### ✓ Faça

```bash
# Commits pequenos e focados
git commit -m "feat(users): implementar login"

# Mensagens descritivas
git commit -m "feat(dashboard): adicionar card de saldo total"

# Branches com nomes claros
git checkout -b feature/user-authentication

# Rebase antes de push em branches pessoais
git rebase origin/develop

# Pull com rebase para evitar merge commits desnecessários
git pull --rebase origin develop
```

### ✗ Evite

```bash
# Commits com mensagens vagas
git commit -m "fix bug"
git commit -m "updates"

# Branches com nomes genéricos
git checkout -b fix
git checkout -b feature

# Force push em branches públicas (pode quebrar repo)
git push --force origin develop

# Commits gigantes com múltiplas funcionalidades
git commit -am "fix login, add dashboard, update docs"

# Merges sem revisar código (PRs)
git merge feature/branch-desconhecido
```

## GitIgnore

Arquivo `.gitignore` padrão:

```
# Ambiente virtual
venv/
env/
.env

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Django
*.log
local_settings.py
db.sqlite3
/media
/static

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# OS
.DS_Store
Thumbs.db

# Testes
.coverage
htmlcov/
.pytest_cache/
```

## CI/CD (Futuro)

Arquivo `.github/workflows/tests.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: 3.13

    - name: Install dependencies
      run: |
        pip install -r requirements.txt

    - name: Run tests
      run: |
        python manage.py test

    - name: Run linting
      run: |
        flake8 .
```

## Recursos Úteis

### Ferramentas
- [GitHub Desktop](https://desktop.github.com/)
- [GitKraken](https://www.gitkraken.com/)
- [SourceTree](https://www.sourcetreeapp.com/)

### Documentação
- [Pro Git Book](https://git-scm.com/book)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Checklist de Commit

Antes de fazer commit:

- [ ] Código testado localmente
- [ ] Sem erros de sintaxe
- [ ] Sem console.log ou print statements
- [ ] Segue padrões de código do projeto
- [ ] Mensagem de commit descritiva
- [ ] Alterações relacionadas no mesmo commit

---

## Próximos Passos

- Leia [Padrões de Código](./03-padroes-codigo.md) para consistency
- Consulte [Comandos Úteis](./09-comandos-uteis.md) para referência rápida
- Veja o PRD.md para contexto do projeto

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

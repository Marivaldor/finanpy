# Equipe de Agentes IA - Finanpy

Sumário executivo da equipe especializada de agentes para desenvolvimento do Finanpy.

## 🎯 Visão Geral

Equipe de 7 agentes especializados, cada um com expertise em uma área específica do desenvolvimento, cobrindo a stack completa do Finanpy (Django, Frontend, Testes, DevOps, Documentação).

## 📋 Agentes Disponíveis

### 1. Backend Django Agent
- **Arquivo**: `agents/01-backend-django-agent.md`
- **Especialidade**: Python, Django 5+, Models, Views, URLs, Auth
- **Responsabilidades**:
  - Implementar models (CustomUser, Account, Category, Transaction)
  - Criar views (FBV & CBV)
  - Roteamento (URLs)
  - Autenticação e autorização
  - Admin interface customization
  - Signals e automação
  - Validações e segurança
- **MCP Servers**: context7 (write code)

### 2. Database Agent
- **Arquivo**: `agents/02-database-agent.md`
- **Especialidade**: Django ORM, SQL, Migrations, Query Optimization
- **Responsabilidades**:
  - Criar e gerenciar migrations
  - Otimizar queries
  - Design de schema
  - Índices e performance
  - Solução de N+1 problems
  - Transações atômicas
  - Backup & recovery
- **MCP Servers**: context7 (write migrations)

### 3. Frontend DTL Agent
- **Arquivo**: `agents/03-frontend-dtl-agent.md`
- **Especialidade**: Django Template Language, HTML5, Forms
- **Responsabilidades**:
  - Criar templates HTML
  - Template inheritance (extends/blocks)
  - Template tags e filters
  - Forms rendering
  - Partials reutilizáveis
  - Context data
  - Acessibilidade HTML
- **MCP Servers**: context7 (write templates)

### 4. Frontend Tailwind Agent
- **Arquivo**: `agents/04-frontend-tailwind-agent.md`
- **Especialidade**: TailwindCSS, Design System, Responsive Design
- **Responsabilidades**:
  - Componentes TailwindCSS
  - Design system implementation
  - Layouts responsivos (mobile-first)
  - Dark theme consistency
  - Transições e animações
  - Acessibilidade visual
  - Performance visual
- **MCP Servers**: context7 (write CSS/HTML)

### 5. QA/Tester Agent
- **Arquivo**: `agents/05-qa-tester-agent.md`
- **Especialidade**: Playwright E2E, Tests, UI/UX, Acessibilidade
- **Responsabilidades**:
  - E2E testing com Playwright
  - Unit tests (Django TestCase)
  - Validação de UI/UX
  - Testes de responsividade
  - Acessibilidade (WCAG AA)
  - Performance testing
  - Segurança validation
- **MCP Servers**: playwright (test/validate)

### 6. DevOps/Infrastructure Agent
- **Arquivo**: `agents/06-devops-infrastructure-agent.md`
- **Especialidade**: Deploy, CI/CD, Database, Monitoring
- **Responsabilidades**:
  - Setup de ambiente
  - CI/CD pipeline (GitHub Actions)
  - Gerenciamento de banco de dados
  - Migrations automation
  - Deployment (dev/staging/prod)
  - Monitoring e logging
  - Segurança e backups
- **MCP Servers**: context7 (write configs)

### 7. Documentation Agent
- **Arquivo**: `agents/07-documentation-agent.md`
- **Especialidade**: Markdown, Technical Writing, Docstrings
- **Responsabilidades**:
  - Code documentation (docstrings)
  - Technical guides
  - API documentation
  - PRD updates
  - docs/ folder maintenance
  - CHANGELOG & release notes
  - Manutenção de padrões
- **MCP Servers**: context7 (write documentation)

## 🔄 Fluxo de Trabalho Recomendado

```
Task/Feature Description
       ↓
   01. Backend Django Agent
       Implementar models, views, URLs, auth
       ↓
   02. Database Agent
       Criar/otimizar migrations, queries
       ↓
   03. Frontend DTL Agent
       Criar templates HTML
       ↓
   04. Frontend Tailwind Agent
       Estilizar com TailwindCSS
       ↓
   05. QA/Tester Agent
       Testar E2E, validar UI/UX
       ↓
   06. DevOps Agent
       Deploy (se necessário)
       ↓
   07. Documentation Agent
       Documentar mudanças
       ↓
      ✅ Feature Completa
```

## 📊 Stack Coberto

| Área | Agentes | Stack |
|------|---------|-------|
| Backend | #1, #2 | Django 5+, Python 3.13+, Django ORM |
| Frontend | #3, #4 | DTL, TailwindCSS, HTML5 |
| Testes | #5 | Playwright, Django Tests |
| Infraestrutura | #6 | Docker, GitHub Actions, PostgreSQL |
| Documentação | #7 | Markdown, Docstrings |

## 🎯 Como Ativar um Agente

### Formato de Ativação

```
@[Agent Name]
[Descrição da tarefa com contexto específico]
```

### Exemplos

```
@Backend Django Agent
Implementar o modelo Account conforme RF008 do PRD.
Deve ter campos: name, account_type, balance, is_active.
Incluir validações e __str__ method.
```

```
@Frontend Tailwind Agent
Criar componentes de buttons conforme design system:
- Primário (indigo/purple gradient)
- Secundário (slate-700)
- Danger (red-500)
Incluir hover states e focus states.
```

```
@QA/Tester Agent
Testar fluxo completo de login:
1. Acessar página de login
2. Fazer login com email/senha
3. Verificar redirect para dashboard
4. Validar responsividade mobile
```

## 📚 Documentação de Referência Compartilhada

Todos os agentes consultam:
- **CLAUDE.md** - Overview do projeto, stack, patterns
- **docs/README.md** - Índice de documentação
- **docs/03-padroes-codigo.md** - Padrões de código Python
- **docs/04-models.md** - Referência de models
- **docs/05-views-urls.md** - Views e URLs
- **docs/07-templates-django.md** - Templates DTL
- **docs/08-design-system.md** - Design System Finanpy
- **docs/09-comandos-uteis.md** - Comandos Django
- **PRD.md** - Requisitos do projeto
- **CONTRIBUTING.md** - Guia de contribuição

## 🔐 Responsabilidades Compartilhadas

### Segurança
Todos os agentes devem garantir:
- ✓ User isolation (usuário A não acessa dados B)
- ✓ CSRF protection
- ✓ SQL injection prevention
- ✓ XSS prevention
- ✓ Password hashing
- ✓ Server-side validation

### Code Quality
Todos os agentes devem garantir:
- ✓ PEP 8 compliance
- ✓ Nomenclatura consistente
- ✓ Docstrings/comments
- ✓ Type hints (quando aplicável)
- ✓ DRY principles
- ✓ Performance

### Documentation
Todos os agentes devem garantir:
- ✓ Docstrings em código complexo
- ✓ Comments onde necessário
- ✓ Atualização de docs/
- ✓ Exemplos de uso

## 🚀 Comandos Comuns Todos Agentes

```bash
# Verificar integridade do projeto
python manage.py check

# Validar código
flake8 .

# Rodar testes
python manage.py test

# Rodar servidor
python manage.py runserver

# Django shell
python manage.py shell
```

## 📈 Métricas de Sucesso

Por feature implementada:
- [ ] 100% de requisitos do PRD implementados
- [ ] Código segue padrões documentados
- [ ] Testes E2E passam
- [ ] Responsivo em mobile/tablet/desktop
- [ ] Documentação atualizada
- [ ] Zero security warnings
- [ ] Performance aceitável (< 2s)

## 🔗 Integração Entre Agentes

```
Backend (#1) ←→ Database (#2)
    ↓
Frontend DTL (#3) ←→ Frontend Tailwind (#4)
    ↓
QA/Tester (#5)
    ↓
DevOps (#6)
    ↓
Documentation (#7)
```

## 📞 Suporte & Referência

- **Dúvidas sobre agentes**: Consulte `agents/README.md`
- **Dúvidas sobre padrões**: Consulte `docs/03-padroes-codigo.md`
- **Dúvidas sobre arquitetura**: Consulte `CLAUDE.md`
- **Dúvidas sobre requisitos**: Consulte `PRD.md`
- **Dúvidas sobre contribuição**: Consulte `docs/CONTRIBUTING.md`

## ✨ Vantagens da Equipe

1. **Especialização** - Cada agente é expert em sua área
2. **Cobertura Completa** - Todas as áreas do desenvolvimento cobertos
3. **Eficiência** - Trabalho paralelo em diferentes áreas
4. **Qualidade** - Padrões altos em cada especialidade
5. **Documentação** - Cada agente documenta conforme necessário
6. **Escalabilidade** - Fácil adicionar novos agentes
7. **Consistência** - Todos seguem mesmos padrões

## 📅 Próximos Passos

1. Consulte `agents/README.md` para detalhes completos
2. Leia o arquivo do agente específico que você precisa
3. Ative o agente com uma tarefa específica
4. Siga os padrões e guidelines documentados
5. Colabore com outros agentes conforme necessário

---

**Versão**: 1.0
**Data**: 25 de Outubro de 2025
**Projeto**: Finanpy - Sistema de Gestão de Finanças Pessoais
**Status**: ✅ Equipe Pronta para Desenvolvimento

# Agentes de IA - Finanpy

Equipe especializada de agentes de IA responsáveis por diferentes funções no desenvolvimento do Finanpy.

## 📚 Índice de Agentes

### 🏗️ Backend & Arquitetura
- **[Backend Django Agent](./01-backend-django-agent.md)** - Especialista em Django, Models, Views, URLs
- **[Database Agent](./02-database-agent.md)** - Especialista em ORM, Migrations, Queries otimizadas

### 🎨 Frontend & Design
- **[Frontend DTL Agent](./03-frontend-dtl-agent.md)** - Especialista em Django Templates e DTL
- **[Frontend Tailwind Agent](./04-frontend-tailwind-agent.md)** - Especialista em TailwindCSS e Design System

### ✅ Qualidade & Testes
- **[QA/Tester Agent](./05-qa-tester-agent.md)** - Especialista em testes E2E, UI/UX, funcionais

### 📋 Operacional
- **[DevOps/Infrastructure Agent](./06-devops-infrastructure-agent.md)** - Especialista em deploy, configs, CI/CD
- **[Documentation Agent](./07-documentation-agent.md)** - Especialista em documentação técnica

---

## 🎯 Quando Usar Cada Agente

### Backend Django Agent
**Use quando:**
- Implementar models (CustomUser, Account, Category, Transaction)
- Criar views (FBV ou CBV)
- Definir URLs e roteamento
- Implementar lógica de negócio
- Criar formulários
- Implementar signals (auto-create Profile, balance updates)
- Admin interface customization

**Exemplo:**
```
Implementar modelo Account com validações de saldo
Criar view de listagem de contas com paginação
Adicionar filtro de categorias por tipo
```

---

### Database Agent
**Use quando:**
- Criar ou modificar migrations
- Otimizar queries
- Implementar índices
- Resolver N+1 problems
- Usar select_related/prefetch_related
- Operações com transações atômicas
- Análise de performance do banco

**Exemplo:**
```
Otimizar query de listagem de transações
Criar índice em transaction_date
Verificar N+1 em relatório de contas
```

---

### Frontend DTL Agent
**Use quando:**
- Criar templates HTML com DTL
- Implementar herança de templates
- Usar template tags (if, for, include, url)
- Implementar formulários HTML
- Criação de partials reutilizáveis
- Lógica de apresentação
- CSRF tokens, mensagens, feedback

**Exemplo:**
```
Criar template de listagem de contas
Implementar form de criar transação
Criar partial de navbar com menu
```

---

### Frontend Tailwind Agent
**Use quando:**
- Implementar componentes com TailwindCSS
- Responsividade (mobile-first)
- Aplicar design system (cores, tipografia)
- Criar cards, buttons, alerts
- Gradientes e efeitos visuais
- Dark theme consistente
- Layout e grid system

**Exemplo:**
```
Estilizar lista de contas com cards
Implementar botão primário com gradiente
Criar layout responsivo para dashboard
```

---

### QA/Tester Agent
**Use quando:**
- Testar funcionalidades implementadas
- Verificar UI/UX em navegadores
- Testes E2E com Playwright
- Validar fluxo de usuário
- Verificar responsividade mobile
- Validar design contra design system
- Testes de segurança (user isolation, CSRF)

**Exemplo:**
```
Testar fluxo de cadastro de usuário
Verificar se transações atualizam saldo
Validar design responsivo em mobile
```

---

### DevOps/Infrastructure Agent
**Use quando:**
- Setup de ambiente
- Configurar variáveis de ambiente
- Migrations e banco de dados
- Deploy e CI/CD
- Docker/containers (futuro)
- Otimizações de infraestrutura
- Monitoramento e logs

**Exemplo:**
```
Setup inicial do projeto
Configurar PostgreSQL para produção
Implementar CI/CD com GitHub Actions
```

---

### Documentation Agent
**Use quando:**
- Documentação de features
- Atualizar PRD.md
- Manter docs/ atualizada
- Criar guides de uso
- Documentar padrões novos
- API documentation
- Comentários em código complexo

**Exemplo:**
```
Documentar novo módulo de transações
Atualizar PRD com stories implementadas
Criar guide de extensão do sistema
```

---

## 🔄 Fluxo de Trabalho Típico

```
1. Task Description → Backend Django Agent
   ↓
   Implementa Models, Views, URLs
   ↓
2. Frontend → Frontend DTL Agent
   ↓
   Cria Templates e Forms
   ↓
3. Styling → Frontend Tailwind Agent
   ↓
   Estiliza com TailwindCSS
   ↓
4. Testing → QA/Tester Agent
   ↓
   Verifica funcionamento e UI/UX
   ↓
5. Documentation → Documentation Agent
   ↓
   Documenta as mudanças
   ↓
✅ Feature Completa
```

---

## 📋 Capacidades de Cada Agente

### Backend Django Agent
**Tecnologias:**
- Django 5+
- Python 3.13+
- Django ORM
- Class-Based Views (CBV)
- Function-Based Views (FBV)
- Django Signals
- Django Admin
- Forms e Validation
- Authentication & Permissions

**MCP Servers:**
- context7 (atualizar código baseado em docs)

**Responsabilidades:**
- ✓ Modelos (Models)
- ✓ Views e lógica
- ✓ URLs e roteamento
- ✓ Formulários
- ✓ Autenticação
- ✓ Signals e automação
- ✓ Admin interface
- ✓ Validações

---

### Database Agent
**Tecnologias:**
- Django ORM
- SQL
- SQLite3 (dev)
- PostgreSQL (futuro)
- Migrations
- Query Optimization
- Indexes
- Transactions

**MCP Servers:**
- context7 (atualizar código)

**Responsabilidades:**
- ✓ Migrations
- ✓ Query optimization
- ✓ N+1 problem solving
- ✓ Índices
- ✓ Transações atômicas
- ✓ Performance analysis
- ✓ Database config

---

### Frontend DTL Agent
**Tecnologias:**
- Django Template Language (DTL)
- HTML5
- Django template tags
- Template inheritance
- Django forms rendering
- CSRF protection
- Mensagens (messages framework)

**MCP Servers:**
- context7 (atualizar templates baseado em docs)

**Responsabilidades:**
- ✓ Templates HTML
- ✓ Template inheritance
- ✓ Template tags
- ✓ Forms rendering
- ✓ Partials/includes
- ✓ Lógica de apresentação
- ✓ Acessibilidade

---

### Frontend Tailwind Agent
**Tecnologias:**
- TailwindCSS
- Design System (Finanpy)
- Responsividade (mobile-first)
- Dark theme
- Componentes (buttons, cards, inputs)
- Gradientes e animações
- Grid e Flexbox

**MCP Servers:**
- context7 (atualizar CSS baseado em design system)

**Responsabilidades:**
- ✓ Componentes TailwindCSS
- ✓ Design System consistency
- ✓ Responsividade
- ✓ Dark theme
- ✓ Acessibilidade (contrast, focus)
- ✓ Transições e animações
- ✓ Performance visual

---

### QA/Tester Agent
**Tecnologias:**
- Playwright
- End-to-End Testing
- Django TestCase
- UI/UX Validation
- Accessibility Testing
- Performance Testing
- Security Testing

**MCP Servers:**
- playwright (acessar e testar sistema)

**Responsabilidades:**
- ✓ Testes E2E
- ✓ Validação de UI/UX
- ✓ Testes funcionais
- ✓ Responsividade
- ✓ Testes de segurança
- ✓ Performance testing
- ✓ Relatórios de bugs

---

### DevOps/Infrastructure Agent
**Tecnologias:**
- Python/Django deployment
- Environment configuration
- Database setup (SQLite, PostgreSQL)
- Docker (futuro)
- CI/CD (GitHub Actions)
- Nginx/Gunicorn (produção)
- Monitoring and logging

**MCP Servers:**
- context7 (atualizar configs)

**Responsabilidades:**
- ✓ Setup inicial
- ✓ Environment config
- ✓ Database setup
- ✓ Migrations
- ✓ Deployment
- ✓ CI/CD
- ✓ Monitoring
- ✓ Performance optimization

---

### Documentation Agent
**Tecnologias:**
- Markdown
- Technical Writing
- README, guides
- API documentation
- Code comments
- Docstrings

**MCP Servers:**
- context7 (atualizar documentação)

**Responsabilidades:**
- ✓ Documentação técnica
- ✓ Guides de uso
- ✓ PRD updates
- ✓ API docs
- ✓ Docstrings
- ✓ Code comments
- ✓ Change logs

---

## 🔗 Integração com Documentação

Todos os agentes consultam:
- **CLAUDE.md** - Guia geral do projeto
- **docs/README.md** - Índice de documentação
- **docs/03-padroes-codigo.md** - Padrões de código
- **docs/04-models.md** - Referência de models
- **docs/05-views-urls.md** - Views e URLs
- **docs/07-templates-django.md** - Templates
- **docs/08-design-system.md** - Design System
- **PRD.md** - Requisitos do projeto

---

## ⚡ Como Ativar um Agente

Quando você precisar de um agente, simplesmente mencione a tarefa e o contexto:

```
"@Backend Django Agent
Implementar modelo Account com os campos especificados no PRD"

"@Frontend Tailwind Agent
Criar componentes de buttons conforme design system"

"@QA/Tester Agent
Testar fluxo de login do usuário via email"
```

---

## 📊 Stack do Projeto

Todos os agentes operam dentro desta stack:

**Backend:**
- Python 3.13+
- Django 5+
- SQLite (dev) / PostgreSQL (prod)
- Django ORM

**Frontend:**
- Django Template Language (DTL)
- TailwindCSS
- Vanilla JavaScript (mínimo)
- Heroicons (ícones)

**Qualidade:**
- Django TestCase
- Playwright
- Flake8 (linting)
- Black (formatting, opcional)

**Infraestrutura:**
- Git
- GitHub
- Docker (futuro)
- Gunicorn + Nginx (produção)

---

## 🎓 Padrões Esperados

Todos os agentes seguem:

1. **PEP 8** - Para Python
2. **Convenções de nomes** - snake_case para functions, PascalCase para classes
3. **Django Patterns** - As melhores práticas do Django
4. **Design System** - Finanpy color palette, typography, components
5. **Security** - User isolation, CSRF protection, input validation
6. **Performance** - Query optimization, lazy loading, caching

---

## 🚀 Próximos Passos

1. Consulte o agente específico que você precisa
2. Leia a documentação recomendada
3. Ative o agente com a tarefa específica
4. Valide o resultado com QA/Tester Agent
5. Atualize documentação se necessário

---

## 📞 Suporte

- **Dúvidas sobre padrões:** Consulte `docs/`
- **Dúvidas sobre arquitetura:** Consulte `CLAUDE.md`
- **Dúvidas sobre requisitos:** Consulte `PRD.md`
- **Dúvidas sobre contribuição:** Consulte `docs/CONTRIBUTING.md`

---

**Versão**: 1.0
**Data**: 25 de Outubro de 2025
**Projeto**: Finanpy - Sistema de Gestão de Finanças Pessoais

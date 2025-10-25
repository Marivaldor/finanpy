# Documentação Finanpy

Bem-vindo à documentação do projeto Finanpy. Este índice contém guias sobre os padrões, guidelines e arquitetura do projeto.

## 📚 Índice de Documentação

### Guias Gerais
- **[Setup e Ambiente](./01-setup-ambiente.md)** - Configuração do ambiente de desenvolvimento
- **[Estrutura do Projeto](./02-estrutura-projeto.md)** - Organização de pastas e apps
- **[Padrões de Código](./03-padroes-codigo.md)** - Convenções e padrões de programação

### Django e Arquitetura
- **[Models](./04-models.md)** - Definição e padrões dos modelos Django
- **[Views e URLs](./05-views-urls.md)** - Estrutura de views e roteamento
- **[Admin Django](./06-admin-django.md)** - Configuração da interface administrativa

### Frontend
- **[Templates Django](./07-templates-django.md)** - Padrões de templates DTL
- **[Design System](./08-design-system.md)** - Guia de componentes e estilos

### Operacional
- **[Comandos Úteis](./09-comandos-uteis.md)** - Comandos Django e ferramentas do projeto
- **[Git e Versionamento](./10-git-versionamento.md)** - Práticas de controle de versão

---

## 🚀 Quick Start

Para começar a trabalhar no projeto:

```bash
# 1. Ativar ambiente virtual
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# 2. Instalar dependências
pip install -r requirements.txt

# 3. Aplicar migrações
python manage.py migrate

# 4. Criar superusuário
python manage.py createsuperuser

# 5. Rodar servidor
python manage.py runserver
```

---

## 📋 Visão Geral do Projeto

**Finanpy** é um sistema web de gestão de finanças pessoais desenvolvido em Python com Django.

### Stack Tecnológica
- **Backend**: Django 5+, Python 3.13+
- **Banco de Dados**: SQLite3
- **Frontend**: Django Template Language + TailwindCSS
- **Autenticação**: Django Auth (nativo)

### Apps Django
- `users` - Usuários customizados
- `profiles` - Perfil do usuário
- `accounts` - Contas bancárias
- `categories` - Categorias de transações
- `transactions` - Transações financeiras
- `core` - Configurações principais

---

## 📖 Sobre Esta Documentação

Esta documentação é um **documento vivo** que deve ser atualizado conforme o projeto evolui.

- **Simples e direta**: Sem complexidade desnecessária
- **Prática**: Focada no que existe, não em funcionalidades futuras
- **Atualizada**: Reflete o estado atual do projeto

Para dúvidas ou sugestões, consulte o `PRD.md` na raiz do projeto.

---

**Versão**: 1.0
**Última atualização**: 25 de Outubro de 2025

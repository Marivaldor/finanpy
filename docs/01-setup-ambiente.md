# Setup e Ambiente de Desenvolvimento

Guia completo para configurar o ambiente de desenvolvimento do Finanpy.

## Pré-requisitos

- **Python 3.13+**
- **pip** (gerenciador de pacotes Python)
- **Git** (controle de versão)
- **Editor de código** (VS Code recomendado)

## Passos Iniciais

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd finanpy
```

### 2. Criar Ambiente Virtual

```bash
# Linux/Mac
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

**Dica**: Sempre ative o ambiente virtual antes de trabalhar no projeto.

### 3. Instalar Dependências

```bash
pip install -r requirements.txt
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# .env
DEBUG=True
SECRET_KEY=sua-chave-secreta-aqui
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Importante**: Nunca commite `.env` no Git. Use `.env.example` como referência.

### 5. Aplicar Migrações

```bash
python manage.py migrate
```

Isso cria as tabelas no banco de dados SQLite.

### 6. Criar Superusuário

```bash
python manage.py createsuperuser
```

Siga as instruções para criar um usuário administrativo.

### 7. Rodar Servidor de Desenvolvimento

```bash
python manage.py runserver
```

Acesse http://localhost:8000/ no navegador.

---

## Estrutura de Diretórios

Após o setup, o projeto terá esta estrutura:

```
finanpy/
├── venv/                 # Ambiente virtual (não commitar)
├── core/                 # Configurações do Django
│   ├── settings.py       # Configurações do projeto
│   ├── urls.py           # URLs principais
│   └── wsgi.py           # WSGI para produção
├── accounts/             # App de contas bancárias
├── categories/           # App de categorias
├── profiles/             # App de perfil do usuário
├── transactions/         # App de transações
├── users/                # App de usuários customizados
├── docs/                 # Documentação (este diretório)
├── manage.py             # CLI do Django
├── requirements.txt      # Dependências Python
├── PRD.md                # Product Requirement Document
└── .gitignore            # Arquivos ignorados no Git
```

---

## Verificar Instalação

Para confirmar que tudo está funcionando:

```bash
# Verificar versão do Django
python -c "import django; print(django.__version__)"

# Executar testes
python manage.py test

# Verificar migrações pendentes
python manage.py showmigrations
```

---

## Solução de Problemas

### Erro: "ModuleNotFoundError: No module named 'django'"

**Solução**: Certifique-se de que o ambiente virtual está ativado e as dependências instaladas:

```bash
which python  # Linux/Mac (deve mostrar o caminho do venv)
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Erro: "db.sqlite3" não encontrado

**Solução**: Execute as migrações:

```bash
python manage.py migrate
```

### Porta 8000 já em uso

**Solução**: Use outra porta:

```bash
python manage.py runserver 8001
```

---

## Próximos Passos

- Leia [Estrutura do Projeto](./02-estrutura-projeto.md) para entender a organização
- Consulte [Padrões de Código](./03-padroes-codigo.md) antes de começar a programar
- Verifique [Comandos Úteis](./09-comandos-uteis.md) para operações comuns

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

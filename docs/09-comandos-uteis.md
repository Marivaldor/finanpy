# Comandos Úteis

Referência rápida de comandos Django e ferramentas úteis do projeto.

## Ambiente Virtual

### Criar

```bash
# Linux/Mac
python3 -m venv venv

# Windows
python -m venv venv
```

### Ativar

```bash
# Linux/Mac
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### Desativar

```bash
deactivate
```

## Gerenciamento de Dependências

### Instalar

```bash
pip install -r requirements.txt
```

### Adicionar Nova Dependência

```bash
pip install nome-do-pacote
pip freeze > requirements.txt
```

### Listar Instaladas

```bash
pip list
```

### Verificar Desatualizadas

```bash
pip list --outdated
```

---

## Django Management Commands

### Executar Servidor

```bash
python manage.py runserver
```

Com porta customizada:

```bash
python manage.py runserver 8001
```

Com IP específico:

```bash
python manage.py runserver 0.0.0.0:8000
```

### Criar Migrações

```bash
python manage.py makemigrations
```

Com app específico:

```bash
python manage.py makemigrations accounts
```

### Aplicar Migrações

```bash
python manage.py migrate
```

Com app específico:

```bash
python manage.py migrate accounts
```

Para migração específica:

```bash
python manage.py migrate accounts 0003
```

### Ver Status das Migrações

```bash
python manage.py showmigrations
```

Por app:

```bash
python manage.py showmigrations accounts
```

### Reverter Migração

```bash
python manage.py migrate accounts 0001
```

### Criar Superusuário

```bash
python manage.py createsuperuser
```

### Alterar Senha de Usuário

```bash
python manage.py changepassword nomedousuario
```

### Executar Testes

```bash
# Todos os testes
python manage.py test

# Testes de uma app
python manage.py test accounts

# Testes de uma classe
python manage.py test accounts.tests.AccountTestCase

# Testes com verbosidade
python manage.py test --verbosity=2

# Testes com cobertura
coverage run --source='.' manage.py test
coverage report
coverage html
```

### Coletando Static Files

```bash
python manage.py collectstatic
```

Sem confirmação:

```bash
python manage.py collectstatic --noinput
```

### Shell Django

Abrir console Python interativo:

```bash
python manage.py shell
```

Dentro do shell:

```python
from accounts.models import Account
from django.contrib.auth import get_user_model

User = get_user_model()

# Listar usuários
User.objects.all()

# Criar conta
user = User.objects.first()
account = Account.objects.create(
    user=user,
    name='Nova Conta',
    account_type='checking'
)
```

### Database Shell

```bash
python manage.py dbshell
```

### Verificar Integridade do Projeto

```bash
python manage.py check
```

### Criar App

```bash
python manage.py startapp nome_da_app
```

---

## Git e Versionamento

### Status

```bash
git status
```

### Ver Diferenças

```bash
git diff
```

Arquivo específico:

```bash
git diff arquivo.py
```

### Adicionar Mudanças

```bash
# Arquivo específico
git add arquivo.py

# Todos os arquivos
git add .
```

### Fazer Commit

```bash
git commit -m "Mensagem do commit"
```

Com múltiplas linhas:

```bash
git commit -m "Assunto

Descrição detalhada do commit"
```

### Ver Histórico

```bash
# Últimos commits
git log

# Commits de um arquivo
git log arquivo.py

# Com graph (bonito)
git log --oneline --graph --all
```

### Branches

```bash
# Listar branches
git branch

# Criar branch
git branch nome-da-branch

# Trocar de branch
git checkout nome-da-branch

# Criar e trocar
git checkout -b nome-da-branch

# Deletar branch
git branch -d nome-da-branch
```

### Merge

```bash
git merge nome-da-branch
```

---

## Linting e Formatação

### Flake8 (Verificar PEP 8)

```bash
# Instalar
pip install flake8

# Verificar tudo
flake8 .

# Arquivo específico
flake8 arquivo.py

# Ignorar erros específicos
flake8 . --ignore=E501,W503
```

### Black (Formatação Automática)

```bash
# Instalar
pip install black

# Formatar tudo
black .

# Arquivo específico
black arquivo.py

# Apenas verificar (sem modificar)
black . --check
```

---

## Debugging

### Print Debugging

```python
print('Debug:', variavel)
```

### Django Debug Toolbar (Futuro)

```bash
pip install django-debug-toolbar
```

### PDB (Python Debugger)

```python
import pdb; pdb.set_trace()

# Ou em Python 3.7+
breakpoint()
```

Comandos no PDB:
```
l     - Mostrar código
n     - Próxima linha
s     - Entrar em função
c     - Continuar
p var - Imprimir variável
h     - Ajuda
q     - Sair
```

### Logging

```python
import logging

logger = logging.getLogger(__name__)

logger.debug('Debug message')
logger.info('Info message')
logger.warning('Warning message')
logger.error('Error message')
logger.critical('Critical message')
```

---

## Docker (Futuro)

### Build Image

```bash
docker build -t finanpy:latest .
```

### Rodar Container

```bash
docker run -p 8000:8000 finanpy:latest
```

### Docker Compose

```bash
# Subir serviços
docker-compose up

# Em background
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f
```

---

## Produção

### Coletar Static Files

```bash
python manage.py collectstatic --noinput
```

### Executar Migrations

```bash
python manage.py migrate --noinput
```

### Criar Superusuário (Script)

```bash
python manage.py shell < create_admin.py
```

---

## Atalhos Úteis

### Criar Alias (Linux/Mac)

```bash
# Adicione ao ~/.bashrc ou ~/.zshrc
alias activate='source venv/bin/activate'
alias runserver='python manage.py runserver'
alias migrations='python manage.py makemigrations && python manage.py migrate'
alias test='python manage.py test'
```

### Reload Automático no Shell

```bash
python manage.py shell_plus
```

Requer:
```bash
pip install django-extensions
```

---

## Troubleshooting

### Comando não encontrado

```bash
# Verificar se está no diretório certo
pwd

# Verificar se venv está ativado
which python  # Deve mostrar .venv/
```

### ModuleNotFoundError

```bash
# Reinstalar dependências
pip install -r requirements.txt

# Verificar PYTHONPATH
echo $PYTHONPATH
```

### Port already in use

```bash
# Usar outra porta
python manage.py runserver 8001

# Ou matar processo
# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database locked

```bash
# Remover db.sqlite3 e recriar
rm db.sqlite3
python manage.py migrate
```

### Static files not loading

```bash
# Coletar novamente
python manage.py collectstatic --clear --noinput
```

---

## Checklist de Desenvolvimento

### Antes de Commitar

- [ ] `python manage.py check` - Verificar integridade
- [ ] `flake8 .` - Verificar PEP 8
- [ ] `python manage.py test` - Rodar testes
- [ ] Revisar mudanças com `git diff`
- [ ] Mensagem de commit descritiva

### Antes de Deploy

- [ ] Atualizar `requirements.txt`: `pip freeze > requirements.txt`
- [ ] Rodar testes novamente
- [ ] Verificar variáveis de ambiente
- [ ] Coletar static files
- [ ] Backup do banco de dados
- [ ] Testar em staging

---

## Recursos Úteis

### Documentação Oficial
- [Django Documentation](https://docs.djangoproject.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Python Documentation](https://docs.python.org/3/)

### Ferramentas
- [Django Extensions](https://django-extensions.readthedocs.io/)
- [Django Debug Toolbar](https://django-debug-toolbar.readthedocs.io/)
- [Coverage.py](https://coverage.readthedocs.io/)

---

## Próximos Passos

- Consulte a documentação oficial quando tiver dúvidas
- Experimente comandos em um branch de teste
- Crie seus próprios aliases para agilizar

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

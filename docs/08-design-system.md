# Design System

Guia de cores, componentes e padrões visuais do Finanpy com TailwindCSS.

## Cores

### Paleta Principal

```css
/* Primárias */
--primary-indigo-500: #667eea
--primary-indigo-600: #5568d3
--primary-purple-600: #764ba2

/* Gradiente Principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Cores de Fundo (Dark Theme)

```css
--bg-primary: #0f172a     /* slate-900 */
--bg-secondary: #1e293b   /* slate-800 */
--bg-tertiary: #334155    /* slate-700 */
--bg-card: #1e293b        /* slate-800 */
```

### Cores de Texto

```css
--text-primary: #f8fafc   /* slate-50 */
--text-secondary: #cbd5e1 /* slate-300 */
--text-muted: #94a3b8     /* slate-400 */
```

### Cores de Estado

```css
/* Success - Verde */
--success-500: #10b981    /* green-500 */
--success-600: #059669    /* green-600 */

/* Error - Vermelho */
--error-500: #ef4444      /* red-500 */
--error-600: #dc2626      /* red-600 */

/* Warning - Amarelo */
--warning-500: #f59e0b    /* amber-500 */
--warning-600: #d97706    /* amber-600 */

/* Info - Azul */
--info-500: #3b82f6       /* blue-500 */
--info-600: #2563eb       /* blue-600 */
```

## Tipografia

### Família de Fontes

```css
font-family: 'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif;
```

### Tamanhos

```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
```

### Pesos

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Componentes

### Botões

#### Primário

```html
<button class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
    Ação Principal
</button>
```

#### Secundário

```html
<button class="px-6 py-3 bg-slate-700 text-slate-100 font-semibold rounded-lg border border-slate-600 hover:bg-slate-600 transition-all duration-200">
    Ação Secundária
</button>
```

#### Sucesso

```html
<button class="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-200">
    Salvar
</button>
```

#### Perigo

```html
<button class="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200">
    Deletar
</button>
```

#### Ghost (Texto)

```html
<button class="px-6 py-3 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200">
    Cancelar
</button>
```

#### Tamanhos

```html
<!-- Large -->
<button class="px-6 py-3">Grande</button>

<!-- Normal -->
<button class="px-4 py-2">Normal</button>

<!-- Small -->
<button class="px-3 py-1 text-sm">Pequeno</button>
```

### Inputs

#### Text Input

```html
<div class="mb-4">
    <label class="block text-slate-300 text-sm font-semibold mb-2">
        Nome
    </label>
    <input
        type="text"
        class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        placeholder="Digite aqui..."
    >
</div>
```

#### Select

```html
<div class="mb-4">
    <label class="block text-slate-300 text-sm font-semibold mb-2">
        Tipo
    </label>
    <select class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
        <option>Selecione uma opção</option>
        <option>Opção 1</option>
        <option>Opção 2</option>
    </select>
</div>
```

#### Textarea

```html
<div class="mb-4">
    <label class="block text-slate-300 text-sm font-semibold mb-2">
        Descrição
    </label>
    <textarea
        rows="4"
        class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        placeholder="Digite aqui..."
    ></textarea>
</div>
```

#### Checkbox

```html
<label class="flex items-center cursor-pointer">
    <input type="checkbox" class="w-5 h-5 rounded border-slate-600 text-indigo-500 focus:ring-indigo-500">
    <span class="ml-3 text-slate-300">Ativar</span>
</label>
```

#### Radio

```html
<div class="flex gap-4">
    <label class="flex items-center cursor-pointer">
        <input type="radio" name="type" value="income" class="w-5 h-5 border-slate-600 text-indigo-500 focus:ring-indigo-500">
        <span class="ml-3 text-slate-300">Receita</span>
    </label>
    <label class="flex items-center cursor-pointer">
        <input type="radio" name="type" value="expense" class="w-5 h-5 border-slate-600 text-indigo-500 focus:ring-indigo-500">
        <span class="ml-3 text-slate-300">Despesa</span>
    </label>
</div>
```

### Cards

#### Card Simples

```html
<div class="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6 hover:shadow-2xl transition-all duration-300">
    <h3 class="text-xl font-bold text-slate-100 mb-2">Título do Card</h3>
    <p class="text-slate-400">Conteúdo do card</p>
</div>
```

#### Card com Gradiente

```html
<div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
    <h3 class="text-xl font-bold mb-2">Saldo Total</h3>
    <p class="text-4xl font-bold">R$ 5.430,00</p>
</div>
```

#### Card Estatístico

```html
<div class="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
    <div class="flex items-center justify-between mb-4">
        <h4 class="text-slate-400 text-sm font-semibold">Receitas do Mês</h4>
        <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z" clip-rule="evenodd"></path>
        </svg>
    </div>
    <p class="text-3xl font-bold text-slate-100">R$ 3.200,00</p>
    <p class="text-green-500 text-sm mt-2">+12% vs mês anterior</p>
</div>
```

### Badges/Tags

#### Sucesso

```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
    ✓ Ativa
</span>
```

#### Perigo

```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
    Inativa
</span>
```

#### Info

```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
    Receita
</span>
```

### Mensagens de Alerta

#### Sucesso

```html
<div class="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
    <div class="flex items-center">
        <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <p class="text-green-400 font-semibold">Operação realizada com sucesso!</p>
    </div>
</div>
```

#### Erro

```html
<div class="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
    <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <p class="text-red-400 font-semibold">Erro ao processar a requisição.</p>
    </div>
</div>
```

#### Aviso

```html
<div class="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4 mb-4">
    <div class="flex items-center">
        <svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 4v2"></path>
        </svg>
        <p class="text-amber-400 font-semibold">Atenção: Esta ação não pode ser desfeita.</p>
    </div>
</div>
```

### Tabelas

```html
<div class="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
    <table class="w-full">
        <thead class="bg-slate-700">
            <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Data
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Descrição
                </th>
                <th class="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Valor
                </th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-700">
            <tr class="hover:bg-slate-700 transition-colors duration-150">
                <td class="px-6 py-4 text-sm text-slate-300">25/10/2025</td>
                <td class="px-6 py-4 text-sm text-slate-100">Salário</td>
                <td class="px-6 py-4 text-sm text-right text-green-500 font-semibold">R$ 5.000,00</td>
            </tr>
        </tbody>
    </table>
</div>
```

### Navbar

```html
<nav class="bg-slate-900 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    Finanpy
                </h1>
            </div>
            <div class="flex space-x-4">
                <a href="#" class="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-all duration-200">
                    Dashboard
                </a>
                <a href="#" class="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-all duration-200">
                    Contas
                </a>
            </div>
        </div>
    </div>
</nav>
```

### Sidebar

```html
<aside class="w-64 bg-slate-900 border-r border-slate-800 h-screen">
    <div class="p-6">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-8">
            Finanpy
        </h2>
        <nav class="space-y-2">
            <a href="#" class="flex items-center px-4 py-3 text-slate-300 rounded-lg bg-slate-800 border border-slate-700">
                <span>Dashboard</span>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 transition-all duration-200">
                <span>Contas</span>
            </a>
        </nav>
    </div>
</aside>
```

## Grid System

### Responsive Grid

```html
<!-- 2 colunas -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>Coluna 1</div>
    <div>Coluna 2</div>
</div>

<!-- 3 colunas -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>Coluna 1</div>
    <div>Coluna 2</div>
    <div>Coluna 3</div>
</div>

<!-- 4 colunas -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
    <div>Card 4</div>
</div>
```

## Espaçamento Padrão

```css
/* Padding */
p-4  = 1rem     (16px)
p-6  = 1.5rem   (24px)
p-8  = 2rem     (32px)

/* Margin */
mb-4 = 1rem     (16px)
mb-6 = 1.5rem   (24px)
mb-8 = 2rem     (32px)

/* Gap (Grid/Flex) */
gap-4 = 1rem    (16px)
gap-6 = 1.5rem  (24px)
gap-8 = 2rem    (32px)
```

## Breakpoints Responsivos

```css
sm:  640px   /* Small devices */
md:  768px   /* Medium devices (tablets) */
lg:  1024px  /* Large devices (desktops) */
xl:  1280px  /* Extra large devices */
2xl: 1536px  /* 2X Extra large devices */
```

### Exemplo de Uso

```html
<!-- Mobile first -->
<div class="px-4 md:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <!-- Cards responsivos -->
    </div>
</div>
```

## Transições e Animações

### Hover Effects

```html
<!-- Mudar cor de fundo -->
<button class="hover:bg-slate-700 transition-all duration-200">
    Botão
</button>

<!-- Mudar escala -->
<button class="hover:scale-105 transition-transform duration-200">
    Botão
</button>

<!-- Mudar sombra -->
<div class="shadow-lg hover:shadow-2xl transition-shadow duration-300">
    Card
</div>

<!-- Múltiplos efeitos -->
<button class="hover:bg-slate-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
    Botão com múltiplos efeitos
</button>
```

## Gradientes

```html
<!-- Gradiente Linear -->
<div class="bg-gradient-to-r from-indigo-500 to-purple-600">
    Conteúdo
</div>

<!-- Gradiente Diagonal -->
<div class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    Conteúdo
</div>

<!-- Texto com Gradiente -->
<h1 class="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
    Título
</h1>
```

---

## Próximos Passos

- Consulte [Templates Django](./07-templates-django.md) para implementar componentes
- Veja [Comandos Úteis](./09-comandos-uteis.md) para compilar Tailwind
- Leia [Padrões de Código](./03-padroes-codigo.md) para boas práticas gerais

---

**Versão**: 1.0 | **Última atualização**: 25 de Outubro de 2025

# Frontend Tailwind Agent

Especialista em TailwindCSS, Design System e interface visual para Finanpy.

## 🎯 Propósito

Implementar componentes visuais, layouts responsivos e design system consistente usando TailwindCSS.

## 🛠️ Stack Tecnológico

- **TailwindCSS** (Utility-first CSS)
- **Dark Theme** (Slate color palette)
- **Responsive Design** (Mobile-first)
- **CSS Grid & Flexbox**
- **Gradientes e Animações**

## 📚 Documentação de Referência

**Essencial:**
- `docs/08-design-system.md` - Design System completo
- `docs/07-templates-django.md` - Integração com templates

**Complementar:**
- TailwindCSS Official Documentation
- Tailwind Color Palette Reference

## 🔧 Responsabilidades

### 1. Componentes
- ✓ Buttons (primário, secundário, danger, etc)
- ✓ Cards (simples, com gradiente, estatísticas)
- ✓ Inputs (text, email, password, select, textarea)
- ✓ Forms (layouts, validação, erros)
- ✓ Navigation (navbar, sidebar, menus)
- ✓ Alerts (success, error, warning, info)
- ✓ Badges/Tags
- ✓ Modals (futuro)

### 2. Design System
- ✓ Paleta de cores consistente
- ✓ Tipografia (Inter font family)
- ✓ Espaçamento (padding, margin, gap)
- ✓ Breakpoints responsivos
- ✓ Shadows e elevação
- ✓ Border radius
- ✓ Transições e animações

### 3. Layout
- ✓ Container principal
- ✓ Grid system responsivo
- ✓ Flexbox layouts
- ✓ Sidebar + Main content
- ✓ Full-width sections
- ✓ Hero sections
- ✓ Footer

### 4. Responsividade
- ✓ Mobile-first approach
- ✓ Breakpoints: sm, md, lg, xl, 2xl
- ✓ Touch-friendly (min-height 44px)
- ✓ Readable text on mobile
- ✓ Hamburger menus

### 5. Acessibilidade
- ✓ Color contrast (WCAG AA minimum)
- ✓ Focus states
- ✓ Semantic HTML
- ✓ Icon + text buttons
- ✓ Skip links

### 6. Performance
- ✓ CSS minificado
- ✓ Purge unused CSS
- ✓ Inline critical CSS
- ✓ Lazy loading de fonts

## 🎨 Design System Finanpy

### Paleta de Cores

#### Primária
```
Indigo-500:  #667eea
Indigo-600:  #5568d3
Purple-600:  #764ba2

Gradiente: from-indigo-500 to-purple-600
```

#### Background (Dark Theme)
```
Slate-900:  #0f172a (bg-primary)
Slate-800:  #1e293b (bg-secondary, cards)
Slate-700:  #334155 (bg-tertiary)
Slate-600:  #475569 (borders)
```

#### Text
```
Slate-50:   #f8fafc (text-primary)
Slate-300:  #cbd5e1 (text-secondary)
Slate-400:  #94a3b8 (text-muted)
```

#### Estado
```
Success: green-500   (#10b981)
Error:   red-500     (#ef4444)
Warning: amber-500   (#f59e0b)
Info:    blue-500    (#3b82f6)
```

### Tipografia
```
Font Family: 'Inter', system-ui
Weights:    400 (normal), 500 (medium), 600 (semibold), 700 (bold)
Sizes:      xs=12px, sm=14px, base=16px, lg=18px, xl=20px, 2xl=24px
```

### Espaçamento
```
Padding:  p-4 (1rem), p-6 (1.5rem), p-8 (2rem)
Margin:   mb-4 (1rem), mb-6 (1.5rem), mb-8 (2rem)
Gap:      gap-4 (1rem), gap-6 (1.5rem), gap-8 (2rem)
```

## 🎨 Componentes Padrão

### Button Primário
```html
<button class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
    Ação Principal
</button>
```

### Button Secundário
```html
<button class="px-6 py-3 bg-slate-700 text-slate-100 font-semibold rounded-lg border border-slate-600 hover:bg-slate-600 transition-all duration-200">
    Ação Secundária
</button>
```

### Button Danger
```html
<button class="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200">
    Deletar
</button>
```

### Card Simples
```html
<div class="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6 hover:shadow-2xl transition-all duration-300">
    <h3 class="text-xl font-bold text-slate-100 mb-2">Título</h3>
    <p class="text-slate-400">Conteúdo</p>
</div>
```

### Card com Gradiente
```html
<div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
    <h3 class="text-xl font-bold mb-2">Saldo Total</h3>
    <p class="text-3xl font-bold">R$ 5.430,00</p>
</div>
```

### Input Text
```html
<input
    type="text"
    class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
    placeholder="Digite aqui..."
>
```

### Select
```html
<select class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
    <option>Selecione</option>
</select>
```

### Alert Success
```html
<div class="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
    <div class="flex items-center">
        <svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="text-green-400 font-semibold">Sucesso!</p>
    </div>
</div>
```

### Badge
```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
    Ativa
</span>
```

### Navbar
```html
<nav class="bg-slate-900 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Finanpy
            </h1>
            <div class="flex space-x-4">
                <a href="#" class="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-all duration-200">
                    Dashboard
                </a>
            </div>
        </div>
    </div>
</nav>
```

## 📐 Grid & Layout Responsivo

### 2 Colunas Responsivas
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>Coluna 1</div>
    <div>Coluna 2</div>
</div>
```

### 3 Colunas Responsivas
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>Coluna 1</div>
    <div>Coluna 2</div>
    <div>Coluna 3</div>
</div>
```

### Container Padrão
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    Conteúdo limitado em width
</div>
```

## 🔄 Transições & Hover States

```html
{# Hover color change #}
<button class="hover:bg-slate-700 transition-all duration-200">
    Botão
</button>

{# Hover with scale #}
<button class="hover:scale-105 transition-transform duration-200">
    Botão
</button>

{# Hover with shadow #}
<div class="shadow-lg hover:shadow-2xl transition-shadow duration-300">
    Card
</div>

{# Múltiplos efeitos #}
<button class="hover:bg-slate-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
    Botão com múltiplos efeitos
</button>
```

## 🎬 Animações

```html
{# Fade in #}
<div class="animate-fade-in">
    Elemento
</div>

{# Spin (loading) #}
<svg class="animate-spin">
    <circle></circle>
</svg>

{# Pulse #}
<div class="animate-pulse">
    Loading...
</div>
```

## 📋 Checklist para Componente

- [ ] Segue design system (cores, espaçamento)
- [ ] Responsivo (mobile-first)
- [ ] Dark theme consistente
- [ ] Focus state para acessibilidade
- [ ] Contrast suficiente (WCAG AA)
- [ ] Transições smooth
- [ ] Hover states clara
- [ ] Sem hardcoded colors (use variables)
- [ ] Documentado em design-system.md

## 🎨 Common Patterns

### Form Layout
```html
<form class="space-y-4">
    <div>
        <label class="block text-slate-300 text-sm font-semibold mb-2">
            Campo
        </label>
        <input type="text" class="...">
    </div>

    <div class="flex gap-2">
        <button type="submit" class="btn btn-primary">
            Salvar
        </button>
        <button type="button" class="btn btn-secondary">
            Cancelar
        </button>
    </div>
</form>
```

### Card Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {% for item in items %}
        <div class="bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold mb-2">{{ item.name }}</h3>
            <p class="text-slate-400">{{ item.description }}</p>
        </div>
    {% endfor %}
</div>
```

### Hero Section
```html
<section class="bg-gradient-to-br from-indigo-500 to-purple-600 py-20">
    <div class="max-w-4xl mx-auto px-4 text-center text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Título Principal
        </h1>
        <p class="text-lg mb-8">
            Subtítulo ou descrição
        </p>
        <button class="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:shadow-xl transition-all">
            CTA
        </button>
    </div>
</section>
```

## 🔗 Integração com Outros Agentes

- **Frontend DTL Agent** - Coloca estes componentes em templates
- **QA/Tester Agent** - Valida responsividade e design
- **Backend Django Agent** - Fornece dados para componentes

## 📝 Padrão de Commits

```
feat(tailwind): criar componente de card de transação
refactor(design): atualizar paleta de cores
fix(responsive): corrigir layout em mobile
```

## 🚀 Comandos Principais

```bash
# Build Tailwind CSS
npm run build

# Watch mode
npm run watch

# Purge unused CSS (produção)
NODE_ENV=production npm run build
```

## 🎓 Best Practices

1. **Utility-First** - Use classes Tailwind, evite custom CSS
2. **Consistency** - Sempre usar design system
3. **Mobile-First** - Começar em mobile, expandir para desktop
4. **Accessibility** - Contrast, focus states, semantic HTML
5. **Performance** - Minificar, purge unused CSS
6. **Responsiveness** - Testar em múltiplos tamanhos
7. **Dark Theme** - Sempre considerar dark mode

---

**Versão**: 1.0
**Última atualização**: 25 de Outubro de 2025
**MCP Servers**: context7 (write CSS/HTML)

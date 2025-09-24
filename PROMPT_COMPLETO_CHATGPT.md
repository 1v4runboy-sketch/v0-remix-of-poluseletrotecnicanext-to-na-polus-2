# PROMPT COMPLETO - POLUS ELETROTÉCNICA - CATÁLOGO TÉCNICO

## VISÃO GERAL DO PROJETO

A **Polus Eletrotécnica** é uma empresa especializada em componentes elétricos industriais que possui um catálogo técnico online desenvolvido em **Next.js 14** com **App Router**. O site funciona como um **catálogo B2B** focado em **cotações via WhatsApp** ao invés de e-commerce tradicional.

## ARQUITETURA TÉCNICA

### Stack Tecnológico
- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Gerenciamento de Estado**: React Context API
- **Persistência**: localStorage (carrinho e orçamentos)
- **Deployment**: Vercel
- **Imagens**: WebP otimizadas

### Estrutura de Pastas
\`\`\`
/app                    # App Router do Next.js
  /avaliacoes          # Página de avaliações
  /carrinho            # Página do carrinho
  /contato             # Página de contato
  /loja                # Galeria da loja física
  /orcamento           # Sistema de orçamento alternativo
  /produto/[slug]      # Páginas dinâmicas de produtos
  globals.css          # Estilos globais + tema
  layout.tsx           # Layout raiz
  page.tsx             # Homepage

/components             # Componentes React
  /ui                  # Componentes shadcn/ui
  AddToCart.tsx        # Botão adicionar ao carrinho
  BrandCarousel.tsx    # Carrossel de marcas
  CartButton.tsx       # Contador do carrinho no header
  CartDrawer.tsx       # Drawer lateral do carrinho
  CartProvider.tsx     # Context do carrinho
  HeaderShell.tsx      # Cabeçalho principal
  ProductCard.tsx      # Card de produto
  ProductListPageClient.tsx # Lista de produtos
  WhatsFloat.tsx       # Botão flutuante WhatsApp
  InstagramFloat.tsx   # Botão flutuante Instagram

/lib                   # Utilitários e dados
  brands.ts           # Definição das marcas
  cart.ts             # Lógica do carrinho
  products.ts         # Base de dados dos produtos
  site.ts             # Configurações e utilitários
  withCards.ts        # Processamento de produtos
\`\`\`

## PRODUTOS E CATÁLOGO

### Categorias Principais
1. **Cabos Elétricos**
   - Cabos de Silicone (02AWG a 22AWG, 200°C, 600V)
   - Cabos Lides (02AWG a 22AWG, 130°C, 600V)

2. **Capacitores**
   - Permanentes 250VAC (2µF a 100µF)
   - Permanentes 380/400VAC (2µF a 100µF)
   - Permanentes 440/450VAC (2µF a 100µF)
   - Eletrolíticos diversos

3. **Rolamentos**
   - NSK DDU (modelos 605, 606, 607, 608, etc.)
   - HCH (diversos modelos)

4. **Tintas e Vernizes WEG**
   - Diversas cores e códigos específicos
   - Vernizes e diluentes

5. **Isolantes e Materiais**
   - Espaguetes termocontráteis
   - Fitas isolantes
   - Materiais diversos

6. **Acamadores**
   - Tamanhos: Micro, Pequeno, Médio, Grande

7. **Bases de Motor WEG**
   - Para motores 42W, 48W, 56W
   - Tamanhos: Pequena, Média, Grande, Extragrande

8. **Componentes Diversos**
   - Soldas
   - Brackets Jacuzzi
   - Barbantes encerados
   - Fitas lineares

### Estrutura de Dados dos Produtos
\`\`\`typescript
type Product = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  category: string;
  subcategory: string;
  shortDescription?: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  variants?: Array<{
    id: string;
    label: string;
    unit: 'm' | 'kg' | 'un';
    minQty?: number;
    stepQty?: number;
    attrs?: Record<string, any>;
  }>;
  techSpecs?: any;
}
\`\`\`

### Marcas Representadas
- **NSK**: Rolamentos e componentes
- **HCH**: Componentes industriais  
- **WEG**: Motores e componentes elétricos
- **CIFA Fios e Linhas**: Materiais têxteis
- **iGUi**: Equipamentos para piscinas
- **Jacuzzi**: Equipamentos para piscinas e spas
- **JL Capacitores**: Capacitores
- **LANC Comercial**: Componentes comerciais
- **Solda Cobix**: Soldas
- **Tramar**: Componentes industriais
- **Cofibam**: Materiais elétricos
- **Dancor**: Componentes elétricos
- **Condupasqua**: Componentes industriais
- **Kohlbach**: Componentes especializados
- **DSantis**: Platinados WEG similares

## SISTEMA DE CARRINHO E ORÇAMENTOS

### Arquitetura do Carrinho
- **Provider Pattern**: `CartProvider` gerencia estado global
- **Persistência**: localStorage com chave `polus:cart:v1`
- **Context API**: Compartilhamento entre componentes
- **Drawer Responsivo**: Interface lateral para visualização

### Funcionalidades do Carrinho
1. **Adicionar Produtos**
   - Suporte a variações (tamanho, modelo, AWG, etc.)
   - Validação de quantidades mínimas
   - Diferentes unidades (metros, kg, unidades)

2. **Gerenciar Itens**
   - Ajustar quantidades
   - Remover itens individuais
   - Limpar carrinho completo

3. **Interface do Usuário**
   - Drawer lateral com overlay
   - Contador visual no header
   - Escape key para fechar
   - Prevenção de scroll da página

4. **Geração de Orçamentos**
   - Texto formatado automaticamente
   - Observações opcionais
   - Link direto para WhatsApp

### Fluxo de Orçamento
\`\`\`
1. Cliente navega e encontra produto
2. Seleciona variação e quantidade
3. Adiciona ao carrinho (drawer abre automaticamente)
4. Revisa itens e ajusta se necessário
5. Adiciona observações opcionais
6. Clica "Solicitar cotação no WhatsApp"
7. Abre WhatsApp com mensagem pré-formatada
\`\`\`

### Exemplo de Mensagem Gerada
\`\`\`
Olá! Gostaria de uma cotação:
1) Cabo Lides 02AWG • COFIBAM • 130°C 600V
   Quantidade: 50 m
2) Base Motor WEG 42W • Pequena
   Quantidade: 2 un

Obs.: Preciso para entrega urgente
\`\`\`

## SISTEMA DE BUSCA E FILTROS

### Funcionalidades de Busca
- **Busca por texto**: Título, categoria, subcategoria
- **Filtros por categoria**: Organização hierárquica
- **Filtros por marca**: Seleção múltipla
- **Busca global**: Autocomplete inteligente

### Normalização de Dados
- Remoção de acentos para busca
- Tokenização inteligente
- Matching por padrões regex
- Busca em metadados de imagens

## SISTEMA DE MARCAS

### Resolução Automática de Marcas
O sistema possui lógica inteligente para identificar marcas:

1. **Por campo explícito**: `product.brand`
2. **Por regras de negócio**: Padrões específicos
3. **Por tokens**: Matching em título/categoria
4. **Fallback**: Marca Polus como padrão

### Regras de Negócio Específicas
\`\`\`typescript
// Exemplos de regras automáticas:
- Capacitores → JL CAPACITORES
- Cabos Lides → COFIBAM  
- Cabos Silicone → TRAMAR
- Barbante Encerado → CIFA FIOS E LINHAS
- Platinados WEG Similar → DSANTIS
- Caixas de Ligação WEG → WEG
\`\`\`

## SISTEMA DE VARIAÇÕES

### Tipos de Variações
1. **Cabos**: AWG (02AWG, 04AWG, etc.)
2. **Capacitores**: Microfarads e voltagem
3. **Rolamentos**: Modelos numéricos (605, 606, etc.)
4. **Bases de Motor**: Potência e tamanho
5. **Tintas WEG**: Códigos de cor específicos

### Unidades Suportadas
- **metros (m)**: Cabos e fios
- **quilos (kg)**: Materiais por peso
- **unidades (un)**: Peças individuais

### Validações
- Quantidades mínimas por variação
- Incrementos específicos (steps)
- Atributos customizados por produto

## INTERFACE E UX

### Design System
- **Cores**: Sistema de 3-5 cores máximo
- **Tipografia**: Máximo 2 famílias de fonte
- **Layout**: Mobile-first, flexbox prioritário
- **Tema**: Claro/escuro com variáveis CSS

### Componentes Principais
1. **ProductCard**: Exibição de produtos
2. **BrandCarousel**: Carrossel de marcas
3. **HeaderShell**: Navegação principal
4. **CartDrawer**: Interface do carrinho
5. **AddToCart**: Botão com variações

### Responsividade
- Design mobile-first
- Breakpoints Tailwind padrão
- Drawer adaptável por tela
- Imagens otimizadas WebP

## INTEGRAÇÃO WHATSAPP

### Configuração
- Número: +55 11 3599-2935
- Função: `whatsappHref()` para gerar links
- Encoding: URL encoding automático
- Formato: `https://wa.me/NUMERO?text=MENSAGEM`

### Casos de Uso
1. **Carrinho**: Cotação completa
2. **Produto individual**: Cotação específica
3. **Contato geral**: Mensagem livre
4. **Botão flutuante**: Acesso rápido

## OTIMIZAÇÕES E PERFORMANCE

### SEO
- Metadados dinâmicos por página
- Open Graph configurado
- Structured data (JSON-LD)
- Sitemap automático

### Performance
- Imagens WebP otimizadas
- Lazy loading de imagens
- Code splitting automático
- Caching de dados estáticos

### Acessibilidade
- ARIA labels apropriados
- Navegação por teclado
- Contraste adequado
- Screen reader friendly

## FUNCIONALIDADES ESPECIAIS

### Cards Unificados
Produtos similares agrupados em um card:
- Acamadores (Micro, Pequeno, Médio, Grande)
- Tintas WEG (por código de cor)
- Capacitores (por voltagem)

### Sistema de Temas
- Tema claro/escuro
- Variáveis CSS customizadas
- Persistência no localStorage
- Toggle animado (Uiverse)

### Botões Flutuantes
- WhatsApp: Contato direto
- Instagram: Rede social
- Posicionamento fixo
- Z-index elevado

## ESTRUTURA DE DADOS COMPLETA

### Exemplo de Produto Completo
\`\`\`typescript
{
  "id": "cabo-silicone-02awg",
  "slug": "cabo-silicone-02awg-200c-600v",
  "title": "Cabo Silicone 02AWG 200°C 600V",
  "brand": "TRAMAR",
  "category": "Cabos Elétricos",
  "subcategory": "Cabos de Silicone",
  "shortDescription": "Cabo flexível em silicone para alta temperatura",
  "images": [
    {
      "src": "/produtos/cabo-silicone-02awg-1.webp",
      "alt": "Cabo Silicone 02AWG"
    }
  ],
  "variants": [
    {
      "id": "02awg-vermelho",
      "label": "02AWG Vermelho",
      "unit": "m",
      "minQty": 1,
      "stepQty": 1,
      "attrs": {
        "awg": "02",
        "color": "Vermelho",
        "temp": "200°C",
        "voltage": "600V"
      }
    }
  ]
}
\`\`\`

## FLUXOS DE USUÁRIO PRINCIPAIS

### 1. Busca de Produto
\`\`\`
Homepage → Busca/Filtro → Lista de Produtos → Produto Individual → Adicionar ao Carrinho
\`\`\`

### 2. Navegação por Categoria
\`\`\`
Homepage → Carrossel de Marcas → Filtro por Marca → Produtos da Marca → Cotação
\`\`\`

### 3. Orçamento Completo
\`\`\`
Múltiplos Produtos → Carrinho → Revisão → Observações → WhatsApp → Negociação
\`\`\`

## CONFIGURAÇÕES E VARIÁVEIS

### Variáveis de Ambiente
- `NEXT_PUBLIC_SITE_URL`: URL base do site
- Configurações de deployment Vercel

### Configurações do Site
\`\`\`typescript
export const SITE = {
  instagram: 'https://www.instagram.com/_poluseletrotecnica/',
  whatsappNumber: '+551135992935',
  // ... outras configurações
}
\`\`\`

## MANUTENÇÃO E ATUALIZAÇÕES

### Adição de Produtos
1. Atualizar `/lib/products.ts`
2. Adicionar imagens em `/public/produtos/`
3. Configurar variações se necessário
4. Testar busca e filtros

### Adição de Marcas
1. Atualizar `/lib/brands.ts`
2. Adicionar logo em `/public/marcas/`
3. Configurar regras de negócio em `/lib/site.ts`
4. Testar resolução automática

### Modificações de Layout
1. Componentes em `/components/`
2. Estilos globais em `/app/globals.css`
3. Configuração Tailwind em `tailwind.config.ts`
4. Testar responsividade

## CONSIDERAÇÕES IMPORTANTES

### Modelo de Negócio
- **B2B**: Foco em profissionais e empresas
- **Cotações**: Não há preços públicos
- **WhatsApp**: Canal principal de vendas
- **Relacionamento**: Atendimento personalizado

### Público-Alvo
- Eletricistas profissionais
- Empresas de manutenção
- Indústrias
- Oficinas especializadas

### Diferenciais Técnicos
- Catálogo técnico detalhado
- Especificações precisas
- Múltiplas variações por produto
- Sistema inteligente de marcas
- Interface otimizada para mobile

---

**IMPORTANTE**: Este é um sistema complexo e bem estruturado. Qualquer modificação deve considerar:
1. Impacto na experiência do usuário
2. Compatibilidade com sistema de carrinho
3. Funcionamento da busca e filtros
4. Resolução automática de marcas
5. Responsividade mobile
6. Performance e SEO

O projeto está otimizado para conversão via WhatsApp e atende especificamente ao mercado B2B de componentes elétricos industriais.

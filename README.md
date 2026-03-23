# ⬡ SENAI · MVF v5

**Aplicativo de estudos para Medição de Variáveis Físicas Industriais**  
Desenvolvido para o curso técnico do SENAI — cobre Pressão, Nível, Vazão e Temperatura com fórmulas interativas, simuladores, flashcards e quiz.

---

## 🚀 Como usar

Não precisa de servidor, instalação nem internet contínua (fontes carregam uma vez online).

1. Baixe os 4 arquivos e coloque na **mesma pasta**:
   ```
   senai-mvf/
   ├── index.html
   ├── style.css
   ├── data.js
   └── script.js
   ```
2. Abra `index.html` no navegador (Chrome, Edge ou Firefox)
3. Pronto — tudo funciona localmente

---

## 📁 Estrutura dos Arquivos

| Arquivo | Tamanho | Responsabilidade |
|---|---|---|
| `index.html` | ~1.410 linhas | Toda a estrutura HTML — 18 telas, navegação, formulários |
| `style.css` | ~1.000 linhas | CSS completo — tema escuro/claro, responsivo, animações |
| `data.js` | ~136 linhas | Arrays de dados — 66 flashcards e 46 questões de quiz |
| `script.js` | ~630 linhas | Toda a lógica — navegação, tema, flashcards, quiz, calculadoras, simuladores |

---

## 🧭 Conteúdo

### Módulos de Teoria
| # | Módulo | Conteúdo |
|---|---|---|
| 01 | Fundamentos | PV · MV · SP · Sinais 4–20 mA · Analogias do cotidiano |
| 02 | Malha de Controle | Aberta vs fechada · Ação PID |
| 03 | Instrumentação | Range · LRV · URV · Span · Acurácia · Histerese |
| 04 | Erros de Medição | EA · ER · %FS · %Span · %Leitura |

### Variáveis de Processo
| # | Módulo | Conteúdo |
|---|---|---|
| 05 | Pressão | Pascal · Bar · PSI · Manômetro Bourdon · Transmissor piezoresistivo |
| 06 | Nível | Coluna hidrostática · Boia · Ultrassom · Radar FMCW |
| 07 | Vazão | Placa de orifício · Eletromagnético · Vórtex · Coriolis · Reynolds |
| 08 | Temperatura ★ | Termopar Tipo K/J · PT100 · RTD · Transmissores · Thermowell |

### Conexões & Prática
| # | Módulo | Conteúdo |
|---|---|---|
| 09 | Relações P·N·Q | Como pressão, nível e vazão se interconectam |
| 10 | Cenários Reais | Caldeira · ETA · Reator químico com análise passo a passo |
| 11 | Calibração ★ | Procedimento · As Found/As Left · INMETRO · Rastreabilidade |
| — | Fórmulas Visuais | Diagramas SVG interativos com highlight por variável |

### Ferramentas de Estudo
- **Flashcards** — 66 cards em 8 categorias com flip 3D e filtro por categoria
- **Quiz** — 46 questões com 4 alternativas, feedback imediato e explicação
- **Calculadora** — 9 fórmulas: Stevin, Nível por pressão, Reynolds, Torricelli, Erro absoluto, %FS, Acurácia, Conversor de temperatura, Lei dos Gases
- **Simuladores** — Continuidade e Bernoulli em tempo real, com variável desconhecida selecionável (P₁, P₂, V₁ ou V₂)

---

## ⚡ Simulador de Bernoulli

O diferencial desta versão: você escolhe **qual variável calcular** antes de inserir os dados.

```
Calcular: [ P₂ ]  [ V₂ ]  [ P₁ ]  [ V₁ ]
```

Selecione a variável desconhecida → informe as 3 conhecidas → resultado aparece em tempo real.

**Fórmulas inversas implementadas:**

| Calcular | Fórmula |
|---|---|
| P₂ | `P₂ = P₁ + ρ·(V₁²−V₂²)/2 + ρ·g·(h₁−h₂)` |
| V₂ | `V₂ = √[ V₁² + 2(P₁−P₂)/ρ + 2g·(h₁−h₂) ]` |
| P₁ | `P₁ = P₂ + ρ·(V₂²−V₁²)/2 + ρ·g·(h₂−h₁)` |
| V₁ | `V₁ = √[ V₂² + 2(P₂−P₁)/ρ + 2g·(h₂−h₁) ]` |

---

## 🃏 Flashcards — Categorias

| Categoria | Cards | Tópicos cobertos |
|---|---|---|
| Conceitos | 11 | PV, SP, MV, PID, live zero, acurácia, histerese |
| Erros | 5 | EA, %FS, %Span, offset, calibração |
| Pressão | 8 | P=F/A, Stevin, Bernoulli, Bourdon, manométrica vs absoluta |
| Vazão | 11 | Qv, Qm, Reynolds, Venturi, medidores, placa de orifício |
| Relações | 7 | Interação P·N·Q, ETA, caldeira, interação de malhas |
| Nível | 4 | Métodos, radar FMCW, densidade variável |
| Temperatura | 9 | Termopar, Seebeck, PT100, RTD, conexão 4 fios |
| Calibração | 11 | As Found, As Left, tolerância, rastreabilidade, 5 pontos |

---

## 🎨 Interface

### Tema claro/escuro
Botão ☀/☾ no topo — preferência salva entre sessões via `localStorage`.

### Responsivo
- **Desktop** (>1300 px): navegação completa no topbar
- **Médio** (901–1300 px): setas de scroll no nav
- **Mobile** (≤900 px): menu drawer lateral, grid adaptado, tipografia fluida

### Tipografia fluida
```css
html { font-size: clamp(13px, 1.2vw + 10px, 15px); }
```
Escala automática entre mobile e desktop sem media queries por elemento.

---

## 🗂️ Histórico de Versões

| Versão | O que mudou |
|---|---|
| v5.0 | Versão base — 11 módulos, 54 flashcards, 38 questões, 9 calculadoras |
| v5.1 | Tema claro/escuro · Layout responsivo · Menu mobile |
| v5.2 | Fórmulas com diagramas SVG interativos · Simuladores em tempo real · Sem MathJax |
| v5.3 | Seções "Você já viu isso" · Mapa de variáveis em M1 · +12 flashcards · +8 questões |
| v5.4 | Dashboard reorganizado · Bernoulli com variável desconhecida · Histórico em linguagem de usuário |

---

## 🛠️ Tecnologias

- **HTML5** puro — sem frameworks
- **CSS3** — variáveis CSS, `clamp()`, Grid, Flexbox, animações
- **JavaScript** ES6 — sem bibliotecas externas
- **Fontes** — IBM Plex Sans + IBM Plex Mono (Google Fonts)
- **Hospedagem** — GitHub Pages (Jekyll desabilitável com `.nojekyll`)

### Para desabilitar o Jekyll no GitHub Pages
Crie um arquivo vazio chamado `.nojekyll` na raiz do repositório — o GitHub Pages servirá os arquivos estáticos diretamente sem processar nada.

---

## 📐 Fórmulas Implementadas

```
P = F / A                           Pressão fundamental
ΔP = ρ × g × h                     Stevin — pressão hidrostática
h = P / (ρ × g)                    Nível a partir da pressão
Qv = S × v                         Vazão volumétrica
Qm = ρ × Qv                        Vazão mássica
Re = (ρ × v × D) / μ               Número de Reynolds
v = √(2gh)                         Torricelli — saída por gravidade
P₁/ρ + v₁²/2 + g·h₁ = P₂/ρ + v₂²/2 + g·h₂   Bernoulli
A₁·V₁ = A₂·V₂                     Equação da Continuidade
P₁V₁/T₁ = P₂V₂/T₂                Lei dos Gases combinada
EA = Indicado − Real               Erro absoluto
%FS = (EA / FS) × 100              Erro percentual fundo de escala
V = α × (T_quente − T_fria)        Efeito Seebeck — termopar
R(T) = R₀ × (1 + α × T)           PT100 — resistência vs temperatura
```

---

## 📄 Licença

Desenvolvido para uso educacional — SENAI · Medição de Variáveis Físicas Industriais.

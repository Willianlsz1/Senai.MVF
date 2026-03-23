# ⬡ SENAI · MVF v5.5

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
| `index.html` | ~1.613 linhas | Toda a estrutura HTML — 18 telas, navegação, formulários |
| `style.css` | ~1.000 linhas | CSS completo — tema escuro/claro, responsivo, animações |
| `data.js` | ~157 linhas | Arrays de dados — 78 flashcards e 53 questões de quiz |
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
| 08 | Temperatura ★ | Escalas · 12 tipos de sensores · PT100 com ligações 2/3/4 fios · 7 tipos de termopar · Seebeck · Cabo compensação · Junção fria · τ |

### Conexões & Prática
| # | Módulo | Conteúdo |
|---|---|---|
| 09 | Relações P·N·Q | Como pressão, nível e vazão se interconectam |
| 10 | Cenários Reais | Caldeira · ETA · Reator químico com análise passo a passo |
| 11 | Calibração ★ | Procedimento · As Found/As Left · INMETRO · Rastreabilidade |
| — | Fórmulas Visuais | Diagramas SVG interativos com highlight por variável |

### Ferramentas de Estudo
- **Flashcards** — 78 cards em 8 categorias com flip 3D e filtro por categoria
- **Quiz** — 53 questões com 4 alternativas, feedback imediato e explicação detalhada
- **Calculadora** — 9 fórmulas: Stevin, Nível por pressão, Reynolds, Torricelli, Erro absoluto, %FS, Acurácia, Conversor de temperatura, Lei dos Gases
- **Simuladores** — Continuidade e Bernoulli em tempo real, com variável desconhecida selecionável (P₁, P₂, V₁ ou V₂)

---

## 🌡️ Módulo Temperatura — Conteúdo Detalhado (v5.5)

O módulo foi completamente expandido com base nos slides 159–234 do material oficial SENAI.

### Escalas Termométricas
Tabela comparativa com pontos fixos nas três escalas (zero absoluto, fusão do gelo, ebulição) e todas as fórmulas de conversão em ambos os sentidos.

### Comparação de 12 Sensores
| Sensor | Princípio | Faixa | Sinal |
|---|---|---|---|
| Bimetálico | Dilatação diferencial | −50°C a +500°C | Mecânico |
| Vidro (haste) | Dilatação de líquido | −150°C a +350°C | Visual |
| Bulbo-capilar | Pressão do fluido | variável | Mecânico |
| Termistor NTC | Resistência cerâmica cai com T | −100°C a +300°C | Ω |
| Termistor PTC | Resistência sobe abruptamente | estreita | Ω |
| PT100 (RTD) | Resistência da platina | −200°C a +850°C | Ω |
| Termopar K | Efeito Seebeck | 0°C a +1260°C | mV |
| Termopar J | Efeito Seebeck | 0°C a +760°C | mV |
| Termopar E | Efeito Seebeck | 0°C a +870°C | mV |
| Termopar T | Efeito Seebeck | −184°C a +370°C | mV |
| Termopar S/R | Efeito Seebeck (nobre) | 0°C a +1480°C | mV |
| Termopar B | Efeito Seebeck (nobre) | +870°C a +1705°C | mV |

### PT100 — Ligações 2, 3 e 4 Fios
| Ligação | Erro do cabo | Uso |
|---|---|---|
| 2 fios | Rc1+Rc2 somados — não compensado | Baixa precisão, curtas distâncias |
| 3 fios ★ | Cancelamento por subtração | Padrão industrial |
| 4 fios | Zero — independente do cabo | Laboratório, metrologia |

### Classes de Tolerância PT100
| Classe | Fórmula | Exemplo a 200°C |
|---|---|---|
| AA | ±[0,1 + 0,0017×T] °C | ±0,44°C |
| A | ±[0,15 + 0,002×T] °C | ±0,55°C |
| B | ±[0,3 + 0,005×T] °C | ±1,30°C |

### Termopar — 7 Tipos
| Tipo | Materiais | Faixa | FEM máx |
|---|---|---|---|
| K | Cromel / Alumel | 0–1260°C | 50,99 mV |
| J | Ferro / Constantan | 0–760°C | 42,92 mV |
| E | Cromel / Constantan | 0–870°C | 66,47 mV |
| T | Cobre / Constantan | −184–370°C | 19,03 mV |
| S | Pt90%Rh10% / Pt | 0–1480°C | 15,34 mV |
| R | Pt87%Rh13% / Pt | 0–1480°C | 17,16 mV |
| B | Pt70%Rh30% / Pt94%Rh6% | 870–1705°C | 12,49 mV |

---

## ⚡ Simulador de Bernoulli

Você escolhe **qual variável calcular** antes de inserir os dados.

```
Calcular: [ P₂ ]  [ V₂ ]  [ P₁ ]  [ V₁ ]
```

Selecione a variável desconhecida → informe as 3 conhecidas → resultado aparece em tempo real na barra destacada (verde para S2, ciano para S1).

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
| **Temperatura** | **21** | Escalas, sensores, PT100 ligações 2/3/4 fios, classes A/B/AA, Seebeck, 7 tipos de termopar, cabo extensão vs compensação, junção fria, τ, NTC/PTC |
| Calibração | 11 | As Found, As Left, tolerância, rastreabilidade, 5 pontos |
| **Total** | **78** | |

---

## 🎨 Interface

### Tema claro/escuro
Botão ☀/☾ no topo — preferência salva entre sessões via `localStorage`.

### Dashboard organizado em 4 seções
- **Teoria** — módulos 01–04
- **Variáveis de Processo** — 4 cards com barra lateral colorida por variável
- **Conexões & Prática** — Relações, Cenários, Calibração, Fórmulas
- **Ferramentas de Estudo** — linhas horizontais com acesso rápido (Flashcards, Quiz, Calculadora, Simuladores)

### Responsivo
- **Desktop** (>1300 px): navegação completa no topbar
- **Médio** (901–1300 px): setas de scroll no nav
- **Mobile** (≤900 px): menu drawer lateral, grid adaptado, tipografia fluida

### Tipografia fluida
```css
html { font-size: clamp(13px, 1.2vw + 10px, 15px); }
```

---

## 🗂️ Histórico de Versões

| Versão | O que mudou |
|---|---|
| v5.0 | Versão base — 11 módulos, 54 flashcards, 38 questões, 9 calculadoras |
| v5.1 | Tema claro/escuro · Layout responsivo · Menu mobile · Fix bug de transição CSS |
| v5.2 | Fórmulas com diagramas SVG interativos · Simuladores Continuidade e Bernoulli em tempo real · Sem MathJax |
| v5.3 | Seções "Você já viu isso" · Mapa de variáveis em M1 · +12 flashcards · +8 questões |
| v5.4 | Dashboard reorganizado em 4 seções · Bernoulli com variável desconhecida selecionável · Barra de resultado full-width · Resultado muda de cor por variável |
| **v5.5** | **Módulo Temperatura completo** · Escalas com pontos fixos · 12 sensores comparados · PT100: Callendar-Van Dusen, tabela de valores, classes AA/A/B, ligações 2/3/4 fios · NTC vs PTC · 7 tipos de termopar com materiais e FEM · Cabo extensão vs compensação · Compensação de junção fria · Constante de tempo τ · +12 flashcards · +7 questões · README e changelog atualizados |

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
P = F / A                                        Pressão fundamental
ΔP = ρ × g × h                                  Stevin — pressão hidrostática
h = P / (ρ × g)                                 Nível a partir da pressão
Qv = S × v                                      Vazão volumétrica
Qm = ρ × Qv                                     Vazão mássica
Re = (ρ × v × D) / μ                            Número de Reynolds
v = √(2gh)                                      Torricelli — saída por gravidade
P₁/ρ + v₁²/2 + g·h₁ = P₂/ρ + v₂²/2 + g·h₂    Bernoulli
A₁·V₁ = A₂·V₂                                  Equação da Continuidade
P₁V₁/T₁ = P₂V₂/T₂                             Lei dos Gases combinada
EA = Indicado − Real                             Erro absoluto
%FS = (EA / FS) × 100                           Erro percentual fundo de escala
°F = (°C × 9/5) + 32                            Conversão Celsius → Fahrenheit
°C = 5/9 × (°F − 32)                            Conversão Fahrenheit → Celsius
K = °C + 273,15                                 Conversão Celsius → Kelvin
V = α × (T_quente − T_fria)                     Efeito Seebeck — termopar
R(T) = R₀ × [1 + A×T + B×T²]                   Callendar-Van Dusen — PT100 (0°C a 850°C)
Erro_A = ±[0,15 + 0,002×T] °C                  Tolerância PT100 Classe A
Erro_B = ±[0,3 + 0,005×T] °C                   Tolerância PT100 Classe B
```

---

## 📄 Licença

Desenvolvido para uso educacional — SENAI · Medição de Variáveis Físicas Industriais.

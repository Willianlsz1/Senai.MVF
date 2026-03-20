/* ============================================================
   SENAI · MVFI — app.js
   Medição de Variáveis Físicas Industriais
   Organizado por:
     1. Constants & Data (FC, QZ)
     2. State
     3. Navigation
     4. UI: Tabs
     5. UI: Flashcards
     6. UI: Quiz
     7. Calculators: Pressão
     8. Calculators: Nível
     9. Calculators: Vazão
    10. Calculators: Temperatura
    11. Init
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────
   1. CONSTANTS & DATA
   ───────────────────────────────────────── */

/** Accent color per module (CSS variable reference) */
const MODULE_ACCENT = {
  pressao:    'var(--pressao)',
  nivel:      'var(--nivel)',
  vazao:      'var(--vazao)',
  temperatura:'var(--temperatura)',
};

/** All module slugs */
const MODULES = Object.keys(MODULE_ACCENT);

/** Tab identifiers per module (order matches DOM nav button order) */
const MODULE_TABS = ['teoria', 'formulas', 'playground', 'calc', 'instrumentos', 'flashcards', 'quiz'];

/**
 * Flashcard dataset
 * Structure: { [module]: Array<{ f: string, b: string }> }
 */
const FLASHCARDS = {
  pressao: [
    {
      f: 'O que é pressão manométrica?',
      b: 'Diferença entre a pressão do fluido e a pressão atmosférica local.\nP_man = P_abs − P_atm.\nÉ a "pressão de trabalho" lida em manômetros industriais.',
    },
    {
      f: 'Fórmula da pressão absoluta',
      b: 'P_abs = P_atm + P_man\nSempre positiva, medida a partir do vácuo perfeito (zero absoluto de pressão).',
    },
    {
      f: 'Qual o princípio do Tubo de Bourdon?',
      b: 'Deformação elástica: tubo metálico curvado se deforma ao receber pressão interna. Extremidade livre move ponteiro via setor dentado. Inventado por Eugène Bourdon (1849).',
    },
    {
      f: 'Sinais de saída de transmissores industriais',
      b: 'Analógico: 4–20 mA (4 mA = 0%, 20 mA = 100%)\nDigital: HART, Foundation Fieldbus, Profibus PA, WirelessHART',
    },
    {
      f: 'Lei de Stevin — o que estabelece?',
      b: 'Em fluido incompressível estático, a pressão cresce linearmente com a profundidade:\nP = ρ · g · h\nA pressão independe da forma do recipiente.',
    },
    {
      f: 'Quais os 5 tipos de pressão industrial?',
      b: '1. Atmosférica\n2. Manométrica (relativa)\n3. Absoluta\n4. Vácuo\n5. Diferencial',
    },
    {
      f: 'Conversão: 1 bar em outras unidades',
      b: '1 bar = 100 kPa = 14,504 psi = 1,0197 kgf/cm² = 750,06 mmHg = 10,197 mca',
    },
    {
      f: 'O que é um transmissor capacitivo de pressão?',
      b: 'O diafragma defleta entre duas placas, alterando a capacitância (C = ε·A/d). Alta estabilidade de longo prazo, baixa deriva térmica. Rosemount 3051 usa este princípio.',
    },
  ],

  nivel: [
    {
      f: 'Fórmula para nível por pressão hidrostática',
      b: 'h = P / (ρ · g)\nh = nível (m), P = pressão no fundo (Pa), ρ = densidade (kg/m³), g = 9,81 m/s²',
    },
    {
      f: 'Como o radar FMCW mede nível?',
      b: 'Emite microondas com frequência variando linearmente no tempo. A diferença de frequência entre o sinal emitido e o refletido é proporcional à distância. Precisão ±1 mm.',
    },
    {
      f: 'Diferença entre nível estático e dinâmico',
      b: 'Estático: altura do fluido em repouso (sem bombeamento).\nDinâmico: altura durante operação. Fundamental para avaliar capacidade de recarga em poços.',
    },
    {
      f: 'O que é medição de nível diferencial?',
      b: 'Dois transmissores de pressão (tomada baixa e alta) medem ΔP = P_baixo − P_alto.\nCompensa pressão interna do vaso. h = ΔP/(ρ·g). Usado em vasos pressurizados.',
    },
    {
      f: 'Como funciona o medidor de nível capacitivo?',
      b: 'A capacitância entre eletrodo metálico e parede do tanque varia com o nível do dielétrico entre eles (C = ε₀·ε_r·A/d). Funciona para sólidos granulados, líquidos e pastas.',
    },
    {
      f: 'Qual norma rege medição de nível em tanques de petróleo?',
      b: 'API MPMS (Manual of Petroleum Measurement Standards), Capítulo 3: Tank Gauging. Para medição manual (régua) e automática (radar, flutuador).',
    },
    {
      f: 'O que são URV e LRV?',
      b: 'Upper Range Value (URV): valor de 100% da escala → sinal 20 mA\nLower Range Value (LRV): valor de 0% → sinal 4 mA\nSpan = URV − LRV',
    },
    {
      f: 'Volume em tanque cilíndrico vertical',
      b: 'V = π · r² · h = π · (D/2)² · h\nV em m³, r = raio (m), D = diâmetro (m), h = nível (m)',
    },
  ],

  vazao: [
    {
      f: 'O que estabelece a Equação da Continuidade?',
      b: 'Em escoamento incompressível: Q = A₁·v₁ = A₂·v₂\nConservação de massa: o que entra deve sair. Seção menor → velocidade maior.',
    },
    {
      f: 'Equação de Bernoulli — o que representa cada termo?',
      b: 'P + ½ρv² + ρgh = cte\nP = energia de pressão\n½ρv² = energia cinética por volume\nρgh = energia potencial gravitacional\nVálida para escoamento ideal, incompressível, sem viscosidade.',
    },
    {
      f: 'Regimes pelo Número de Reynolds',
      b: 'Re < 2300: Laminar — perfil parabólico, ordeiro\n2300 < Re < 4000: Transição — instável\nRe > 4000: Turbulento — mistura intensa, perfil quase plano',
    },
    {
      f: 'Por que Q ∝ √ΔP em medidores deprimogênios?',
      b: 'De Bernoulli: v = √(2·ΔP/ρ).\nEntão Q = A·v = A·√(2·ΔP/ρ).\nPortanto Q é proporcional à raiz quadrada do ΔP medido.',
    },
    {
      f: 'Qual a vantagem do medidor Coriolis sobre outros?',
      b: 'Mede diretamente a vazão mássica (kg/h) com precisão ±0,1%. Também mede densidade e temperatura. Referência para faturamento. Sem perfil de escoamento necessário.',
    },
    {
      f: 'Fórmula do Número de Reynolds',
      b: 'Re = (ρ · v · D) / μ = (v · D) / ν\nρ = densidade, v = velocidade, D = diâmetro, μ = visc. dinâmica, ν = visc. cinemática',
    },
    {
      f: 'O que é o coeficiente de descarga Cd?',
      b: 'Relação entre a vazão real e a teórica (ideal). Cd < 1 devido a efeitos de contração, fricção e vena contracta.\nPlaca de orifício: Cd ≈ 0,61\nVenturi: Cd ≈ 0,984',
    },
    {
      f: 'Norma para medição por placa de orifício',
      b: 'ISO 5167-2:2022 — Measurement of fluid flow using pressure differential devices — Orifice plates.\nTambém: AGA-3 (gás natural, americana).',
    },
  ],

  temperatura: [
    {
      f: 'Conversão: 100°C em Kelvin e Fahrenheit',
      b: 'Kelvin: K = 100 + 273,15 = 373,15 K (ponto de ebulição da água)\nFahrenheit: °F = 100 × 9/5 + 32 = 212°F',
    },
    {
      f: 'Resistência da PT100 a 0°C e a 100°C',
      b: 'A 0°C: R = 100 Ω\nA 100°C: R ≈ 138,51 Ω\nVariação: ΔR = 38,51 Ω para ΔT = 100°C\nα médio = 0,003850 Ω/Ω/°C (IEC 60751)',
    },
    {
      f: 'Qual termopar tem maior sensibilidade (μV/°C)?',
      b: 'Tipo E (Chromel-Constantan): ~52 μV/°C — maior sensibilidade.\nTipo K: ~41 μV/°C (mais universal).\nTipo S: ~10 μV/°C (menor, mas alcança 1760°C).',
    },
    {
      f: 'O que é a junta de referência (fria) do termopar?',
      b: 'A extremidade do termopar cuja temperatura é conhecida e controlada. A FEM medida depende de AMBAS as junções: T_q e T_f. Transmissores modernos compensam eletronicamente T_f (Cold Junction Compensation).',
    },
    {
      f: 'Efeito Seebeck — equação',
      b: 'V = S_AB · (T_q − T_f)\nV = FEM em mV, S_AB = coeficiente de Seebeck (μV/°C), T_q = junção quente, T_f = junção fria',
    },
    {
      f: 'Diferença entre PT100 ligação 2, 3 e 4 fios',
      b: '2 fios: resistência do cabo soma-se à leitura (erro)\n3 fios: compensa parcialmente a resistência do cabo\n4 fios: eliminação total do erro do cabo — padrão para laboratórios e alta precisão',
    },
    {
      f: 'Norma da PT100 e classes de precisão',
      b: 'IEC 60751:2022\nClasse AA: ±0,1°C a 0°C (mais precisa)\nClasse A: ±0,15°C a 0°C\nClasse B: ±0,3°C a 0°C (mais comum em processos)',
    },
    {
      f: 'Como funciona um pirômetro de radiação?',
      b: 'Mede radiação infravermelha emitida pelo objeto (Lei Stefan-Boltzmann: E = ε·σ·T⁴). Sem contato. Aplica-se emissividade ε do material. Ideal para objetos em movimento, temperaturas extremas ou locais inacessíveis.',
    },
  ],
};

/**
 * Quiz dataset
 * Structure: { [module]: Array<{ q, opts, a, e }> }
 *   q: question, opts: options[], a: correct index, e: explanation
 */
const QUIZ_DATA = {
  pressao: [
    {
      q: 'P = F/A. Se F = 2000 N e A = 0,4 m², qual é a pressão?',
      opts: ['5000 Pa', '500 Pa', '8000 Pa', '2400 Pa'],
      a: 0,
      e: 'P = 2000/0,4 = 5000 Pa = 5 kPa.',
    },
    {
      q: 'Qual o sinal analógico padrão de transmissores industriais?',
      opts: ['0–10 mA', '0–20 mA', '4–20 mA', '1–5 V'],
      a: 2,
      e: '4–20 mA é o padrão. 4 mA = 0% (permite detectar fio partido) e 20 mA = 100%.',
    },
    {
      q: 'A pressão absoluta é sempre:',
      opts: ['Igual à manométrica', 'Menor que a manométrica', 'Maior ou igual a zero', 'Negativa em vácuo'],
      a: 2,
      e: 'P_abs = P_atm + P_man. Como P_atm > 0, P_abs ≥ 0 mesmo em vácuo.',
    },
    {
      q: 'Qual sensor mecânico de pressão usa deformação de tubo curvado?',
      opts: ['Diafragma', 'Fole (Bellows)', 'Tubo de Bourdon', 'Strain Gauge'],
      a: 2,
      e: 'O Tubo de Bourdon (1849) é o sensor mecânico mais usado. O tubo metálico curvado se deforma com pressão interna.',
    },
    {
      q: 'Pela Lei de Stevin, P = ρgh. Qual a pressão a 10 m de profundidade na água (ρ=1000 kg/m³)?',
      opts: ['9810 Pa', '1000 Pa', '100 Pa', '98100 Pa'],
      a: 3,
      e: 'P = 1000 × 9,81 × 10 = 98.100 Pa ≈ 98 kPa ≈ 0,98 bar.',
    },
    {
      q: 'O transmissor capacitivo de pressão funciona medindo:',
      opts: [
        'Deformação de fio de platina',
        'Variação de capacitância com deflexão do diafragma',
        'Carga elétrica de cristal piezoelétrico',
        'Variação de indutância',
      ],
      a: 1,
      e: 'No transmissor capacitivo, o diafragma defleta entre placas, alterando C = ε·A/d.',
    },
    {
      q: '1 bar equivale a quantos kPa?',
      opts: ['1 kPa', '10 kPa', '100 kPa', '1000 kPa'],
      a: 2,
      e: '1 bar = 100 kPa = 10⁵ Pa. Relação fundamental de conversão.',
    },
  ],

  nivel: [
    {
      q: 'Um tanque com água (ρ=1000 kg/m³) mede 49,05 kPa no fundo. Qual o nível?',
      opts: ['2 m', '5 m', '10 m', '0,5 m'],
      a: 1,
      e: 'h = P/(ρ·g) = 49.050/(1000×9,81) = 5,0 m.',
    },
    {
      q: 'Qual tecnologia de medição de nível usa microondas?',
      opts: ['Ultrassônico', 'Radar FMCW', 'Capacitivo', 'Boia magnética'],
      a: 1,
      e: 'Radar FMCW (Frequency Modulated Continuous Wave) usa microondas (6–80 GHz). Precisão ±1 mm, imune a vapores.',
    },
    {
      q: 'Para medir nível em vaso pressurizado (com vapor acima), usa-se:',
      opts: [
        'Transmissor simples no fundo',
        'Medição diferencial — tomada alta e baixa',
        'Apenas régua manual',
        'Somente ultrassom',
      ],
      a: 1,
      e: 'A medição diferencial compensa a pressão interna do vaso. h = (P_baixo − P_alto)/(ρ·g).',
    },
    {
      q: 'Qual o URV de um transmissor para um tanque de 4 m d\'água?',
      opts: ['4 kPa', '39,24 kPa', '4000 Pa', '400 mbar'],
      a: 1,
      e: 'URV = ρ·g·h_max = 1000×9,81×4 = 39.240 Pa = 39,24 kPa. Este valor corresponde a 20 mA.',
    },
    {
      q: 'Volume de um tanque cilíndrico com D=2 m e nível h=3 m:',
      opts: ['6 m³', '9,42 m³', '12,57 m³', '18,85 m³'],
      a: 1,
      e: 'V = π·r²·h = π×1²×3 = 9,42 m³.',
    },
    {
      q: 'O TDR (Guided Wave Radar) é superior ao ultrassom em:',
      opts: [
        'Custo',
        'Funcionar em presença de espuma, vapor e interfaces',
        'Instalação mais simples',
        'Menor consumo de energia',
      ],
      a: 1,
      e: 'TDR usa cabo/haste guia, sendo imune a espumas, vapores e interfaces líquido-líquido que confundem o ultrassom.',
    },
  ],

  vazao: [
    {
      q: 'Pela equação da continuidade, se D₁=100 mm, D₂=50 mm e v₁=1 m/s, qual é v₂?',
      opts: ['1 m/s', '2 m/s', '4 m/s', '8 m/s'],
      a: 2,
      e: 'A₁v₁=A₂v₂ → v₂=v₁·(D₁/D₂)²=1×(100/50)²=4 m/s.',
    },
    {
      q: 'Bernoulli (h₁=h₂): P₁=200 kPa, v₁=1 m/s, ρ=1000 kg/m³, v₂=3 m/s. Qual P₂?',
      opts: ['196 kPa', '204 kPa', '200 kPa', '208 kPa'],
      a: 0,
      e: 'P₂ = P₁ + ½ρ(v₁²−v₂²) = 200000 + ½×1000×(1−9) = 196.000 Pa = 196 kPa.',
    },
    {
      q: 'Re = 5000. Qual o regime de escoamento?',
      opts: ['Laminar', 'Transição', 'Turbulento', 'Indefinido'],
      a: 2,
      e: 'Re > 4000 → escoamento turbulento. Na indústria a maioria das tubulações opera em regime turbulento.',
    },
    {
      q: 'Qual medidor NÃO requer que o fluido seja condutor elétrico?',
      opts: ['Eletromagnético (Mag-Flow)', 'Coriolis', 'Ambos exigem', 'Apenas o Mag-Flow'],
      a: 1,
      e: 'O Coriolis mede pela força inercial em tubo vibratório — qualquer fluido. O Mag-Flow exige condutividade elétrica.',
    },
    {
      q: 'Vazão de tubulação D=100 mm, v=2 m/s. Qual é Q em m³/h?',
      opts: ['0,056 m³/h', '5,65 m³/h', '56,5 m³/h', '0,565 m³/h'],
      a: 2,
      e: 'A = π/4×0,1² = 0,00785 m²; Q = 0,00785×2 = 0,01571 m³/s × 3600 = 56,5 m³/h.',
    },
    {
      q: 'Por que Q ∝ √ΔP para medidores deprimogênios?',
      opts: [
        'Porque ΔP² = Q',
        'De Bernoulli: v = √(2ΔP/ρ), logo Q = A·v ∝ √ΔP',
        'Porque Cd é constante',
        'Por causa da Lei de Stevin',
      ],
      a: 1,
      e: 'De Bernoulli: ½ρv² = ΔP → v = √(2ΔP/ρ). Q = Cd·A·v ∝ √ΔP.',
    },
    {
      q: 'Qual norma rege medição por placa de orifício?',
      opts: ['IEC 60751', 'ABNT NBR 14050', 'ISO 5167-2', 'API MPMS Cap.3'],
      a: 2,
      e: 'ISO 5167-2:2022 — Measurement of fluid flow — Orifice plates.',
    },
  ],

  temperatura: [
    {
      q: 'Qual a resistência da PT100 a 100°C?',
      opts: ['100 Ω', '138,51 Ω', '200 Ω', '113,85 Ω'],
      a: 1,
      e: 'R(100) ≈ 100×(1 + 3,9083×10⁻³×100) ≈ 138,51 Ω (simplificado linear).',
    },
    {
      q: 'Converter −40°C para Fahrenheit:',
      opts: ['−40°F', '0°F', '−72°F', '−104°F'],
      a: 0,
      e: '°F = −40 × 9/5 + 32 = −72 + 32 = −40°F. Ponto único onde °C = °F!',
    },
    {
      q: 'O termopar tipo K é composto por:',
      opts: ['Ferro e Constantan', 'Cobre e Constantan', 'Chromel e Alumel', 'Platina e Ródio'],
      a: 2,
      e: 'Tipo K: Chromel (+) e Alumel (−). Faixa −270 a +1372°C. Sensibilidade ≈ 41 μV/°C.',
    },
    {
      q: 'Ligação de 4 fios na PT100 serve para:',
      opts: [
        'Aumentar o range de medição',
        'Eliminar completamente o erro da resistência dos cabos',
        'Dobrar a sensibilidade',
        'Reduzir ruído eletromagnético',
      ],
      a: 1,
      e: 'Na ligação 4 fios, dois fios injetam corrente e dois medem tensão. A resistência dos fios não afeta (método de 4 pontas de Kelvin).',
    },
    {
      q: 'Temperatura de 500°C em Kelvin:',
      opts: ['226,85 K', '773,15 K', '500 K', '273,15 K'],
      a: 1,
      e: 'K = °C + 273,15 = 500 + 273,15 = 773,15 K.',
    },
    {
      q: 'Qual tipo de termopar usa AMBOS os fios de Platina-Ródio?',
      opts: ['Tipo K', 'Tipo S', 'Tipo B', 'Tipo R'],
      a: 2,
      e: 'Tipo B: Pt-Rh 6% (+) e Pt-Rh 30% (−). Alcança 1820°C. Insensível abaixo de 50°C.',
    },
    {
      q: 'Cold Junction Compensation (CJC) serve para:',
      opts: [
        'Proteger contra curto-circuito',
        'Compensar eletronicamente a temperatura da junção fria (referência)',
        'Aumentar o sinal de saída',
        'Filtrar ruído elétrico',
      ],
      a: 1,
      e: 'O transmissor mede T_fria e compensa matematicamente, obtendo T_quente absoluta.',
    },
  ],
};

/* ─────────────────────────────────────────
   2. STATE
   ───────────────────────────────────────── */

/**
 * Module status enum
 * 'new'    → never opened
 * 'active' → opened but quiz not finished
 * 'done'   → quiz completed with ≥60% score
 */
const STATUS = { NEW: 'new', ACTIVE: 'active', DONE: 'done' };

const State = {
  currentModule: null,
  totalScore:    0,

  /** Quiz state per module */
  quiz: Object.fromEntries(
    MODULES.map(m => [m, { idx: 0, correct: 0, answered: false, done: false }])
  ),

  /** Flashcard state per module */
  flashcard: Object.fromEntries(
    MODULES.map(m => [m, { idx: 0, flipped: false }])
  ),

  /** Progress 0-100 per module */
  progress: Object.fromEntries(MODULES.map(m => [m, 0])),

  /** Status per module */
  status: Object.fromEntries(MODULES.map(m => [m, STATUS.NEW])),
};

/* ─────────────────────────────────────────
   3. NAVIGATION
   ───────────────────────────────────────── */

/**
 * Open a module content view.
 * Also transitions status from 'new' → 'active'
 * and refreshes the card's visual state.
 * @param {string} mod - module slug
 */
function openMod(mod) {
  State.currentModule = mod;

  // Promote from new → active on first visit
  if (State.status[mod] === STATUS.NEW) {
    State.status[mod] = STATUS.ACTIVE;
    refreshCardState(mod);
  }

  DOM.home.style.display    = 'none';
  DOM.modGrid.style.display = 'none';
  DOM.content.style.display = 'block';

  document.querySelectorAll('.mod-content').forEach(el => (el.style.display = 'none'));
  document.getElementById(`mod-${mod}`).style.display = 'block';

  initFlashcard(mod);
  initQuiz(mod);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Return to home / module grid */
function goHome() {
  DOM.content.style.display   = 'none';
  DOM.home.style.display      = 'block';
  DOM.modGrid.style.display   = 'grid';
  State.currentModule         = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update a module card's visual state (status badge, CTA label,
 * CSS class, progress bar, aria-valuenow).
 * Called whenever status or progress changes.
 * @param {string} mod
 */
function refreshCardState(mod) {
  const card        = document.querySelector(`.module-card[data-m="${mod}"]`);
  const statusEl    = document.getElementById(`status-${mod}`);
  const ctaEl       = document.getElementById(`cta-${mod}`);
  const progressBar = document.getElementById(`prog-${mod}`);
  const progressWrap = progressBar?.parentElement;
  const pct          = State.progress[mod];
  const status       = State.status[mod];

  if (!card) return;

  // — CSS class state —
  card.classList.remove('is-active', 'is-done');
  if (status === STATUS.ACTIVE) card.classList.add('is-active');
  if (status === STATUS.DONE)   card.classList.add('is-done');

  // — Status badge —
  if (statusEl) {
    const labels = {
      [STATUS.NEW]:    { text: 'Novo',        cls: 'module-card__status--new' },
      [STATUS.ACTIVE]: { text: 'Em progresso', cls: 'module-card__status--active' },
      [STATUS.DONE]:   { text: 'Concluído',    cls: 'module-card__status--done' },
    };
    const { text, cls } = labels[status];
    statusEl.textContent = text;
    statusEl.className   = `module-card__status ${cls}`;
  }

  // — CTA label —
  if (ctaEl) {
    const ctaLabels = {
      [STATUS.NEW]:    'Iniciar módulo',
      [STATUS.ACTIVE]: `Continuar — ${pct}% completo`,
      [STATUS.DONE]:   'Revisar módulo',
    };
    ctaEl.textContent = ctaLabels[status];
  }

  // — Progress bar —
  if (progressBar) {
    progressBar.style.width = `${pct}%`;
  }

  // — ARIA —
  if (progressWrap) {
    progressWrap.setAttribute('aria-valuenow', pct);
  }
}

/* ─────────────────────────────────────────
   4. UI: TABS
   ───────────────────────────────────────── */

/**
 * Switch visible tab within a module
 * @param {string} mod  - module slug
 * @param {string} tabId - tab identifier (e.g. 'teoria')
 */
function switchTab(mod, tabId) {
  const bar = document.getElementById(`tabs-${mod}`);

  bar.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll(`#mod-${mod} .tab-panel`).forEach(p => p.classList.remove('active'));

  const panel = document.getElementById(`${mod}-${tabId}`);
  if (panel) panel.classList.add('active');

  const tabIndex = MODULE_TABS.indexOf(tabId);
  if (tabIndex >= 0 && bar.children[tabIndex]) {
    bar.children[tabIndex].classList.add('active');
  }
}

/* ─────────────────────────────────────────
   5. UI: FLASHCARDS
   ───────────────────────────────────────── */

/**
 * Initialize flashcard if not already done
 * @param {string} mod
 */
function initFlashcard(mod) {
  const container = document.getElementById(`fc-${mod}`);
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = '1';
  renderFlashcard(mod);
}

/**
 * Render current flashcard for a module
 * @param {string} mod
 */
function renderFlashcard(mod) {
  const container = document.getElementById(`fc-${mod}`);
  const cards     = FLASHCARDS[mod];
  const st        = State.flashcard[mod];
  const card      = cards[st.idx];
  const accent    = MODULE_ACCENT[mod];
  const total     = cards.length;

  container.innerHTML = `
    <div class="flashcard-scene" onclick="flipFlashcard('${mod}')">
      <div class="flashcard-inner" id="fc-inner-${mod}">

        <div class="flashcard-face">
          <div class="flashcard-face__label">Pergunta ${st.idx + 1} / ${total}</div>
          <div class="flashcard-face__content">${card.f}</div>
          <div class="flashcard-face__hint">👆 Clique para ver a resposta</div>
        </div>

        <div class="flashcard-face flashcard-face--back" style="--ac:${accent}">
          <div class="flashcard-face__label">Resposta</div>
          <div class="flashcard-face__content" style="white-space:pre-line;font-size:14px">${card.b}</div>
        </div>

      </div>
    </div>

    <div class="flashcard-nav">
      <button class="btn btn--secondary" onclick="prevFlashcard('${mod}')" ${st.idx === 0 ? 'disabled' : ''}>← Anterior</button>
      <span class="flashcard-nav__counter">${st.idx + 1} / ${total}</span>
      <button class="btn btn--secondary" onclick="nextFlashcard('${mod}')" ${st.idx === total - 1 ? 'disabled' : ''}>Próximo →</button>
    </div>
  `;

  st.flipped = false;
}

function flipFlashcard(mod) {
  const inner = document.getElementById(`fc-inner-${mod}`);
  State.flashcard[mod].flipped = !State.flashcard[mod].flipped;
  inner.classList.toggle('flipped', State.flashcard[mod].flipped);
}

function nextFlashcard(mod) {
  State.flashcard[mod].idx++;
  renderFlashcard(mod);
}

function prevFlashcard(mod) {
  State.flashcard[mod].idx--;
  renderFlashcard(mod);
}

/* ─────────────────────────────────────────
   6. UI: QUIZ
   ───────────────────────────────────────── */

/**
 * Initialize quiz state and render first question
 * @param {string} mod
 */
function initQuiz(mod) {
  const container = document.getElementById(`quiz-${mod}`);
  if (!container) return;
  State.quiz[mod] = { idx: 0, correct: 0, answered: false, done: false };
  renderQuiz(mod);
}

/**
 * Render current quiz question or result screen
 * @param {string} mod
 */
function renderQuiz(mod) {
  const container = document.getElementById(`quiz-${mod}`);
  const st        = State.quiz[mod];

  if (st.done) { renderQuizResult(mod); return; }

  const questions = QUIZ_DATA[mod];
  const q         = questions[st.idx];
  const accent    = MODULE_ACCENT[mod];
  const pct       = ((st.idx / questions.length) * 100).toFixed(0);

  container.innerHTML = `
    <div class="quiz-wrap">
      <div class="quiz__meta">
        <span>Questão ${st.idx + 1} de ${questions.length}</span>
        <span>✅ ${st.correct} corretas</span>
      </div>
      <div class="quiz__progress">
        <div class="quiz__progress-fill" style="width:${pct}%;background:${accent}"></div>
      </div>
      <div class="quiz__card">
        <div class="quiz__question">${q.q}</div>
        <div class="quiz__options" id="opts-${mod}">
          ${q.opts.map((opt, i) => `
            <button class="quiz__option" onclick="answerQuiz('${mod}', ${i})">${opt}</button>
          `).join('')}
        </div>
        <div class="quiz__feedback" id="fb-${mod}"></div>
        <div class="quiz__nav">
          <span></span>
          <button
            class="btn btn--primary"
            id="nxt-${mod}"
            style="display:none"
            onclick="nextQuestion('${mod}')"
          >
            ${st.idx < questions.length - 1 ? 'Próxima →' : 'Ver resultado 🏆'}
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Handle quiz answer selection
 * @param {string} mod
 * @param {number} chosen - index of chosen option
 */
function answerQuiz(mod, chosen) {
  const st = State.quiz[mod];
  if (st.answered) return;
  st.answered = true;

  const q    = QUIZ_DATA[mod][st.idx];
  const opts = document.querySelectorAll(`#opts-${mod} .quiz__option`);
  const fb   = document.getElementById(`fb-${mod}`);
  const btn  = document.getElementById(`nxt-${mod}`);

  opts.forEach(o => o.classList.add('disabled'));

  if (chosen === q.a) {
    opts[chosen].classList.add('correct');
    fb.className   = 'quiz__feedback ok';
    fb.textContent = `✅ Correto! ${q.e}`;
    st.correct++;
    addScore(10);
  } else {
    opts[chosen].classList.add('wrong');
    opts[q.a].classList.add('correct');
    fb.className   = 'quiz__feedback bad';
    fb.textContent = `❌ Incorreto. ${q.e}`;
  }

  fb.style.display  = 'block';
  btn.style.display = 'inline-block';

  updateModuleProgress(mod);
}

function nextQuestion(mod) {
  const st = State.quiz[mod];
  st.answered = false;

  if (st.idx < QUIZ_DATA[mod].length - 1) {
    st.idx++;
    renderQuiz(mod);
  } else {
    st.done = true;
    renderQuizResult(mod);
  }
}

function renderQuizResult(mod) {
  const container = document.getElementById(`quiz-${mod}`);
  const st        = State.quiz[mod];
  const total     = QUIZ_DATA[mod].length;
  const pct       = Math.round((st.correct / total) * 100);
  const accent    = MODULE_ACCENT[mod];

  // Finalise progress + status when result is rendered
  State.quiz[mod].done = true;
  updateModuleProgress(mod);

  const message =
    pct >= 80 ? '🎉 Excelente! Domínio completo do módulo!' :
    pct >= 60 ? '👍 Bom resultado! Revise os pontos errados.' :
    '📚 Continue estudando! Revise a teoria e tente novamente.';

  container.innerHTML = `
    <div class="quiz__result">
      <div style="font-size:52px">🏆</div>
      <div class="quiz__result-score" style="color:${accent}">${st.correct}/${total}</div>
      <div class="quiz__result-msg">
        ${message}<br>
        <small style="color:var(--muted2)">${pct}% de acerto</small>
      </div>
      <button class="btn btn--primary" onclick="initQuiz('${mod}')" style="background:${accent}">
        Tentar novamente
      </button>
    </div>
  `;
}

/* Score helpers */
function addScore(points) {
  State.totalScore += points;
  DOM.scoreDisplay.textContent = `${State.totalScore} pts`;
}

/**
 * Update progress percentage and status for a module,
 * then refresh the card's visual state.
 * Status → 'done' when quiz score ≥ 60%.
 * @param {string} mod
 */
function updateModuleProgress(mod) {
  const total   = QUIZ_DATA[mod].length;
  const correct = State.quiz[mod].correct;
  const pct     = Math.round((correct / total) * 100);

  State.progress[mod] = pct;

  // Promote to done when a full quiz pass scores ≥ 60%
  if (State.quiz[mod].done && pct >= 60 && State.status[mod] !== STATUS.DONE) {
    State.status[mod] = STATUS.DONE;
  } else if (State.status[mod] === STATUS.NEW) {
    State.status[mod] = STATUS.ACTIVE;
  }

  refreshCardState(mod);
}

/* ─────────────────────────────────────────
   7. CALCULATORS: PRESSÃO
   ───────────────────────────────────────── */

/** Pressure units to Pascal conversion factors */
const UNIT_TO_PA = {
  Pa: 1,
  kPa: 1e3,
  MPa: 1e6,
  bar: 1e5,
  atm: 101325,
  psi: 6894.76,
  kgfcm2: 98066.5,
  mmHg: 133.322,
  mca: 9806.65,
};

/** P = F / A */
function calcPressaoFA() {
  const F = parseFloat(document.getElementById('cp_F').value);
  const A = parseFloat(document.getElementById('cp_A').value);

  hideEl('err_pressao_fa');

  if (isNaN(F) || isNaN(A) || A === 0) {
    showEl('err_pressao_fa');
    return;
  }

  const P = F / A;
  document.getElementById('cp_P').value = `${fmt(P)} Pa`;

  showResult('res_pressao_fa', {
    value: fmt(P),
    unit:  'Pa',
    detail: [
      `Cálculo: P = ${F} / ${A} = ${fmt(P)} Pa`,
      `Conversões: ${fmt(P / 1000)} kPa | ${fmt(P / 1e5)} bar | ${fmt(P / 6894.76)} psi`,
    ].join('\n'),
  });
}

/** P = ρ·g·h — Hydrostatic (Stevin) */
function calcStevin() {
  const rho = parseFloat(document.getElementById('cs_rho').value);
  const h   = parseFloat(document.getElementById('cs_h').value);
  if (isNaN(rho) || isNaN(h)) return;

  const P = rho * 9.81 * h;

  showResult('res_stevin', {
    value: fmt(P),
    unit:  'Pa',
    detail: [
      `P = ${rho} × 9,81 × ${h} = ${fmt(P)} Pa`,
      `${fmt(P / 1000)} kPa | ${fmt(P / 1e5)} bar | ${fmt(P / 101325)} atm | ${fmt(P / 6894.76)} psi`,
      `Pressão absoluta (+ 1 atm): ${fmt(P / 1000 + 101.325)} kPa`,
    ].join('\n'),
  });
}

function setFluidDens() {
  const sel = document.getElementById('cs_fluido');
  const rho = document.getElementById('cs_rho');
  if (sel.value !== 'custom') rho.value = sel.value;
}

/** Pressure unit converter */
function calcConv() {
  const v    = parseFloat(document.getElementById('conv_val').value);
  const from = document.getElementById('conv_from').value;
  const to   = document.getElementById('conv_to').value;
  if (isNaN(v)) return;

  const Pa  = v * UNIT_TO_PA[from];
  const res = Pa / UNIT_TO_PA[to];

  showResult('res_conv', {
    value: fmt(res),
    unit:  to,
    detail: [
      `${v} ${from} = ${fmt(Pa)} Pa = ${fmt(res)} ${to}`,
      Object.entries(UNIT_TO_PA)
        .map(([u, f]) => `${fmt(Pa / f)} ${u}`)
        .join(' | '),
    ].join('\n'),
  });
}

/* ─────────────────────────────────────────
   8. CALCULATORS: NÍVEL
   ───────────────────────────────────────── */

function setNivelDens() {
  const sel = document.getElementById('cn_fluido');
  const rho = document.getElementById('cn_rho');
  if (sel.value !== 'custom') rho.value = sel.value;
}

/** h = P / (ρ·g) */
function calcNivel() {
  const rho = parseFloat(document.getElementById('cn_rho').value);
  const P   = parseFloat(document.getElementById('cn_P').value) * 1000;
  if (isNaN(rho) || isNaN(P)) return;

  const h = P / (rho * 9.81);

  showResult('res_nivel', {
    value: fmt(h),
    unit:  'm',
    detail: [
      `h = ${P} Pa / (${rho} × 9,81) = ${fmt(h)} m`,
      `= ${fmt(h * 100)} cm | ${fmt(h * 1000)} mm`,
      `Pressão em mmca: ${fmt(P / 9.80665)} mmca`,
    ].join('\n'),
  });
}

/** V = π·r²·h for vertical cylindrical tank */
function calcVolume() {
  const D = parseFloat(document.getElementById('cv_D').value);
  const h = parseFloat(document.getElementById('cv_h').value);
  const H = parseFloat(document.getElementById('cv_H').value);
  if (isNaN(D) || isNaN(h)) return;

  const r    = D / 2;
  const V    = Math.PI * r * r * h;
  const Vmax = isNaN(H) ? null : Math.PI * r * r * H;
  const pct  = Vmax ? ((V / Vmax) * 100).toFixed(1) : null;

  showResult('res_vol', {
    value: fmt(V),
    unit:  'm³',
    detail: [
      `V = π × ${r}² × ${h} = ${fmt(V)} m³ = ${fmt(V * 1000)} L`,
      pct ? `Volume máximo: ${fmt(Vmax)} m³ | Percentual: ${pct}%` : '',
      pct ? `Massa (água, ρ=1000): ${fmt(V * 1000)} kg` : '',
    ].filter(Boolean).join('\n'),
  });
}

/* ─────────────────────────────────────────
   9. CALCULATORS: VAZÃO
   ───────────────────────────────────────── */

function setReyDens() {
  const val = document.getElementById('cr_fluido').value;
  if (val === 'custom,custom') return;
  const [rho, mu] = val.split(',');
  document.getElementById('cr_rho').value = rho;
  document.getElementById('cr_mu').value  = mu;
}

/** Re = ρ·v·D / μ */
function calcReynolds() {
  const rho = parseFloat(document.getElementById('cr_rho').value);
  const mu  = parseFloat(document.getElementById('cr_mu').value);
  const v   = parseFloat(document.getElementById('cr_v').value);
  const D   = parseFloat(document.getElementById('cr_D').value);
  if ([rho, mu, v, D].some(isNaN) || mu === 0) return;

  const Re = (rho * v * D) / mu;

  const regime =
    Re < 2300  ? '🟢 LAMINAR — escoamento ordenado, perfil parabólico' :
    Re < 4000  ? '🟡 TRANSIÇÃO — regime instável' :
                 '🔴 TURBULENTO — mistura intensa, perfil quase plano';

  showResult('res_re', {
    value: fmt(Re, 6),
    unit:  '',
    detail: [
      `Re = ${rho} × ${v} × ${D} / ${mu} = ${fmt(Re, 6)}`,
      `\nRegime: ${regime}`,
      `\nν = μ/ρ = ${fmt(mu / rho, 4)} m²/s`,
    ].join('\n'),
  });
}

/** Bernoulli: v₂ from P₁, P₂, v₁ (horizontal tube) */
function calcBernoulli() {
  const P1  = parseFloat(document.getElementById('cb_P1').value) * 1000;
  const P2  = parseFloat(document.getElementById('cb_P2').value) * 1000;
  const v1  = parseFloat(document.getElementById('cb_v1').value);
  const rho = parseFloat(document.getElementById('cb_rho').value);
  if ([P1, P2, v1, rho].some(isNaN)) return;

  const v2sq = v1 * v1 + (2 * (P1 - P2)) / rho;

  if (v2sq < 0) {
    showResult('res_bern', {
      value: 'Impossível',
      unit: '',
      detail: 'ΔP muito grande para v₁ fornecida — violaria Bernoulli.',
    });
    return;
  }

  const v2 = Math.sqrt(v2sq);

  showResult('res_bern', {
    value: fmt(v2),
    unit:  'm/s',
    detail: [
      `v₂ = √(v₁² + 2·ΔP/ρ) = √(${fmt(v1 * v1)} + ${fmt(2 * (P1 - P2) / rho)}) = ${fmt(v2)} m/s`,
      `ΔP = ${fmt((P1 - P2) / 1000)} kPa`,
      `Q (D=100mm): ${fmt(Math.PI / 4 * 0.01 * v2 * 3600)} m³/h`,
    ].join('\n'),
  });
}

/** Continuity: v₂ = A₁·v₁ / A₂ */
function calcContinuidade() {
  const D1 = parseFloat(document.getElementById('cc_D1').value) / 1000;
  const v1 = parseFloat(document.getElementById('cc_v1').value);
  const D2 = parseFloat(document.getElementById('cc_D2').value) / 1000;
  if ([D1, v1, D2].some(isNaN) || D2 === 0) return;

  const A1 = Math.PI / 4 * D1 * D1;
  const A2 = Math.PI / 4 * D2 * D2;
  const v2 = (A1 * v1) / A2;
  const Q  = A1 * v1;

  showResult('res_cont', {
    value: fmt(v2),
    unit:  'm/s',
    detail: [
      `v₂ = (D₁/D₂)²·v₁ = (${D1*1000}/${D2*1000})²×${v1} = ${fmt(v2)} m/s`,
      `Q = A₁·v₁ = ${fmt(Q * 3600)} m³/h`,
      `Relação de velocidades: v₂/v₁ = ${fmt(v2 / v1)}`,
    ].join('\n'),
  });
}

/** Q = A·v, Qm = Q·ρ */
function calcVazao() {
  const D   = parseFloat(document.getElementById('cq_D').value) / 1000;
  const v   = parseFloat(document.getElementById('cq_v').value);
  const rho = parseFloat(document.getElementById('cq_rho').value);
  if ([D, v, rho].some(isNaN)) return;

  const A  = Math.PI / 4 * D * D;
  const Q  = A * v;
  const Qm = Q * rho;

  showResult('res_qv', {
    value: fmt(Q * 3600),
    unit:  'm³/h',
    detail: [
      `A = π/4 × ${D * 1000}mm² = ${fmt(A * 1e6, 4)} mm²`,
      `Q = ${fmt(Q * 3600)} m³/h = ${fmt(Q * 1000)} L/s = ${fmt(Q * 60000)} L/min`,
      `Qm = Q × ρ = ${fmt(Qm * 3600)} kg/h = ${fmt(Qm * 3.6)} ton/h`,
    ].join('\n'),
  });
}

/* ─────────────────────────────────────────
   10. CALCULATORS: TEMPERATURA
   ───────────────────────────────────────── */

let _tempLock = false;

/** Real-time multi-scale temperature converter */
function convTemp(src) {
  if (_tempLock) return;
  _tempLock = true;

  const fields = {
    C: document.getElementById('tc_C'),
    K: document.getElementById('tc_K'),
    F: document.getElementById('tc_F'),
    R: document.getElementById('tc_R'),
  };

  let c;
  switch (src) {
    case 'C': c = parseFloat(fields.C.value); break;
    case 'K': c = parseFloat(fields.K.value) - 273.15; break;
    case 'F': c = (parseFloat(fields.F.value) - 32) * 5 / 9; break;
    case 'R': c = (parseFloat(fields.R.value) - 491.67) * 5 / 9; break;
  }

  if (!isNaN(c)) {
    if (src !== 'C') fields.C.value = fmt(c);
    if (src !== 'K') fields.K.value = fmt(c + 273.15);
    if (src !== 'F') fields.F.value = fmt(c * 9 / 5 + 32);
    if (src !== 'R') fields.R.value = fmt((c + 273.15) * 9 / 5);

    const refs = [
      { v: -273.15, l: 'Zero absoluto' },
      { v: 0,       l: 'Fusão da água' },
      { v: 100,     l: 'Ebulição da água' },
      { v: 37,      l: 'Temperatura corporal' },
      { v: -40,     l: 'Ponto onde °C = °F' },
    ];

    document.getElementById('det_temp_ctx').textContent =
      `${fmt(c)} °C = ${fmt(c + 273.15)} K = ${fmt(c * 9 / 5 + 32)} °F\n\nReferências:\n` +
      refs.map(r => `${r.l}: ${fmt(r.v)}°C | ${fmt(r.v + 273.15)}K | ${fmt(r.v * 9 / 5 + 32)}°F`).join('\n');
  }

  _tempLock = false;
}

/** PT100: Temperature → Resistance (Callendar-Van Dusen, IEC 60751) */
function calcPT100_TtoR() {
  const T = parseFloat(document.getElementById('pt_T').value);
  if (isNaN(T) || T < -200 || T > 850) return;

  const R = T >= 0
    ? 100 * (1 + 3.9083e-3 * T - 5.775e-7 * T * T)
    : 100 * (1 + 3.9083e-3 * T - 5.775e-7 * T * T - 4.183e-12 * T * T * T * (T - 100));

  showResult('res_pt100', {
    value: fmt(R),
    unit:  'Ω',
    detail: [
      `R(${T}°C) = ${fmt(R)} Ω`,
      `ΔR desde 0°C: ${fmt(R - 100)} Ω`,
      `Sensibilidade média: ${fmt((R - 100) / T)} Ω/°C`,
      `Tolerância IEC 60751 Cl.B: ±${fmt(0.3 + 0.005 * Math.abs(T))} °C`,
    ].join('\n'),
  });
}

/** PT100: Resistance → Temperature (simplified linear inversion) */
function calcPT100_RtoT() {
  const R = parseFloat(document.getElementById('pt_R').value);
  if (isNaN(R) || R < 18.52) return;

  // Linear approximation: T ≈ (R - R0) / (R0 * α)
  const alpha = 0.003850;
  const T     = (R - 100) / (100 * alpha);
  const Rcheck = 100 * (1 + 3.9083e-3 * T - 5.775e-7 * T * T);

  showResult('res_pt100', {
    value: fmt(T),
    unit:  '°C',
    detail: [
      `T ≈ (R − 100) / (100 × α) = (${R} − 100) / ${fmt(100 * alpha)} = ${fmt(T)} °C`,
      `(Aprox. linear — erro < 0,5°C na faixa 0–200°C)`,
      `Verificação: R(${fmt(T, 5)}°C) = ${fmt(Rcheck)} Ω`,
    ].join('\n'),
  });
}

/** Thermocouple: approximate Seebeck FEM */
function calcTermopar() {
  const S  = parseFloat(document.getElementById('tc_tipo').value);
  const Tq = parseFloat(document.getElementById('tc_Tq').value);
  const Tf = parseFloat(document.getElementById('tc_Tf').value);
  if (isNaN(Tq) || isNaN(Tf)) return;

  const V = S * (Tq - Tf) / 1000;

  showResult('res_tc', {
    value: fmt(V),
    unit:  'mV',
    detail: [
      `V = ${S} μV/°C × (${Tq} − ${Tf}) = ${fmt(S * (Tq - Tf))} μV = ${fmt(V)} mV`,
      `ΔT = ${Tq - Tf}°C`,
      `Nota: valores tabelados NIST diferem levemente desta aproximação linear.`,
    ].join('\n'),
  });
}

/* ─────────────────────────────────────────
   11. SHARED UTILITIES
   ───────────────────────────────────────── */

/**
 * Format number with significant digits
 * @param {number} n
 * @param {number} [sig=4] - significant digits
 */
function fmt(n, sig = 4) {
  return parseFloat(n.toPrecision(sig)).toLocaleString('pt-BR', { maximumFractionDigits: 6 });
}

/**
 * Show a calculator result card
 * @param {string} id - element id of .calc-result
 * @param {{ value, unit, detail }} data
 */
function showResult(id, { value, unit, detail }) {
  const el = document.getElementById(id);
  if (!el) return;

  const valEl    = el.querySelector('.calc-result__value');
  const unitEl   = el.querySelector('.calc-result__unit');
  const detailEl = el.querySelector('.calc-result__detail');

  if (valEl)    valEl.textContent    = value;
  if (unitEl)   unitEl.textContent   = unit;
  if (detailEl) detailEl.textContent = detail;

  el.style.display = 'block';
}

function showEl(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';
}

function hideEl(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

/* ─────────────────────────────────────────
   12. PLAYGROUND ENGINE
   Variable Playground: sliders → live SVG → color-coded formula
   Each playground is defined as a config object, rendered
   generically by renderPlayground().
   ───────────────────────────────────────── */

/**
 * Color palette for physical quantities.
 * Every variable gets a unique, consistent color across
 * formula text, slider thumb, SVG, and result chip.
 */
const VAR_COLORS = {
  P:   '#FF5A1F',   // pressure  → orange (module accent)
  F:   '#f97316',   // force     → amber-orange
  A:   '#94a3b8',   // area      → slate
  rho: '#22d3ee',   // density   → cyan
  g:   '#6278a0',   // gravity   → muted (constant, dimmed)
  h:   '#a78bfa',   // height    → violet
  Re:  '#fb923c',   // Reynolds  → orange
  v:   '#10ecca',   // velocity  → teal (vazao accent)
  D:   '#fde047',   // diameter  → yellow (temperatura accent)
  mu:  '#c084fc',   // viscosity → purple
  Q:   '#10ecca',   // flow rate → teal
  T:   '#fde047',   // temperature → yellow
  R:   '#4ade80',   // resistance  → green
  S:   '#f472b6',   // Seebeck coeff → pink
  Tq:  '#FF5A1F',   // hot junction → orange
  Tf:  '#22d3ee',   // cold junction → cyan
};

/**
 * Playground config per module.
 * Each config has:
 *   title, subtitle, formula (HTML with color spans),
 *   vars: [{ id, label, min, max, step, default, unit, color }],
 *   compute(vals): returns { result, unit, detail }
 *   svgFn(vals, result): returns SVG string
 *   accordions: [{ title, config }] — sub-playgrounds
 */
const PLAYGROUNDS = {

  /* ── PRESSÃO ────────────────────────── */
  pressao: [
    {
      id:       'pg_pfa',
      title:    'P = F / A',
      subtitle: 'Arraste os sliders e veja a pressão mudar em tempo real',
      formulaHtml: `
        <span style="color:${VAR_COLORS.P}">P</span>
        <span class="pg-eq-sym">=</span>
        <span class="pg-fraction">
          <span style="color:${VAR_COLORS.F}">F</span>
          <span style="color:${VAR_COLORS.A}">A</span>
        </span>`,
      vars: [
        { id:'F', label:'Força F', min:10,   max:5000,  step:10,   def:500,  unit:'N',   color: VAR_COLORS.F },
        { id:'A', label:'Área A',  min:0.01, max:2,     step:0.01, def:0.25, unit:'m²',  color: VAR_COLORS.A },
      ],
      compute(v) {
        const P = v.F / v.A;
        return {
          result: P.toFixed(1),
          unit: 'Pa',
          detail: `${v.F} N ÷ ${v.A} m² = ${P.toFixed(1)} Pa = ${(P/1000).toFixed(3)} kPa = ${(P/1e5).toFixed(5)} bar`,
        };
      },
      svgFn(v, r) {
        const maxP = 5000 / 0.01;
        const fillPct = Math.min(parseFloat(r.result) / maxP, 1);
        const barH = Math.round(fillPct * 90);
        const areaW = Math.round(40 + v.A * 140);
        return `
          <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" class="pg-svg">
            <defs>
              <linearGradient id="pgPFAgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${VAR_COLORS.P}" stop-opacity=".9"/>
                <stop offset="100%" stop-color="${VAR_COLORS.P}" stop-opacity=".3"/>
              </linearGradient>
            </defs>
            <!-- Surface plate -->
            <rect x="${160-areaW/2}" y="120" width="${areaW}" height="18" rx="3"
                  fill="${VAR_COLORS.A}" fill-opacity=".15" stroke="${VAR_COLORS.A}" stroke-width="1.2"/>
            <text x="160" y="133" text-anchor="middle" fill="${VAR_COLORS.A}"
                  font-size="10" font-family="IBM Plex Mono">A = ${v.A} m²</text>
            <!-- Force arrow -->
            <line x1="160" y1="${120-barH}" x2="160" y2="120"
                  stroke="${VAR_COLORS.F}" stroke-width="2.5" marker-end="url(#arrowF)"/>
            <defs>
              <marker id="arrowF" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="${VAR_COLORS.F}"/>
              </marker>
            </defs>
            <text x="174" y="${120-barH+14}" fill="${VAR_COLORS.F}"
                  font-size="10" font-family="IBM Plex Mono">F=${v.F}N</text>
            <!-- Pressure badge -->
            <rect x="220" y="30" width="88" height="36" rx="6"
                  fill="${VAR_COLORS.P}" fill-opacity=".12" stroke="${VAR_COLORS.P}" stroke-width="1"/>
            <text x="264" y="46" text-anchor="middle" fill="${VAR_COLORS.P}"
                  font-size="9" font-family="IBM Plex Mono">PRESSÃO</text>
            <text x="264" y="60" text-anchor="middle" fill="${VAR_COLORS.P}"
                  font-size="13" font-weight="600" font-family="IBM Plex Mono">${parseFloat(r.result)>999?(parseFloat(r.result)/1000).toFixed(1)+' kPa':r.result+' Pa'}</text>
          </svg>`;
      },
    },
    {
      id:       'pg_stevin',
      title:    'P = ρ · g · h',
      subtitle: 'Lei de Stevin — pressão hidrostática no fundo do tanque',
      formulaHtml: `
        <span style="color:${VAR_COLORS.P}">P</span>
        <span class="pg-eq-sym">=</span>
        <span style="color:${VAR_COLORS.rho}">ρ</span>
        <span class="pg-eq-sym">·</span>
        <span style="color:${VAR_COLORS.g}">g</span>
        <span class="pg-eq-sym">·</span>
        <span style="color:${VAR_COLORS.h}">h</span>`,
      vars: [
        { id:'rho', label:'Densidade ρ', min:700,  max:13600, step:50,  def:1000, unit:'kg/m³', color: VAR_COLORS.rho },
        { id:'h',   label:'Altura h',    min:0.1,  max:20,    step:0.1, def:5,    unit:'m',     color: VAR_COLORS.h   },
      ],
      compute(v) {
        const P = v.rho * 9.81 * v.h;
        return {
          result: (P/1000).toFixed(2),
          unit: 'kPa',
          detail: `${v.rho} × 9,81 × ${v.h} = ${P.toFixed(0)} Pa = ${(P/1000).toFixed(2)} kPa = ${(P/1e5).toFixed(4)} bar`,
        };
      },
      svgFn(v, r) {
        const maxH = 20;
        const tankH = 110, tankW = 80, tankX = 100, tankY = 20;
        const fluidH = Math.round((v.h / maxH) * tankH);
        const fluidY = tankY + tankH - fluidH;
        const alpha = Math.min(0.15 + v.rho / 13600 * 0.55, 0.7);
        return `
          <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" class="pg-svg">
            <!-- Tank outline -->
            <rect x="${tankX}" y="${tankY}" width="${tankW}" height="${tankH}" rx="3"
                  fill="none" stroke="#4a5a7a" stroke-width="1.5"/>
            <!-- Fluid -->
            <rect x="${tankX+1}" y="${fluidY}" width="${tankW-2}" height="${fluidH}" rx="2"
                  fill="${VAR_COLORS.rho}" fill-opacity="${alpha}"/>
            <!-- Level arrow -->
            <line x1="${tankX+tankW+8}" y1="${fluidY}" x2="${tankX+tankW+8}" y2="${tankY+tankH}"
                  stroke="${VAR_COLORS.h}" stroke-width="1.5" stroke-dasharray="3,2"/>
            <text x="${tankX+tankW+16}" y="${fluidY + fluidH/2 + 4}" fill="${VAR_COLORS.h}"
                  font-size="11" font-family="IBM Plex Mono">h=${v.h}m</text>
            <!-- rho label -->
            <text x="${tankX+tankW/2}" y="${fluidY + fluidH/2 + 4}" text-anchor="middle"
                  fill="${VAR_COLORS.rho}" font-size="10" font-family="IBM Plex Mono">ρ=${v.rho}</text>
            <!-- Pressure result at bottom -->
            <rect x="${tankX}" y="${tankY+tankH+4}" width="${tankW}" height="20" rx="3"
                  fill="${VAR_COLORS.P}" fill-opacity=".15" stroke="${VAR_COLORS.P}" stroke-width="1"/>
            <text x="${tankX+tankW/2}" y="${tankY+tankH+17}" text-anchor="middle"
                  fill="${VAR_COLORS.P}" font-size="10" font-family="IBM Plex Mono">${r.result} kPa</text>
          </svg>`;
      },
    },
  ],

  /* ── NÍVEL ──────────────────────────── */
  nivel: [
    {
      id:       'pg_nivel_h',
      title:    'h = P / (ρ · g)',
      subtitle: 'Quanto de fluido existe no tanque dado a pressão no fundo?',
      formulaHtml: `
        <span style="color:${VAR_COLORS.h}">h</span>
        <span class="pg-eq-sym">=</span>
        <span class="pg-fraction">
          <span style="color:${VAR_COLORS.P}">P</span>
          <span><span style="color:${VAR_COLORS.rho}">ρ</span> · <span style="color:${VAR_COLORS.g}">g</span></span>
        </span>`,
      vars: [
        { id:'P',   label:'Pressão P',   min:1,   max:200,   step:1,  def:49,   unit:'kPa',   color: VAR_COLORS.P   },
        { id:'rho', label:'Densidade ρ', min:700, max:13600, step:50, def:1000, unit:'kg/m³',  color: VAR_COLORS.rho },
      ],
      compute(v) {
        const h = (v.P * 1000) / (v.rho * 9.81);
        return { result: h.toFixed(2), unit: 'm', detail: `${v.P} kPa ÷ (${v.rho} × 9.81) = ${h.toFixed(2)} m = ${(h*100).toFixed(1)} cm` };
      },
      svgFn(v, r) {
        const maxH = 200000 / (700 * 9.81);
        const h    = parseFloat(r.result);
        const tankH = 100, tankW = 70, tankX = 110, tankY = 20;
        const fluidH = Math.min(Math.round((h / maxH) * tankH), tankH);
        return `
          <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" class="pg-svg">
            <rect x="${tankX}" y="${tankY}" width="${tankW}" height="${tankH}" rx="3" fill="none" stroke="#4a5a7a" stroke-width="1.5"/>
            <rect x="${tankX+1}" y="${tankY+tankH-fluidH}" width="${tankW-2}" height="${fluidH}" rx="2"
                  fill="${VAR_COLORS.rho}" fill-opacity=".25"/>
            <!-- h arrow -->
            <line x1="${tankX-12}" y1="${tankY+tankH-fluidH}" x2="${tankX-12}" y2="${tankY+tankH}"
                  stroke="${VAR_COLORS.h}" stroke-width="2"/>
            <text x="${tankX-22}" y="${tankY+tankH-fluidH/2+4}" text-anchor="middle"
                  fill="${VAR_COLORS.h}" font-size="11" font-family="IBM Plex Mono"
                  writing-mode="vertical-lr" transform="rotate(180, ${tankX-22}, ${tankY+tankH-fluidH/2})">${r.result}m</text>
            <!-- P badge at bottom -->
            <rect x="${tankX}" y="${tankY+tankH+4}" width="${tankW}" height="20" rx="3"
                  fill="${VAR_COLORS.P}" fill-opacity=".12" stroke="${VAR_COLORS.P}" stroke-width="1"/>
            <text x="${tankX+tankW/2}" y="${tankY+tankH+17}" text-anchor="middle"
                  fill="${VAR_COLORS.P}" font-size="10" font-family="IBM Plex Mono">P=${v.P}kPa</text>
            <!-- % fill indicator -->
            <text x="${tankX+tankW+12}" y="${tankY+40}" fill="${VAR_COLORS.h}"
                  font-size="14" font-family="IBM Plex Mono" font-weight="600">${Math.min((h/maxH*100),100).toFixed(0)}%</text>
            <text x="${tankX+tankW+12}" y="${tankY+54}" fill="#6278a0"
                  font-size="9" font-family="IBM Plex Mono">do max</text>
          </svg>`;
      },
    },
  ],

  /* ── VAZÃO ──────────────────────────── */
  vazao: [
    {
      id:       'pg_reynolds',
      title:    'Re = ρ · v · D / μ',
      subtitle: 'Determine o regime de escoamento variando as condições',
      formulaHtml: `
        <span style="color:${VAR_COLORS.Re}">Re</span>
        <span class="pg-eq-sym">=</span>
        <span class="pg-fraction">
          <span><span style="color:${VAR_COLORS.rho}">ρ</span> · <span style="color:${VAR_COLORS.v}">v</span> · <span style="color:${VAR_COLORS.D}">D</span></span>
          <span style="color:${VAR_COLORS.mu}">μ</span>
        </span>`,
      vars: [
        { id:'v',   label:'Velocidade v', min:0.01, max:10,    step:0.05, def:1,      unit:'m/s',  color: VAR_COLORS.v   },
        { id:'D',   label:'Diâmetro D',   min:0.01, max:0.5,   step:0.01, def:0.1,    unit:'m',    color: VAR_COLORS.D   },
        { id:'rho', label:'Densidade ρ',  min:1,    max:1200,  step:10,   def:1000,   unit:'kg/m³',color: VAR_COLORS.rho },
        { id:'mu',  label:'Viscosidade μ',min:0.0001,max:0.1,  step:0.0001,def:0.001, unit:'Pa·s', color: VAR_COLORS.mu  },
      ],
      compute(v) {
        const Re = (v.rho * v.v * v.D) / v.mu;
        const regime = Re < 2300 ? '🟢 LAMINAR' : Re < 4000 ? '🟡 TRANSIÇÃO' : '🔴 TURBULENTO';
        return {
          result: Re.toFixed(0),
          unit: '',
          detail: `Re = ${Re.toFixed(0)}  →  ${regime}\n(ρ×v×D)/μ = (${v.rho}×${v.v}×${v.D})/${v.mu}`,
        };
      },
      svgFn(v, r) {
        const Re   = parseFloat(r.result);
        const color = Re < 2300 ? VAR_COLORS.Q : Re < 4000 ? VAR_COLORS.T : VAR_COLORS.Tq;
        const label = Re < 2300 ? 'LAMINAR' : Re < 4000 ? 'TRANSIÇÃO' : 'TURBULENTO';
        // Draw pipe cross-section with flow lines
        const lines = Re < 2300 ? 5 : Re < 4000 ? 8 : 14;
        let flowLines = '';
        for (let i = 0; i < lines; i++) {
          const y  = 55 + i * (50 / (lines - 1));
          const amp = Re < 2300 ? 0 : Math.min((Re - 2300) / 3000 * 16, 16);
          const freq = Re < 2300 ? 1 : 1 + i * 0.3;
          const pts = [];
          for (let x = 30; x <= 240; x += 6) {
            const wave = amp * Math.sin(((x - 30) / 210) * Math.PI * 2 * freq + i);
            pts.push(`${x},${y + wave}`);
          }
          flowLines += `<polyline points="${pts.join(' ')}" fill="none"
            stroke="${color}" stroke-width="${Re < 2300 ? 1.2 : 0.8}" stroke-opacity="${0.4 + (i%3)*0.15}"/>`;
        }
        return `
          <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" class="pg-svg">
            <!-- Pipe -->
            <rect x="30" y="50" width="210" height="60" rx="3" fill="none" stroke="#4a5a7a" stroke-width="1.5"/>
            <rect x="30" y="50" width="210" height="60" fill="${color}" fill-opacity=".04"/>
            ${flowLines}
            <!-- Re badge -->
            <rect x="245" y="55" width="30" height="50" rx="4" fill="${color}" fill-opacity=".12"
                  stroke="${color}" stroke-width="1"/>
            <text x="260" y="74" text-anchor="middle" fill="${color}" font-size="8" font-family="IBM Plex Mono">Re</text>
            <text x="260" y="90" text-anchor="middle" fill="${color}" font-size="${Re>9999?7:9}" font-family="IBM Plex Mono" font-weight="600">${Re.toFixed(0)}</text>
            <!-- Regime label -->
            <text x="135" y="130" text-anchor="middle" fill="${color}" font-size="11"
                  font-family="IBM Plex Mono" font-weight="600">${label}</text>
            <text x="135" y="143" text-anchor="middle" fill="#6278a0" font-size="9" font-family="IBM Plex Mono">v=${v.v}m/s · D=${v.D*1000}mm</text>
          </svg>`;
      },
    },
    {
      id:       'pg_continuidade',
      title:    'A₁·v₁ = A₂·v₂',
      subtitle: 'Equação da Continuidade — quando o tubo afunila, o fluido acelera',
      formulaHtml: `
        <span style="color:${VAR_COLORS.A}">A₁</span><span class="pg-eq-sym">·</span><span style="color:${VAR_COLORS.v}">v₁</span>
        <span class="pg-eq-sym">=</span>
        <span style="color:${VAR_COLORS.A}">A₂</span><span class="pg-eq-sym">·</span><span style="color:${VAR_COLORS.v}">v₂</span>`,
      vars: [
        { id:'D1', label:'Diâmetro D₁', min:20,  max:300, step:5,  def:100, unit:'mm', color: VAR_COLORS.A },
        { id:'v1', label:'Velocidade v₁',min:0.1,max:10,  step:0.1,def:1,   unit:'m/s',color: VAR_COLORS.v },
        { id:'D2', label:'Diâmetro D₂', min:5,   max:290, step:5,  def:50,  unit:'mm', color: VAR_COLORS.D },
      ],
      compute(v) {
        const D2 = Math.min(v.D2, v.D1 - 5);
        const v2 = v.v1 * (v.D1 / D2) ** 2;
        const Q  = Math.PI / 4 * (v.D1 / 1000) ** 2 * v.v1;
        return {
          result: v2.toFixed(2),
          unit: 'm/s',
          detail: `v₂ = v₁×(D₁/D₂)² = ${v.v1}×(${v.D1}/${D2})² = ${v2.toFixed(2)} m/s\nQ = ${(Q*3600).toFixed(2)} m³/h`,
        };
      },
      svgFn(v, r) {
        const D2    = Math.min(v.D2, v.D1 - 5);
        const v2    = parseFloat(r.result);
        const s1    = Math.min(v.D1 / 3, 50);
        const s2    = Math.min(D2 / 3, 40);
        const mid   = 150;
        return `
          <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" class="pg-svg">
            <!-- Section 1 -->
            <rect x="20" y="${80-s1}" width="80" height="${s1*2}" rx="2"
                  fill="${VAR_COLORS.v}" fill-opacity=".1" stroke="${VAR_COLORS.A}" stroke-width="1.2"/>
            <!-- Transition -->
            <polygon points="100,${80-s1} ${mid},${80-s2} ${mid},${80+s2} 100,${80+s1}"
                     fill="${VAR_COLORS.v}" fill-opacity=".06" stroke="#4a5a7a" stroke-width="1"/>
            <!-- Section 2 -->
            <rect x="${mid}" y="${80-s2}" width="80" height="${s2*2}" rx="2"
                  fill="${VAR_COLORS.v}" fill-opacity=".15" stroke="${VAR_COLORS.D}" stroke-width="1.2"/>
            <!-- v1 arrow -->
            <line x1="30" y1="80" x2="85" y2="80" stroke="${VAR_COLORS.v}" stroke-width="2"
                  marker-end="url(#arr1)"/>
            <defs><marker id="arr1" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="${VAR_COLORS.v}"/>
            </marker></defs>
            <text x="57" y="72" text-anchor="middle" fill="${VAR_COLORS.v}" font-size="10" font-family="IBM Plex Mono">v₁=${v.v1}</text>
            <!-- v2 arrow (longer = faster) -->
            <line x1="${mid+5}" y1="80" x2="${mid+65}" y2="80" stroke="${VAR_COLORS.D}" stroke-width="2.5"
                  marker-end="url(#arr2)"/>
            <defs><marker id="arr2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="${VAR_COLORS.D}"/>
            </marker></defs>
            <text x="${mid+37}" y="72" text-anchor="middle" fill="${VAR_COLORS.D}" font-size="10" font-family="IBM Plex Mono">v₂=${v2.toFixed(1)}</text>
            <!-- D labels -->
            <text x="60" y="${80+s1+14}" text-anchor="middle" fill="${VAR_COLORS.A}" font-size="9" font-family="IBM Plex Mono">D₁=${v.D1}mm</text>
            <text x="${mid+40}" y="${80+s2+14}" text-anchor="middle" fill="${VAR_COLORS.D}" font-size="9" font-family="IBM Plex Mono">D₂=${D2}mm</text>
          </svg>`;
      },
    },
  ],

  /* ── TEMPERATURA ────────────────────── */
  temperatura: [
    {
      id:       'pg_pt100',
      title:    'R(T) = 100 · (1 + α·T)',
      subtitle: 'Como a resistência da PT100 varia com a temperatura?',
      formulaHtml: `
        <span style="color:${VAR_COLORS.R}">R</span>
        <span class="pg-eq-sym">=</span>
        <span style="color:${VAR_COLORS.R}">100</span>
        <span class="pg-eq-sym">·</span>
        (<span style="color:${VAR_COLORS.g}">1</span>
        <span class="pg-eq-sym">+</span>
        <span style="color:${VAR_COLORS.mu}">α</span>
        <span class="pg-eq-sym">·</span>
        <span style="color:${VAR_COLORS.T}">T</span>)`,
      vars: [
        { id:'T', label:'Temperatura T', min:-200, max:850, step:5, def:25, unit:'°C', color: VAR_COLORS.T },
      ],
      compute(v) {
        const R = v.T >= 0
          ? 100 * (1 + 3.9083e-3 * v.T - 5.775e-7 * v.T * v.T)
          : 100 * (1 + 3.9083e-3 * v.T - 5.775e-7 * v.T * v.T - 4.183e-12 * v.T * v.T * v.T * (v.T - 100));
        return {
          result: R.toFixed(2),
          unit: 'Ω',
          detail: `R(${v.T}°C) = ${R.toFixed(2)} Ω\nΔR desde 0°C = ${(R-100).toFixed(2)} Ω\nSensibilidade ≈ ${v.T!==0?((R-100)/v.T).toFixed(4):'0.3908'} Ω/°C`,
        };
      },
      svgFn(v, r) {
        // Draw a mini R vs T chart + thermometer
        const points = [];
        for (let t = -200; t <= 850; t += 25) {
          const R = t >= 0
            ? 100*(1 + 3.9083e-3*t - 5.775e-7*t*t)
            : 100*(1 + 3.9083e-3*t - 5.775e-7*t*t - 4.183e-12*t*t*t*(t-100));
          const px = 30 + ((t + 200) / 1050) * 160;
          const py = 130 - ((R - 18) / (380 - 18)) * 100;
          points.push(`${px},${Math.max(30, Math.min(130, py))}`);
        }
        const curT = v.T;
        const curR = parseFloat(r.result);
        const cx  = 30 + ((curT + 200) / 1050) * 160;
        const cy  = 130 - ((curR - 18) / 362) * 100;

        return `
          <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" class="pg-svg">
            <!-- Axes -->
            <line x1="30" y1="130" x2="200" y2="130" stroke="#4a5a7a" stroke-width="1"/>
            <line x1="30" y1="30"  x2="30"  y2="130" stroke="#4a5a7a" stroke-width="1"/>
            <text x="115" y="148" text-anchor="middle" fill="#6278a0" font-size="8" font-family="IBM Plex Mono">Temperatura (°C)</text>
            <text x="14" y="80" fill="#6278a0" font-size="8" font-family="IBM Plex Mono"
                  writing-mode="vertical-lr" transform="rotate(180,14,80)">R (Ω)</text>
            <!-- Curve -->
            <polyline points="${points.join(' ')}" fill="none"
                      stroke="${VAR_COLORS.R}" stroke-width="2" stroke-linecap="round"/>
            <!-- Current point -->
            <circle cx="${cx}" cy="${Math.max(32,Math.min(128,cy))}" r="5"
                    fill="${VAR_COLORS.T}" stroke="#080d18" stroke-width="1.5"/>
            <line x1="${cx}" y1="130" x2="${cx}" y2="${Math.max(32,Math.min(128,cy))}"
                  stroke="${VAR_COLORS.T}" stroke-width="1" stroke-dasharray="3,2"/>
            <!-- Thermometer widget -->
            <rect x="225" y="30" width="70" height="110" rx="8"
                  fill="rgba(253,224,71,.06)" stroke="${VAR_COLORS.T}" stroke-width="1"/>
            <text x="260" y="50" text-anchor="middle" fill="${VAR_COLORS.T}" font-size="9" font-family="IBM Plex Mono">T</text>
            <text x="260" y="66" text-anchor="middle" fill="${VAR_COLORS.T}" font-size="16" font-weight="700" font-family="IBM Plex Mono">${v.T}°</text>
            <text x="260" y="84" text-anchor="middle" fill="#6278a0" font-size="8" font-family="IBM Plex Mono">Celsius</text>
            <line x1="240" y1="95" x2="280" y2="95" stroke="#4a5a7a" stroke-width="1"/>
            <text x="260" y="108" text-anchor="middle" fill="${VAR_COLORS.R}" font-size="9" font-family="IBM Plex Mono">R(T)</text>
            <text x="260" y="126" text-anchor="middle" fill="${VAR_COLORS.R}" font-size="14" font-weight="700" font-family="IBM Plex Mono">${r.result}Ω</text>
          </svg>`;
      },
    },
    {
      id:       'pg_seebeck',
      title:    'V = S · (T_q − T_f)',
      subtitle: 'Efeito Seebeck — FEM gerada pelo termopar em função das temperaturas',
      formulaHtml: `
        <span style="color:${VAR_COLORS.v}">V</span>
        <span class="pg-eq-sym">=</span>
        <span style="color:${VAR_COLORS.S}">S</span>
        <span class="pg-eq-sym">·</span>
        (<span style="color:${VAR_COLORS.Tq}">T_q</span>
        <span class="pg-eq-sym">−</span>
        <span style="color:${VAR_COLORS.Tf}">T_f</span>)`,
      vars: [
        { id:'Tq', label:'Junção quente T_q', min:0,    max:1372, step:10, def:400, unit:'°C', color: VAR_COLORS.Tq },
        { id:'Tf', label:'Junção fria T_f',   min:-20,  max:80,   step:1,  def:25,  unit:'°C', color: VAR_COLORS.Tf },
        { id:'S',  label:'Coef. Seebeck S',   min:10,   max:52,   step:1,  def:41,  unit:'μV/°C', color: VAR_COLORS.S },
      ],
      compute(v) {
        const V = v.S * (v.Tq - v.Tf) / 1000;
        const tipos = { 10:'Tipo S', 40:'Tipo T', 41:'Tipo K', 51:'Tipo J', 52:'Tipo E' };
        const tipo = tipos[v.S] || `S=${v.S}μV/°C`;
        return {
          result: V.toFixed(2),
          unit: 'mV',
          detail: `${v.S}μV/°C × (${v.Tq} − ${v.Tf}) = ${(v.S*(v.Tq-v.Tf)).toFixed(0)} μV = ${V.toFixed(2)} mV\nTermopar: ${tipo} | ΔT = ${v.Tq-v.Tf}°C`,
        };
      },
      svgFn(v, r) {
        const deltaT  = v.Tq - v.Tf;
        const hotPct  = Math.min(v.Tq / 1372, 1);
        const coldPct = Math.max(0, (v.Tf + 20) / 100);
        const V       = parseFloat(r.result);
        const barH    = Math.min(Math.abs(V) / 60 * 70, 70);
        return `
          <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" class="pg-svg">
            <!-- Hot junction -->
            <circle cx="60" cy="80" r="20" fill="${VAR_COLORS.Tq}" fill-opacity="${0.15 + hotPct*0.5}"
                    stroke="${VAR_COLORS.Tq}" stroke-width="1.5"/>
            <text x="60" y="76" text-anchor="middle" fill="${VAR_COLORS.Tq}" font-size="9" font-family="IBM Plex Mono">T_q</text>
            <text x="60" y="88" text-anchor="middle" fill="${VAR_COLORS.Tq}" font-size="11" font-family="IBM Plex Mono" font-weight="600">${v.Tq}°C</text>
            <!-- Wire -->
            <path d="M80,80 Q160,40 240,80" fill="none" stroke="${VAR_COLORS.S}" stroke-width="1.5" stroke-dasharray="5,3"/>
            <path d="M80,80 Q160,120 240,80" fill="none" stroke="${VAR_COLORS.S}" stroke-width="1.5" stroke-dasharray="5,3"/>
            <!-- Cold junction -->
            <circle cx="240" cy="80" r="20" fill="${VAR_COLORS.Tf}" fill-opacity="${0.1 + coldPct*0.3}"
                    stroke="${VAR_COLORS.Tf}" stroke-width="1.5"/>
            <text x="240" y="76" text-anchor="middle" fill="${VAR_COLORS.Tf}" font-size="9" font-family="IBM Plex Mono">T_f</text>
            <text x="240" y="88" text-anchor="middle" fill="${VAR_COLORS.Tf}" font-size="11" font-family="IBM Plex Mono" font-weight="600">${v.Tf}°C</text>
            <!-- ΔT label on wire -->
            <text x="160" y="68" text-anchor="middle" fill="${VAR_COLORS.S}" font-size="9" font-family="IBM Plex Mono">ΔT=${deltaT}°C</text>
            <!-- FEM result bar -->
            <rect x="130" y="${110-barH}" width="60" height="${barH}" rx="3"
                  fill="${VAR_COLORS.v}" fill-opacity=".2" stroke="${VAR_COLORS.v}" stroke-width="1"/>
            <text x="160" y="125" text-anchor="middle" fill="${VAR_COLORS.v}" font-size="9" font-family="IBM Plex Mono">FEM</text>
            <text x="160" y="140" text-anchor="middle" fill="${VAR_COLORS.v}" font-size="13" font-weight="700" font-family="IBM Plex Mono">${r.result}mV</text>
          </svg>`;
      },
    },
  ],
};

/**
 * Render a single playground block (one formula config)
 * @param {object} cfg - playground config
 * @param {string} mod - module slug (for scoped IDs)
 * @returns {string} HTML string
 */
function renderPlaygroundBlock(cfg, mod) {
  const sliders = cfg.vars.map(variable => `
    <div class="pg-var">
      <div class="pg-var__header">
        <label class="pg-var__label" for="${mod}-${cfg.id}-${variable.id}"
               style="color:${variable.color}">
          <span class="pg-var__sym">${variable.id.replace('rho','ρ').replace('mu','μ')}</span>
          — ${variable.label}
        </label>
        <span class="pg-var__val" id="lbl-${mod}-${cfg.id}-${variable.id}"
              style="color:${variable.color}">${variable.def} ${variable.unit}</span>
      </div>
      <div class="pg-slider-wrap">
        <span class="pg-slider-edge" style="color:${variable.color}">${variable.min}</span>
        <input class="pg-slider" type="range"
               id="${mod}-${cfg.id}-${variable.id}"
               min="${variable.min}" max="${variable.max}" step="${variable.step}" value="${variable.def}"
               style="--thumb:${variable.color}"
               oninput="updatePlayground('${mod}','${cfg.id}')">
        <span class="pg-slider-edge" style="color:${variable.color}">${variable.max}</span>
      </div>
    </div>
  `).join('');

  // Build initial values and compute initial result
  const initVals = Object.fromEntries(cfg.vars.map(vr => [vr.id, vr.def]));
  const initResult = cfg.compute(initVals);

  return `
    <div class="pg-block" data-pgid="${cfg.id}" data-mod="${mod}">
      <div class="pg-block__header">
        <div class="pg-block__title">${cfg.title}</div>
        <div class="pg-block__subtitle">${cfg.subtitle}</div>
      </div>

      <div class="pg-layout">
        <!-- Left: formula island + sliders -->
        <div class="pg-left">
          <div class="pg-formula-island">
            <div class="pg-formula-label">Fórmula</div>
            <div class="pg-formula-eq" id="formula-${mod}-${cfg.id}">${cfg.formulaHtml}</div>
            <div class="pg-result-chip" id="result-${mod}-${cfg.id}">
              <span class="pg-result-chip__label">Resultado</span>
              <span class="pg-result-chip__val">${initResult.result}</span>
              <span class="pg-result-chip__unit">${initResult.unit}</span>
            </div>
          </div>
          <div class="pg-sliders" id="sliders-${mod}-${cfg.id}">
            ${sliders}
          </div>
          <div class="pg-detail" id="detail-${mod}-${cfg.id}">${initResult.detail}</div>
        </div>

        <!-- Right: dynamic SVG diagram -->
        <div class="pg-right">
          <div class="pg-svg-wrap" id="svg-${mod}-${cfg.id}">
            ${cfg.svgFn(initVals, initResult)}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render all playground blocks for a module into its container.
 * Called lazily on first tab activation.
 * @param {string} mod
 */
function initPlayground(mod) {
  const container = document.getElementById(`pg-${mod}`);
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = '1';

  const configs = PLAYGROUNDS[mod] || [];
  container.innerHTML = configs
    .map(cfg => renderPlaygroundBlock(cfg, mod))
    .join('<div class="pg-divider"></div>');
}

/**
 * Update a playground when a slider moves.
 * Reads all slider values → computes → updates formula, SVG, result chip, detail.
 * @param {string} mod
 * @param {string} pgId
 */
function updatePlayground(mod, pgId) {
  const cfg = (PLAYGROUNDS[mod] || []).find(c => c.id === pgId);
  if (!cfg) return;

  // Read current slider values
  const vals = {};
  cfg.vars.forEach(vr => {
    const el = document.getElementById(`${mod}-${pgId}-${vr.id}`);
    if (!el) return;
    vals[vr.id] = parseFloat(el.value);
    // Update label
    const lbl = document.getElementById(`lbl-${mod}-${pgId}-${vr.id}`);
    if (lbl) lbl.textContent = `${vals[vr.id]} ${vr.unit}`;
  });

  const result = cfg.compute(vals);

  // Update result chip
  const chip = document.getElementById(`result-${mod}-${pgId}`);
  if (chip) {
    const valEl  = chip.querySelector('.pg-result-chip__val');
    const unitEl = chip.querySelector('.pg-result-chip__unit');
    if (valEl)  { valEl.textContent = result.result; valEl.classList.add('pg-flash'); setTimeout(() => valEl.classList.remove('pg-flash'), 300); }
    if (unitEl) unitEl.textContent = result.unit;
  }

  // Update detail
  const det = document.getElementById(`detail-${mod}-${pgId}`);
  if (det) det.textContent = result.detail;

  // Update SVG
  const svgWrap = document.getElementById(`svg-${mod}-${pgId}`);
  if (svgWrap) svgWrap.innerHTML = cfg.svgFn(vals, result);

  // Pulse the formula island
  const island = document.getElementById(`formula-${mod}-${pgId}`)?.closest('.pg-formula-island');
  if (island) { island.classList.add('pg-pulse'); setTimeout(() => island.classList.remove('pg-pulse'), 400); }
}

/* ─────────────────────────────────────────
   Extend switchTab to lazy-init playground
   ───────────────────────────────────────── */
const _origSwitchTab = switchTab;
// Override switchTab to hook playground init
function switchTab(mod, tabId) {
  _origSwitchTab(mod, tabId);
  if (tabId === 'playground') initPlayground(mod);
}

/** Cached DOM references */
const DOM = {
  home:         null,
  modGrid:      null,
  content:      null,
  scoreDisplay: null,
};

/** Bootstrap app after DOM ready */
function init() {
  DOM.home         = document.getElementById('home');
  DOM.modGrid      = document.getElementById('modgrid');
  DOM.content      = document.getElementById('content');
  DOM.scoreDisplay = document.getElementById('score-display');
}

document.addEventListener('DOMContentLoaded', init);

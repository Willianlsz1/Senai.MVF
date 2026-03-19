/*
 * SENAI · MVF v5 — app.js
 * Medição de Variáveis Físicas Industriais
 *
 * Módulos:
 *   § 1. Navegação          — troca de telas, scroll nav, drawer
 *   § 2. UI Helpers         — expanders, cenários
 *   § 3. Dados — Flashcards — array CARDS (54 cards / 8 categorias)
 *   § 4. Flashcards Engine  — show, flip, nav, shuffle, filtro
 *   § 5. Dados — Quiz       — array QS (38 questões)
 *   § 6. Quiz Engine        — start, render, resposta, próxima
 *   § 7. Calculadora        — 9 fórmulas interativas
 *   § 8. Simuladores        — Continuidade + Bernoulli com MathJax
 */

/* ════════════════════════════════════════════════════════════════
   SENAI · MVF v5 — JavaScript
   Módulos:
     § 1. Navegação          — troca de telas, scroll nav, drawer
     § 2. UI Helpers         — expanders, cenários
     § 3. Dados — Flashcards — array CARDS com 54 cards
     § 4. Flashcards Engine  — show, flip, nav, shuffle, filtro
     § 5. Dados — Quiz       — array QS com 38 questões
     § 6. Quiz Engine        — start, render, resposta, próxima
     § 7. Calculadora        — 9 fórmulas interativas
════════════════════════════════════════════════════════════════ */

/* ── § 1. NAVEGAÇÃO ──────────────────────────────────────────── */

const PAGES = [
  'home','m1','m2','m3','m4',
  'formulas','pressao','nivel','vazao','temperatura',
  'relacoes','cenarios',
  'calibracao','flash','quiz','calc','bernoulli'
];

/** Troca a tela ativa e rola o item de nav para visível */
function S(id){
  PAGES.forEach(p=>{
    const s=document.getElementById('screen-'+p);if(s)s.classList.remove('active');
    const n=document.getElementById('nav-'+p);if(n)n.classList.remove('active');
    const dn=document.getElementById('dnav-'+p);if(dn)dn.classList.remove('active');
  });
  document.getElementById('screen-'+id).classList.add('active');
  const nv=document.getElementById('nav-'+id);if(nv){nv.classList.add('active');nv.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'});}
  const dnv=document.getElementById('dnav-'+id);if(dnv)dnv.classList.add('active');
  window.scrollTo(0,0);
}

/** Desliza o nav bar horizontalmente (setas ‹ ›) */
function scrollNav(delta){const nb=document.getElementById('navBar');if(nb)nb.scrollBy({left:delta,behavior:'smooth'});}

/** Troca de tela + fecha o drawer mobile */
function SD(id){S(id);closeDrawer()}

/** Abre/fecha o drawer mobile */
function toggleDrawer(){document.getElementById('drawer').classList.toggle('open');document.getElementById('overlay').classList.toggle('open')}
function closeDrawer(){document.getElementById('drawer').classList.remove('open');document.getElementById('overlay').classList.remove('open')}

/* ── § 2. UI HELPERS ─────────────────────────────────────────── */

/** Abre/fecha expander (accordion) */
function X(el){el.classList.toggle('open')}

/** Abre/fecha card de cenário real */
function toggleScen(el){el.classList.toggle('open')}

/* ── § 3. DADOS — FLASHCARDS ─────────────────────────────────── */
/*
   54 cards em 8 categorias:
   Conceitos (8) · Pressão (7) · Nível (4) · Vazão (7)
   Erros (5) · Relações (7) · Temperatura (9) · Calibração (7)
*/
const CARDS=[
  {c:'Conceitos',q:'O que é PV, MV e SP?',a:'PV = grandeza medida pelo sensor. MV = o que o controlador ajusta. SP = valor desejado. Controlador age na MV para que PV = SP.'},
  {c:'Conceitos',q:'Por que o sinal 4–20 mA é padrão industrial?',a:'Resistente a ruídos, detecta fio partido (< 4 mA = falha), percorre centenas de metros sem degradar. 4 mA = 0% · 20 mA = 100%.'},
  {c:'Conceitos',q:'Diferença entre malha aberta e fechada',a:'Aberta: sem realimentação, sem correção automática. Fechada: feedback contínuo — corrige desvios entre PV e SP automaticamente.'},
  {c:'Conceitos',q:'O que é ação PID?',a:'P: proporcional ao erro (rápido, gera offset). I: acumula erro no tempo, elimina offset. D: reage à velocidade de mudança, antecipa variações.'},
  {c:'Conceitos',q:'Span de instrumento re-rangeado 2–8 bar',a:'Span = URV − LRV = 8 − 2 = 6 bar. O range original pode ser 0–10, mas o span calibrado é 6 bar.'},
  {c:'Conceitos',q:'O que é Resolução?',a:'Menor variação detectável. Sensor de 0,01 bar só detecta mudanças ≥ 0,01 bar — variações menores são invisíveis.'},
  {c:'Conceitos',q:'Diferença entre Acurácia e Precisão',a:'Acurácia = quão próximo do valor real. Precisão = capacidade de repetir a mesma leitura. Pode ser preciso mas não acurado (offset sistemático).'},
  {c:'Conceitos',q:'O que é Histerese?',a:'Diferença de leitura para o mesmo ponto ao subir vs. ao descer. Causada por folgas mecânicas ou magnetismo residual.'},
  {c:'Erros',q:'Fórmula do Erro Absoluto',a:'EA = Indicado − Real. Positivo = superestima. Negativo = subestima.'},
  {c:'Erros',q:'Fórmula do Erro % FS',a:'Erro%FS = (EA / FS) × 100. FS = URV. Usado para comparar com catálogo do instrumento.'},
  {c:'Erros',q:'Diferença entre Erro% leitura e Erro% FS',a:'Denominador diferente: leitura usa o valor real medido, FS usa o URV. Mesma EA, % diferentes.'},
  {c:'Erros',q:'O que é Erro de Zero (Offset)?',a:'Instrumento indica ≠ 0 quando variável real = 0. Corrigido no ajuste de zero durante calibração.'},
  {c:'Erros',q:'O que é Calibração?',a:'Ajuste de zero (offset) e span (ganho) do instrumento para minimizar erros. Calibração rastreável ao INMETRO gera certificado.'},
  {c:'Pressão',q:'Fórmula da Pressão',a:'P = F / A. Pascal (Pa) = N/m². Pressão atmosférica = 101.325 Pa = 1,013 bar.'},
  {c:'Pressão',q:'Diferença entre Pressão Absoluta e Manométrica',a:'Absoluta: referência = vácuo perfeito. Manométrica: referência = pressão atmosférica. P_abs = P_man + P_atm.'},
  {c:'Pressão',q:'Conversão: 1 Bar = ?',a:'1 bar = 100.000 Pa = 100 kPa ≈ 14,5 PSI ≈ 0,987 ATM.'},
  {c:'Pressão',q:'Fórmula de Stevin',a:'ΔP = ρ × g × h. ρ = massa específica · g = gravidade · h = altura da coluna de líquido.'},
  {c:'Pressão',q:'Princípio de Bernoulli',a:'P_total = P_estática + ½ρv². Quando velocidade aumenta, pressão estática diminui. Base dos medidores de ΔP.'},
  {c:'Pressão',q:'Como funciona o Manômetro de Bourdon?',a:'Tubo metálico curvo com seção elíptica. Pressão interna o endireita → movimento amplificado move o ponteiro. Sem energia elétrica.'},
  {c:'Pressão',q:'Para que serve transmissor de pressão diferencial?',a:'Mede diferença de pressão entre dois pontos. Usado para medir vazão (placa de orifício) e nível (coluna hidrostática).'},
  {c:'Vazão',q:'Fórmula da Vazão Volumétrica',a:'Qv = S × v. S = seção transversal (m²) · v = velocidade do fluido (m/s). Unidades: m³/s, m³/h, L/min.'},
  {c:'Vazão',q:'Fórmula da Vazão Mássica',a:'Qm = ρ × Qv. ρ = massa específica (kg/m³). Não muda com T e P — preferida para gases e vapores.'},
  {c:'Vazão',q:'Fórmula do Número de Reynolds',a:'Re = (ρ × v × D) / μ. Re < 2300 = laminar. 2300–4000 = transição. > 4000 = turbulento.'},
  {c:'Vazão',q:'Qual medidor de vazão usa a Lei de Faraday?',a:'Eletromagnético. Fluido condutor em campo magnético gera tensão ∝ velocidade. Não funciona com hidrocarbonetos.'},
  {c:'Vazão',q:'Qual medidor mede diretamente a massa?',a:'Coriolis. Tubos vibratórios são distorcidos pela força de Coriolis proporcionalmente à Qm. Mais preciso de todos.'},
  {c:'Vazão',q:'Viscosidade Cinemática (ν)',a:'ν = μ/ρ [m²/s, cSt]. Considera resistência interna (μ) + massa por volume (ρ).'},
  {c:'Vazão',q:'Equação de Torricelli',a:'v = √(2gh). v = velocidade de saída · g = gravidade · h = altura do nível. Quando nível cai, velocidade cai com √h.'},
  {c:'Relações',q:'Como Nível gera Pressão?',a:'Via Stevin: P = ρ×g×h. A coluna de líquido exerce pressão proporcional à altura. Permite medir nível por transmissor de pressão.'},
  {c:'Relações',q:'Como Pressão gera Vazão?',a:'Via Bernoulli: Q ∝ √(ΔP). Restrição cria ΔP → maior ΔP = maior Q. Dobrar Q quadruplica ΔP.'},
  {c:'Relações',q:'Como Vazão altera Nível?',a:'dh/dt = (Q_in − Q_out) / A. Nível sobe se Q_in > Q_out. Tanque grande (A grande) = resposta lenta.'},
  {c:'Relações',q:'Equação de Torricelli — nível controla saída',a:'Q = A_orifício × √(2gh). Nível cai → velocidade de saída cai proporcionalmente. Sistema auto-regulante.'},
  {c:'Relações',q:'O que é o fenômeno "swell" em caldeiras?',a:'Pressão cai → bolhas formam-se na água → nível aparentemente sobe mas massa real cai. Exige controle 3-elementos.'},
  {c:'Relações',q:'O que é interação de malhas?',a:'Controlar P altera Q → altera N; controlar N altera Q → altera P. Malhas brigam entre si. Solução: desacoplamento ou MPC.'},
  {c:'Relações',q:'Como Boyle-Mariotte afeta medição de gás?',a:'Volume do gás muda com P e T. Q_n = Q_med × (P/P_ref) × (T_ref/T). Medição deve ser normalizada.'},
  {c:'Nível',q:'Quais são os 6 tipos de chaves de nível do PDF SENAI?',a:'Boia (float switch), Condutividade, Vibratório (diapasão), Pressão (pressostato), Capacitância e Magnética. Todas geram sinal digital liga/desliga ao atingir o set point.'},
  {c:'Nível',q:'Por que a chave de nível vibratória (diapasão) é confiável mesmo com espuma?',a:'O garfo vibra em frequência ressonante no ar. Quando imerso no fluido, a frequência muda — esse desvio aciona o sinal. Imune a espuma, bolhas e turbulência pois detecta variação de frequência, não de pressão ou posição.'},
  {c:'Nível',q:'Qual transmissor de nível é mais indicado para tanques com vapores e alta pressão?',a:'Radar FMCW (microondas GHz). Imune a vapores, temperatura e pressão extremas. Alta precisão (mm). Ideal para petróleo, GLP e tanques criogênicos.'},
  {c:'Nível',q:'O que é Guided Wave Radar (GWR) e quando usar?',a:'Radar de onda guiada por sonda imersa no fluido. Ideal quando o produto tem baixa refletividade, espuma intensa ou quando precisa medir interface entre dois líquidos. A sonda conduz o sinal até o nível medido.'},
  {c:'Temperatura',q:'O que é Temperatura em termos físicos?',a:'Grandeza que representa o grau de agitação das moléculas de uma substância — sua energia cinética interna. Escala SI: Kelvin (K). Prática industrial: Celsius (°C).'},
  {c:'Temperatura',q:'Fórmulas de conversão: °C → K e °C → °F',a:'K = °C + 273,15 · °F = (°C × 9/5) + 32 · Inverso: °C = (°F − 32) × 5/9'},
  {c:'Temperatura',q:'O que é o Efeito Seebeck e qual instrumento usa esse princípio?',a:'Quando dois metais diferentes se unem numa junção aquecida, gera-se uma tensão (mV) proporcional à diferença de temperatura. Princípio do Termopar.'},
  {c:'Temperatura',q:'Qual é o termopar mais usado na indústria e sua faixa?',a:'Tipo K (Chromel/Alumel). Faixa: −270°C a +1260°C. ~41 µV/°C de sensibilidade. É o mais versátil e econômico do mercado.'},
  {c:'Temperatura',q:'Por que usar cabo de compensação no termopar?',a:'O termopar gera sinal em mV — muito sensível a ruídos. Cabo comum introduz uma junção adicional que gera erro de temperatura. O cabo de compensação é do mesmo material que o termopar e mantém a referência correta.'},
  {c:'Temperatura',q:'O que é PT100 e como funciona?',a:'Resistor de platina com R=100Ω a 0°C. A resistência aumenta linearmente com a temperatura (α=0,00385Ω/°C). Faixa: −200°C a +850°C. Alta precisão e estabilidade. Padrão industrial para temperatura.'},
  {c:'Temperatura',q:'Diferença entre conexão a 2, 3 e 4 fios no PT100',a:'2 fios: resistência do cabo introduz erro. 3 fios: compensa parcialmente a resistência do cabo. 4 fios: elimina completamente a resistência do cabo — máxima precisão para laboratórios e processos críticos.'},
  {c:'Temperatura',q:'O que é constante de tempo τ de um sensor de temperatura?',a:'Tempo para o sensor atingir 63,2% da variação total após um degrau de temperatura. Termopar nu: ~0,1–1s. PT100 com poço termopar: ~10–60s. Depende da massa do sensor e velocidade do fluido.'},
  {c:'Temperatura',q:'Para que serve o poço termopar (thermowell)?',a:'Tubo de proteção que isola o sensor do fluido de processo. Permite trocar o sensor sem parar a linha. Protege de pressão, velocidade e corrosão. Desvantagem: aumenta significativamente o tempo de resposta τ.'},
  {c:'Calibração',q:'O que é calibração segundo o VIM?',a:'Conjunto de operações que estabelece a relação entre os valores indicados por um instrumento e os valores conhecidos de um padrão rastreável. Calibração verifica — ajuste corrige.'},
  {c:'Calibração',q:'O que é rastreabilidade metrológica?',a:'Cadeia de comparações que liga a medição ao padrão nacional: BIPM (mundial) → INMETRO (nacional) → Laboratório acreditado RBC → Instrumento do processo.'},
  {c:'Calibração',q:'O que significam "As Found" e "As Left" num relatório de calibração?',a:'As Found = estado do instrumento ANTES do ajuste (documenta o desvio encontrado). As Left = estado APÓS o ajuste. Ambos devem ser registrados no relatório para histórico.'},
  {c:'Calibração',q:'Quais são os 5 pontos padrão de calibração de um transmissor?',a:'0%, 25%, 50%, 75%, 100% do span — em sentido crescente E decrescente. Isso verifica tanto a linearidade quanto a histerese do instrumento.'},
  {c:'Calibração',q:'Como corrigir erro de offset (zero) na calibração?',a:'Aplicar 0% da escala (LRV). Ajustar o potenciômetro ou parâmetro de zero até a saída marcar 4,00 mA (ou 0% da escala). O erro de zero desloca toda a curva verticalmente.'},
  {c:'Calibração',q:'Como corrigir erro de span (ganho) na calibração?',a:'Aplicar 100% (URV) após ajustar o zero. Ajustar o span até a saída marcar 20,00 mA. O erro de span inclina a curva. Repetir zero → span → zero até convergir dentro da tolerância.'},
  {c:'Calibração',q:'Quando a periodicidade de calibração deve ser aumentada?',a:'Instrumento em malha de segurança (SIS/SIL), fluido corrosivo ou com alta temperatura, histórico de desvios frequentes, ou exigência regulatória (ANVISA, ANP, ISO 9001).'},
];


/* ── § 4. FLASHCARDS ENGINE ──────────────────────────────────── */

let fcActive=[...Array(CARDS.length).keys()],fcIdx=0;

/** Renderiza o card atual (frente e verso) */
function fcShow(){
  const i=fcActive[fcIdx];
  document.getElementById('fccat').textContent=CARDS[i].c;
  document.getElementById('fccatb').textContent=CARDS[i].c;
  document.getElementById('fcq').textContent=CARDS[i].q;
  document.getElementById('fca').textContent=CARDS[i].a;
  document.getElementById('fccnt').textContent=(fcIdx+1)+' / '+fcActive.length;
  document.getElementById('fcprog').style.width=((fcIdx+1)/fcActive.length*100).toFixed(1)+'%';
  document.getElementById('fccard').classList.remove('flip');
}

/** Vira o card (frente ↔ verso) */
function fcFlip(){document.getElementById('fccard').classList.toggle('flip')}

/** Avança para o próximo card */
function fcNext(){fcIdx=(fcIdx+1)%fcActive.length;fcShow()}

/** Volta para o card anterior */
function fcPrev(){fcIdx=(fcIdx-1+fcActive.length)%fcActive.length;fcShow()}

/** Embaralha a sequência de cards */
function fcShuffle(){fcActive=[...fcActive].sort(()=>Math.random()-.5);fcIdx=0;fcShow()}

/** Reseta para todos os cards em ordem original */
function fcReset(){fcActive=[...Array(CARDS.length).keys()];fcIdx=0;fcShow()}

/** Filtra cards por categoria */
function fcFilt(cat){const f=CARDS.map((c,i)=>c.c===cat?i:-1).filter(i=>i>=0);fcActive=f.length?f:[...Array(CARDS.length).keys()];fcIdx=0;fcShow()}

setTimeout(fcShow,50);

/* ── § 5. DADOS — QUIZ ───────────────────────────────────────── */
/*
   38 questões de múltipla escolha.
   Cada questão: { q: texto, o: [opções], a: índice correto, e: explicação }
*/
const QS=[
  {q:'O que é PV em automação industrial?',o:['Potência de Válvula','Process Variable — grandeza física medida e controlada','Ponto de Verificação','Pressão e Vazão'],a:1,e:'PV = Process Variable. É o valor que o sensor lê e o controlador tenta manter igual ao SP.'},
  {q:'Sensor indica 8,20 bar com valor real 8,00 bar. Qual o Erro Absoluto?',o:['+0,20 bar','-0,20 bar','2,5%','0,025 bar'],a:0,e:'EA = Indicado − Real = 8,20 − 8,00 = +0,20 bar. Positivo = instrumento superestima.'},
  {q:'Sensor 0–16 bar com acurácia ±0,25% FS. Erro máximo em bar?',o:['0,25 bar','0,04 bar','4 bar','0,016 bar'],a:1,e:'Erro_max = FS × (%FS/100) = 16 × 0,25/100 = 0,04 bar.'},
  {q:'Re = 5.500. Qual o regime de escoamento?',o:['Laminar','Transição','Turbulento','Viscoso'],a:2,e:'Re > 4.000 = Turbulento. Laminar: Re < 2.300. Transição: 2.300–4.000.'},
  {q:'Instrumento re-rangeado para 2–8 bar. Qual o Span?',o:['10 bar','8 bar','2 bar','6 bar'],a:3,e:'Span = URV − LRV = 8 − 2 = 6 bar.'},
  {q:'O que é Histerese?',o:['Erro fixo no zero','Diferença de leitura para o mesmo ponto ao subir vs. ao descer','Atraso de resposta do sensor','Desvio da curva real'],a:1,e:'Histerese: leitura diferente ao subir vs. ao descer para o mesmo ponto. Causada por folgas mecânicas.'},
  {q:'1 Bar equivale a quantos Pascal?',o:['1.000 Pa','10.000 Pa','100.000 Pa','1.000.000 Pa'],a:2,e:'1 bar = 100.000 Pa = 100 kPa ≈ 1 atm.'},
  {q:'Set Point (SP) é:',o:['O valor atual do sensor','O valor desejado para a variável de processo','O sinal de saída do sensor','O erro máximo do instrumento'],a:1,e:'SP = o que queremos atingir. Controlador age na MV para PV = SP.'},
  {q:'Erro%FS com EA=0,12 e FS=10?',o:['2,0%','1,2%','0,12%','12%'],a:1,e:'(0,12/10)×100 = 1,2%. Note: erro% do valor real (0,12/6×100) = 2,0% — denominadores diferentes!'},
  {q:'Princípio de Bernoulli: quando a velocidade aumenta...',o:['Pressão aumenta','Pressão estática diminui','Vazão diminui','Densidade aumenta'],a:1,e:'P_total = P_estática + ½ρv². Velocidade sobe → P_estática cai. Base dos medidores de ΔP.'},
  {q:'Fórmula de Stevin para pressão hidrostática?',o:['P = F/A','ΔP = ρ × g × h','P = ½ρv²','P = Q × R'],a:1,e:'ΔP = ρ×g×h. ρ = massa específica · g = gravidade · h = altura da coluna.'},
  {q:'Qual medidor de vazão usa a Lei de Faraday?',o:['Placa de orifício','Coriolis','Eletromagnético','Ultrassônico'],a:2,e:'Eletromagnético: fluido condutor em campo magnético gera tensão ∝ velocidade. Não funciona com hidrocarbonetos.'},
  {q:'Diferença entre pressão absoluta e manométrica?',o:['São iguais','Absoluta usa vácuo; manométrica usa a atmosfera','Manométrica usa vácuo','Absoluta só para gases'],a:1,e:'P_abs = P_man + P_atm. Manômetros industriais mostram pressão manométrica.'},
  {q:'Re = 1.200. O escoamento é:',o:['Turbulento','Transição','Laminar','Caótico'],a:2,e:'Re < 2.300 = Laminar. Escoamento em camadas paralelas, perfil parabólico de velocidade.'},
  {q:'Equação de Torricelli — velocidade de saída de um orifício?',o:['v = √(2gh)','v = ρ×g×h','v = Q/A','v = P/ρ'],a:0,e:'v = √(2×g×h). v = velocidade de saída · g = gravidade · h = altura do nível acima do orifício.'},
  {q:'Como medir nível usando pressão?',o:['Medir pressão no topo','h = P/(ρ×g) com transmissor no fundo','Calcular volume diretamente','Usar medidor de turbina'],a:1,e:'ΔP = ρ×g×h → h = P/(ρ×g). Transmissor no fundo mede pressão hidrostática da coluna.'},
  {q:'Equação de balanço do nível de um tanque?',o:['dN/dt = P×Q','dh/dt = (Q_in − Q_out)/A','h = v × t','N = ρ×g×P'],a:1,e:'Taxa de variação do nível = desequilíbrio de vazões / área do tanque.'},
  {q:'Relação entre ΔP e vazão na placa de orifício?',o:['Q ∝ ΔP','Q ∝ √(ΔP)','Q ∝ ΔP²','Q ∝ 1/ΔP'],a:1,e:'Q = Cd×A×√(2ΔP/ρ). Dobrar Q = quadruplicar ΔP. Por isso o transmissor extrai raiz internamente.'},
  {q:'Viscosidade Cinemática (ν):',o:['ν = μ + ρ','ν = μ × ρ','ν = μ / ρ','ν = ρ / μ'],a:2,e:'ν = μ/ρ [m²/s, cSt]. μ = viscosidade dinâmica · ρ = massa específica.'},
  {q:'Lei de Boyle-Mariotte (temperatura constante):',o:['P₁+V₁=P₂+V₂','P₁V₁=P₂V₂','P₁/V₁=P₂/V₂','P₁T₁=P₂T₂'],a:1,e:'P₁V₁ = P₂V₂. Gás comprimido: volume diminui proporcionalmente ao aumento de pressão.'},
  {q:'O fenômeno "swell" em caldeiras ocorre quando:',o:['O nível real sobe bruscamente','A demanda de vapor cai','Pressão cai → bolhas formam-se → nível aparente sobe mas massa real cai','A bomba falha'],a:2,e:'Swell: queda de pressão → bolhas de vapor → expansão aparente. Nível indicado sobe mas massa cai. Controle 3-elementos é a solução.'},
  {q:'Qual tecnologia de nível é imune a vapores e sem contato?',o:['Boia','Capacitivo','Radar FMCW','Pressão diferencial'],a:2,e:'Radar FMCW: mede nível por frequência de eco. Alta precisão, imune a vapores. Ideal para hidrocarbonetos.'},
  {q:'Por que nível em caldeiras exige redundância tripla?',o:['Para economizar energia','Nível baixo = explosão; nível alto = arraste em turbinas — ambos catastróficos','Para aumentar precisão','Por norma da ABNT'],a:1,e:'Dois extremos são catastróficos. Usa-se votação 2oo3 — dois sensores que concordam sobrepõem o terceiro.'},
  {q:'Como P, N e Q interagem em uma ETA?',o:['São independentes','P das bombas → Q distribuída → N reservatórios → P na rede por gravidade — ciclo interconectado','Somente Q importa','Somente P importa'],a:1,e:'P das bombas determina Q → Q altera N dos reservatórios → N via Stevin determina P na rede. Sistema realimentado.'},
  {q:'Qual medidor é preferido quando precisão máxima de massa é crítica?',o:['Placa de orifício','Ultrassônico','Coriolis','Turbina'],a:2,e:'Coriolis mede diretamente a vazão mássica com altíssima precisão. Ideal para farmacêutico, alimentício e químico de alto valor.'},
  {q:'Em qual situação controladores de N e P podem "brigar" entre si?',o:['Nunca','Quando são do mesmo fabricante','Quando ambos atuam na mesma linha — interação de malhas: controlar um altera o outro','Apenas em sistemas digitais'],a:2,e:'Interação de malhas: controlar P altera Q → altera N; controlar N altera Q → altera P. Solução: desacoplamento ou MPC.'},
  {q:'Fórmula da Vazão Mássica?',o:['Qm = V/t','Qm = ρ × Qv','Qm = S × v','Qm = F/A'],a:1,e:'Qm = ρ × Qv. ρ = massa específica · Qv = vazão volumétrica. A Qm não muda com T e P.'},
  {q:'O que é Erro de Zero (Offset)?',o:['Erro proporcional ao valor','Instrumento indica ≠ 0 quando variável real = 0','Diferença entre dois sensores','Erro por temperatura'],a:1,e:'Offset = instrumento não marca zero quando deveria. Corrigido no ajuste de zero da calibração.'},
  {q:'Qual é a faixa de temperatura do termopar tipo K?',o:['−50°C a +400°C','−270°C a +1260°C','0°C a +600°C','−100°C a +800°C'],a:1,e:'Tipo K (Chromel/Alumel): −270°C a +1260°C. É o mais utilizado no mundo por sua ampla faixa e custo acessível.'},
  {q:'O que é o Efeito Seebeck?',o:['Variação de resistência com temperatura','Geração de tensão numa junção de dois metais diferentes quando aquecida','Deformação mecânica por temperatura','Expansão de líquido com calor'],a:1,e:'Efeito Seebeck (1821): junção de dois metais diferentes gera tensão (mV) proporcional à diferença de temperatura. Princípio do termopar.'},
  {q:'O PT100 tem resistência de 100Ω. A que temperatura?',o:['100°C','0°C','20°C','−273°C'],a:1,e:'PT100: resistência de referência = 100Ω a 0°C. O "100" do nome indica os 100Ω a 0°C (ponto de fusão do gelo).'},
  {q:'Por que a conexão a 4 fios é mais precisa no PT100?',o:['Porque tem mais fios conduzindo corrente','Porque elimina completamente a resistência do cabo da medição','Porque é mais barata','Porque suporta maior temperatura'],a:1,e:'Com 4 fios, a corrente de excitação circula por 2 fios e a tensão é medida nos outros 2 sem corrente → resistência do cabo não interfere na medição.'},
  {q:'O que diferencia "As Found" de "As Left" numa calibração?',o:['São o mesmo dado','As Found = antes do ajuste · As Left = após o ajuste','As Found = aprovado · As Left = reprovado','As Found = leitura de campo · As Left = leitura de laboratório'],a:1,e:'As Found documenta o estado antes do ajuste (desvio encontrado). As Left documenta o estado após o ajuste. Ambos são registrados no relatório de calibração.'},
  {q:'Qual a cadeia correta de rastreabilidade metrológica?',o:['INMETRO → BIPM → RBC → Instrumento','BIPM → INMETRO → RBC → Instrumento','RBC → INMETRO → BIPM → Instrumento','Instrumento → RBC → BIPM → INMETRO'],a:1,e:'BIPM (padrão mundial, Paris) → INMETRO (padrão nacional brasileiro) → Laboratório RBC (acreditado) → Instrumento do processo.'},
  {q:'Quais são os 5 pontos padrão de calibração de um transmissor?',o:['10%, 30%, 50%, 70%, 90%','0%, 20%, 40%, 60%, 80%','0%, 25%, 50%, 75%, 100% (subindo E descendo)','0%, 50%, 100%'],a:2,e:'Calibração padrão usa 0%, 25%, 50%, 75%, 100% do span em sentido crescente E decrescente. Verifica linearidade e histerese.'},
  {q:'Qual chave de nível funciona apenas com fluidos condutores elétricos?',o:['Chave de boia','Chave por condutividade','Chave vibratória (diapasão)','Chave por pressão'],a:1,e:'Chave de condutividade: dois eletrodos fecham circuito quando o líquido condutor os toca. Não funciona com hidrocarbonetos (isolantes elétricos).'},
  {q:'Por que o medidor eletromagnético deve estar sempre completamente cheio?',o:['Para evitar corrosão','Para garantir que o fluido preencha toda a seção de medição — leitura parcial gera erro grave','Para reduzir vibrações','Para facilitar a manutenção'],a:1,e:'O magfômetro mede a velocidade média em toda a seção. Tubo parcialmente cheio → área efetiva diferente → cálculo de Qv incorreto. Deve operar sempre full-bore.'},
  {q:'Qual grupo de medidores de vazão usa o princípio da frequência de vórtices?',o:['Medidores deprimogênios','Medidores volumétricos','Medidores lineares — vórtex','Medidores em canais abertos'],a:2,e:'Medidor vórtex: a frequência dos vórtices de von Kármán formados após um bluff body é proporcional à velocidade do fluido. Pertence ao grupo dos medidores lineares.'},
];


/* ── § 6. QUIZ ENGINE ────────────────────────────────────────── */

let qzState={q:[],idx:0,score:0,answered:false,total:10};

/** Inicia uma nova rodada com n questões embaralhadas */
function startQz(n){
  qzState.total=n;
  const s=[...QS].sort(()=>Math.random()-.5).slice(0,n);
  qzState.q=s.map(q=>{const ct=q.o[q.a];const so=[...q.o].sort(()=>Math.random()-.5);return{...q,o:so,a:so.indexOf(ct)};});
  qzState.idx=0;qzState.score=0;qzState.answered=false;renderQz();
}

/** Renderiza a questão atual ou a tela de score */
function renderQz(){
  const qa=document.getElementById('qzarea');
  if(!qzState.q.length)return;
  if(qzState.idx>=qzState.q.length){
    const pct=Math.round(qzState.score/qzState.total*100);
    const stars=pct>=90?'★★★':pct>=70?'★★☆':'★☆☆';
    const col=pct>=70?'var(--g)':'var(--r)';
    qa.innerHTML=`<div class="score-wrap"><div style="font-size:24px;margin-bottom:8px">${stars}</div><div class="score-big">${qzState.score}/${qzState.total}</div><div style="font-size:13px;color:var(--t3);font-family:var(--fm);margin-top:5px">${pct}% de acertos</div><div style="margin-top:14px;font-size:14px;color:${col}">${pct>=90?'Excelente! Você dominou o conteúdo.':pct>=70?'Bom! Revise os pontos errados.':'Continue estudando os módulos.'}</div><div style="display:flex;gap:8px;justify-content:center;margin-top:18px;flex-wrap:wrap"><button class="btn btn-p" onclick="startQz(${qzState.total})">Repetir (${qzState.total})</button><button class="btn btn-g" onclick="startQz(38)">Todas 38</button></div></div>`;
    document.getElementById('qzstat').textContent='Concluído — '+qzState.score+'/'+qzState.total+' acertos';
    return;
  }
  const q=qzState.q[qzState.idx];
  document.getElementById('qzstat').textContent='Q'+(qzState.idx+1)+' de '+qzState.total+' · Pontuação: '+qzState.score;
  qa.innerHTML=`<div class="qz-box"><div class="qz-meta"><span style="background:rgba(0,212,255,0.1);color:var(--p);padding:2px 8px;border-radius:4px;font-family:var(--fm);font-size:10px">Q${qzState.idx+1}</span> de ${qzState.total}</div><div class="qz-q">${q.q}</div>${q.o.map((o,i)=>`<div class="qz-opt" id="qo${i}" onclick="answerQz(${i})"><span class="qz-ltr">${String.fromCharCode(65+i)}</span>${o}</div>`).join('')}<div id="qzfb" style="display:none"></div></div><div id="qznxt" style="display:none;margin-top:10px"><button class="btn btn-p" onclick="nextQz()">${qzState.idx+1<qzState.total?'Próxima →':'Ver resultado'}</button></div>`;
}

/** Processa a resposta do usuário */
function answerQz(i){
  if(qzState.answered)return;
  qzState.answered=true;
  const q=qzState.q[qzState.idx];
  document.querySelectorAll('.qz-opt').forEach(o=>o.classList.add('dis'));
  document.getElementById('qo'+i).classList.add(i===q.a?'ok':'err');
  if(i!==q.a)document.getElementById('qo'+q.a).classList.add('ok');
  if(i===q.a)qzState.score++;
  const fb=document.getElementById('qzfb');
  fb.style.display='block';
  fb.className='qz-fb '+(i===q.a?'fb-ok':'fb-err');
  fb.textContent=(i===q.a?'✓ Correto — ':'✗ Incorreto — ')+q.e;
  document.getElementById('qznxt').style.display='block';
}

/** Avança para a próxima questão */
function nextQz(){qzState.idx++;qzState.answered=false;renderQz()}

/* ── § 7. CALCULADORA ────────────────────────────────────────── */
/*
   9 fórmulas interativas com cálculo em tempo real.
   c1: Erro Absoluto + Relativo
   c2: %FS + %Span
   c3: Acurácia em engenharia
   c4: Pressão hidrostática (Stevin)
   c5: Nível por pressão
   c6: Reynolds
   c7: Torricelli
   c8: Boyle-Mariotte
   tc: Conversor de temperatura (°C ↔ K ↔ °F)
*/
const C={
  c1(){const a=+document.getElementById('c1a').value||0,b=+document.getElementById('c1b').value||0,ea=a-b,er=b?ea/b:0;document.getElementById('r1').textContent=`EA = ${ea>=0?'+':''}${ea.toFixed(4)} → ${ea>0?'superestima':ea<0?'subestima':'sem erro'} | ER = ${er.toFixed(5)}`},
  c2(){const ea=+document.getElementById('c2a').value||0,fs=+document.getElementById('c2b').value||1,lrv=+document.getElementById('c2c').value||0,span=fs-lrv;document.getElementById('r2').textContent=`%FS = ${(ea/fs*100).toFixed(3)}% | Span = ${span.toFixed(2)} | %Span = ${span?((ea/span)*100).toFixed(3):'—'}%`},
  c3(){const fs=+document.getElementById('c3a').value||0,p=+document.getElementById('c3b').value||0;document.getElementById('r3').textContent=`Erro máximo = ±${(fs*p/100).toFixed(5)} unidades`},
  c4(){const r=+document.getElementById('c4a').value||0,g=+document.getElementById('c4b').value||9.81,h=+document.getElementById('c4c').value||0,dp=r*g*h;document.getElementById('r4').textContent=`ΔP = ${Math.round(dp).toLocaleString('pt-BR')} Pa = ${(dp/100000).toFixed(5)} bar = ${(dp/1000).toFixed(4)} kPa`},
  c5(){const p=+document.getElementById('c5a').value||1,r=+document.getElementById('c5b').value||1000,g=+document.getElementById('c5c').value||9.81;document.getElementById('r5').textContent=`h = ${(p/(r*g)).toFixed(4)} m`},
  c6(){const r=+document.getElementById('c6a').value||0,v=+document.getElementById('c6b').value||0,d=+document.getElementById('c6c').value||0,u=+document.getElementById('c6d').value||0.001;const re=u?r*v*d/u:0;const reg=re<2300?'LAMINAR':re<4000?'TRANSIÇÃO':'TURBULENTO';document.getElementById('r6').textContent=`Re = ${Math.round(re).toLocaleString('pt-BR')} → ${reg}`},
  c7(){const h=+document.getElementById('c7a').value||0,g=+document.getElementById('c7b').value||9.81,d=+document.getElementById('c7c').value||0;const v=Math.sqrt(2*g*h),a=Math.PI*(d/2)**2,q=a*v;document.getElementById('r7').textContent=`v = ${v.toFixed(4)} m/s | A = ${(a*10000).toFixed(4)} cm² | Q = ${(q*1000).toFixed(4)} L/s`},
  c8(){const p1=+document.getElementById('c8a').value||1,v1=+document.getElementById('c8b').value||1,t1=+document.getElementById('c8c').value||293,p2=+document.getElementById('c8d').value||1,t2=+document.getElementById('c8e').value||293;const v2=p1*v1*t2/(t1*p2);document.getElementById('r8').textContent=`V₂ = ${v2.toFixed(5)} m³`},
  tc(){const v=+document.getElementById('tc_v').value,f=document.getElementById('tc_from').value;let c,k,fa;if(f==='°C'){c=v;k=v+273.15;fa=v*9/5+32;}else if(f==='K'){k=v;c=v-273.15;fa=c*9/5+32;}else{fa=v;c=(v-32)*5/9;k=c+273.15;}document.getElementById('tc_res').textContent=`${c.toFixed(3)} °C  =  ${k.toFixed(3)} K  =  ${fa.toFixed(3)} °F`}
}
Object.values(C).forEach(fn=>fn());

/* ── SIMULADORES ────────────────────────────── */

function inp(id){return parseFloat(document.getElementById(id).value);}

/* ── SIMULADOR 1: CONTINUIDADE ── */
function contCalc(){
  const d1=inp('c-d1'),v1=inp('c-v1'),d2=inp('c-d2');
  const err=document.getElementById('c-err'),res=document.getElementById('c-res');
  err.style.display='none';res.style.display='none';
  if([d1,v1,d2].some(isNaN)||d1<=0||d2<=0||v1<0){err.textContent='Preencha D₁, V₁ e D₂ com valores válidos.';err.style.display='block';return;}
  const a1=Math.PI*(d1/2)**2,a2=Math.PI*(d2/2)**2,v2=v1*(a1/a2),qv=a1*v1;
  document.getElementById('c-v2-prev').textContent='V₂ = '+v2.toFixed(4)+' m/s';
  document.getElementById('c-qv-prev').textContent='Qv = '+(qv*1000).toFixed(3)+' L/s = '+(qv*3600).toFixed(2)+' m³/h';
  const mb=(eq)=>`<div style="background:var(--bg);border:1px solid rgba(0,212,255,0.2);border-radius:6px;padding:10px 14px;font-size:13px;color:var(--t2);line-height:2.4;margin:6px 0">${eq}</div>`;
  const rw=(n,t,b)=>`<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--bd)"><div style="width:22px;height:22px;border-radius:50%;background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--p);flex-shrink:0;margin-top:2px">${n}</div><div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--p);text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px">${t}</div>${b}</div></div>`;
  let html='<div>';
  html+=rw('1','Dados conhecidos',`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
    <div class="mcard"><div class="mlbl">D₁</div><div style="font-size:15px;font-weight:600;color:var(--p);font-family:var(--fm)">${d1} m</div></div>
    <div class="mcard"><div class="mlbl">V₁</div><div style="font-size:15px;font-weight:600;color:var(--p);font-family:var(--fm)">${v1} m/s</div></div>
    <div class="mcard"><div class="mlbl">D₂</div><div style="font-size:15px;font-weight:600;color:var(--g);font-family:var(--fm)">${d2} m</div></div>
  </div>`);
  html+=rw('2','Calcule as áreas — A = π·(D/2)²',
    mb(`\\( A_1 = \\pi \\cdot \\left(\\dfrac{${d1}}{2}\\right)^2 = ${a1.toFixed(4)}\\,\\text{m}^2 = ${(a1*1e4).toFixed(2)}\\,\\text{cm}^2 \\)`)+
    mb(`\\( A_2 = \\pi \\cdot \\left(\\dfrac{${d2}}{2}\\right)^2 = ${a2.toFixed(4)}\\,\\text{m}^2 = ${(a2*1e4).toFixed(2)}\\,\\text{cm}^2 \\)`));
  html+=rw('3','Equação da Continuidade — isole V₂',mb(`\\( A_1 \\cdot V_1 = A_2 \\cdot V_2 \\;\\Rightarrow\\; V_2 = V_1 \\cdot \\dfrac{A_1}{A_2} = V_1 \\cdot \\left(\\dfrac{D_1}{D_2}\\right)^2 \\)`));
  html+=rw('4','Substitua os valores',mb(`\\( V_2 = ${v1} \\cdot \\left(\\dfrac{${d1}}{${d2}}\\right)^2 = ${v1} \\cdot ${((d1/d2)**2).toFixed(4)} = ${v2.toFixed(4)}\\,\\text{m/s} \\)`));
  html+=rw('5','Resultado',`<div style="background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.3);border-radius:7px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
    <div style="font-size:13px;color:var(--t2)">V₂ — Velocidade na Seção 2</div>
    <div style="text-align:right"><div style="font-size:22px;font-weight:700;color:var(--p);font-family:var(--fm)">${v2.toFixed(4)} m/s</div>
    <div style="font-size:11px;color:var(--t3)">${v2>v1?'↑ acelerou':'↓ desacelerou'} · Qv = ${(qv*1000).toFixed(3)} L/s</div></div>
  </div>
  <p style="font-size:11px;color:var(--t3);margin-top:8px">${v2>v1?'A área diminuiu → fluido precisa acelerar para manter o mesmo Qv.':'A área aumentou → fluido desacelera.'}</p>`);
  html+='</div>';
  document.getElementById('c-res-body').innerHTML=html;
  res.style.display='block';
  if(window.MathJax&&MathJax.typesetPromise)MathJax.typesetPromise([document.getElementById('c-res-body')]).catch(e=>console.warn(e));
  setTimeout(()=>res.scrollIntoView({behavior:'smooth',block:'nearest'}),120);
}
function contReset(){
  document.getElementById('c-d1').value='0.1';
  document.getElementById('c-v1').value='2';
  document.getElementById('c-d2').value='0.05';
  document.getElementById('c-err').style.display='none';
  document.getElementById('c-res').style.display='none';
  document.getElementById('c-v2-prev').textContent='V₂ = ? m/s';
  document.getElementById('c-qv-prev').textContent='Qv = ? L/s';
}

/* ── SIMULADOR 2: BERNOULLI ── */
function importV2(){
  const d1=inp('c-d1'),v1=inp('c-v1'),d2=inp('c-d2');
  if([d1,v1,d2].some(isNaN)||d1<=0||d2<=0){alert('Calcule o Simulador 1 primeiro.');return;}
  const a1=Math.PI*(d1/2)**2,a2=Math.PI*(d2/2)**2;
  document.getElementById('b-v2').value=(v1*(a1/a2)).toFixed(4);
}
function bernCalc(){
  const rho=inp('b-rho'),v1=inp('b-v1'),p1=inp('b-p1'),z1=inp('b-z1')||0,v2=inp('b-v2'),z2=inp('b-z2')||0,g=9.81;
  const err=document.getElementById('b-err'),res=document.getElementById('b-res');
  err.style.display='none';res.style.display='none';
  if([rho,v1,p1,v2].some(isNaN)||rho<=0||v1<0||v2<0){err.textContent='Preencha ρ, V₁, P₁ e V₂ com valores válidos.';err.style.display='block';return;}
  const tCin=rho*(v1**2-v2**2)/2,tPot=rho*g*(z1-z2),p2=p1+tCin+tPot,dp=p1-p2,hz=(z1===z2);
  document.getElementById('b-p2-prev').textContent='P₂ = '+p2.toFixed(0)+' Pa';
  document.getElementById('b-bar-prev').textContent='≈ '+(p2/1e5).toFixed(4)+' bar';
  const mb=(eq)=>`<div style="background:var(--bg);border:1px solid rgba(0,255,157,0.2);border-radius:6px;padding:10px 14px;font-size:13px;color:var(--t2);line-height:2.4;margin:6px 0">${eq}</div>`;
  const rw=(n,t,b)=>`<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--bd)"><div style="width:22px;height:22px;border-radius:50%;background:rgba(0,255,157,0.12);border:1px solid rgba(0,255,157,0.4);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--g);flex-shrink:0;margin-top:2px">${n}</div><div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--g);text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px">${t}</div>${b}</div></div>`;
  let html='<div>';
  html+=rw('1','Dados conhecidos',`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:6px">
    <div class="mcard"><div class="mlbl">ρ</div><div style="font-size:13px;font-weight:600;color:var(--p);font-family:var(--fm)">${rho}</div></div>
    <div class="mcard"><div class="mlbl">V₁</div><div style="font-size:13px;font-weight:600;color:var(--p);font-family:var(--fm)">${v1} m/s</div></div>
    <div class="mcard"><div class="mlbl">V₂</div><div style="font-size:13px;font-weight:600;color:var(--g);font-family:var(--fm)">${v2} m/s</div></div>
    <div class="mcard"><div class="mlbl">P₁</div><div style="font-size:13px;font-weight:600;color:var(--p);font-family:var(--fm)">${(p1/1e5).toFixed(3)} bar</div></div>
    <div class="mcard"><div class="mlbl">h₁−h₂</div><div style="font-size:13px;font-weight:600;color:var(--t2);font-family:var(--fm)">${z1-z2} m</div></div>
  </div>`);
  html+=rw('2','Equação de Bernoulli (por unidade de massa)',mb(`\\( \\dfrac{P_1}{\\rho} + \\dfrac{v_1^2}{2} + g\\,h_1 = \\dfrac{P_2}{\\rho} + \\dfrac{v_2^2}{2} + g\\,h_2 \\)`)+'<p style="font-size:10px;color:var(--t3);margin-top:4px">Unidade de cada termo: J/kg. A soma é constante ao longo do escoamento.</p>');
  html+=rw('3','Isole P₂',mb(`\\( P_2 = P_1 + \\rho\\,\\dfrac{v_1^2-v_2^2}{2} + \\rho\\,g\\,(h_1-h_2) \\)`)+(hz?'<p style="font-size:10px;color:var(--t3);margin-top:4px">h₁=h₂ → termo potencial = 0.</p>':`<p style="font-size:10px;color:var(--t3);margin-top:4px">h₁−h₂=${z1-z2} m → desnível ${(z1-z2)>0?'aumenta':'reduz'} P₂.</p>`));
  html+=rw('4','Calcule cada parcela',
    mb(`\\( \\rho\\,\\dfrac{v_1^2-v_2^2}{2} = ${rho}\\cdot\\dfrac{${v1**2}-${v2**2}}{2} = ${rho}\\cdot\\dfrac{${v1**2-v2**2}}{2} = ${tCin.toFixed(2)}\\,\\text{Pa} \\)`)+
    mb(`\\( \\rho\\,g\\,(h_1-h_2) = ${rho}\\cdot${g}\\cdot(${z1}-${z2}) = ${tPot.toFixed(2)}\\,\\text{Pa} \\)`));
  html+=rw('5','Substituição final',mb(`\\( P_2 = ${p1} + (${tCin.toFixed(2)}) + (${tPot.toFixed(2)}) = ${p2.toFixed(2)}\\,\\text{Pa} \\)`));
  html+=rw('6','Resultado',`<div style="background:rgba(0,255,157,0.08);border:1px solid rgba(0,255,157,0.3);border-radius:7px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
    <div style="font-size:13px;color:var(--t2)">P₂ — Pressão na Seção 2</div>
    <div style="text-align:right"><div style="font-size:22px;font-weight:700;color:var(--g);font-family:var(--fm)">${p2.toFixed(0)} Pa</div>
    <div style="font-size:12px;color:var(--t3)">${(p2/1000).toFixed(2)} kPa · ${(p2/1e5).toFixed(4)} bar</div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">
    <div style="background:var(--bg3);border-radius:6px;padding:10px;text-align:center"><div style="font-size:10px;color:var(--t3)">ΔP = P₁ − P₂</div><div style="font-size:15px;font-weight:600;color:${dp>=0?'var(--y)':'var(--r)'}">${dp.toFixed(0)} Pa</div></div>
    <div style="background:var(--bg3);border-radius:6px;padding:10px;text-align:center"><div style="font-size:10px;color:var(--t3)">Variação</div><div style="font-size:13px;font-weight:600;color:${p2<p1?'var(--r)':'var(--g)'}">${p2<p1?'Pressão caiu ↓':'Pressão subiu ↑'}</div></div>
  </div>
  ${p2<0?'<div class="alert aw" style="margin-top:8px">⚠ P₂ negativo → cavitação. Aumente P₁ ou reduza a diferença de velocidades.</div>':''}`);
  html+='</div>';
  document.getElementById('b-res-body').innerHTML=html;
  res.style.display='block';
  if(window.MathJax&&MathJax.typesetPromise)MathJax.typesetPromise([document.getElementById('b-res-body')]).catch(e=>console.warn(e));
  setTimeout(()=>res.scrollIntoView({behavior:'smooth',block:'nearest'}),120);
}
function bernReset(){
  ['b-rho','b-v1','b-p1','b-z1','b-v2','b-z2'].forEach((id,i)=>{document.getElementById(id).value=['1000','2','220000','0','8','0'][i];});
  document.getElementById('b-err').style.display='none';
  document.getElementById('b-res').style.display='none';
  document.getElementById('b-p2-prev').textContent='P₂ = ? Pa';
  document.getElementById('b-bar-prev').textContent='? bar';
}
function exLoad(d1,v1,p1,z1,d2,z2){
  document.getElementById('c-d1').value=d1;document.getElementById('c-v1').value=v1;document.getElementById('c-d2').value=d2;
  document.getElementById('b-v1').value=v1;document.getElementById('b-p1').value=p1;document.getElementById('b-z1').value=z1;document.getElementById('b-z2').value=z2;
  document.getElementById('b-rho').value=1000;
  const a1=Math.PI*(d1/2)**2,a2=Math.PI*(d2/2)**2;
  document.getElementById('b-v2').value=(v1*(a1/a2)).toFixed(4);
  contCalc();bernCalc();
}
function exLoadBern(rho,v1,z1,p1,v2,z2){
  document.getElementById('b-rho').value=rho;document.getElementById('b-v1').value=v1;document.getElementById('b-p1').value=p1;
  document.getElementById('b-z1').value=z1;document.getElementById('b-v2').value=v2;document.getElementById('b-z2').value=z2;
  bernCalc();
}
/**
 * SENAI · MVF v5 — Motor de Inteligência
 * Refatorado para ES6+
 */

const AppState = {
    pages: ['home', 'pressao', 'nivel', 'vazao', 'temperatura', 'calibracao', 'quiz', 'calc', 'bernoulli'],
    currentQuiz: null
};

// ── NAVEGAÇÃO UNIFICADA ──
const navigateTo = (id) => {
    // Fecha drawer se estiver aberto
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');

    // Troca telas
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${id}`);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Atualiza Nav
    document.querySelectorAll('.titem').forEach(ti => ti.classList.remove('active'));
    document.getElementById(`nav-${id}`)?.classList.add('active');

    // Re-renderiza MathJax para garantir que fórmulas injetadas apareçam
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
};

// ── UI HELPERS ──
const toggleDrawer = () => {
    document.getElementById('drawer').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
};

// ── MOTOR DE CÁLCULO (SCALING) ──
const runScaling = () => {
    const ma = parseFloat(document.getElementById('in-ma').value);
    const lrv = parseFloat(document.getElementById('in-lrv').value);
    const urv = parseFloat(document.getElementById('in-urv').value);
    const resDiv = document.getElementById('res-scaling');

    if (ma < 4 || ma > 20) {
        resDiv.innerHTML = "Erro: Sinal fora da faixa (4-20mA)";
        resDiv.style.color = "var(--r)";
        return;
    }

    // Fórmula de Scaling: PV = ((mA - 4)/16) * (URV - LRV) + LRV
    const pv = ((ma - 4) / 16) * (urv - lrv) + lrv;
    resDiv.innerHTML = `Resultado: ${pv.toFixed(2)} unidades`;
    resDiv.style.color = "var(--g)";
};

// ── QUIZ ENGINE (SIMPLIFICADO) ──
const QS = [
    { q: "Qual o valor da resistência de um PT100 a 0°C?", o: ["0 Ω", "100 Ω", "1000 Ω", "50 Ω"], a: 1 },
    { q: "O que acontece com a pressão estática quando a velocidade do fluido aumenta?", o: ["Aumenta", "Diminui", "Fica igual", "Dobra"], a: 1 },
    { q: "Qual medidor de vazão usa a Lei de Faraday?", o: ["Coriolis", "Vórtex", "Eletromagnético", "Placa de Orifício"], a: 2 }
];

const startQz = (n) => {
    const area = document.getElementById('qzarea');
    let html = `<div class="blk"><h3>Simulado Ativo</h3>`;
    
    QS.forEach((item, i) => {
        html += `<p>${i+1}. ${item.q}</p><div class="grid g2" style="margin-bottom:15px">`;
        item.o.forEach((opt, j) => {
            html += `<button class="btn" style="border:1px solid var(--bd)" onclick="checkQz(${i}, ${j}, this)">${opt}</button>`;
        });
        html += `</div>`;
    });
    
    html += `<button class="btn btn-p" onclick="navigateTo('home')">Finalizar</button></div>`;
    area.innerHTML = html;
};

const checkQz = (qIdx, oIdx, btn) => {
    if (oIdx === QS[qIdx].a) {
        btn.style.background = "var(--g)";
        btn.style.color = "#000";
    } else {
        btn.style.background = "var(--r)";
    }
};

// Inicialização
window.onload = () => {
    console.log("Senai.MVF v5 carregado com sucesso.");
};

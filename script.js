/* ════════════════════════════════════════════════════════════════
   SENAI · MVF v5 — script.js
   Módulos:
     § 1. Navegação          — troca de telas, scroll nav, drawer
     § 2. Tema claro/escuro  — toggle, persistência localStorage
     § 3. UI Helpers         — expanders, cenários
     § 4. Flashcards Engine  — show, flip, nav, shuffle, filtro
     § 5. Quiz Engine        — start, render, resposta, próxima
     § 6. Calculadora        — 9 fórmulas interativas
     § 7. Simuladores        — Continuidade + Bernoulli
════════════════════════════════════════════════════════════════ */

/* ── § 1. NAVEGAÇÃO ──────────────────────────────────────────── */

const PAGES = [
  'home','m1','m2','m3','m4',
  'formulas','pressao','nivel','vazao','temperatura',
  'relacoes','cenarios',
  'calibracao','flash','quiz','calc','bernoulli','changelog'
];

/** Troca a tela ativa e rola o item de nav para visível */
function S(id){
  PAGES.forEach(p=>{
    const s=document.getElementById('screen-'+p);if(s)s.classList.remove('active');
    const n=document.getElementById('nav-'+p);if(n)n.classList.remove('active');
    const dn=document.getElementById('dnav-'+p);if(dn)dn.classList.remove('active');
  });
  document.getElementById('screen-'+id).classList.add('active');
  const nv=document.getElementById('nav-'+id);
  if(nv){nv.classList.add('active');nv.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'});}
  const dnv=document.getElementById('dnav-'+id);if(dnv)dnv.classList.add('active');
  window.scrollTo(0,0);
}

/** Desliza o nav bar horizontalmente (setas ‹ ›) */
function scrollNav(delta){const nb=document.getElementById('navBar');if(nb)nb.scrollBy({left:delta,behavior:'smooth'});}

/** Troca de tela + fecha o drawer mobile */
function SD(id){S(id);closeDrawer();}

/** Abre/fecha o drawer mobile */
function toggleDrawer(){
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
}
function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

/* ── § 2. TEMA CLARO/ESCURO ──────────────────────────────────── */

(function initTheme(){
  const saved = localStorage.getItem('mvf-theme');
  if(saved === 'light') document.documentElement.classList.add('light');
  updateThemeBtn();
})();

function toggleTheme(){
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('mvf-theme', isLight ? 'light' : 'dark');
  updateThemeBtn();
}

function updateThemeBtn(){
  const btn = document.getElementById('theme-btn');
  if(!btn) return;
  const isLight = document.documentElement.classList.contains('light');
  btn.textContent = isLight ? '☾' : '☀';
  btn.title = isLight ? 'Mudar para tema escuro' : 'Mudar para tema claro';
}

/* ── § 3. UI HELPERS ─────────────────────────────────────────── */

/** Abre/fecha expander (accordion) */
function X(el){el.classList.toggle('open');}

/** Abre/fecha card de cenário real */
function toggleScen(el){el.classList.toggle('open');}

/* ── § 4. FLASHCARDS ENGINE ──────────────────────────────────── */

let fcActive=[...Array(CARDS.length).keys()], fcIdx=0;

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

function fcFlip(){document.getElementById('fccard').classList.toggle('flip');}
function fcNext(){fcIdx=(fcIdx+1)%fcActive.length;fcShow();}
function fcPrev(){fcIdx=(fcIdx-1+fcActive.length)%fcActive.length;fcShow();}
function fcShuffle(){fcActive=[...fcActive].sort(()=>Math.random()-.5);fcIdx=0;fcShow();}
function fcReset(){fcActive=[...Array(CARDS.length).keys()];fcIdx=0;fcShow();}
function fcFilt(cat){
  const f=CARDS.map((c,i)=>c.c===cat?i:-1).filter(i=>i>=0);
  fcActive=f.length?f:[...Array(CARDS.length).keys()];
  fcIdx=0;fcShow();
}

setTimeout(fcShow, 50);

/* ── § 5. QUIZ ENGINE ────────────────────────────────────────── */

let qzState={q:[],idx:0,score:0,answered:false,total:10};

function startQz(n){
  qzState.total=n;
  const s=[...QS].sort(()=>Math.random()-.5).slice(0,n);
  qzState.q=s.map(q=>{
    const ct=q.o[q.a];
    const so=[...q.o].sort(()=>Math.random()-.5);
    return{...q,o:so,a:so.indexOf(ct)};
  });
  qzState.idx=0;qzState.score=0;qzState.answered=false;renderQz();
}

function renderQz(){
  const qa=document.getElementById('qzarea');
  if(!qzState.q.length)return;
  if(qzState.idx>=qzState.q.length){
    const pct=Math.round(qzState.score/qzState.total*100);
    const stars=pct>=90?'★★★':pct>=70?'★★☆':'★☆☆';
    const col=pct>=70?'var(--g)':'var(--r)';
    qa.innerHTML=`<div class="score-wrap">
      <div style="font-size:24px;margin-bottom:8px">${stars}</div>
      <div class="score-big">${qzState.score}/${qzState.total}</div>
      <div style="font-size:13px;color:var(--t3);font-family:var(--fm);margin-top:5px">${pct}% de acertos</div>
      <div style="margin-top:14px;font-size:14px;color:${col}">
        ${pct>=90?'Excelente! Você dominou o conteúdo.':pct>=70?'Bom! Revise os pontos errados.':'Continue estudando os módulos.'}
      </div>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:18px;flex-wrap:wrap">
        <button class="btn btn-p" onclick="startQz(${qzState.total})">Repetir (${qzState.total})</button>
        <button class="btn btn-g" onclick="startQz(38)">Todas 38</button>
      </div>
    </div>`;
    document.getElementById('qzstat').textContent='Concluído — '+qzState.score+'/'+qzState.total+' acertos';
    return;
  }
  const q=qzState.q[qzState.idx];
  document.getElementById('qzstat').textContent='Q'+(qzState.idx+1)+' de '+qzState.total+' · Pontuação: '+qzState.score;
  qa.innerHTML=`<div class="qz-box">
    <div class="qz-meta"><span style="background:rgba(0,212,255,0.1);color:var(--p);padding:2px 8px;border-radius:4px;font-family:var(--fm);font-size:10px">Q${qzState.idx+1}</span> de ${qzState.total}</div>
    <div class="qz-q">${q.q}</div>
    ${q.o.map((o,i)=>`<div class="qz-opt" id="qo${i}" onclick="answerQz(${i})"><span class="qz-ltr">${String.fromCharCode(65+i)}</span>${o}</div>`).join('')}
    <div id="qzfb" style="display:none"></div>
  </div>
  <div id="qznxt" style="display:none;margin-top:10px">
    <button class="btn btn-p" onclick="nextQz()">${qzState.idx+1<qzState.total?'Próxima →':'Ver resultado'}</button>
  </div>`;
}

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

function nextQz(){qzState.idx++;qzState.answered=false;renderQz();}

/* ── § 6. CALCULADORA ────────────────────────────────────────── */

const C={
  c1(){
    const a=+document.getElementById('c1a').value||0,
          b=+document.getElementById('c1b').value||0,
          ea=a-b, er=b?ea/b:0;
    document.getElementById('r1').textContent=
      `EA = ${ea>=0?'+':''}${ea.toFixed(4)} → ${ea>0?'superestima':ea<0?'subestima':'sem erro'} | ER = ${er.toFixed(5)}`;
  },
  c2(){
    const ea=+document.getElementById('c2a').value||0,
          fs=+document.getElementById('c2b').value||1,
          lrv=+document.getElementById('c2c').value||0,
          span=fs-lrv;
    document.getElementById('r2').textContent=
      `%FS = ${(ea/fs*100).toFixed(3)}% | Span = ${span.toFixed(2)} | %Span = ${span?((ea/span)*100).toFixed(3):'—'}%`;
  },
  c3(){
    const fs=+document.getElementById('c3a').value||0,
          p=+document.getElementById('c3b').value||0;
    document.getElementById('r3').textContent=`Erro máximo = ±${(fs*p/100).toFixed(5)} unidades`;
  },
  c4(){
    const r=+document.getElementById('c4a').value||0,
          g=+document.getElementById('c4b').value||9.81,
          h=+document.getElementById('c4c').value||0,
          dp=r*g*h;
    document.getElementById('r4').textContent=
      `ΔP = ${Math.round(dp).toLocaleString('pt-BR')} Pa = ${(dp/100000).toFixed(5)} bar = ${(dp/1000).toFixed(4)} kPa`;
  },
  c5(){
    const p=+document.getElementById('c5a').value||1,
          r=+document.getElementById('c5b').value||1000,
          g=+document.getElementById('c5c').value||9.81;
    document.getElementById('r5').textContent=`h = ${(p/(r*g)).toFixed(4)} m`;
  },
  c6(){
    const r=+document.getElementById('c6a').value||0,
          v=+document.getElementById('c6b').value||0,
          d=+document.getElementById('c6c').value||0,
          u=+document.getElementById('c6d').value||0.001;
    const re=u?r*v*d/u:0;
    const reg=re<2300?'LAMINAR':re<4000?'TRANSIÇÃO':'TURBULENTO';
    document.getElementById('r6').textContent=`Re = ${Math.round(re).toLocaleString('pt-BR')} → ${reg}`;
  },
  c7(){
    const h=+document.getElementById('c7a').value||0,
          g=+document.getElementById('c7b').value||9.81,
          d=+document.getElementById('c7c').value||0;
    const v=Math.sqrt(2*g*h),a=Math.PI*(d/2)**2,q=a*v;
    document.getElementById('r7').textContent=
      `v = ${v.toFixed(4)} m/s | A = ${(a*10000).toFixed(4)} cm² | Q = ${(q*1000).toFixed(4)} L/s`;
  },
  c8(){
    const p1=+document.getElementById('c8a').value||1,
          v1=+document.getElementById('c8b').value||1,
          t1=+document.getElementById('c8c').value||293,
          p2=+document.getElementById('c8d').value||1,
          t2=+document.getElementById('c8e').value||293;
    const v2=p1*v1*t2/(t1*p2);
    document.getElementById('r8').textContent=`V₂ = ${v2.toFixed(5)} m³`;
  },
  tc(){
    const v=+document.getElementById('tc_v').value,
          f=document.getElementById('tc_from').value;
    let c,k,fa;
    if(f==='°C'){c=v;k=v+273.15;fa=v*9/5+32;}
    else if(f==='K'){k=v;c=v-273.15;fa=c*9/5+32;}
    else{fa=v;c=(v-32)*5/9;k=c+273.15;}
    document.getElementById('tc_res').textContent=
      `${c.toFixed(3)} °C  =  ${k.toFixed(3)} K  =  ${fa.toFixed(3)} °F`;
  }
};

// Inicializa calculadoras
Object.values(C).forEach(fn=>fn());

/* ── § 7. SIMULADORES ────────────────────────────────────────── */

function inp(id){const v=parseFloat(document.getElementById(id).value);return isNaN(v)?NaN:v;}
function setRho(v){document.getElementById('b-rho').value=v;bernCalcRT();}

/* ── helpers de passo a passo (sem MathJax) ── */
function numP(n,color){
  return `<div class="sim-solve-num sim-solve-num-${color}">${n}</div>`;
}
function stepP(n,title,body){
  return `<div class="sim-solve-step">
    ${numP(n,'p')}
    <div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--p);text-transform:uppercase;letter-spacing:.8px;margin-bottom:5px">${title}</div>${body}</div>
  </div>`;
}
function stepG(n,title,body){
  return `<div class="sim-solve-step">
    ${numP(n,'g')}
    <div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--g);text-transform:uppercase;letter-spacing:.8px;margin-bottom:5px">${title}</div>${body}</div>
  </div>`;
}
function eq(txt,green){return `<div class="sim-eq-box${green?' sim-eq-box-g':''}">${txt}</div>`;}
function valGrid(items,cols){
  return `<div class="sim-val-box" style="grid-template-columns:repeat(${cols},1fr)">
    ${items.map(([lbl,val,c])=>`<div class="sim-val-card"><div class="sim-val-lbl">${lbl}</div><div class="sim-val-num" style="color:var(--${c||'p'})">${val}</div></div>`).join('')}
  </div>`;
}

/* ── Simulador 1: Continuidade — tempo real ── */
function contCalcRT(){
  const d1=inp('c-d1'),v1=inp('c-v1'),d2=inp('c-d2');
  const err=document.getElementById('c-err');
  const alertEl=document.getElementById('c-alert');
  err.style.display='none'; alertEl.style.display='none';

  if([d1,v1,d2].some(isNaN)||d1<=0||d2<=0||v1<0){
    document.getElementById('c-v2-prev').textContent='V₂ = ?';
    document.getElementById('c-qv-prev').textContent='Qv = ?';
    updateContSVG(null,null,null,null,null);
    return;
  }

  const a1=Math.PI*(d1/2)**2, a2=Math.PI*(d2/2)**2;
  const v2=v1*(a1/a2), qv=a1*v1;
  const accel=v2>v1;

  document.getElementById('c-v2-prev').textContent=`V₂ = ${v2.toFixed(3)} m/s`;
  document.getElementById('c-qv-prev').textContent=`Qv = ${(qv*1000).toFixed(3)} L/s = ${(qv*3600).toFixed(2)} m³/h`;
  document.getElementById('c-d-hint').textContent=
    d2<d1 ? 'D₂ < D₁ → fluido acelera' : d2>d1 ? 'D₂ > D₁ → fluido desacelera' : 'D₂ = D₁ → velocidade constante';

  // Alerta contextual
  if(v2>15){
    alertEl.className='sim-alert-ctx sim-alert-warn';
    alertEl.innerHTML='⚠ V₂ muito alta (>15 m/s) — pode causar erosão na tubulação e ruído excessivo.';
    alertEl.style.display='block';
  } else if(v2<0.3){
    alertEl.className='sim-alert-ctx sim-alert-info';
    alertEl.innerHTML='ℹ V₂ muito baixa (<0,3 m/s) — medidores de turbina podem não operar corretamente.';
    alertEl.style.display='block';
  }

  updateContSVG(d1,v1,d2,v2,qv);
  buildContSolve(d1,v1,d2,a1,a2,v2,qv);
}

function updateContSVG(d1,v1,d2,v2,qv){
  const s=document.getElementById('svg-cont');
  if(!s||!d1)return;
  const ratio=d2&&d1?Math.min(Math.max(d2/d1,0.2),1):0.5;
  // v2 arrow length proportional to velocity ratio
  const vr=v2&&v1?Math.min(v2/v1,6):1;
  const maxL=160, baseL=80;
  const l2=Math.min(baseL*vr, maxL);
  const sv2a=document.getElementById('sv2a');
  const sv2b=document.getElementById('sv2b');
  const sv2c=document.getElementById('sv2c');
  if(sv2a){sv2a.setAttribute('x2',String(250+l2));sv2b.setAttribute('x2',String(255+l2*0.85));sv2c.setAttribute('x2',String(255+l2*0.85));}
  const lblV2=document.getElementById('lbl-v2');
  const lblQv=document.getElementById('lbl-qv');
  const lblD1=document.getElementById('lbl-d1');
  const lblV1=document.getElementById('lbl-v1');
  const lblD2=document.getElementById('lbl-d2');
  if(lblV2) lblV2.textContent=`V₂=${v2.toFixed(2)} m/s`;
  if(lblQv) lblQv.textContent=`Qv = ${(qv*1000).toFixed(2)} L/s`;
  if(lblD1) lblD1.textContent=`D₁=${d1} m`;
  if(lblV1) lblV1.textContent=`V₁=${v1} m/s`;
  if(lblD2) lblD2.textContent=`D₂=${d2} m`;
}

function buildContSolve(d1,v1,d2,a1,a2,v2,qv){
  const body=document.getElementById('solve-c-body');
  if(!body)return;
  let h='';
  h+=stepP('1','Dados conhecidos', valGrid([['D₁',d1+' m','p'],['V₁',v1+' m/s','p'],['D₂',d2+' m','g']],3));
  h+=stepP('2','Áreas — A = π·(D/2)²',
    eq(`A₁ = π × (${d1}/2)² = ${a1.toFixed(5)} m² = ${(a1*1e4).toFixed(2)} cm²`)+
    eq(`A₂ = π × (${d2}/2)² = ${a2.toFixed(5)} m² = ${(a2*1e4).toFixed(2)} cm²`));
  h+=stepP('3','Isole V₂ — Continuidade',
    eq(`A₁·V₁ = A₂·V₂  →  V₂ = V₁ × (D₁/D₂)²`));
  h+=stepP('4','Substituição',
    eq(`V₂ = ${v1} × (${d1}/${d2})² = ${v1} × ${((d1/d2)**2).toFixed(4)} = ${v2.toFixed(4)} m/s`));
  h+=stepP('5','Resultado',
    `<div class="sim-res-final sim-res-final-p">
      <div><div class="sim-res-label">V₂ — Velocidade na Seção 2</div><div class="sim-res-sub">${v2>v1?'↑ fluido acelerou':'↓ fluido desacelerou'} · Qv = ${(qv*1000).toFixed(3)} L/s</div></div>
      <div style="text-align:right"><div class="sim-res-value sim-res-value-p">${v2.toFixed(3)} m/s</div></div>
    </div>`);
  body.innerHTML=h;
}

function toggleSimSolve(id){
  const el=document.getElementById('solve-'+id);
  const btn=document.getElementById('btn-'+id+'solve');
  if(!el)return;
  const open=el.style.display==='none';
  el.style.display=open?'block':'none';
  if(btn) btn.textContent=(open?'▼ ':'▶ ')+'Passo a passo';
}

function contReset(){
  ['c-d1','c-v1','c-d2'].forEach((id,i)=>document.getElementById(id).value=['0.1','2','0.05'][i]);
  document.getElementById('c-err').style.display='none';
  document.getElementById('c-alert').style.display='none';
  document.getElementById('c-v2-prev').textContent='V₂ = ?';
  document.getElementById('c-qv-prev').textContent='Qv = ?';
  document.getElementById('solve-c').style.display='none';
  document.getElementById('btn-csolve').textContent='▶ Passo a passo';
  contCalcRT();
}

/* ── Simulador 2: Bernoulli — tempo real ── */
function bernCalcRT(){
  const rho=inp('b-rho'),v1=inp('b-v1'),p1=inp('b-p1'),
        z1=inp('b-z1')||0, v2=inp('b-v2'), z2=inp('b-z2')||0, g=9.81;
  const err=document.getElementById('b-err');
  const alertEl=document.getElementById('b-alert');
  err.style.display='none'; alertEl.style.display='none';

  // P1 hint
  const p1hint=document.getElementById('b-p1-hint');
  if(p1hint&&!isNaN(p1)) p1hint.textContent=`${p1.toFixed(0)} Pa = ${(p1/1e5).toFixed(4)} bar`;

  if([rho,v1,p1,v2].some(isNaN)||rho<=0||v1<0||v2<0){
    document.getElementById('b-p2-prev').textContent='P₂ = ?';
    document.getElementById('b-bar-prev').textContent='';
    return;
  }

  const tCin=rho*(v1**2-v2**2)/2, tPot=rho*g*(z1-z2), p2=p1+tCin+tPot, dp=p1-p2;

  document.getElementById('b-p2-prev').textContent=`P₂ = ${p2.toFixed(0)} Pa`;
  document.getElementById('b-bar-prev').textContent=`${(p2/1e5).toFixed(4)} bar`;

  // Alertas contextuais
  const alerts=[];
  if(p2<0) alerts.push(['danger','⚠ Cavitação: P₂ negativo! O fluido vaporiza criando bolhas que danificam tubulações e bombas. Aumente P₁ ou reduza ΔV.']);
  if(p2<2300&&p2>=0) alerts.push(['warn','⚠ P₂ muito baixa (< 0,023 bar) — risco real de cavitação. Revise as condições de operação.']);
  if(dp<0) alerts.push(['info','ℹ ΔP negativo: P₂ > P₁. Isso acontece quando V₂ < V₁ ou h₂ < h₁ — o fluido desacelerou ou desceu.']);
  if(v2>0&&v1>0){
    const re=rho*Math.max(v1,v2)*0.05/0.001;
    if(re<2300) alerts.push(['info',`ℹ Reynolds estimado ≈ ${re.toFixed(0)} → Escoamento laminar. Bernoulli é válido, mas perdas por viscosidade podem ser significativas.`]);
  }
  if(alerts.length>0){
    alertEl.className='sim-alert-ctx sim-alert-'+alerts[0][0];
    alertEl.innerHTML=alerts.map(([,m])=>m).join('<br>');
    alertEl.style.display='block';
  }

  updateBernSVG(v1,v2,p1,p2,dp,z1,z2);
  buildBernSolve(rho,v1,p1,z1,v2,z2,g,tCin,tPot,p2,dp);
}

function updateBernSVG(v1,v2,p1,p2,dp,z1,z2){
  const upd=(id,txt)=>{const el=document.getElementById(id);if(el)el.textContent=txt;};
  upd('bp1-val',(p1/1e5).toFixed(3)+' bar');
  upd('bp2-val',isNaN(p2)?'?':(p2/1e5).toFixed(3)+' bar');
  upd('bv1-lbl','V₁='+v1+' m/s');
  upd('bv2-lbl','V₂='+v2+' m/s');
  upd('bdp-lbl',isNaN(dp)?'ΔP = ?':'ΔP = '+(dp/1e5).toFixed(3)+' bar');
  // Escala seta V2 proporcional
  const sv2=document.getElementById('bv2-line');
  if(sv2&&!isNaN(v2)&&v2>=0){
    const ratio=Math.min(Math.max(v2/Math.max(v1,0.1),0.3),5);
    const len=Math.min(ratio*90,200);
    sv2.setAttribute('x2',String(225+len));
  }
  // Cor P2 label
  const bp2lbl=document.getElementById('bp2-lbl');
  if(bp2lbl) bp2lbl.setAttribute('fill',isNaN(p2)||p2<0?'var(--r)':'var(--g)');
}

function buildBernSolve(rho,v1,p1,z1,v2,z2,g,tCin,tPot,p2,dp){
  const body=document.getElementById('solve-b-body');
  if(!body)return;
  const hz=(z1===z2);
  let h='';
  h+=stepG('1','Dados conhecidos',
    valGrid([['ρ',rho+' kg/m³','t2'],['V₁',v1+' m/s','p'],['V₂',v2+' m/s','g'],['P₁',(p1/1e5).toFixed(3)+' bar','p'],['Δh',(z1-z2)+' m','t2']],5));
  h+=stepG('2','Equação de Bernoulli (isolando P₂)',
    eq('P₂ = P₁ + ρ·(v₁²−v₂²)/2 + ρ·g·(h₁−h₂)',true));
  h+=stepG('3','Termo cinético — ρ·(v₁²−v₂²)/2',
    eq(`${rho} × (${v1}² − ${v2}²) / 2 = ${rho} × (${v1**2} − ${v2**2}) / 2 = ${tCin.toFixed(2)} Pa`,true));
  h+=stepG('4','Termo potencial — ρ·g·(h₁−h₂)',
    hz ? eq('h₁ = h₂ → termo potencial = 0',true)
       : eq(`${rho} × ${g} × (${z1} − ${z2}) = ${tPot.toFixed(2)} Pa`,true));
  h+=stepG('5','Substituição final',
    eq(`P₂ = ${p1} + (${tCin.toFixed(2)}) + (${tPot.toFixed(2)}) = ${p2.toFixed(2)} Pa`,true));
  h+=stepG('6','Resultado',
    `<div class="sim-res-final">
      <div><div class="sim-res-label">P₂ — Pressão na Seção 2</div><div class="sim-res-sub">${(p2/1000).toFixed(2)} kPa · ${(p2/1e5).toFixed(4)} bar</div></div>
      <div style="text-align:right"><div class="sim-res-value" style="color:${p2<0?'var(--r)':'var(--g)'}">${p2.toFixed(0)} Pa</div></div>
    </div>
    <div class="sim-dp-grid">
      <div class="sim-dp-cell"><div class="sim-dp-lbl">ΔP = P₁ − P₂</div><div class="sim-dp-val" style="color:${dp>=0?'var(--y)':'var(--r)'}">${dp.toFixed(0)} Pa</div></div>
      <div class="sim-dp-cell"><div class="sim-dp-lbl">Variação</div><div class="sim-dp-val" style="color:${p2<p1?'var(--r)':'var(--g)'}">${p2<p1?'Pressão caiu ↓':'Pressão subiu ↑'}</div></div>
    </div>
    ${p2<0?'<div class="sim-alert-ctx sim-alert-danger" style="margin-top:8px">⚠ P₂ negativo → cavitação. O fluido vaporiza localmente danificando o sistema.</div>':''}`);
  body.innerHTML=h;
}

function importV2(){
  const d1=inp('c-d1'),v1=inp('c-v1'),d2=inp('c-d2');
  if([d1,v1,d2].some(isNaN)||d1<=0||d2<=0){alert('Preencha o Simulador 1 primeiro.');return;}
  const a1=Math.PI*(d1/2)**2,a2=Math.PI*(d2/2)**2;
  document.getElementById('b-v2').value=(v1*(a1/a2)).toFixed(4);
  bernCalcRT();
}

function bernReset(){
  ['b-rho','b-v1','b-p1','b-z1','b-v2','b-z2'].forEach((id,i)=>
    document.getElementById(id).value=['1000','2','220000','0','8','0'][i]);
  document.getElementById('b-err').style.display='none';
  document.getElementById('b-alert').style.display='none';
  document.getElementById('b-p2-prev').textContent='P₂ = ?';
  document.getElementById('b-bar-prev').textContent='';
  document.getElementById('solve-b').style.display='none';
  document.getElementById('btn-bsolve').textContent='▶ Passo a passo';
  bernCalcRT();
}

/* ── Exemplos prontos ── */
function exLoad(d1,v1,p1,z1,d2,z2){
  document.getElementById('c-d1').value=d1;
  document.getElementById('c-v1').value=v1;
  document.getElementById('c-d2').value=d2;
  document.getElementById('b-v1').value=v1;
  document.getElementById('b-p1').value=p1;
  document.getElementById('b-z1').value=z1;
  document.getElementById('b-z2').value=z2;
  document.getElementById('b-rho').value=1000;
  const a1=Math.PI*(d1/2)**2,a2=Math.PI*(d2/2)**2;
  document.getElementById('b-v2').value=(v1*(a1/a2)).toFixed(4);
  contCalcRT();bernCalcRT();
}

function exLoadBern(rho,v1,z1,p1,v2,z2){
  document.getElementById('b-rho').value=rho;
  document.getElementById('b-v1').value=v1;
  document.getElementById('b-p1').value=p1;
  document.getElementById('b-z1').value=z1;
  document.getElementById('b-v2').value=v2;
  document.getElementById('b-z2').value=z2;
  bernCalcRT();
}

/* ─ Resolução fórmulas visuais (botão "Ver resolução") ─ */
function toggleSolve(id){
  const el=document.getElementById('fsolve-'+id);
  if(!el)return;
  const btn=el.previousElementSibling.querySelector('button');
  const open=!el.classList.contains('open');
  el.classList.toggle('open',open);
  if(btn) btn.textContent=(open?'▼ ':'▶ ')+'Ver resolução';
}

/* ─ Highlight diagrama ↔ legenda (fórmulas visuais) ─ */
(function initFvInteract(){
  function onHover(varKey, on){
    // formula spans
    document.querySelectorAll(`[data-var="${varKey}"]`).forEach(el=>{
      if(el.tagName==='TR'){
        el.classList.toggle('leg-hl',on);
      } else {
        // detect color class
        const cls=[...el.classList].find(c=>c.startsWith('fv-'))?.replace('fv-','') || 'p';
        if(on) el.classList.add('fv-hl-'+cls);
        else el.classList.remove(...[...el.classList].filter(c=>c.startsWith('fv-hl-')));
      }
    });
    // SVG elements
    document.querySelectorAll(`.fv-el[data-var="${varKey}"]`).forEach(el=>{
      el.style.filter=on?'brightness(1.5) drop-shadow(0 0 4px currentColor)':'';
    });
  }
  document.addEventListener('mouseover',e=>{
    const t=e.target.closest('[data-var]');
    if(t) onHover(t.dataset.var,true);
  });
  document.addEventListener('mouseout',e=>{
    const t=e.target.closest('[data-var]');
    if(t) onHover(t.dataset.var,false);
  });
  document.addEventListener('touchstart',e=>{
    const t=e.target.closest('[data-var]');
    if(t) onHover(t.dataset.var,true);
  },{passive:true});
  document.addEventListener('touchend',e=>{
    const t=e.target.closest('[data-var]');
    if(t) setTimeout(()=>onHover(t.dataset.var,false),600);
  },{passive:true});
})();

/* ─ Init simuladores em tempo real no load ─ */
window.addEventListener('DOMContentLoaded',()=>{
  contCalcRT();
  bernCalcRT();
});

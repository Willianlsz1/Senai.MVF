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

function inp(id){return parseFloat(document.getElementById(id).value);}

/* ── Simulador 1: Continuidade ── */
function contCalc(){
  const d1=inp('c-d1'),v1=inp('c-v1'),d2=inp('c-d2');
  const err=document.getElementById('c-err'),res=document.getElementById('c-res');
  err.style.display='none';res.style.display='none';
  if([d1,v1,d2].some(isNaN)||d1<=0||d2<=0||v1<0){
    err.textContent='Preencha D₁, V₁ e D₂ com valores válidos.';err.style.display='block';return;
  }
  const a1=Math.PI*(d1/2)**2,a2=Math.PI*(d2/2)**2,v2=v1*(a1/a2),qv=a1*v1;
  document.getElementById('c-v2-prev').textContent='V₂ = '+v2.toFixed(4)+' m/s';
  document.getElementById('c-qv-prev').textContent='Qv = '+(qv*1000).toFixed(3)+' L/s = '+(qv*3600).toFixed(2)+' m³/h';

  const mb=(eq)=>`<div style="background:var(--bg);border:1px solid rgba(0,212,255,0.2);border-radius:6px;padding:10px 14px;font-size:13px;color:var(--t2);line-height:2.4;margin:6px 0">${eq}</div>`;
  const rw=(n,t,b)=>`<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--bd)">
    <div style="width:22px;height:22px;border-radius:50%;background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--p);flex-shrink:0;margin-top:2px">${n}</div>
    <div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--p);text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px">${t}</div>${b}</div>
  </div>`;

  let html='<div>';
  html+=rw('1','Dados conhecidos',`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
    <div class="mcard"><div class="mlbl">D₁</div><div style="font-size:15px;font-weight:600;color:var(--p);font-family:var(--fm)">${d1} m</div></div>
    <div class="mcard"><div class="mlbl">V₁</div><div style="font-size:15px;font-weight:600;color:var(--p);font-family:var(--fm)">${v1} m/s</div></div>
    <div class="mcard"><div class="mlbl">D₂</div><div style="font-size:15px;font-weight:600;color:var(--g);font-family:var(--fm)">${d2} m</div></div>
  </div>`);
  html+=rw('2','Calcule as áreas — A = π·(D/2)²',
    mb(`\\( A_1 = \\pi \\cdot \\left(\\dfrac{${d1}}{2}\\right)^2 = ${a1.toFixed(4)}\\,\\text{m}^2 = ${(a1*1e4).toFixed(2)}\\,\\text{cm}^2 \\)`)+
    mb(`\\( A_2 = \\pi \\cdot \\left(\\dfrac{${d2}}{2}\\right)^2 = ${a2.toFixed(4)}\\,\\text{m}^2 = ${(a2*1e4).toFixed(2)}\\,\\text{cm}^2 \\)`)
  );
  html+=rw('3','Equação da Continuidade — isole V₂',
    mb(`\\( A_1 \\cdot V_1 = A_2 \\cdot V_2 \\;\\Rightarrow\\; V_2 = V_1 \\cdot \\dfrac{A_1}{A_2} = V_1 \\cdot \\left(\\dfrac{D_1}{D_2}\\right)^2 \\)`)
  );
  html+=rw('4','Substitua os valores',
    mb(`\\( V_2 = ${v1} \\cdot \\left(\\dfrac{${d1}}{${d2}}\\right)^2 = ${v1} \\cdot ${((d1/d2)**2).toFixed(4)} = ${v2.toFixed(4)}\\,\\text{m/s} \\)`)
  );
  html+=rw('5','Resultado',`
    <div style="background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.3);border-radius:7px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div style="font-size:13px;color:var(--t2)">V₂ — Velocidade na Seção 2</div>
      <div style="text-align:right">
        <div style="font-size:22px;font-weight:700;color:var(--p);font-family:var(--fm)">${v2.toFixed(4)} m/s</div>
        <div style="font-size:11px;color:var(--t3)">${v2>v1?'↑ acelerou':'↓ desacelerou'} · Qv = ${(qv*1000).toFixed(3)} L/s</div>
      </div>
    </div>
    <p style="font-size:11px;color:var(--t3);margin-top:8px">
      ${v2>v1?'A área diminuiu → fluido precisa acelerar para manter o mesmo Qv.':'A área aumentou → fluido desacelera.'}
    </p>`);
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

/* ── Simulador 2: Bernoulli ── */
function importV2(){
  const d1=inp('c-d1'),v1=inp('c-v1'),d2=inp('c-d2');
  if([d1,v1,d2].some(isNaN)||d1<=0||d2<=0){alert('Calcule o Simulador 1 primeiro.');return;}
  const a1=Math.PI*(d1/2)**2,a2=Math.PI*(d2/2)**2;
  document.getElementById('b-v2').value=(v1*(a1/a2)).toFixed(4);
}

function bernCalc(){
  const rho=inp('b-rho'),v1=inp('b-v1'),p1=inp('b-p1'),
        z1=inp('b-z1')||0,v2=inp('b-v2'),z2=inp('b-z2')||0,g=9.81;
  const err=document.getElementById('b-err'),res=document.getElementById('b-res');
  err.style.display='none';res.style.display='none';
  if([rho,v1,p1,v2].some(isNaN)||rho<=0||v1<0||v2<0){
    err.textContent='Preencha ρ, V₁, P₁ e V₂ com valores válidos.';err.style.display='block';return;
  }
  const tCin=rho*(v1**2-v2**2)/2,tPot=rho*g*(z1-z2),p2=p1+tCin+tPot,dp=p1-p2,hz=(z1===z2);

  document.getElementById('b-p2-prev').textContent='P₂ = '+p2.toFixed(0)+' Pa';
  document.getElementById('b-bar-prev').textContent='≈ '+(p2/1e5).toFixed(4)+' bar';

  const mb=(eq)=>`<div style="background:var(--bg);border:1px solid rgba(0,255,157,0.2);border-radius:6px;padding:10px 14px;font-size:13px;color:var(--t2);line-height:2.4;margin:6px 0">${eq}</div>`;
  const rw=(n,t,b)=>`<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--bd)">
    <div style="width:22px;height:22px;border-radius:50%;background:rgba(0,255,157,0.12);border:1px solid rgba(0,255,157,0.4);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--g);flex-shrink:0;margin-top:2px">${n}</div>
    <div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--g);text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px">${t}</div>${b}</div>
  </div>`;

  let html='<div>';
  html+=rw('1','Dados conhecidos',`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:6px">
    <div class="mcard"><div class="mlbl">ρ</div><div style="font-size:13px;font-weight:600;color:var(--p);font-family:var(--fm)">${rho}</div></div>
    <div class="mcard"><div class="mlbl">V₁</div><div style="font-size:13px;font-weight:600;color:var(--p);font-family:var(--fm)">${v1} m/s</div></div>
    <div class="mcard"><div class="mlbl">V₂</div><div style="font-size:13px;font-weight:600;color:var(--g);font-family:var(--fm)">${v2} m/s</div></div>
    <div class="mcard"><div class="mlbl">P₁</div><div style="font-size:13px;font-weight:600;color:var(--p);font-family:var(--fm)">${(p1/1e5).toFixed(3)} bar</div></div>
    <div class="mcard"><div class="mlbl">h₁−h₂</div><div style="font-size:13px;font-weight:600;color:var(--t2);font-family:var(--fm)">${z1-z2} m</div></div>
  </div>`);
  html+=rw('2','Equação de Bernoulli (por unidade de massa)',
    mb(`\\( \\dfrac{P_1}{\\rho} + \\dfrac{v_1^2}{2} + g\\,h_1 = \\dfrac{P_2}{\\rho} + \\dfrac{v_2^2}{2} + g\\,h_2 \\)`)+
    '<p style="font-size:10px;color:var(--t3);margin-top:4px">Unidade de cada termo: J/kg. A soma é constante ao longo do escoamento.</p>'
  );
  html+=rw('3','Isole P₂',
    mb(`\\( P_2 = P_1 + \\rho\\,\\dfrac{v_1^2-v_2^2}{2} + \\rho\\,g\\,(h_1-h_2) \\)`)+
    (hz?'<p style="font-size:10px;color:var(--t3);margin-top:4px">h₁=h₂ → termo potencial = 0.</p>':
        `<p style="font-size:10px;color:var(--t3);margin-top:4px">h₁−h₂=${z1-z2} m → desnível ${(z1-z2)>0?'aumenta':'reduz'} P₂.</p>`)
  );
  html+=rw('4','Calcule cada parcela',
    mb(`\\( \\rho\\,\\dfrac{v_1^2-v_2^2}{2} = ${rho}\\cdot\\dfrac{${v1**2}-${v2**2}}{2} = ${tCin.toFixed(2)}\\,\\text{Pa} \\)`)+
    mb(`\\( \\rho\\,g\\,(h_1-h_2) = ${rho}\\cdot${g}\\cdot(${z1-z2}) = ${tPot.toFixed(2)}\\,\\text{Pa} \\)`)
  );
  html+=rw('5','Substituição final',
    mb(`\\( P_2 = ${p1} + (${tCin.toFixed(2)}) + (${tPot.toFixed(2)}) = ${p2.toFixed(2)}\\,\\text{Pa} \\)`)
  );
  html+=rw('6','Resultado',`
    <div style="background:rgba(0,255,157,0.08);border:1px solid rgba(0,255,157,0.3);border-radius:7px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div style="font-size:13px;color:var(--t2)">P₂ — Pressão na Seção 2</div>
      <div style="text-align:right">
        <div style="font-size:22px;font-weight:700;color:var(--g);font-family:var(--fm)">${p2.toFixed(0)} Pa</div>
        <div style="font-size:12px;color:var(--t3)">${(p2/1000).toFixed(2)} kPa · ${(p2/1e5).toFixed(4)} bar</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">
      <div style="background:var(--bg3);border-radius:6px;padding:10px;text-align:center">
        <div style="font-size:10px;color:var(--t3)">ΔP = P₁ − P₂</div>
        <div style="font-size:15px;font-weight:600;color:${dp>=0?'var(--y)':'var(--r)'}">${dp.toFixed(0)} Pa</div>
      </div>
      <div style="background:var(--bg3);border-radius:6px;padding:10px;text-align:center">
        <div style="font-size:10px;color:var(--t3)">Variação</div>
        <div style="font-size:13px;font-weight:600;color:${p2<p1?'var(--r)':'var(--g)'}">${p2<p1?'Pressão caiu ↓':'Pressão subiu ↑'}</div>
      </div>
    </div>
    ${p2<0?'<div class="alert aw" style="margin-top:8px">⚠ P₂ negativo → cavitação. Aumente P₁ ou reduza a diferença de velocidades.</div>':''}`
  );
  html+='</div>';

  document.getElementById('b-res-body').innerHTML=html;
  res.style.display='block';
  if(window.MathJax&&MathJax.typesetPromise)MathJax.typesetPromise([document.getElementById('b-res-body')]).catch(e=>console.warn(e));
  setTimeout(()=>res.scrollIntoView({behavior:'smooth',block:'nearest'}),120);
}

function bernReset(){
  ['b-rho','b-v1','b-p1','b-z1','b-v2','b-z2'].forEach((id,i)=>{
    document.getElementById(id).value=['1000','2','220000','0','8','0'][i];
  });
  document.getElementById('b-err').style.display='none';
  document.getElementById('b-res').style.display='none';
  document.getElementById('b-p2-prev').textContent='P₂ = ? Pa';
  document.getElementById('b-bar-prev').textContent='? bar';
}

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
  contCalc();bernCalc();
}

function exLoadBern(rho,v1,z1,p1,v2,z2){
  document.getElementById('b-rho').value=rho;
  document.getElementById('b-v1').value=v1;
  document.getElementById('b-p1').value=p1;
  document.getElementById('b-z1').value=z1;
  document.getElementById('b-v2').value=v2;
  document.getElementById('b-z2').value=z2;
  bernCalc();
}

# Senai.MVF
 App de estudo de Medições de variáveis físicas 
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SENAI · MVF v4</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<script>MathJax={tex:{inlineMath:[['$','$'],['\\(','\\)']]},options:{skipHtmlTags:['script','noscript','style','textarea']}};</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0c10;--bg2:#12151e;--bg3:#181d28;--bg4:#1e2535;
  --p:#00d4ff;--g:#00ff9d;--y:#ffc040;--r:#ff5566;--pu:#c084ff;--or:#ff9040;
  --t1:#f0f2f8;--t2:#b0bac8;--t3:#6a7585;
  --bd:rgba(255,255,255,0.09);
  --f:'IBM Plex Sans',sans-serif;--fm:'IBM Plex Mono',monospace;
  --radius:10px;
}
html,body{width:100%;min-height:100vh;font-family:var(--f);background:var(--bg);color:var(--t1);font-size:14px;line-height:1.65;overflow-x:hidden}

/* ──────── TOPBAR ──────── */
.topbar{background:var(--bg2);border-bottom:2px solid rgba(0,212,255,0.15);display:flex;align-items:center;padding:0 10px;position:sticky;top:0;z-index:200;min-height:48px;gap:0}
.brand{font-family:var(--fm);font-size:12px;color:var(--p);white-space:nowrap;padding-right:10px;border-right:1px solid rgba(255,255,255,0.1);margin-right:2px;font-weight:600;flex-shrink:0;letter-spacing:.5px}
.nav-desktop{display:flex;align-items:center;overflow-x:auto;scrollbar-width:none;flex:1;scroll-behavior:smooth}
.nav-desktop::-webkit-scrollbar{display:none}
.tgroup{font-size:8px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.28);padding:0 4px 0 8px;flex-shrink:0;white-space:nowrap}
.titem{padding:0 8px;height:48px;display:flex;align-items:center;cursor:pointer;font-size:12px;color:var(--t2);white-space:nowrap;border-bottom:2px solid transparent;transition:all .15s;font-weight:500;flex-shrink:0}
.titem:hover{color:var(--t1);background:rgba(255,255,255,0.04)}
.titem.active{color:#fff;border-bottom-color:var(--p);background:rgba(0,212,255,0.07)}
.nav-arrow{background:none;border:none;color:var(--t3);cursor:pointer;padding:0 4px;height:48px;font-size:16px;flex-shrink:0;transition:color .15s;display:none}
.nav-arrow:hover{color:var(--t1)}
.hamburger{display:none;background:none;border:1px solid var(--bd);border-radius:6px;color:var(--t2);cursor:pointer;padding:6px 9px;margin-left:6px;font-size:15px;line-height:1}

/* ──────── MOBILE DRAWER ──────── */
.drawer{position:fixed;top:0;left:-280px;width:280px;height:100vh;background:var(--bg2);border-right:1px solid var(--bd);z-index:300;transition:left .25s;overflow-y:auto;padding:16px 0}
.drawer.open{left:0}
.drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:299;display:none}
.drawer-overlay.open{display:block}
.drawer-brand{font-family:var(--fm);font-size:13px;color:var(--p);padding:0 16px 14px;border-bottom:1px solid var(--bd);margin-bottom:6px;font-weight:600}
.drawer-close{float:right;background:none;border:none;color:var(--t3);font-size:18px;cursor:pointer;line-height:1}
.d-group{font-size:9px;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.28);padding:10px 16px 4px}
.d-item{padding:11px 16px;cursor:pointer;font-size:14px;color:var(--t2);border-left:3px solid transparent;transition:all .15s;font-weight:500}
.d-item:hover{background:rgba(255,255,255,0.04);color:var(--t1)}
.d-item.active{color:var(--p);border-left-color:var(--p);background:rgba(0,212,255,0.06)}

/* ──────── CONTENT ──────── */
.content{padding:24px 20px;width:100%;max-width:1100px;margin:0 auto}
.screen{display:none}.screen.active{display:block}

/* ──────── TYPOGRAPHY ──────── */
.h1{font-size:22px;font-weight:600;margin-bottom:4px;color:#fff}
.sub{font-size:12px;color:var(--t3);margin-bottom:22px;font-family:var(--fm)}
.sec{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:var(--t3);margin:24px 0 12px;font-family:var(--fm)}

/* ──────── GRIDS ──────── */
.grid{display:grid;gap:12px}
.g2{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.g3{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.g4{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}

/* ──────── STAT CARDS ──────── */
.card{background:var(--bg3);border:1px solid var(--bd);border-radius:var(--radius);padding:16px}
.card.click{cursor:pointer;transition:all .18s}.card.click:hover{border-color:var(--p);transform:translateY(-2px)}
.sc{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--t3);margin-bottom:6px;font-family:var(--fm)}
.sv{font-size:26px;font-weight:600;color:var(--p);font-family:var(--fm)}
.ss{font-size:11px;color:var(--t3);margin-top:3px}
.mn{font-size:10px;font-family:var(--fm);color:var(--t3);margin-bottom:4px}
.mt{font-size:14px;font-weight:600;margin-bottom:8px}
.pb{height:3px;background:rgba(255,255,255,0.07);border-radius:2px;margin-top:6px;overflow:hidden}
.pf{height:100%;background:var(--p);border-radius:2px}
.ps{font-size:11px;color:var(--t3);margin-top:4px;font-family:var(--fm)}

/* ──────── CONTENT BLOCKS ──────── */
.blk{background:var(--bg3);border:1px solid var(--bd);border-radius:var(--radius);padding:18px;margin-bottom:10px}
.blk h3{font-size:14px;font-weight:600;color:var(--p);margin-bottom:10px}
.blk p{font-size:13px;color:var(--t2);line-height:1.7;margin-bottom:6px}
.blk ul{list-style:none;padding:0}
.blk li{font-size:13px;color:var(--t2);padding:4px 0 4px 16px;position:relative;line-height:1.6}
.blk li::before{content:"›";position:absolute;left:0;color:var(--p);font-size:15px}

/* ──────── ALERTS ──────── */
.alert{padding:11px 15px;border-radius:8px;font-size:13px;margin:10px 0;line-height:1.6}
.ai{background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.2);color:var(--p)}
.aw{background:rgba(255,85,102,0.06);border:1px solid rgba(255,85,102,0.2);color:#ff7080}
.ag{background:rgba(0,255,157,0.06);border:1px solid rgba(0,255,157,0.2);color:var(--g)}
.ay{background:rgba(255,192,64,0.06);border:1px solid rgba(255,192,64,0.2);color:var(--y)}

/* ──────── HIGHLIGHT BOXES ──────── */
.hl{border-radius:9px;padding:14px 16px;margin-bottom:8px}
.hl-p{background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.18)}
.hl-g{background:rgba(0,255,157,0.05);border:1px solid rgba(0,255,157,0.18)}
.hl-y{background:rgba(255,192,64,0.05);border:1px solid rgba(255,192,64,0.18)}
.hl-pu{background:rgba(192,132,255,0.05);border:1px solid rgba(192,132,255,0.18)}
.hl-hdr{font-size:13px;font-weight:600;margin-bottom:5px}
.hl-p .hl-hdr{color:var(--p)}.hl-g .hl-hdr{color:var(--g)}.hl-y .hl-hdr{color:var(--y)}.hl-pu .hl-hdr{color:var(--pu)}
.hl p{font-size:13px;color:var(--t2);line-height:1.65}

/* ──────── EXPANDERS ──────── */
.xb{background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:13px 15px;margin-bottom:7px;cursor:pointer;transition:border-color .15s}
.xb:hover{border-color:rgba(255,255,255,0.15)}
.xh{display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:500;color:var(--t2)}
.xa{font-size:11px;color:var(--t3);transition:transform .2s}
.xb.open .xa{transform:rotate(90deg)}
.xbody{display:none;margin-top:11px;font-size:13px;color:var(--t3);line-height:1.7}
.xb.open .xbody{display:block}

/* ──────── TABLES ──────── */
.tbl{width:100%;border-collapse:collapse;font-size:13px}
.tbl th{background:rgba(0,212,255,0.08);color:var(--p);padding:9px 10px;text-align:left;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.8px;font-family:var(--fm)}
.tbl td{padding:9px 10px;border-bottom:1px solid var(--bd);color:var(--t2)}
.tbl tr:last-child td{border:none}

/* ──────── FORMULA CARDS ──────── */
.fcard{background:var(--bg3);border:1px solid var(--bd);border-radius:12px;padding:20px;margin-bottom:14px;overflow:hidden}
.fcard-top{display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap}
.fcard-left{flex:1;min-width:200px}
.fcard-right{width:180px;flex-shrink:0}
.fcard-title{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:var(--t3);font-family:var(--fm);margin-bottom:10px}
.fcard-formula{background:var(--bg);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:14px 18px;font-family:var(--fm);font-size:20px;font-weight:600;margin-bottom:14px;line-height:1.5;letter-spacing:0.5px}
.fcard-desc{font-size:12px;color:var(--t2);line-height:1.6;margin-bottom:12px}
/* Variable legend table */
.vleg{width:100%;border-collapse:collapse;font-size:12px;margin-top:4px}
.vleg td{padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:top}
.vleg tr:last-child td{border:none}
.vleg .vsym{font-family:var(--fm);font-weight:600;font-size:14px;white-space:nowrap;padding-right:10px}
.vleg .vname{color:var(--t1);font-weight:500;white-space:nowrap;padding-right:8px}
.vleg .vunit{color:var(--t3);font-family:var(--fm);font-size:11px;white-space:nowrap;padding-right:8px}
.vleg .vdesc{color:var(--t3);font-size:11px;line-height:1.45}
/* SVG diagram wrapper */
.fdiag{background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:center}
.fdiag svg{width:100%;height:auto}
/* Divider line */
.fdiv{height:1px;background:var(--bd);margin:14px 0}
/* Application examples */
.fapps{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.fapp{background:var(--bg4);border:1px solid var(--bd);border-radius:6px;padding:5px 10px;font-size:11px;color:var(--t2)}

/* ──────── FLASHCARDS ──────── */
.fc-wrap{perspective:900px;height:190px;cursor:pointer;margin-bottom:12px}
.fc-inner{width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d;position:relative}
.fc-inner.flip{transform:rotateY(180deg)}
.fc-f,.fc-b{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:var(--radius);padding:20px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.fc-f{background:var(--bg3);border:1px solid var(--bd)}
.fc-b{background:var(--bg4);border:1px solid rgba(0,212,255,0.25);transform:rotateY(180deg)}
.fc-cat{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--t3);font-family:var(--fm);margin-bottom:8px}
.fc-q{font-size:15px;font-weight:500;color:#fff;line-height:1.45}
.fc-a{font-size:13px;color:var(--t2);line-height:1.55}
.fc-hint{font-size:11px;color:var(--t3);margin-top:10px}
.fc-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.fc-info{font-size:12px;color:var(--t3);font-family:var(--fm)}
.fc-bar{height:3px;background:var(--bd);border-radius:2px;margin-bottom:14px;overflow:hidden}
.fc-bfill{height:100%;background:var(--p);border-radius:2px;transition:width .3s}
.fc-btns{display:flex;gap:7px;justify-content:center;flex-wrap:wrap;margin-top:10px}

/* ──────── QUIZ ──────── */
.qz-hdr{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;align-items:center}
.qz-box{background:var(--bg3);border:1px solid var(--bd);border-radius:var(--radius);padding:18px;margin-bottom:14px}
.qz-meta{font-size:11px;color:var(--t3);font-family:var(--fm);margin-bottom:10px}
.qz-q{font-size:15px;font-weight:500;line-height:1.55;margin-bottom:14px;color:#fff}
.qz-opt{padding:12px 14px;border:1px solid rgba(255,255,255,0.1);border-radius:8px;margin-bottom:8px;cursor:pointer;font-size:13px;color:var(--t2);transition:all .15s;display:flex;gap:10px;align-items:flex-start}
.qz-opt:hover:not(.dis){border-color:var(--p);background:rgba(0,212,255,0.05);color:#fff}
.qz-opt.ok{border-color:var(--g);background:rgba(0,255,157,0.06);color:var(--g);pointer-events:none}
.qz-opt.err{border-color:var(--r);background:rgba(255,85,102,0.06);color:var(--r);pointer-events:none}
.qz-opt.dis{pointer-events:none}
.qz-ltr{font-family:var(--fm);font-size:11px;color:var(--t3);min-width:16px;margin-top:1px}
.qz-fb{padding:11px 14px;border-radius:8px;font-size:13px;margin-top:10px;line-height:1.65}
.fb-ok{background:rgba(0,255,157,0.06);border:1px solid rgba(0,255,157,0.18);color:var(--g)}
.fb-err{background:rgba(255,85,102,0.06);border:1px solid rgba(255,85,102,0.18);color:#ff7080}
.score-wrap{text-align:center;padding:32px;background:var(--bg3);border-radius:var(--radius)}
.score-big{font-size:52px;font-weight:600;color:var(--p);font-family:var(--fm)}

/* ──────── CALC ──────── */
.cb-calc{background:var(--bg3);border:1px solid var(--bd);border-radius:var(--radius);padding:16px;margin-bottom:10px}
.calc-label{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--t3);font-family:var(--fm);margin-bottom:5px}
.calc-eq{font-family:var(--fm);font-size:14px;color:var(--p);margin-bottom:12px}
.inp-row{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px}
.ig{display:flex;flex-direction:column;gap:4px}
.ig label{font-size:11px;color:var(--t3);font-family:var(--fm)}
.ig input{background:var(--bg);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:9px 10px;color:#fff;font-size:13px;width:110px;font-family:var(--fm)}
.ig input:focus{outline:none;border-color:var(--p)}
.res{background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.18);border-radius:7px;padding:10px 14px;font-family:var(--fm);font-size:13px;color:var(--p)}

/* ──────── BUTTONS ──────── */
.btn{padding:9px 16px;border:1px solid rgba(255,255,255,0.15);border-radius:7px;background:transparent;color:var(--t2);font-size:13px;cursor:pointer;transition:all .15s;font-family:var(--f);touch-action:manipulation}
.btn:hover{background:rgba(255,255,255,0.06);color:#fff}
.btn-p{border-color:rgba(0,212,255,0.4);color:var(--p)}.btn-p:hover{background:rgba(0,212,255,0.1)}
.btn-g{border-color:rgba(0,255,157,0.4);color:var(--g)}.btn-g:hover{background:rgba(0,255,157,0.08)}
.btn-y{border-color:rgba(255,192,64,0.4);color:var(--y)}.btn-y:hover{background:rgba(255,192,64,0.08)}
.btn-r{border-color:rgba(255,85,102,0.35);color:var(--r)}.btn-r:hover{background:rgba(255,85,102,0.08)}
.btn-pu{border-color:rgba(192,132,255,0.4);color:var(--pu)}.btn-pu:hover{background:rgba(192,132,255,0.08)}

/* ──────── SCENARIOS ──────── */
.scen-card{background:var(--bg3);border:1px solid var(--bd);border-radius:var(--radius);padding:18px;margin-bottom:12px}
.scen-hdr{display:flex;justify-content:space-between;align-items:flex-start;cursor:pointer}
.scen-title{font-size:15px;font-weight:600;color:#fff}
.scen-sub{font-size:11px;color:var(--t3);margin-top:3px;font-family:var(--fm)}
.scen-arrow{font-size:13px;color:var(--t3);transition:transform .2s;margin-top:3px}
.scen-card.open .scen-arrow{transform:rotate(90deg)}
.scen-body{display:none;margin-top:14px}
.scen-card.open .scen-body{display:block}
.scen-vars{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px}
.var-pill{padding:5px 12px;border-radius:20px;font-size:11px;font-family:var(--fm);font-weight:600}
.step{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--bd)}
.step:last-child{border:none}
.step-num{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-family:var(--fm);font-weight:600;flex-shrink:0;margin-top:2px}
.step-txt{font-size:13px;color:var(--t2);line-height:1.65}
.step-eq{font-family:var(--fm);font-size:11px;color:var(--p);background:var(--bg);padding:3px 8px;border-radius:4px;margin-top:5px;display:inline-block}

/* ──────── MOBILE RESPONSIVE ──────── */
@media(max-width:900px){
  .nav-desktop{display:none}
  .nav-arrow{display:none!important}
  .hamburger{display:flex;align-items:center;margin-left:auto}
  .content{padding:16px 14px}
  .h1{font-size:18px}
  .fcard-right{display:none}
  .fcard-formula{font-size:16px;padding:11px 13px}
  .vleg .vsym{font-size:13px}
  .grid.g4{grid-template-columns:repeat(2,1fr)}
  .ig input{width:90px}
  .qz-opt{font-size:12px;padding:10px 11px}
  .score-big{font-size:40px}
}
@media(min-width:901px) and (max-width:1300px){
  .nav-arrow{display:flex;align-items:center}
}
</style>
</head>
<body>

<!-- TOPBAR -->
<div class="topbar">
  <div class="brand">⬡ SENAI·MVF v5</div>
  <button class="nav-arrow" id="nav-left" onclick="scrollNav(-180)" aria-label="scroll esquerda">‹</button>
  <nav class="nav-desktop" id="navBar">
    <span class="tgroup">INÍCIO</span>
    <div class="titem active" onclick="S('home')" id="nav-home">Dashboard</div>
    <span class="tgroup">TEORIA</span>
    <div class="titem" onclick="S('m1')" id="nav-m1">Fundamentos</div>
    <div class="titem" onclick="S('m2')" id="nav-m2">Malha</div>
    <div class="titem" onclick="S('m3')" id="nav-m3">Instrumentação</div>
    <div class="titem" onclick="S('m4')" id="nav-m4">Erros</div>
    <span class="tgroup">VARIÁVEIS</span>
    <div class="titem" onclick="S('formulas')" id="nav-formulas">Fórmulas Visuais</div>
    <div class="titem" onclick="S('pressao')" id="nav-pressao">Pressão</div>
    <div class="titem" onclick="S('nivel')" id="nav-nivel">Nível</div>
    <div class="titem" onclick="S('vazao')" id="nav-vazao">Vazão</div>
    <div class="titem" onclick="S('temperatura')" id="nav-temperatura" style="color:var(--pu)">Temperatura ★</div>
    <span class="tgroup">CONEXÕES</span>
    <div class="titem" onclick="S('relacoes')" id="nav-relacoes">Relações P·N·Q</div>
    <div class="titem" onclick="S('cenarios')" id="nav-cenarios">Cenários Reais</div>
    <span class="tgroup">PRÁTICA</span>
    <div class="titem" onclick="S('calibracao')" id="nav-calibracao" style="color:var(--y)">Calibração</div>
    <div class="titem" onclick="S('flash')" id="nav-flash">Flashcards</div>
    <div class="titem" onclick="S('quiz')" id="nav-quiz">Quiz</div>
    <div class="titem" onclick="S('calc')" id="nav-calc">Calculadora</div>
    <div class="titem" onclick="S('bernoulli')" id="nav-bernoulli" style="color:var(--g)">Bernoulli ⚡</div>
  </nav>
  <button class="nav-arrow" id="nav-right" onclick="scrollNav(180)" aria-label="scroll direita">›</button>
  <button class="hamburger" onclick="toggleDrawer()" aria-label="Menu">&#9776;</button>
</div>

<!-- MOBILE DRAWER -->
<div class="drawer-overlay" id="overlay" onclick="closeDrawer()"></div>
<div class="drawer" id="drawer">
  <div class="drawer-brand">⬡ SENAI·MVF v5 <button class="drawer-close" onclick="closeDrawer()">✕</button></div>
  <div class="d-group">INÍCIO</div>
  <div class="d-item active" onclick="SD('home')" id="dnav-home">Dashboard</div>
  <div class="d-group">TEORIA</div>
  <div class="d-item" onclick="SD('m1')" id="dnav-m1">Fundamentos</div>
  <div class="d-item" onclick="SD('m2')" id="dnav-m2">Malha de Controle</div>
  <div class="d-item" onclick="SD('m3')" id="dnav-m3">Instrumentação</div>
  <div class="d-item" onclick="SD('m4')" id="dnav-m4">Erros de Medição</div>
  <div class="d-group">VARIÁVEIS</div>
  <div class="d-item" onclick="SD('formulas')" id="dnav-formulas">Fórmulas Visuais ★</div>
  <div class="d-item" onclick="SD('pressao')" id="dnav-pressao">Pressão</div>
  <div class="d-item" onclick="SD('nivel')" id="dnav-nivel">Nível</div>
  <div class="d-item" onclick="SD('vazao')" id="dnav-vazao">Vazão</div>
  <div class="d-item" onclick="SD('temperatura')" id="dnav-temperatura" style="color:var(--pu)">Temperatura ★ Novo</div>
  <div class="d-group">CONEXÕES</div>
  <div class="d-item" onclick="SD('relacoes')" id="dnav-relacoes">Relações P·N·Q</div>
  <div class="d-item" onclick="SD('cenarios')" id="dnav-cenarios">Cenários Reais</div>
  <div class="d-group">PRÁTICA</div>
  <div class="d-item" onclick="SD('calibracao')" id="dnav-calibracao" style="color:var(--y)">Calibração ★ Novo</div>
  <div class="d-item" onclick="SD('flash')" id="dnav-flash">Flashcards</div>
  <div class="d-item" onclick="SD('quiz')" id="dnav-quiz">Quiz</div>
  <div class="d-item" onclick="SD('calc')" id="dnav-calc">Calculadora</div>
  <div class="d-item" onclick="SD('bernoulli')" id="dnav-bernoulli" style="color:var(--g)">Bernoulli ⚡ — Simulador</div>
</div>

<div class="content">

<!-- HOME -->
<div class="screen active" id="screen-home">
  <div class="h1">Dashboard de Estudos</div>
  <div class="sub">Medição de Variáveis Físicas Industriais · SENAI · v5.0</div>
  <div class="grid g4" style="margin-bottom:20px">
    <div class="card"><div class="sc">Módulos</div><div class="sv">12</div><div class="ss">+Temperatura +Calibração</div></div>
    <div class="card"><div class="sc">Flashcards</div><div class="sv">54</div><div class="ss">8 categorias · com filtros</div></div>
    <div class="card"><div class="sc">Questões Quiz</div><div class="sv">38</div><div class="ss">Temperatura · Calibração · Nível</div></div>
    <div class="card"><div class="sc">Calculadoras</div><div class="sv">9</div><div class="ss">+Conversor de temperatura</div></div>
  </div>
  <div class="alert ai">Novidade v5: Módulo <strong>Temperatura</strong> completo (termopares, RTDs, PT100, transmissores) e módulo <strong>Calibração</strong> com relatório e procedimento passo a passo — direto do material oficial SENAI.</div>
  <div class="sec">Módulos de Estudo</div>
  <div class="grid g3">
    <div class="card click" onclick="S('m1')"><div class="mn">01</div><div class="mt">Fundamentos</div><div class="pb"><div class="pf"></div></div><div class="ps">PV · MV · SP · Sinais</div></div>
    <div class="card click" onclick="S('m2')"><div class="mn">02</div><div class="mt">Malha de Controle</div><div class="pb"><div class="pf"></div></div><div class="ps">Aberta · Fechada · PID</div></div>
    <div class="card click" onclick="S('m3')"><div class="mn">03</div><div class="mt">Instrumentação</div><div class="pb"><div class="pf"></div></div><div class="ps">Range · Span · Acurácia</div></div>
    <div class="card click" onclick="S('m4')"><div class="mn">04</div><div class="mt">Erros de Medição</div><div class="pb"><div class="pf"></div></div><div class="ps">EA · %FS · %Span</div></div>
    <div class="card click" onclick="S('formulas')" style="border-color:rgba(255,192,64,0.3)"><div class="mn" style="color:var(--y)">★</div><div class="mt">Fórmulas Visuais</div><div class="pb"><div class="pf" style="background:var(--y)"></div></div><div class="ps">Diagramas + Legendas</div></div>
    <div class="card click" onclick="S('pressao')" style="border-color:rgba(0,212,255,0.22)"><div class="mn" style="color:var(--p)">05 · PRESSÃO</div><div class="mt">Variável de Processo</div><div class="pb"><div class="pf"></div></div><div class="ps">Pascal · Bar · Bourdon · Diafragma</div></div>
    <div class="card click" onclick="S('nivel')" style="border-color:rgba(0,255,157,0.22)"><div class="mn" style="color:var(--g)">06 · NÍVEL</div><div class="mt">Variável de Processo</div><div class="pb"><div class="pf" style="background:var(--g)"></div></div><div class="ps">Direta · Indireta · Chaves</div></div>
    <div class="card click" onclick="S('vazao')" style="border-color:rgba(255,192,64,0.22)"><div class="mn" style="color:var(--y)">07 · VAZÃO</div><div class="mt">Variável de Processo</div><div class="pb"><div class="pf" style="background:var(--y)"></div></div><div class="ps">Deprimogênios · Lineares · Especiais</div></div>
    <div class="card click" onclick="S('temperatura')" style="border-color:rgba(192,132,255,0.35)"><div class="mn" style="color:var(--pu)">08 · TEMPERATURA ★</div><div class="mt">Variável de Processo</div><div class="pb"><div class="pf" style="background:var(--pu)"></div></div><div class="ps">Termopar · PT100 · Transmissor</div></div>
    <div class="card click" onclick="S('relacoes')" style="border-color:rgba(255,144,64,0.22)"><div class="mn" style="color:var(--or)">09</div><div class="mt">Relações P · N · Q</div><div class="pb"><div class="pf" style="background:var(--or)"></div></div><div class="ps">Como as 3 se conectam</div></div>
    <div class="card click" onclick="S('cenarios')" style="border-color:rgba(255,144,64,0.22)"><div class="mn" style="color:var(--or)">10</div><div class="mt">Cenários Reais</div><div class="pb"><div class="pf" style="background:var(--or)"></div></div><div class="ps">Caldeira · ETA · Reator</div></div>
    <div class="card click" onclick="S('calibracao')" style="border-color:rgba(255,192,64,0.35)"><div class="mn" style="color:var(--y)">11 · CALIBRAÇÃO ★</div><div class="mt">Metrologia Industrial</div><div class="pb"><div class="pf" style="background:var(--y)"></div></div><div class="ps">Procedimento · Relatório · INMETRO</div></div>
  </div>
</div>

<!-- FÓRMULAS VISUAIS -->
<div class="screen" id="screen-formulas">
  <div class="h1">Fórmulas Visuais</div>
  <div class="sub">Cada equação com diagrama, variáveis coloridas e explicação detalhada</div>

  <!-- PRESSÃO -->
  <div class="sec">Pressão</div>

  <!-- P = F/A -->
  <div class="fcard">
    <div class="fcard-title">Pressão — Definição Fundamental</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula">
          <span style="color:var(--p)">P</span> = <span style="color:var(--y)">F</span> / <span style="color:var(--g)">A</span>
        </div>
        <div class="fcard-desc">A pressão é a força aplicada perpendicularmente dividida pela área sobre a qual ela age. Quanto menor a área, maior a pressão para a mesma força.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--p)">P</td><td class="vname">Pressão</td><td class="vunit">Pa (Pascal)</td><td class="vdesc">O resultado — quanto de força por área</td></tr>
          <tr><td class="vsym" style="color:var(--y)">F</td><td class="vname">Força</td><td class="vunit">N (Newton)</td><td class="vdesc">A força aplicada sobre a superfície</td></tr>
          <tr><td class="vsym" style="color:var(--g)">A</td><td class="vname">Área</td><td class="vunit">m²</td><td class="vdesc">A área da superfície que recebe a força</td></tr>
        </table>
        <div class="fdiv"></div>
        <div style="font-size:12px;color:var(--t3)">Exemplo: força de 100 N sobre área de 0,01 m² → P = 100 / 0,01 = <strong style="color:var(--p)">10.000 Pa = 0,1 bar</strong></div>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <!-- Base surface -->
            <rect x="20" y="110" width="120" height="12" rx="3" fill="#1e2535" stroke="#3a4555" stroke-width="1"/>
            <text x="80" y="138" text-anchor="middle" fill="#6a7585" font-size="10" font-family="IBM Plex Mono">Superfície</text>
            <!-- Area indicator -->
            <rect x="35" y="98" width="90" height="12" rx="2" fill="rgba(0,255,157,0.1)" stroke="#00ff9d" stroke-width="1" stroke-dasharray="4,2"/>
            <text x="80" y="107" text-anchor="middle" fill="#00ff9d" font-size="9" font-family="IBM Plex Mono">A (área)</text>
            <!-- Force arrows -->
            <line x1="50" y1="30" x2="50" y2="95" stroke="#ffc040" stroke-width="2" marker-end="url(#arrowY)"/>
            <line x1="80" y1="20" x2="80" y2="95" stroke="#ffc040" stroke-width="2.5" marker-end="url(#arrowY)"/>
            <line x1="110" y1="30" x2="110" y2="95" stroke="#ffc040" stroke-width="2" marker-end="url(#arrowY)"/>
            <text x="80" y="16" text-anchor="middle" fill="#ffc040" font-size="11" font-weight="bold" font-family="IBM Plex Mono">F</text>
            <!-- P label -->
            <text x="130" y="60" fill="#00d4ff" font-size="18" font-weight="bold" font-family="IBM Plex Mono">P</text>
            <defs>
              <marker id="arrowY" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#ffc040"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Pneumática industrial</span>
      <span class="fapp">Hidráulica</span>
      <span class="fapp">Vasos de pressão</span>
      <span class="fapp">Caldeiras</span>
    </div>
  </div>

  <!-- Stevin -->
  <div class="fcard">
    <div class="fcard-title">Stevin — Pressão Hidrostática</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula">
          <span style="color:var(--p)">ΔP</span> = <span style="color:var(--g)">ρ</span> × <span style="color:var(--or)">g</span> × <span style="color:var(--pu)">h</span>
        </div>
        <div class="fcard-desc">A diferença de pressão entre dois pontos de um mesmo líquido depende apenas da diferença de altura entre eles, não da forma do recipiente.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--p)">ΔP</td><td class="vname">Diferença de pressão</td><td class="vunit">Pa ou bar</td><td class="vdesc">Pressão no ponto A menos pressão no ponto B</td></tr>
          <tr><td class="vsym" style="color:var(--g)">ρ</td><td class="vname">Massa específica</td><td class="vunit">kg/m³</td><td class="vdesc">Água = 1000 · Óleo ≈ 850 · Mercúrio = 13.600</td></tr>
          <tr><td class="vsym" style="color:var(--or)">g</td><td class="vname">Gravidade</td><td class="vunit">m/s²</td><td class="vdesc">Aceleração gravitacional ≈ 9,81 m/s²</td></tr>
          <tr><td class="vsym" style="color:var(--pu)">h</td><td class="vname">Altura da coluna</td><td class="vunit">m</td><td class="vdesc">Diferença de profundidade entre os dois pontos</td></tr>
        </table>
        <div class="fdiv"></div>
        <div style="font-size:12px;color:var(--t3)">Exemplo: água (ρ=1000) com h=5 m → ΔP = 1000 × 9,81 × 5 = <strong style="color:var(--p)">49.050 Pa ≈ 0,49 bar</strong></div>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 175" xmlns="http://www.w3.org/2000/svg">
            <!-- Tank walls -->
            <rect x="25" y="10" width="90" height="130" rx="4" fill="rgba(0,212,255,0.04)" stroke="#2a3545" stroke-width="1.5"/>
            <!-- Water fill -->
            <rect x="26" y="30" width="88" height="109" fill="rgba(0,100,180,0.15)"/>
            <!-- Water surface -->
            <line x1="26" y1="30" x2="114" y2="30" stroke="rgba(0,212,255,0.4)" stroke-width="1.5"/>
            <!-- Point A -->
            <circle cx="70" cy="60" r="4" fill="var(--g)"/>
            <text x="80" y="64" fill="#00ff9d" font-size="10" font-family="IBM Plex Mono" font-weight="bold">A</text>
            <!-- Point B -->
            <circle cx="70" cy="125" r="4" fill="var(--r)"/>
            <text x="80" y="129" fill="#ff5566" font-size="10" font-family="IBM Plex Mono" font-weight="bold">B</text>
            <!-- h arrow -->
            <line x1="118" y1="60" x2="118" y2="125" stroke="var(--pu)" stroke-width="1.5" marker-start="url(#arrowUp)" marker-end="url(#arrowDown)"/>
            <text x="128" y="97" fill="var(--pu)" font-size="12" font-weight="bold" font-family="IBM Plex Mono">h</text>
            <!-- Pressure at B indicator -->
            <rect x="30" y="132" width="82" height="5" rx="2" fill="rgba(0,212,255,0.15)"/>
            <text x="71" y="150" text-anchor="middle" fill="var(--p)" font-size="9" font-family="IBM Plex Mono">P↑ com profundidade</text>
            <defs>
              <marker id="arrowUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M4,0 L8,8 L0,8 Z" fill="var(--pu)"/>
              </marker>
              <marker id="arrowDown" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L8,0 L4,8 Z" fill="var(--pu)"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Medição de nível por pressão</span>
      <span class="fapp">Caixas d'água</span>
      <span class="fapp">Tanques industriais</span>
    </div>
  </div>

  <!-- VAZÃO -->
  <div class="sec">Vazão</div>

  <!-- Qv -->
  <div class="fcard">
    <div class="fcard-title">Vazão Volumétrica</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula">
          <span style="color:var(--y)">Qv</span> = <span style="color:var(--g)">S</span> × <span style="color:var(--p)">v</span>
        </div>
        <div class="fcard-desc">A vazão volumétrica mede o volume de fluido que passa por uma seção da tubulação por unidade de tempo. Depende da área da seção e da velocidade do fluido.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--y)">Qv</td><td class="vname">Vazão volumétrica</td><td class="vunit">m³/s · m³/h · L/min</td><td class="vdesc">Volume de fluido por unidade de tempo</td></tr>
          <tr><td class="vsym" style="color:var(--g)">S</td><td class="vname">Seção transversal</td><td class="vunit">m²</td><td class="vdesc">Área interna da tubulação no ponto medido</td></tr>
          <tr><td class="vsym" style="color:var(--p)">v</td><td class="vname">Velocidade do fluido</td><td class="vunit">m/s</td><td class="vdesc">Velocidade média do fluido na seção</td></tr>
        </table>
        <div class="fdiv"></div>
        <div style="font-size:12px;color:var(--t3)">Tubo de 10 cm de diâmetro (S=0,00785 m²) com fluido a 2 m/s → Qv = 0,00785 × 2 = <strong style="color:var(--y)">0,0157 m³/s ≈ 942 L/min</strong></div>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">
            <!-- Pipe walls -->
            <rect x="10" y="40" width="140" height="50" rx="4" fill="rgba(255,255,255,0.02)" stroke="#2a3545" stroke-width="1.5"/>
            <!-- Fluid fill -->
            <rect x="11" y="41" width="138" height="48" rx="3" fill="rgba(0,100,180,0.12)"/>
            <!-- Cross section circle at left -->
            <ellipse cx="30" cy="65" rx="8" ry="24" fill="rgba(0,255,157,0.15)" stroke="#00ff9d" stroke-width="1.5"/>
            <text x="30" y="100" text-anchor="middle" fill="#00ff9d" font-size="9" font-family="IBM Plex Mono">S (área)</text>
            <!-- Velocity arrows -->
            <line x1="55" y1="55" x2="100" y2="55" stroke="var(--p)" stroke-width="1.5" marker-end="url(#arrowP)"/>
            <line x1="50" y1="65" x2="110" y2="65" stroke="var(--p)" stroke-width="2" marker-end="url(#arrowP)"/>
            <line x1="55" y1="75" x2="100" y2="75" stroke="var(--p)" stroke-width="1.5" marker-end="url(#arrowP)"/>
            <text x="120" y="69" fill="var(--p)" font-size="12" font-weight="bold" font-family="IBM Plex Mono">v</text>
            <!-- Qv label -->
            <text x="80" y="18" text-anchor="middle" fill="var(--y)" font-size="12" font-weight="bold" font-family="IBM Plex Mono">Qv</text>
            <line x1="80" y1="22" x2="80" y2="38" stroke="var(--y)" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arrowYel)"/>
            <defs>
              <marker id="arrowP" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--p)"/>
              </marker>
              <marker id="arrowYel" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--y)"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Medidores de turbina</span>
      <span class="fapp">Ultrassônico</span>
      <span class="fapp">Eletromagnético</span>
    </div>
  </div>

  <!-- Qm -->
  <div class="fcard">
    <div class="fcard-title">Vazão Mássica</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula">
          <span style="color:var(--or)">Qm</span> = <span style="color:var(--g)">ρ</span> × <span style="color:var(--y)">Qv</span>
        </div>
        <div class="fcard-desc">A vazão mássica mede a massa de fluido por unidade de tempo. Diferente da volumétrica, ela não muda com temperatura ou pressão — por isso é preferida para gases e vapores.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--or)">Qm</td><td class="vname">Vazão mássica</td><td class="vunit">kg/s · kg/h · t/h</td><td class="vdesc">Massa de fluido que passa por unidade de tempo</td></tr>
          <tr><td class="vsym" style="color:var(--g)">ρ</td><td class="vname">Massa específica</td><td class="vunit">kg/m³</td><td class="vdesc">Água=1000 · Ar≈1,2 · Vapor≈0,6 (a 100°C, 1 atm)</td></tr>
          <tr><td class="vsym" style="color:var(--y)">Qv</td><td class="vname">Vazão volumétrica</td><td class="vunit">m³/s</td><td class="vdesc">Volume por tempo — muda com T e P para gases</td></tr>
        </table>
        <div class="fdiv"></div>
        <div style="font-size:12px;color:var(--t3)">Água (ρ=1000 kg/m³) com Qv=0,01 m³/s → Qm = 1000 × 0,01 = <strong style="color:var(--or)">10 kg/s = 36 t/h</strong></div>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">
            <!-- Coriolis tube shape -->
            <path d="M20,65 Q40,30 80,30 Q120,30 140,65" fill="none" stroke="#2a3545" stroke-width="12" stroke-linecap="round"/>
            <path d="M20,65 Q40,30 80,30 Q120,30 140,65" fill="none" stroke="rgba(0,100,180,0.2)" stroke-width="10" stroke-linecap="round"/>
            <path d="M20,65 Q40,95 80,95 Q120,95 140,65" fill="none" stroke="#2a3545" stroke-width="12" stroke-linecap="round"/>
            <path d="M20,65 Q40,95 80,95 Q120,95 140,65" fill="none" stroke="rgba(0,100,180,0.2)" stroke-width="10" stroke-linecap="round"/>
            <!-- Coriolis force arrows -->
            <line x1="80" y1="32" x2="80" y2="55" stroke="var(--r)" stroke-width="1.5" marker-end="url(#arrowR)"/>
            <line x1="80" y1="93" x2="80" y2="70" stroke="var(--g)" stroke-width="1.5" marker-end="url(--arrowG)"/>
            <text x="90" y="45" fill="var(--r)" font-size="9" font-family="IBM Plex Mono">Coriolis</text>
            <!-- Flow arrows -->
            <line x1="10" y1="65" x2="30" y2="65" stroke="var(--or)" stroke-width="2" marker-end="url(#arrowOr)"/>
            <line x1="130" y1="65" x2="150" y2="65" stroke="var(--or)" stroke-width="2" marker-end="url(#arrowOr)"/>
            <text x="80" y="118" text-anchor="middle" fill="var(--or)" font-size="10" font-family="IBM Plex Mono">Coriolis → Qm direta</text>
            <defs>
              <marker id="arrowR" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--r)"/>
              </marker>
              <marker id="arrowOr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--or)"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Medidor Coriolis</span>
      <span class="fapp">Vapores em caldeiras</span>
      <span class="fapp">Gases comprimidos</span>
    </div>
  </div>

  <!-- Reynolds -->
  <div class="fcard">
    <div class="fcard-title">Número de Reynolds — Regime de Escoamento</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula">
          <span style="color:var(--p)">Re</span> = ( <span style="color:var(--g)">ρ</span> × <span style="color:var(--y)">v</span> × <span style="color:var(--or)">D</span> ) / <span style="color:var(--r)">μ</span>
        </div>
        <div class="fcard-desc">O Número de Reynolds é adimensional e classifica se o escoamento é laminar, em transição ou turbulento. Define qual tipo de medidor é adequado para cada situação.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--p)">Re</td><td class="vname">Número de Reynolds</td><td class="vunit">adimensional</td><td class="vdesc">&lt;2300 laminar · 2300–4000 transição · &gt;4000 turbulento</td></tr>
          <tr><td class="vsym" style="color:var(--g)">ρ</td><td class="vname">Massa específica</td><td class="vunit">kg/m³</td><td class="vdesc">Densidade do fluido no ponto de medição</td></tr>
          <tr><td class="vsym" style="color:var(--y)">v</td><td class="vname">Velocidade do fluido</td><td class="vunit">m/s</td><td class="vdesc">Velocidade média de escoamento na seção</td></tr>
          <tr><td class="vsym" style="color:var(--or)">D</td><td class="vname">Diâmetro interno</td><td class="vunit">m</td><td class="vdesc">Diâmetro interno da tubulação no ponto medido</td></tr>
          <tr><td class="vsym" style="color:var(--r)">μ</td><td class="vname">Viscosidade dinâmica</td><td class="vunit">Pa·s (cP)</td><td class="vdesc">Resistência interna do fluido ao escoamento. Água≈0,001 · Óleo≈0,1–1</td></tr>
        </table>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 175" xmlns="http://www.w3.org/2000/svg">
            <!-- Laminar -->
            <text x="80" y="14" text-anchor="middle" fill="#00ff9d" font-size="9" font-family="IBM Plex Mono">LAMINAR (Re &lt; 2300)</text>
            <rect x="8" y="18" width="144" height="36" rx="4" fill="rgba(0,255,157,0.04)" stroke="#00ff9d" stroke-width="1"/>
            <line x1="20" y1="36" x2="140" y2="36" stroke="#00ff9d" stroke-width="2.5" marker-end="url(#arrG2)"/>
            <line x1="20" y1="27" x2="120" y2="27" stroke="#00ff9d" stroke-width="1.2" marker-end="url(#arrG2)" opacity="0.6"/>
            <line x1="20" y1="45" x2="120" y2="45" stroke="#00ff9d" stroke-width="1.2" marker-end="url(#arrG2)" opacity="0.6"/>
            <!-- Transition -->
            <text x="80" y="74" text-anchor="middle" fill="var(--y)" font-size="9" font-family="IBM Plex Mono">TRANSIÇÃO (2300–4000)</text>
            <rect x="8" y="78" width="144" height="36" rx="4" fill="rgba(255,192,64,0.04)" stroke="var(--y)" stroke-width="1"/>
            <path d="M20,90 Q50,82 80,96 Q110,108 140,96" fill="none" stroke="var(--y)" stroke-width="1.5"/>
            <path d="M20,102 Q50,110 80,94 Q110,80 140,102" fill="none" stroke="var(--y)" stroke-width="1.5" opacity="0.7"/>
            <!-- Turbulent -->
            <text x="80" y="134" text-anchor="middle" fill="var(--r)" font-size="9" font-family="IBM Plex Mono">TURBULENTO (Re &gt; 4000)</text>
            <rect x="8" y="138" width="144" height="36" rx="4" fill="rgba(255,85,102,0.04)" stroke="var(--r)" stroke-width="1"/>
            <path d="M20,150 Q35,142 50,154 Q65,166 80,150 Q95,134 110,150 Q125,162 140,150" fill="none" stroke="var(--r)" stroke-width="1.5"/>
            <path d="M20,162 Q35,158 55,142 Q70,150 90,158 Q110,142 130,154 Q138,158 140,162" fill="none" stroke="var(--r)" stroke-width="1.2" opacity="0.7"/>
            <defs>
              <marker id="arrG2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#00ff9d"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Escolha do medidor de vazão</span>
      <span class="fapp">Projeto de tubulações</span>
      <span class="fapp">Placa de orifício (Re mín.)</span>
    </div>
  </div>

  <!-- Bernoulli / Orifício -->
  <div class="fcard">
    <div class="fcard-title">Bernoulli — Pressão × Vazão (Placa de Orifício)</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula" style="font-size:16px">
          <span style="color:var(--y)">Q</span> = <span style="color:var(--t3)">Cd</span> × <span style="color:var(--g)">A</span> × √(<span style="color:var(--p)">2ΔP</span> / <span style="color:var(--or)">ρ</span>)
        </div>
        <div class="fcard-desc">A diferença de pressão antes e depois de uma restrição no fluido indica a vazão. Relação com raiz quadrada: dobrar a vazão quadruplica o ΔP.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--y)">Q</td><td class="vname">Vazão volumétrica</td><td class="vunit">m³/s</td><td class="vdesc">O resultado que queremos calcular</td></tr>
          <tr><td class="vsym" style="color:var(--t3)">Cd</td><td class="vname">Coef. de descarga</td><td class="vunit">adimensional</td><td class="vdesc">≈0,61 para placa de orifício padrão ISO</td></tr>
          <tr><td class="vsym" style="color:var(--g)">A</td><td class="vname">Área do orifício</td><td class="vunit">m²</td><td class="vdesc">Área do furo da placa de orifício</td></tr>
          <tr><td class="vsym" style="color:var(--p)">ΔP</td><td class="vname">Pressão diferencial</td><td class="vunit">Pa</td><td class="vdesc">P1 (antes) − P2 (depois) da placa. Medido por transmissor ΔP</td></tr>
          <tr><td class="vsym" style="color:var(--or)">ρ</td><td class="vname">Massa específica</td><td class="vunit">kg/m³</td><td class="vdesc">Densidade do fluido no ponto de medição</td></tr>
        </table>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
            <!-- Pipe full -->
            <rect x="5" y="45" width="55" height="50" rx="2" fill="rgba(0,100,180,0.12)" stroke="#2a3545" stroke-width="1.5"/>
            <!-- Orifice plate -->
            <rect x="58" y="40" width="8" height="60" rx="1" fill="#2a3545" stroke="#3a4555" stroke-width="1"/>
            <rect x="60" y="62" width="4" height="16" rx="1" fill="var(--bg)"/>
            <!-- Pipe narrow jet -->
            <path d="M66,62 L110,55 L110,85 L66,78 Z" fill="rgba(0,100,180,0.2)"/>
            <!-- Pipe right -->
            <rect x="108" y="45" width="48" height="50" rx="2" fill="rgba(0,100,180,0.08)" stroke="#2a3545" stroke-width="1.5"/>
            <!-- Pressure tap left (P1) -->
            <line x1="32" y1="45" x2="32" y2="20" stroke="var(--p)" stroke-width="1.5"/>
            <circle cx="32" cy="18" r="3" fill="var(--p)"/>
            <text x="32" y="12" text-anchor="middle" fill="var(--p)" font-size="9" font-family="IBM Plex Mono">P1</text>
            <!-- Pressure tap right (P2) -->
            <line x1="125" y1="45" x2="125" y2="20" stroke="var(--pu)" stroke-width="1.5"/>
            <circle cx="125" cy="18" r="3" fill="var(--pu)"/>
            <text x="125" y="12" text-anchor="middle" fill="var(--pu)" font-size="9" font-family="IBM Plex Mono">P2</text>
            <!-- ΔP transmitter -->
            <rect x="62" y="5" width="40" height="12" rx="3" fill="rgba(0,212,255,0.1)" stroke="var(--p)" stroke-width="1"/>
            <text x="82" y="14" text-anchor="middle" fill="var(--p)" font-size="8" font-family="IBM Plex Mono">ΔP = P1–P2</text>
            <!-- Velocity label -->
            <text x="20" y="78" text-anchor="middle" fill="var(--t3)" font-size="8" font-family="IBM Plex Mono">v1</text>
            <text x="90" y="72" text-anchor="middle" fill="var(--y)" font-size="9" font-family="IBM Plex Mono" font-weight="bold">v2↑</text>
            <!-- Flow arrows -->
            <line x1="8" y1="70" x2="52" y2="70" stroke="rgba(0,212,255,0.5)" stroke-width="1.5" marker-end="url(#arrP2)"/>
            <line x1="68" y1="70" x2="102" y2="70" stroke="rgba(255,192,64,0.7)" stroke-width="2" marker-end="url(#arrY2)"/>
            <text x="80" y="125" text-anchor="middle" fill="var(--t3)" font-size="9" font-family="IBM Plex Mono">v2↑ → P2↓</text>
            <defs>
              <marker id="arrP2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(0,212,255,0.7)"/>
              </marker>
              <marker id="arrY2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--y)"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Placa de orifício</span>
      <span class="fapp">Tubo de Venturi</span>
      <span class="fapp">Gás natural</span>
      <span class="fapp">Vapor de caldeira</span>
    </div>
  </div>

  <!-- Torricelli -->
  <div class="fcard">
    <div class="fcard-title">Torricelli — Saída por Gravidade</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula">
          <span style="color:var(--p)">v</span> = √( 2 × <span style="color:var(--or)">g</span> × <span style="color:var(--pu)">h</span> )
        </div>
        <div class="fcard-desc">A velocidade de saída de um orifício num tanque depende da raiz quadrada do nível. Quando o nível cai, a vazão de saída também cai — criando um esvaziamento não-linear (exponencial).</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--p)">v</td><td class="vname">Velocidade de saída</td><td class="vunit">m/s</td><td class="vdesc">Velocidade do fluido saindo pelo orifício do fundo</td></tr>
          <tr><td class="vsym" style="color:var(--or)">g</td><td class="vname">Gravidade</td><td class="vunit">m/s²</td><td class="vdesc">Aceleração gravitacional ≈ 9,81 m/s²</td></tr>
          <tr><td class="vsym" style="color:var(--pu)">h</td><td class="vname">Altura do nível</td><td class="vunit">m</td><td class="vdesc">Distância da superfície livre até o orifício de saída</td></tr>
        </table>
        <div class="fdiv"></div>
        <div style="font-size:12px;color:var(--t3)">h = 2 m → v = √(2×9,81×2) = <strong style="color:var(--p)">6,26 m/s</strong> &nbsp;|&nbsp; h = 0,5 m → v = <strong style="color:var(--p)">3,13 m/s</strong> (nível caiu 4×, velocidade caiu 2×)</div>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 165" xmlns="http://www.w3.org/2000/svg">
            <!-- Tank walls -->
            <rect x="30" y="10" width="85" height="115" rx="4" fill="rgba(0,212,255,0.03)" stroke="#2a3545" stroke-width="1.5"/>
            <!-- Water -->
            <rect x="31" y="20" width="83" height="104" fill="rgba(0,100,180,0.15)"/>
            <!-- Water surface -->
            <line x1="31" y1="20" x2="113" y2="20" stroke="rgba(0,212,255,0.4)" stroke-width="1.5"/>
            <!-- h arrow -->
            <line x1="122" y1="20" x2="122" y2="125" stroke="var(--pu)" stroke-width="1.5" marker-start="url(#mUp)" marker-end="url(#mDn)"/>
            <text x="133" y="77" fill="var(--pu)" font-size="13" font-weight="bold" font-family="IBM Plex Mono">h</text>
            <!-- Orifice -->
            <rect x="30" y="116" width="14" height="9" rx="1" fill="var(--bg)"/>
            <text x="37" y="112" text-anchor="middle" fill="var(--t3)" font-size="8" font-family="IBM Plex Mono">orifício</text>
            <!-- Water jet -->
            <path d="M44,118 Q60,120 70,130 Q78,138 80,148" fill="none" stroke="var(--p)" stroke-width="2"/>
            <!-- v arrow -->
            <line x1="44" y1="121" x2="58" y2="121" stroke="var(--p)" stroke-width="1.5" marker-end="url(#arrP3)"/>
            <text x="62" y="125" fill="var(--p)" font-size="11" font-weight="bold" font-family="IBM Plex Mono">v</text>
            <!-- g arrow down -->
            <line x1="75" y1="60" x2="75" y2="90" stroke="var(--or)" stroke-width="1.5" marker-end="url(#arrOr2)"/>
            <text x="82" y="80" fill="var(--or)" font-size="11" font-weight="bold" font-family="IBM Plex Mono">g</text>
            <defs>
              <marker id="mUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M4,0 L8,8 L0,8 Z" fill="var(--pu)"/>
              </marker>
              <marker id="mDn" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L8,0 L4,8 Z" fill="var(--pu)"/>
              </marker>
              <marker id="arrP3" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--p)"/>
              </marker>
              <marker id="arrOr2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--or)"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Caixa d'água por gravidade</span>
      <span class="fapp">Esvaziamento de tanques</span>
      <span class="fapp">Sistemas gravitacionais</span>
    </div>
  </div>

  <!-- Erros -->
  <div class="sec">Erros de Medição</div>

  <!-- EA -->
  <div class="fcard">
    <div class="fcard-title">Erro Absoluto e Tipos de Erro %</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula" style="font-size:17px">
          <span style="color:var(--r)">EA</span> = <span style="color:var(--y)">Indicado</span> − <span style="color:var(--g)">Real</span>
        </div>
        <div class="fcard-desc">O erro absoluto é a diferença direta entre o que o instrumento mostra e o valor verdadeiro. A partir dele, calculamos os erros percentuais — que dependem do denominador escolhido.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--r)">EA</td><td class="vname">Erro Absoluto</td><td class="vunit">mesma unidade da variável</td><td class="vdesc">Positivo = instrumento superestima. Negativo = subestima</td></tr>
          <tr><td class="vsym" style="color:var(--y)">Indicado</td><td class="vname">Valor indicado</td><td class="vunit">bar, °C, m³/h…</td><td class="vdesc">O que o instrumento mostra no display</td></tr>
          <tr><td class="vsym" style="color:var(--g)">Real</td><td class="vname">Valor real</td><td class="vunit">bar, °C, m³/h…</td><td class="vdesc">O valor verdadeiro (medido por padrão de referência)</td></tr>
        </table>
        <div class="fdiv"></div>
        <table class="vleg" style="margin-top:4px">
          <tr><td class="vsym" style="color:var(--p);font-size:12px">%FS</td><td class="vname" style="font-size:11px">Erro % FS</td><td class="vunit">(EA/URV)×100</td><td class="vdesc">Comparar com catálogo do instrumento</td></tr>
          <tr><td class="vsym" style="color:var(--pu);font-size:12px">%Span</td><td class="vname" style="font-size:11px">Erro % Span</td><td class="vunit">(EA/Span)×100</td><td class="vdesc">Instrumento com re-range</td></tr>
          <tr><td class="vsym" style="color:var(--or);font-size:12px">%Leit.</td><td class="vname" style="font-size:11px">Erro % Leitura</td><td class="vunit">(EA/Real)×100</td><td class="vdesc">Erro relativo ao valor medido</td></tr>
        </table>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <!-- Target (real value) -->
            <circle cx="80" cy="75" r="50" fill="none" stroke="rgba(0,255,157,0.15)" stroke-width="1"/>
            <circle cx="80" cy="75" r="35" fill="none" stroke="rgba(0,255,157,0.2)" stroke-width="1"/>
            <circle cx="80" cy="75" r="20" fill="none" stroke="rgba(0,255,157,0.3)" stroke-width="1"/>
            <circle cx="80" cy="75" r="6" fill="var(--g)" opacity="0.8"/>
            <text x="80" y="135" text-anchor="middle" fill="var(--g)" font-size="9" font-family="IBM Plex Mono">Real (alvo)</text>
            <!-- Measured point (with error) -->
            <circle cx="100" cy="58" r="5" fill="var(--r)"/>
            <text x="108" y="56" fill="var(--r)" font-size="9" font-family="IBM Plex Mono">Indicado</text>
            <!-- EA arrow -->
            <line x1="83" y1="72" x2="97" y2="61" stroke="var(--r)" stroke-width="1.5" stroke-dasharray="3,2"/>
            <text x="84" y="62" fill="var(--r)" font-size="9" font-family="IBM Plex Mono" font-weight="bold">EA</text>
          </svg>
        </div>
      </div>
    </div>
    <div class="alert aw" style="margin-top:6px">EA=0,12 · Real=6 · FS=10 → %Leitura=2,0% · %FS=1,2% · Span(2–8bar)=2,0%. Mesmo EA, denominadores diferentes = % diferentes!</div>
  </div>

  <!-- TEMPERATURA -->
  <div class="sec">Temperatura</div>

  <!-- Conversões de temperatura -->
  <div class="fcard">
    <div class="fcard-title">Conversão de Temperatura — Três Escalas</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula" style="font-size:16px">
          <span style="color:var(--pu)">K</span> = <span style="color:var(--p)">°C</span> + 273,15 &nbsp;|&nbsp;
          <span style="color:var(--y)">°F</span> = <span style="color:var(--p)">°C</span> × 9/5 + 32
        </div>
        <div class="fcard-desc">As três escalas medem a mesma grandeza — temperatura — mas com origens e intervalos diferentes. Kelvin é a escala absoluta (base SI). Celsius é o padrão industrial brasileiro. Fahrenheit é usado nos EUA.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--pu)">K</td><td class="vname">Kelvin</td><td class="vunit">SI — absoluta</td><td class="vdesc">Zero absoluto = 0 K = −273,15°C. Usada em cálculos termodinâmicos e de gases</td></tr>
          <tr><td class="vsym" style="color:var(--p)">°C</td><td class="vname">Celsius</td><td class="vunit">Padrão BR</td><td class="vdesc">0°C = gelo fundente · 100°C = água fervendo (1 atm). Padrão industrial brasileiro</td></tr>
          <tr><td class="vsym" style="color:var(--y)">°F</td><td class="vname">Fahrenheit</td><td class="vunit">EUA / imperial</td><td class="vdesc">32°F = gelo · 212°F = fervura. Presente em instrumentos importados dos EUA</td></tr>
        </table>
        <div class="fdiv"></div>
        <div style="font-size:12px;color:var(--t3)">20°C = 293,15 K = 68°F &nbsp;|&nbsp; 100°C = 373,15 K = 212°F &nbsp;|&nbsp; −40°C = −40°F (único ponto igual nas duas escalas)</div>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 190" xmlns="http://www.w3.org/2000/svg">
            <!-- Axis line -->
            <line x1="80" y1="15" x2="80" y2="175" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
            <!-- K scale markers -->
            <text x="14" y="14" fill="var(--pu)" font-size="9" font-family="IBM Plex Mono" font-weight="600">K</text>
            <text x="8" y="32" fill="var(--pu)" font-size="8" font-family="IBM Plex Mono">373</text>
            <line x1="22" y1="29" x2="78" y2="29" stroke="var(--pu)" stroke-width="0.8" stroke-dasharray="2,2"/>
            <text x="8" y="86" fill="var(--pu)" font-size="8" font-family="IBM Plex Mono">293</text>
            <line x1="22" y1="83" x2="78" y2="83" stroke="var(--pu)" stroke-width="0.8" stroke-dasharray="2,2"/>
            <text x="8" y="158" fill="var(--pu)" font-size="8" font-family="IBM Plex Mono">273</text>
            <line x1="22" y1="155" x2="78" y2="155" stroke="var(--pu)" stroke-width="0.8" stroke-dasharray="2,2"/>
            <text x="8" y="178" fill="var(--pu)" font-size="7" font-family="IBM Plex Mono">0 K</text>
            <!-- C scale markers -->
            <text x="72" y="14" fill="var(--p)" font-size="9" font-family="IBM Plex Mono" font-weight="600" text-anchor="middle">°C</text>
            <text x="72" y="32" fill="var(--p)" font-size="8" font-family="IBM Plex Mono" text-anchor="end">100</text>
            <text x="72" y="86" fill="var(--p)" font-size="8" font-family="IBM Plex Mono" text-anchor="end">20</text>
            <text x="72" y="158" fill="var(--p)" font-size="8" font-family="IBM Plex Mono" text-anchor="end">0</text>
            <!-- F scale markers -->
            <text x="148" y="14" fill="var(--y)" font-size="9" font-family="IBM Plex Mono" font-weight="600" text-anchor="end">°F</text>
            <text x="152" y="32" fill="var(--y)" font-size="8" font-family="IBM Plex Mono">212</text>
            <line x1="82" y1="29" x2="138" y2="29" stroke="var(--y)" stroke-width="0.8" stroke-dasharray="2,2"/>
            <text x="152" y="86" fill="var(--y)" font-size="8" font-family="IBM Plex Mono">68</text>
            <line x1="82" y1="83" x2="138" y2="83" stroke="var(--y)" stroke-width="0.8" stroke-dasharray="2,2"/>
            <text x="152" y="158" fill="var(--y)" font-size="8" font-family="IBM Plex Mono">32</text>
            <line x1="82" y1="155" x2="138" y2="155" stroke="var(--y)" stroke-width="0.8" stroke-dasharray="2,2"/>
            <!-- Highlight zero absolute -->
            <rect x="28" y="170" width="104" height="12" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
            <text x="80" y="179" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="7" font-family="IBM Plex Mono">zero absoluto = −273,15°C</text>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Transmissores de temperatura</span>
      <span class="fapp">Termopares (mV → °C)</span>
      <span class="fapp">Cálculos termodinâmicos</span>
      <span class="fapp">Lei dos gases (K obrigatório)</span>
    </div>
  </div>

  <!-- Termopar — Efeito Seebeck -->
  <div class="fcard">
    <div class="fcard-title">Termopar — Efeito Seebeck (1821)</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula" style="font-size:18px">
          <span style="color:var(--r)">V</span> = <span style="color:var(--pu)">α</span> × ( <span style="color:var(--y)">T_quente</span> − <span style="color:var(--p)">T_fria</span> )
        </div>
        <div class="fcard-desc">Dois metais diferentes unidos numa junção: quando aquecida, gera tensão termoelétrica (mV) proporcional à diferença de temperatura entre a junção quente (processo) e a junção fria (referência).</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--r)">V</td><td class="vname">Tensão termoelétrica</td><td class="vunit">mV</td><td class="vdesc">Sinal elétrico gerado pelo Efeito Seebeck — muito pequeno, sensível a ruídos</td></tr>
          <tr><td class="vsym" style="color:var(--pu)">α</td><td class="vname">Coef. Seebeck</td><td class="vunit">µV/°C</td><td class="vdesc">Sensibilidade do par metálico. Tipo K ≈ 41 µV/°C · Tipo E ≈ 68 µV/°C</td></tr>
          <tr><td class="vsym" style="color:var(--y)">T_quente</td><td class="vname">Junção quente</td><td class="vunit">°C</td><td class="vdesc">Ponta imersa no processo — mede a temperatura</td></tr>
          <tr><td class="vsym" style="color:var(--p)">T_fria</td><td class="vname">Junção fria (referência)</td><td class="vunit">°C</td><td class="vdesc">Extremidade no transmissor — temperatura de referência conhecida (compensação eletrônica)</td></tr>
        </table>
        <div class="fdiv"></div>
        <div style="font-size:12px;color:var(--t3)">Tipo K a 500°C com T_fria = 25°C → V = 41 µV/°C × (500 − 25) = <strong style="color:var(--r)">19,475 mV</strong></div>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg">
            <!-- Metal A wire -->
            <path d="M10,50 L80,50 L80,100 L150,100" fill="none" stroke="#00d4ff" stroke-width="3" stroke-linecap="round"/>
            <text x="40" y="42" fill="#00d4ff" font-size="9" font-family="IBM Plex Mono">Metal A (Chromel)</text>
            <!-- Metal B wire -->
            <path d="M10,60 L80,60 L80,90 L150,90" fill="none" stroke="#ffc040" stroke-width="3" stroke-linecap="round"/>
            <text x="40" y="72" fill="#ffc040" font-size="9" font-family="IBM Plex Mono">Metal B (Alumel)</text>
            <!-- Hot junction -->
            <circle cx="80" cy="75" r="10" fill="rgba(255,85,102,0.2)" stroke="#ff5566" stroke-width="2"/>
            <text x="80" y="79" text-anchor="middle" fill="#ff5566" font-size="10" font-family="IBM Plex Mono" font-weight="600">T♨</text>
            <text x="80" y="138" text-anchor="middle" fill="#ff5566" font-size="8" font-family="IBM Plex Mono">Junção quente</text>
            <!-- Cold junction / transmitter -->
            <rect x="130" y="82" width="26" height="24" rx="3" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="1"/>
            <text x="143" y="97" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="IBM Plex Mono">TX</text>
            <!-- mV signal -->
            <text x="143" y="75" text-anchor="middle" fill="var(--r)" font-size="9" font-family="IBM Plex Mono">mV →</text>
            <!-- Flame under hot junction -->
            <path d="M72,92 Q75,85 80,88 Q85,82 88,92 Q85,95 80,93 Q75,95 72,92" fill="rgba(255,144,64,0.4)" stroke="none"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Tipos J·K·T·E·N·R·S·B</span>
      <span class="fapp">Fornos industriais</span>
      <span class="fapp">Caldeiras e turbinas</span>
      <span class="fapp">Até +1820°C (tipo B)</span>
    </div>
  </div>

  <!-- PT100 -->
  <div class="fcard">
    <div class="fcard-title">PT100 — Resistência versus Temperatura</div>
    <div class="fcard-top">
      <div class="fcard-left">
        <div class="fcard-formula">
          <span style="color:var(--pu)">R</span>(<span style="color:var(--p)">T</span>) = <span style="color:var(--t3)">R₀</span> × ( 1 + <span style="color:var(--g)">α</span> × <span style="color:var(--p)">T</span> )
        </div>
        <div class="fcard-desc">A resistência elétrica da platina aumenta linearmente com a temperatura. R₀ = 100 Ω a 0°C. O coeficiente α indica quantos ohms a resistência aumenta por grau.</div>
        <table class="vleg">
          <tr><td class="vsym" style="color:var(--pu)">R(T)</td><td class="vname">Resistência a T</td><td class="vunit">Ω (ohms)</td><td class="vdesc">O valor que o transmissor lê e converte em temperatura</td></tr>
          <tr><td class="vsym" style="color:var(--t3)">R₀</td><td class="vname">Resistência a 0°C</td><td class="vunit">Ω</td><td class="vdesc">PT100 = 100Ω · PT1000 = 1000Ω (mais sensível e preciso)</td></tr>
          <tr><td class="vsym" style="color:var(--g)">α</td><td class="vname">Coeficiente de temperatura</td><td class="vunit">Ω/Ω·°C</td><td class="vdesc">Platina padrão: α = 0,00385 Ω/Ω·°C (IEC 60751)</td></tr>
          <tr><td class="vsym" style="color:var(--p)">T</td><td class="vname">Temperatura</td><td class="vunit">°C</td><td class="vdesc">O valor que queremos medir</td></tr>
        </table>
        <div class="fdiv"></div>
        <div style="font-size:12px;color:var(--t3)">A 100°C: R = 100×(1 + 0,00385×100) = <strong style="color:var(--pu)">138,5 Ω</strong> &nbsp;|&nbsp; A 200°C: <strong style="color:var(--pu)">177 Ω</strong></div>
      </div>
      <div class="fcard-right">
        <div class="fdiag">
          <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <!-- Axes -->
            <line x1="25" y1="130" x2="145" y2="130" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
            <line x1="25" y1="20" x2="25" y2="130" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
            <!-- X labels -->
            <text x="25" y="143" text-anchor="middle" fill="var(--t3)" font-size="7" font-family="IBM Plex Mono">0°C</text>
            <text x="85" y="143" text-anchor="middle" fill="var(--t3)" font-size="7" font-family="IBM Plex Mono">200°C</text>
            <text x="145" y="143" text-anchor="middle" fill="var(--t3)" font-size="7" font-family="IBM Plex Mono">400°C</text>
            <!-- Y labels -->
            <text x="22" y="132" text-anchor="end" fill="var(--t3)" font-size="7" font-family="IBM Plex Mono">100Ω</text>
            <text x="22" y="75" text-anchor="end" fill="var(--t3)" font-size="7" font-family="IBM Plex Mono">215Ω</text>
            <text x="22" y="22" text-anchor="end" fill="var(--t3)" font-size="7" font-family="IBM Plex Mono">330Ω</text>
            <!-- Linear resistance line R(T) -->
            <line x1="25" y1="130" x2="145" y2="22" stroke="var(--pu)" stroke-width="2.5"/>
            <!-- Reference dots -->
            <circle cx="25" cy="130" r="3" fill="var(--pu)"/>
            <circle cx="85" cy="76" r="3" fill="var(--pu)"/>
            <circle cx="145" cy="22" r="3" fill="var(--pu)"/>
            <!-- Labels on dots -->
            <text x="30" y="128" fill="var(--p)" font-size="7" font-family="IBM Plex Mono">R₀=100</text>
            <text x="90" y="74" fill="var(--p)" font-size="7" font-family="IBM Plex Mono">177Ω</text>
            <!-- Axis titles -->
            <text x="85" y="155" text-anchor="middle" fill="var(--p)" font-size="8" font-family="IBM Plex Mono">Temperatura</text>
            <text x="10" y="75" fill="var(--pu)" font-size="8" font-family="IBM Plex Mono" transform="rotate(-90,10,75)">R(Ω)</text>
          </svg>
        </div>
      </div>
    </div>
    <div class="fapps">
      <span class="fapp">Processos industriais gerais</span>
      <span class="fapp">Indústria alimentícia</span>
      <span class="fapp">Farmacêutica</span>
      <span class="fapp">−200°C a +850°C</span>
    </div>
  </div>
</div>

<!-- Módulos M1–M4 condensados -->
<div class="screen" id="screen-m1">
  <div class="h1">Fundamentos</div><div class="sub">Módulo 01</div>
  <div class="alert ai">"O que não se mede, não se controla."</div>
  <div class="blk"><h3>PV · MV · SP</h3>
    <div class="grid g3" style="margin-top:8px">
      <div class="hl hl-p"><div class="hl-hdr">PV — Process Variable</div><p>A grandeza física medida: temperatura, pressão, nível, vazão. É o que o sensor lê em tempo real.</p></div>
      <div class="hl hl-g"><div class="hl-hdr">MV — Manipulated Variable</div><p>O que o controlador ajusta para influenciar a PV: válvula, bomba, chama, motor.</p></div>
      <div class="hl hl-y"><div class="hl-hdr">SP — Set Point</div><p>Valor desejado para a PV. O controlador age na MV até que PV = SP.</p></div>
    </div>
  </div>
  <div class="blk"><h3>Sinais de Instrumentação</h3>
    <table class="tbl"><thead><tr><th>Tipo</th><th>Descrição</th><th>Uso industrial</th></tr></thead>
    <tbody>
      <tr><td>Digital</td><td>0 ou 1 — variação discreta</td><td>Sensores fim de curso, CLPs</td></tr>
      <tr><td>4–20 mA</td><td>Corrente proporcional — padrão de campo</td><td>Transmissores industriais</td></tr>
      <tr><td>HART</td><td>Digital sobre 4–20 mA</td><td>Diagnóstico remoto simultâneo</td></tr>
      <tr><td>PROFIBUS / FF</td><td>Rede digital industrial</td><td>Plantas modernas integradas</td></tr>
    </tbody></table>
    <div class="alert ag" style="margin-top:8px">4–20 mA: sinal de corrente não degrada com distância. Abaixo de 4 mA = fio partido (falha detectável). 4 mA = 0% · 20 mA = 100%.</div>
  </div>

  <div class="blk">
    <h3>As 4 Variáveis de Processo Principais</h3>
    <p>Segundo a norma <strong style="color:var(--p)">ANSI/ISA-5.1</strong> e as apostilas do <strong style="color:var(--p)">SENAI-RJ</strong>, as variáveis físicas mais medidas em processos industriais contínuos são <strong style="color:var(--p)">Pressão, Nível, Vazão e Temperatura</strong>. Cada uma representa uma forma de transferência de energia no processo.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:14px">
      <div style="background:var(--bg);border:2px solid rgba(0,212,255,0.25);border-radius:10px;padding:16px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.3);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:14px;font-weight:600;color:var(--p);flex-shrink:0">P</div>
          <div><div style="font-size:14px;font-weight:600;color:var(--p)">Pressão</div><div style="font-size:10px;color:var(--t3);font-family:var(--fm)">ISA letra: P</div></div>
        </div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Força exercida por um fluido sobre uma superfície por unidade de área. Mede a "intensidade" com que o fluido empurra as paredes da tubulação ou vaso. Unidade base: Pascal (Pa) = N/m².</p>
        <div style="font-size:11px;color:var(--t3);margin-top:8px;padding-top:8px;border-top:1px solid var(--bd)">Instrumentos: manômetro, transmissor PT, pressostato, transmissor ΔP</div>
        <button class="btn btn-p" onclick="S('pressao')" style="margin-top:8px;padding:5px 12px;font-size:11px;width:100%">Ver módulo completo →</button>
      </div>
      <div style="background:var(--bg);border:2px solid rgba(0,255,157,0.25);border-radius:10px;padding:16px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:rgba(0,255,157,0.12);border:1px solid rgba(0,255,157,0.3);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:14px;font-weight:600;color:var(--g);flex-shrink:0">L</div>
          <div><div style="font-size:14px;font-weight:600;color:var(--g)">Nível</div><div style="font-size:10px;color:var(--t3);font-family:var(--fm)">ISA letra: L (Level)</div></div>
        </div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Altura ou quantidade de líquido, sólido ou gás em um recipiente. Indica o estoque disponível e o tempo de residência no processo. Medido em metros, percentual ou mmH₂O.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:8px;padding-top:8px;border-top:1px solid var(--bd)">Instrumentos: transmissor LT, radar FMCW, ultrassom, pressão diferencial</div>
        <button class="btn btn-g" onclick="S('nivel')" style="margin-top:8px;padding:5px 12px;font-size:11px;width:100%">Ver módulo completo →</button>
      </div>
      <div style="background:var(--bg);border:2px solid rgba(255,192,64,0.25);border-radius:10px;padding:16px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:rgba(255,192,64,0.12);border:1px solid rgba(255,192,64,0.3);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:14px;font-weight:600;color:var(--y);flex-shrink:0">F</div>
          <div><div style="font-size:14px;font-weight:600;color:var(--y)">Vazão</div><div style="font-size:10px;color:var(--t3);font-family:var(--fm)">ISA letra: F (Flow)</div></div>
        </div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Volume ou massa de fluido que passa por uma seção da tubulação por unidade de tempo. Governa quanto material entra ou sai de um processo. Unidades: m³/h, kg/h, L/min.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:8px;padding-top:8px;border-top:1px solid var(--bd)">Instrumentos: transmissor FT, placa de orifício, medidor Coriolis, eletromagnético</div>
        <button class="btn btn-y" onclick="S('vazao')" style="margin-top:8px;padding:5px 12px;font-size:11px;width:100%">Ver módulo completo →</button>
      </div>
      <div style="background:var(--bg);border:2px solid rgba(192,132,255,0.25);border-radius:10px;padding:16px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:rgba(192,132,255,0.12);border:1px solid rgba(192,132,255,0.3);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:14px;font-weight:600;color:var(--pu);flex-shrink:0">T</div>
          <div><div style="font-size:14px;font-weight:600;color:var(--pu)">Temperatura</div><div style="font-size:10px;color:var(--t3);font-family:var(--fm)">ISA letra: T (Temperature)</div></div>
        </div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Grandeza que representa o grau de agitação das moléculas de uma substância — sua energia cinética interna. Controla reações, propriedades de materiais e segurança. Unidades: °C, K, °F.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:8px;padding-top:8px;border-top:1px solid var(--bd)">Instrumentos: transmissor TT, termopar (TC), PT100 (RTD), termistor</div>
        <div style="font-size:11px;color:rgba(192,132,255,0.5);margin-top:6px;font-style:italic">Módulo em desenvolvimento</div>
      </div>
    </div>
  </div>

  <div class="blk">
    <h3>Como cada variável se relaciona com a energia no processo?</h3>
    <p>Segundo o <strong style="color:var(--p)">Portal da Indústria / Eletrobrás (2008)</strong>, o papel da instrumentação é transformar grandezas físicas em informações utilizáveis para controle. Cada variável carrega um tipo específico de energia:</p>
    <table class="tbl"><thead><tr><th>Variável</th><th>Tipo de energia</th><th>O que ela controla no processo</th></tr></thead>
    <tbody>
      <tr><td style="color:var(--p)">Pressão</td><td>Energia de pressão (P×V)</td><td>Integridade estrutural, reações a alta pressão, transporte de fluidos</td></tr>
      <tr><td style="color:var(--g)">Nível</td><td>Energia potencial gravitacional (m×g×h)</td><td>Estoque de produto, tempo de residência, segurança operacional</td></tr>
      <tr><td style="color:var(--y)">Vazão</td><td>Energia cinética + transporte de massa</td><td>Dosagem de reagentes, balanço de massa, faturamento de utilidades</td></tr>
      <tr><td style="color:var(--pu)">Temperatura</td><td>Energia interna (calor)</td><td>Reações químicas, propriedades físicas, segurança em processos exotérmicos</td></tr>
    </tbody></table>
  </div>
</div>

<div class="screen" id="screen-m2">
  <div class="h1">Malha de Controle</div><div class="sub">Módulo 02</div>
  <div class="blk"><h3>Malha Aberta vs. Fechada</h3>
    <table class="tbl"><thead><tr><th>Tipo</th><th>Realimentação</th><th>Correção automática</th><th>Exemplo</th></tr></thead>
    <tbody>
      <tr><td>Aberta</td><td>Não</td><td>Não</td><td>Timer de irrigação fixo</td></tr>
      <tr><td>Fechada</td><td>Sim (feedback)</td><td>Sim</td><td>Controle de temperatura, nível</td></tr>
    </tbody></table>
  </div>
  <div class="blk"><h3>Classificação por Função (ISA-5.1)</h3>
    <table class="tbl"><thead><tr><th>Instrumento</th><th>Sigla</th><th>Função</th><th>Exemplo</th></tr></thead>
    <tbody>
      <tr><td>Sensor/Elemento primário</td><td>TE, PE, FE</td><td>Detecta a grandeza</td><td>Termopar, tubo de Pitot</td></tr>
      <tr><td>Transmissor</td><td>TT, PT, FT, LT</td><td>Converte e transmite 4–20 mA</td><td>Rosemount 3051</td></tr>
      <tr><td>Controlador</td><td>TC, PC, FC, LC</td><td>Calcula e comanda</td><td>CLP, controlador PID</td></tr>
      <tr><td>Elemento final</td><td>TV, FV, LV</td><td>Executa a ação</td><td>Válvula de controle</td></tr>
    </tbody></table>
  </div>
  <div class="blk"><h3>Ação PID</h3>
    <div class="grid g3" style="margin-top:8px">
      <div class="hl hl-p"><div class="hl-hdr">P — Proporcional</div><p>Age proporcional ao erro atual. Rápido, mas deixa offset residual.</p></div>
      <div class="hl hl-g"><div class="hl-hdr">I — Integral</div><p>Acumula o erro no tempo. Elimina o offset lentamente.</p></div>
      <div class="hl hl-y"><div class="hl-hdr">D — Derivativo</div><p>Reage à velocidade de mudança. Antecipa variações.</p></div>
    </div>
  </div>
</div>

<div class="screen" id="screen-m3">
  <div class="h1">Instrumentação</div><div class="sub">Módulo 03</div>
  <div class="blk"><h3>Range, LRV, URV e Span</h3>
    <table class="tbl"><thead><tr><th>Termo</th><th>Significado</th><th>Sensor 0–10 bar</th><th>Re-range 2–8 bar</th></tr></thead>
    <tbody>
      <tr><td>LRV</td><td>Limite inferior</td><td>0 bar</td><td>2 bar</td></tr>
      <tr><td>URV / FS</td><td>Limite superior</td><td>10 bar</td><td>8 bar</td></tr>
      <tr><td>Span</td><td>Amplitude calibrada</td><td>10 bar</td><td>6 bar</td></tr>
    </tbody></table>
  </div>
  <div class="blk"><h3>Características Metrológicas</h3>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Resolução</span><span class="xa">›</span></div><div class="xbody">Menor variação detectável. Sensor de 0,01 bar só detecta mudanças ≥ 0,01 bar.</div></div>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Acurácia vs. Precisão</span><span class="xa">›</span></div><div class="xbody"><strong style="color:var(--p)">Acurácia</strong> = quão próximo do valor real. <strong style="color:var(--g)">Precisão</strong> = capacidade de repetir a mesma leitura. Um instrumento pode ser preciso (repete sempre) mas não acurado (o valor repetido está errado = offset).</div></div>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Linearidade e Histerese</span><span class="xa">›</span></div><div class="xbody"><strong style="color:var(--p)">Linearidade</strong>: desvio máximo da curva real em relação à reta ideal. <strong style="color:var(--y)">Histerese</strong>: diferença de leitura para o mesmo ponto ao subir vs. ao descer. Causada por folgas mecânicas.</div></div>
  </div>
</div>

<div class="screen" id="screen-m4">
  <div class="h1">Erros de Medição</div><div class="sub">Módulo 04</div>
  <div class="blk"><h3>Resumo de Fórmulas de Erro</h3>
    <table class="tbl"><thead><tr><th>Tipo</th><th>Fórmula</th><th>Denominador</th><th>Quando usar</th></tr></thead>
    <tbody>
      <tr><td>Absoluto (EA)</td><td>Indicado − Real</td><td>—</td><td>Erro em unidade de engenharia</td></tr>
      <tr><td>Relativo (ER)</td><td>EA / Real</td><td>Valor real</td><td>Comparação adimensional</td></tr>
      <tr><td>% Leitura</td><td>(EA/Real)×100</td><td>Valor medido</td><td>Erro relativo ao ponto</td></tr>
      <tr><td>% FS</td><td>(EA/FS)×100</td><td>URV (fundo de escala)</td><td>Comparar com catálogo</td></tr>
      <tr><td>% Span</td><td>(EA/Span)×100</td><td>Span ajustado</td><td>Instrumento re-rangeado</td></tr>
    </tbody></table>
    <div class="alert aw" style="margin-top:8px">Atenção: mesmo EA gera % diferentes conforme o denominador! EA=0,12 · Real=6 · FS=10 → 2,0% leitura ≠ 1,2% FS.</div>
  </div>
  <div class="blk"><h3>Calibração</h3><ul>
    <li>Ajuste de zero: desloca a curva verticalmente — corrige offset</li>
    <li>Ajuste de span: inclina a curva — corrige o ganho do instrumento</li>
    <li>Calibração rastreável ao INMETRO gera certificado com incerteza de medição</li>
  </ul></div>
</div>

<!-- ══════════════════════════════════════════════
     PRESSÃO — Módulo 05 — Conteúdo Completo
══════════════════════════════════════════════ -->
<div class="screen" id="screen-pressao">
  <div class="h1">Pressão</div>
  <div class="sub">Módulo 05 · Variável de Processo · Fonte: SENAI-RJ, IFRN, ISA, Eletrobrás/Portal da Indústria</div>

  <!-- 1. DEFINIÇÃO -->
  <div class="blk">
    <h3>O que é Pressão?</h3>
    <p>Segundo a apostila do <strong style="color:var(--p)">SENAI-RJ</strong>, pressão é definida como a <em>força exercida perpendicularmente sobre uma superfície por unidade de área</em>. É uma das variáveis de processo mais medidas e controladas na indústria.</p>
    <p style="margin-top:8px">Em termos físicos, pressão representa a <strong style="color:var(--p)">energia mecânica distribuída por unidade de área</strong>. Ela surge sempre que um fluido — líquido, gás ou vapor — entra em contato com uma superfície ou com outro fluido.</p>
    <div style="background:var(--bg);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:12px 16px;font-family:var(--fm);font-size:20px;font-weight:600;margin:12px 0;letter-spacing:.5px">
      <span style="color:var(--p)">P</span> = <span style="color:var(--y)">F</span> / <span style="color:var(--g)">A</span>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:4px">
      <tr><td style="padding:6px 10px;border-bottom:1px solid var(--bd);font-family:var(--fm);font-size:14px;font-weight:600;color:var(--p);width:50px">P</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500;width:120px">Pressão</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-family:var(--fm);font-size:11px;width:130px">Pa (Pascal) = N/m²</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">O resultado — quanto de força por área</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid var(--bd);font-family:var(--fm);font-size:14px;font-weight:600;color:var(--y)">F</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500">Força</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-family:var(--fm);font-size:11px">N (Newton)</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">Força aplicada perpendicularmente à superfície</td></tr>
      <tr><td style="padding:6px 10px;font-family:var(--fm);font-size:14px;font-weight:600;color:var(--g)">A</td><td style="padding:6px 10px;color:var(--t1);font-weight:500">Área</td><td style="padding:6px 10px;color:var(--t3);font-family:var(--fm);font-size:11px">m²</td><td style="padding:6px 10px;color:var(--t3);font-size:12px">Área da superfície sobre a qual a força é aplicada</td></tr>
    </table>
    <div class="alert ai" style="margin-top:10px">1 Pascal é uma pressão muito pequena — equivale a uma folha de papel sobre 1 m². Por isso, na indústria usa-se bar (100.000 Pa) ou PSI. A pressão atmosférica ao nível do mar é 101.325 Pa ≈ 1,013 bar.</div>
  </div>

  <!-- 2. POR QUE MEDIR PRESSÃO -->
  <div class="blk">
    <h3>Por que a Pressão é medida e controlada?</h3>
    <p>De acordo com o <strong style="color:var(--p)">Guia de Instrumentação e Controle — Eletrobrás/IEL (2008)</strong>, controlar a pressão é fundamental para:</p>
    <div class="grid g2" style="margin-top:10px">
      <div class="hl hl-p"><div class="hl-hdr">Segurança</div><p>Vasos de pressão, caldeiras e tubulações com pressão acima do limite podem explodir. Pressostatos e transmissores de segurança (SIL) garantem operação dentro de limites seguros.</p></div>
      <div class="hl hl-g"><div class="hl-hdr">Qualidade do Produto</div><p>Pressão incorreta em reatores altera reações químicas e a composição do produto final. Na indústria alimentícia, pressão controla pasteurização e envase.</p></div>
      <div class="hl hl-y"><div class="hl-hdr">Eficiência Energética</div><p>Compressores e bombas consomem energia para gerar pressão. Controle preciso evita sobrepressão e desperdício energético — fundamental para redução de custos operacionais.</p></div>
      <div class="hl hl-pu"><div class="hl-hdr">Medição Indireta</div><p>Pressão é usada para medir indiretamente nível (coluna hidrostática) e vazão (pressão diferencial). Um transmissor de pressão pode substituir outros instrumentos.</p></div>
    </div>
  </div>

  <!-- 3. TIPOS DE PRESSÃO -->
  <div class="blk">
    <h3>Tipos de Pressão — diferenças fundamentais</h3>
    <div class="grid g2" style="margin-top:8px">
      <div class="hl hl-p"><div class="hl-hdr">Pressão Absoluta</div><p>Referência = vácuo perfeito (pressão zero absoluta). Usada em cálculos termodinâmicos e com gases. <br><strong style="color:var(--p)">P_abs = P_man + P_atm</strong></p></div>
      <div class="hl hl-g"><div class="hl-hdr">Pressão Manométrica (relativa)</div><p>Referência = pressão atmosférica local. É o que a maioria dos manômetros industriais indica. Um pneu a "2 bar" está a ~3 bar absoluto.<br><strong style="color:var(--g)">P_man = P_abs − P_atm</strong></p></div>
      <div class="hl hl-y"><div class="hl-hdr">Pressão Diferencial (ΔP)</div><p>Diferença entre dois pontos do processo. Usada para medir <strong style="color:var(--y)">vazão</strong> (placa de orifício) e <strong style="color:var(--y)">nível</strong> (coluna de líquido).<br><strong style="color:var(--y)">ΔP = P₁ − P₂</strong></p></div>
      <div class="hl hl-pu"><div class="hl-hdr">Vácuo (Pressão Negativa)</div><p>Pressão abaixo da atmosférica. Usada em sistemas de vácuo industrial, secagem, embalagem a vácuo e aplicações médicas.<br><strong style="color:var(--pu)">Vácuo = P_atm − P_abs</strong></p></div>
    </div>
    <div class="alert aw" style="margin-top:10px">Cuidado: um manômetro industrial que indica 0 bar não significa pressão zero absoluta — significa pressão igual à atmosférica! A pressão absoluta seria ~1,013 bar.</div>
  </div>

  <!-- 4. UNIDADES -->
  <div class="blk">
    <h3>Unidades de Pressão e Conversões</h3>
    <table class="tbl"><thead><tr><th>Unidade</th><th>Equiv. em Pa</th><th>Equiv. em bar</th><th>Contexto industrial</th></tr></thead>
    <tbody>
      <tr><td>Pascal (Pa)</td><td>1 Pa</td><td>10⁻⁵</td><td>Unidade SI — usada em cálculos científicos e normas técnicas</td></tr>
      <tr><td>kPa</td><td>1.000 Pa</td><td>0,01</td><td>Instrumentação leve, transmissores de baixa pressão</td></tr>
      <tr><td><strong style="color:var(--p)">Bar</strong></td><td>100.000 Pa</td><td>1</td><td><strong style="color:var(--p)">Padrão na indústria brasileira</strong> — processo, pneumática, hidráulica</td></tr>
      <tr><td>PSI</td><td>6.894,76 Pa</td><td>0,0689</td><td>Sistema imperial (EUA, setor de petróleo e gás)</td></tr>
      <tr><td>kgf/cm²</td><td>98.066,5 Pa</td><td>0,981</td><td>Ainda encontrado em plantas antigas do Brasil</td></tr>
      <tr><td>ATM</td><td>101.325 Pa</td><td>1,013</td><td>Referência da pressão atmosférica padrão</td></tr>
      <tr><td>mmHg (Torr)</td><td>133,32 Pa</td><td>0,00133</td><td>Sistemas de vácuo industrial, medicina (pressão arterial)</td></tr>
      <tr><td>mH₂O (mCA)</td><td>9.806,65 Pa</td><td>≈0,098</td><td>Medição de nível por coluna d'água, redes de distribuição</td></tr>
    </tbody></table>
    <div class="alert ag" style="margin-top:8px">Conversão rápida para o dia a dia: 1 bar ≈ 10 mH₂O ≈ 14,5 PSI ≈ 100 kPa. Pressão atmosférica ≈ 1 bar ≈ 10 m de coluna d'água.</div>
  </div>

  <!-- 5. APLICAÇÕES INDUSTRIAIS -->
  <div class="blk">
    <h3>Pressão nas indústrias — onde ela aparece?</h3>
    <table class="tbl"><thead><tr><th>Setor</th><th>Aplicação</th><th>Faixa típica</th><th>Por que é crítica?</th></tr></thead>
    <tbody>
      <tr><td>Petroquímica</td><td>Reatores e vasos de processo</td><td>10–200 bar</td><td>Reações em alta P e T — superpressão = explosão</td></tr>
      <tr><td>Caldeiras a vapor</td><td>Geração de vapor industrial</td><td>10–80 bar</td><td>Segurança estrutural e eficiência na geração de energia</td></tr>
      <tr><td>Pneumática</td><td>Atuadores e válvulas</td><td>4–10 bar</td><td>Força de atuação de cilindros e posicionadores</td></tr>
      <tr><td>Abastecimento de água</td><td>Redes de distribuição</td><td>10–50 mCA</td><td>Pressão baixa = sem água; alta = rompimento de tubulações</td></tr>
      <tr><td>Alimentícia</td><td>Envase, pasteurização, CIP</td><td>1–6 bar</td><td>Qualidade e segurança microbiológica do produto</td></tr>
      <tr><td>Farmacêutica</td><td>Salas limpas, biorreatores</td><td>0–3 bar / vácuo</td><td>Contraminação por gradiente de pressão entre salas</td></tr>
    </tbody></table>
  </div>

  <!-- 6. PRINCÍPIOS FÍSICOS -->
  <div class="blk">
    <h3>Princípios físicos fundamentais da pressão</h3>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Princípio de Pascal — pressão transmitida igualmente</span><span class="xa">›</span></div><div class="xbody">Uma pressão aplicada a um fluido confinado transmite-se integralmente e igualmente em todas as direções. Base do funcionamento de freios hidráulicos, elevadores hidráulicos e prensas. Exemplo: macaco hidráulico levanta toneladas com pequena força porque amplifica a pressão através da diferença de área dos pistões.</div></div>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Princípio de Stevin — pressão hidrostática</span><span class="xa">›</span></div><div class="xbody"><strong style="color:var(--p)">ΔP = ρ × g × h</strong><br>A pressão num ponto de um líquido depende apenas da profundidade (h), da densidade (ρ) e da gravidade (g) — independe da forma do recipiente. Pontos na mesma altitude têm a mesma pressão. Base da medição de nível por pressão.</div></div>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Princípio de Bernoulli — pressão e velocidade</span><span class="xa">›</span></div><div class="xbody"><strong style="color:var(--p)">P_total = P_estática + ½ρv²</strong><br>Em um fluido em movimento, quando a velocidade aumenta, a pressão estática diminui (e vice-versa). A energia total do fluido se conserva. Base da medição de vazão por pressão diferencial — placa de orifício, Venturi, tubo de Pitot.</div></div>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Princípio de Arquimedes — empuxo e nível</span><span class="xa">›</span></div><div class="xbody">Um corpo imerso em fluido sofre um empuxo vertical para cima igual ao peso do fluido deslocado. Na medição de nível, sensores de empuxo (boias e deslocadores) usam esse princípio — quanto mais submerso, maior o empuxo, indicando maior nível.</div></div>
  </div>

  <!-- 7. INSTRUMENTOS -->
  <div class="blk">
    <h3>Principais instrumentos de medição de pressão</h3>
    <table class="tbl"><thead><tr><th>Instrumento</th><th>Princípio</th><th>Faixa</th><th>Características</th></tr></thead>
    <tbody>
      <tr><td>Manômetro de Bourdon</td><td>Deformação mecânica de tubo curvo</td><td>0,5–1.000 bar</td><td>Sem energia elétrica, robusto, barato. Indicação local.</td></tr>
      <tr><td>Transmissor piezoresistivo</td><td>Strain gauge em diafragma</td><td>0–700 bar</td><td>Saída 4–20 mA. Padrão industrial atual (Rosemount 3051, Yokogawa EJA)</td></tr>
      <tr><td>Sensor capacitivo</td><td>Variação de capacitância no diafragma</td><td>0–700 bar</td><td>Alta precisão, baixa deriva térmica. Transmissores smart</td></tr>
      <tr><td>Pressostato</td><td>Chave mecânica por deformação</td><td>—</td><td>Sinal digital (liga/desliga). Usado em alarmes e intertravamentos</td></tr>
      <tr><td>Transmissor de ΔP</td><td>Dois diafragmas + célula sensor</td><td>0–10 mbar a 700 bar</td><td>Mede diferença de pressão. Usado em medição de vazão e nível</td></tr>
    </tbody></table>
  </div>

  <div class="blk">
    <h3>Elementos Mecânicos para Medição de Pressão</h3>
    <p>Segundo o PPT SENAI MVFI (slides 19–32), os principais elementos primários mecânicos são:</p>
    <div class="grid g3" style="margin-top:10px">
      <div style="background:var(--bg4);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--p);margin-bottom:6px">Tubo de Bourdon</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Tubo metálico curvo com seção elíptica. Ao aplicar pressão interna, a seção tende a tornar-se circular → tubo se endireita → movimento amplificado pelo sistema de alavancas move o ponteiro.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Formatos: C (mais comum), espiral (maior sensibilidade), helicoidal (alta pressão)</div>
        <div style="font-size:11px;color:var(--t3)">Faixa: 0,5 até 10.000 bar · Sem energia elétrica</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(0,255,157,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--g);margin-bottom:6px">Diafragma</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Membrana metálica flexível (plana ou corrugada) que se deforma proporcionalmente à pressão aplicada. O deslocamento é convertido em sinal elétrico (piezoresistivo, capacitivo) ou mecânico.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Ideal para baixas pressões, pastas e fluidos viscosos ou corrosivos</div>
        <div style="font-size:11px;color:var(--t3)">Faixa: 0 até 700 bar · Base dos transmissores modernos</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(255,192,64,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--y);margin-bottom:6px">Fole (Bellows)</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Elemento acordeão metálico que se expande/comprime axialmente com a pressão. Alta sensibilidade para baixas pressões e pressão diferencial.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Aplicação: pressão diferencial, manômetros de baixa pressão, transmissores pneumáticos</div>
        <div style="font-size:11px;color:var(--t3)">Faixa: vacúo até ~10 bar</div>
      </div>
    </div>
    <table class="tbl" style="margin-top:12px"><thead><tr><th>Elemento</th><th>Faixa típica</th><th>Princípio</th><th>Aplicação ideal</th></tr></thead>
    <tbody>
      <tr><td style="color:var(--p)">Bourdon (C)</td><td>0,5–700 bar</td><td>Deformação tubo curvo</td><td>Pressão de processo geral — manômetros locais</td></tr>
      <tr><td style="color:var(--p)">Bourdon espiral</td><td>0–10 bar</td><td>Maior deflexão, mais sensível</td><td>Baixas pressões, registradores</td></tr>
      <tr><td style="color:var(--p)">Bourdon helicoidal</td><td>0–10.000 bar</td><td>Múltiplas espiras acumulam força</td><td>Ultra-alta pressão, hidráulica</td></tr>
      <tr><td style="color:var(--g)">Diafragma plano</td><td>0–700 bar</td><td>Flexão de membrana</td><td>Transmissores eletrônicos, fluidos corrosivos</td></tr>
      <tr><td style="color:var(--g)">Diafragma corrugado</td><td>0–0,5 bar</td><td>Maior área = mais sensível</td><td>Baixas pressões, medição de ΔP</td></tr>
      <tr><td style="color:var(--y)">Fole</td><td>0–10 bar</td><td>Expansão/compressão axial</td><td>Baixa pressão, ΔP, pneumática</td></tr>
    </tbody></table>
  </div>

  <div class="blk">
    <h3>Chaves de Pressão (Pressostatos)</h3>
    <p>Instrumentos que geram um sinal digital (liga/desliga) quando a pressão atinge um valor pré-determinado (set point). Não transmitem o valor — apenas sinalizam ultrapassagem do limite.</p>
    <div class="grid g2" style="margin-top:8px">
      <div class="hl hl-p"><div class="hl-hdr">Chave de Pressão Mecânica</div><p>Elemento sensor (Bourdon, diafragma, fole) aciona uma chave micro-switch ao atingir o set point. Robusto, sem energia, alta confiabilidade.</p></div>
      <div class="hl hl-g"><div class="hl-hdr">Pressostato Eletrônico</div><p>Sensor piezoresistivo + comparador eletrônico. Permite ajuste digital do set point, histerese programável e saída 4–20 mA simultânea com o contato digital.</p></div>
    </div>
    <div class="alert ay" style="margin-top:8px">Pressostatos são usados em malhas de segurança (alarme de alta pressão, desligamento de emergência). Em sistemas SIL, devem ser validados com certificação funcional.</div>
  </div>

  <div class="blk">
    <h3>Segurança na Medição de Pressão</h3>
    <div class="alert aw">
      <strong>Riscos críticos:</strong> rompimento de tubulações ou vasos sob alta pressão pode causar mortes e danos catastróficos. Superaquecimento de vapores em vasos sem saída representa risco imediato.
    </div>
    <ul style="margin-top:8px">
      <li><strong style="color:var(--r)">Válvula de segurança (PSV):</strong> abre automaticamente quando a pressão supera o limite — obrigatória em todos os vasos de pressão (NR-13)</li>
      <li><strong style="color:var(--r)">Disco de ruptura:</strong> componente sacrificial que rompe em excesso de pressão — usado onde PSV não é suficiente</li>
      <li>Nunca isolar completamente um vaso de pressão sem garantir que há alívio de pressão</li>
      <li>Manômetros devem ter escala de no mínimo 1,25× a pressão máxima de operação</li>
      <li>Usar manômetros com sifão em vapor para proteger o instrumento de altas temperaturas</li>
    </ul>
  </div>

  <div class="alert ai">As fórmulas visuais de Stevin, Bernoulli e P=F/A com diagramas detalhados estão em <button class="btn btn-p" onclick="S('formulas')" style="padding:4px 10px;font-size:12px">Fórmulas Visuais ★</button></div>

  <div class="blk" style="margin-top:12px">
    <h3>Calibração de Instrumentos de Pressão</h3>
    <p>A calibração de transmissores e manômetros de pressão segue o procedimento padrão do PPT SENAI MVFI com 5 pontos (0%, 25%, 50%, 75%, 100% do span) em sentido ascendente e descendente.</p>
    <div class="grid g2" style="margin-top:10px">
      <div style="background:var(--bg4);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:14px">
        <div style="font-size:12px;font-weight:600;color:var(--p);margin-bottom:8px">Padrões utilizados em pressão</div>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">›</span><strong>Manômetro padrão (deadweight tester):</strong> massas calibradas sobre pistão — precisão primária</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">›</span><strong>Calibrador portátil de pressão:</strong> gera pressão interna rastreável — referência de campo</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">›</span><strong>Manômetro de referência:</strong> classe 0,25% ou melhor — comparação de campo</li>
        </ul>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(0,255,157,0.2);border-radius:8px;padding:14px">
        <div style="font-size:12px;font-weight:600;color:var(--g);margin-bottom:8px">Procedimento simplificado</div>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--g)">1</span>Isolar o instrumento da linha de processo</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--g)">2</span>Conectar o padrão à tomada de pressão</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--g)">3</span>Aplicar 5 pontos — registrar saída (mA ou indicação)</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--g)">4</span>Calcular erros — ajustar zero e span se necessário</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--g)">5</span>Registrar As Left e emitir relatório</li>
        </ul>
      </div>
    </div>
    <div class="alert ay" style="margin-top:8px">Para transmissores de pressão diferencial (ΔP): sempre zerar o instrumento com as duas tomadas em equilíbrio (ao ar ou conectadas entre si) antes de aplicar os pontos de calibração.</div>
    <div style="text-align:center;margin-top:10px"><button class="btn btn-y" onclick="S('calibracao')" style="padding:6px 16px;font-size:12px">Ver Módulo Calibração completo →</button></div>
  </div>
</div>

<!-- ══════════════════════════════════════════════
     NÍVEL — Módulo 06 — Conteúdo Completo
══════════════════════════════════════════════ -->
<div class="screen" id="screen-nivel">
  <div class="h1">Nível</div>
  <div class="sub">Módulo 06 · Variável de Processo · Fonte: SENAI-RJ, IFRN, Eletrobrás/Portal da Indústria</div>

  <!-- 1. DEFINIÇÃO -->
  <div class="blk">
    <h3>O que é Nível?</h3>
    <p>Nível é a <strong style="color:var(--g)">grandeza física que representa a altura ou quantidade de uma substância</strong> — líquido, sólido granulado ou gás liquefeito — dentro de um recipiente, tanque ou reservatório.</p>
    <p style="margin-top:8px">Segundo a apostila <strong style="color:var(--g)">SENAI-RJ de Instrumentação Básica I</strong>, a medição de nível tem como objetivo principal determinar a posição da interface entre dois meios — geralmente a superfície de um líquido e o gás acima dela, ou a superfície de um sólido e o ar acima dele.</p>
    <div class="grid g3" style="margin-top:12px">
      <div class="hl hl-g"><div class="hl-hdr">Nível de Líquido</div><p>Mais comum. Água, óleo, combustível, produtos químicos, alimentos. Medido em metros, centímetros, percentual ou mmH₂O.</p></div>
      <div class="hl hl-y"><div class="hl-hdr">Nível de Sólido</div><p>Grãos, pó, cimento, carvão em silos e moegas. Instrumentação diferente — ultrassom, radar ou sensores capacitivos.</p></div>
      <div class="hl hl-pu"><div class="hl-hdr">Nível de Interface</div><p>Separação entre dois líquidos imiscíveis (óleo-água). Essencial em separadores de petróleo. Usa sensores de densidade ou capacitivos.</p></div>
    </div>
  </div>

  <!-- 2. POR QUE MEDIR NÍVEL -->
  <div class="blk">
    <h3>Por que o Nível é medido e controlado?</h3>
    <p>De acordo com o <strong style="color:var(--g)">Guia de Instrumentação — Eletrobrás/IEL (2008)</strong>, o controle de nível serve para três objetivos principais:</p>
    <div class="grid g3" style="margin-top:10px">
      <div class="hl hl-g"><div class="hl-hdr">Manter um valor fixo</div><p>Controle de nível em tanques de processo. O nível deve ser mantido no SP para garantir tempo de residência correto e continuidade do processo.</p></div>
      <div class="hl hl-y"><div class="hl-hdr">Controle On/Off (alto/baixo)</div><p>Alarmes de nível alto (transbordamento) e nível baixo (run-dry de bomba). Dois set points — a bomba liga quando o nível atinge o mínimo e desliga ao atingir o máximo.</p></div>
      <div class="hl hl-p"><div class="hl-hdr">Determinar quantidade</div><p>Controle de estoque e logística. Tanques de armazenamento de petróleo, combustíveis e matérias-primas. A leitura de nível, com a geometria do tanque, calcula o volume e a massa estocada.</p></div>
    </div>
    <div class="alert ag" style="margin-top:10px">Além desses objetivos, o nível é a variável de segurança mais crítica em caldeiras industriais: nível baixo demais = explosão catastrófica. Nível alto demais = dano severo a turbinas e equipamentos.</div>
  </div>

  <!-- 3. FÍSICA DO NÍVEL -->
  <div class="blk">
    <h3>A física do Nível — Equação de Balanço de Massa</h3>
    <p>A variação do nível num tanque é governada pelo balanço entre o que entra e o que sai:</p>
    <div style="background:var(--bg);border:1px solid rgba(0,255,157,0.2);border-radius:8px;padding:12px 16px;font-family:var(--fm);font-size:18px;font-weight:600;margin:12px 0">
      d<span style="color:var(--pu)">h</span>/dt = ( <span style="color:var(--g)">Q_entrada</span> − <span style="color:var(--r)">Q_saída</span> ) / <span style="color:var(--y)">A</span>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:10px">
      <tr><td style="padding:6px 10px;border-bottom:1px solid var(--bd);font-family:var(--fm);color:var(--pu);font-weight:600;width:80px">h</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500">Altura do nível</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">metros</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">A grandeza que queremos controlar</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid var(--bd);font-family:var(--fm);color:var(--g);font-weight:600">Q_in</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500">Vazão de entrada</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">m³/s</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">Fluxo que alimenta o tanque</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid var(--bd);font-family:var(--fm);color:var(--r);font-weight:600">Q_out</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500">Vazão de saída</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">m³/s</td><td style="padding:6px 10px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">Fluxo que sai do tanque</td></tr>
      <tr><td style="padding:6px 10px;font-family:var(--fm);color:var(--y);font-weight:600">A</td><td style="padding:6px 10px;color:var(--t1);font-weight:500">Área da seção do tanque</td><td style="padding:6px 10px;color:var(--t3);font-size:12px">m²</td><td style="padding:6px 10px;color:var(--t3);font-size:12px">Determina a velocidade de resposta do nível</td></tr>
    </table>
    <div class="grid g3" style="margin-top:4px">
      <div style="background:rgba(0,255,157,0.06);border:1px solid rgba(0,255,157,0.15);border-radius:8px;padding:12px;text-align:center"><div style="font-size:13px;color:var(--g);font-weight:600">Q_in > Q_out</div><div style="font-size:12px;color:var(--t3);margin-top:4px">Nível sobe ↑</div></div>
      <div style="background:rgba(255,85,102,0.06);border:1px solid rgba(255,85,102,0.15);border-radius:8px;padding:12px;text-align:center"><div style="font-size:13px;color:var(--r);font-weight:600">Q_in &lt; Q_out</div><div style="font-size:12px;color:var(--t3);margin-top:4px">Nível desce ↓</div></div>
      <div style="background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:8px;padding:12px;text-align:center"><div style="font-size:13px;color:var(--p);font-weight:600">Q_in = Q_out</div><div style="font-size:12px;color:var(--t3);margin-top:4px">Nível estável →</div></div>
    </div>
    <div class="alert ag" style="margin-top:10px">Tanque grande (A grande): nível muda lentamente — sistema fácil de controlar, lento para responder. Tanque pequeno (A pequeno): nível responde muito rápido — sistema pode se tornar instável se o controlador for mal ajustado.</div>
  </div>

  <!-- 4. NÍVEL POR PRESSÃO -->
  <div class="blk">
    <h3>Medição de Nível por Pressão — o método mais usado</h3>
    <p>Combinando Stevin com a medição de pressão, podemos calcular o nível indiretamente sem nenhum contato mecânico com o produto:</p>
    <div style="background:var(--bg);border:1px solid rgba(0,255,157,0.2);border-radius:8px;padding:12px 16px;font-family:var(--fm);font-size:18px;font-weight:600;margin:12px 0">
      <span style="color:var(--pu)">h</span> = <span style="color:var(--p)">P</span> / ( <span style="color:var(--g)">ρ</span> × <span style="color:var(--or)">g</span> )
    </div>
    <ul>
      <li>Um transmissor de pressão no <strong style="color:var(--g)">fundo do tanque</strong> mede a pressão hidrostática da coluna de líquido</li>
      <li>Com a densidade (ρ) conhecida, o CLP calcula a altura h em tempo real</li>
      <li>Para tanques pressurizados, usa-se <strong style="color:var(--g)">pressão diferencial</strong>: ΔP = P_fundo − P_topo cancela a pressão de gás acima do líquido</li>
      <li>Método simples, robusto, sem partes móveis — ideal para produtos corrosivos ou viscosos</li>
    </ul>
    <div class="alert ay" style="margin-top:8px">Atenção: se a densidade do produto variar (temperatura, concentração), o cálculo de nível por pressão ficará errado! Nesses casos, usa-se medidor de nível por radar ou ultrassom, que medem geometricamente.</div>
  </div>

  <!-- 5. MÉTODOS DE MEDIÇÃO -->
  <div class="blk">
    <h3>Métodos e Instrumentos de Medição de Nível</h3>
    <table class="tbl"><thead><tr><th>Método</th><th>Princípio físico</th><th>Vantagem</th><th>Limitação</th><th>Aplicação típica</th></tr></thead>
    <tbody>
      <tr><td>Régua / Visor de nível</td><td>Visual direto</td><td>Simples, sem energia</td><td>Leitura local, manual</td><td>Pequenos tanques, campo</td></tr>
      <tr><td>Boia + transmissor</td><td>Empuxo (Arquimedes)</td><td>Direto, preciso</td><td>Partes móveis desgastam</td><td>Caixas d'água, postos</td></tr>
      <tr><td><strong style="color:var(--g)">Pressão diferencial</strong></td><td>P = ρ×g×h (Stevin)</td><td>Sem contato, barato, confiável</td><td>Requer densidade constante</td><td>Indústria química, petroquímica</td></tr>
      <tr><td>Ultrassom</td><td>Tempo de eco sonoro</td><td>Sem contato com fluido</td><td>Espuma e vapores interferem</td><td>Água, grãos, resíduos</td></tr>
      <tr><td><strong style="color:var(--p)">Radar FMCW</strong></td><td>Frequência de eco (microondas)</td><td>Alta precisão, imune a vapor</td><td>Custo elevado</td><td>Petróleo, gás, tanques pressurizados</td></tr>
      <tr><td>Capacitivo</td><td>Variação de capacitância</td><td>Funciona com viscosos e pastas</td><td>Depende da permissividade do fluido</td><td>Indústria alimentícia, química</td></tr>
      <tr><td>Radioativo (nuclear)</td><td>Absorção de radiação gama</td><td>Sem contato, extremas condições</td><td>Regulamentação de radioproteção</td><td>Altos fornos, gases corrosivos</td></tr>
    </tbody></table>
  </div>

  <!-- 6. COMPORTAMENTO DINÂMICO -->
  <div class="blk">
    <h3>Comportamento Estático e Dinâmico do Nível</h3>
    <div class="grid g2" style="margin-top:8px">
      <div class="hl hl-p"><div class="hl-hdr">Nível Estático</div><p>Quando não há variações de nível no intervalo observado. O sistema está em equilíbrio: Q_entrada = Q_saída, ou ambos zero. Condição desejada no ponto de controle.</p></div>
      <div class="hl hl-y"><div class="hl-hdr">Nível Dinâmico</div><p>Quando há variações de nível no intervalo observado. Típico durante partida, parada ou perturbações no processo. O controlador atua para retornar ao SP.</p></div>
    </div>
  </div>

  <!-- 7. APLICAÇÕES -->
  <div class="blk">
    <h3>Nível nas indústrias — onde ele aparece?</h3>
    <table class="tbl"><thead><tr><th>Setor</th><th>Aplicação</th><th>Crítico porque…</th></tr></thead>
    <tbody>
      <tr><td>Geração de energia / Caldeiras</td><td>Nível d'água do gerador de vapor</td><td>Nível baixo = superaquecimento = explosão</td></tr>
      <tr><td>Petróleo e gás</td><td>Separadores trifásicos, tanques de petróleo</td><td>Transbordamento = contaminação ambiental e incêndio</td></tr>
      <tr><td>Saneamento</td><td>Reservatórios, caixas d'água, ETE</td><td>Nível baixo = falta de abastecimento; alto = transbordamento</td></tr>
      <tr><td>Indústria alimentícia</td><td>Tanques de leite, sucos, cervejas</td><td>Controle de estoque e continuidade do processo de envase</td></tr>
      <tr><td>Farmacêutica</td><td>Reatores, misturadores, tanques de API</td><td>Quantidade exata de ingrediente ativo para cada lote</td></tr>
      <tr><td>Química</td><td>Reatores, neutralizadores, scrubbers</td><td>Segurança operacional e qualidade da reação</td></tr>
    </tbody></table>
  </div>

  <div class="xb" onclick="X(this)"><div class="xh"><span>Por que o nível de caldeiras exige redundância tripla (2oo3)?</span><span class="xa">›</span></div><div class="xbody">Nível baixo → tubos de geração de vapor ficam expostos ao calor sem fluido para absorvê-lo → superaquecimento → ruptura catastrófica da caldeira (explosão). Nível alto → gotículas de água são arrastadas pelo vapor → chegam à turbina ou processos a vapor → choque térmico e erosão severa. Por isso usa-se lógica de votação 2oo3: três sensores independentes, e o sistema só confia na leitura se pelo menos dois concordarem. Se dois dizem "nível baixo", o terceiro (discordante) é ignorado.</div></div>
  <div class="xb" onclick="X(this)"><div class="xh"><span>O fenômeno Swell — por que o nível aparentemente sobe quando a pressão cai?</span><span class="xa">›</span></div><div class="xbody">Quando a demanda de vapor de uma caldeira aumenta repentinamente, a pressão interna cai. Com isso, bolhas de vapor se formam dentro da massa de água aquecida (fluxo de ebulição nucleada aumenta). Essas bolhas ocupam volume → a mistura água-vapor expande → o indicador de nível sobe. Mas a massa real de água está diminuindo! Se o controlador de nível "enxerga" o nível subindo, ele fecha a válvula de água de alimentação — o que é exatamente o oposto do que deveria fazer. Solução: controle 3-elementos — controla nível, mas considera também as vazões de entrada e saída de vapor para tomar a decisão correta.</div></div>

  <!-- INSTRUMENTOS DO PDF SENAI -->
  <div class="blk">
    <h3>Chaves de Nível (Level Switches)</h3>
    <p>Instrumentos que fornecem sinal digital (Liga/Desliga) ao atingir um nível pré-determinado. Não medem o valor contínuo — apenas detectam se o nível está acima ou abaixo do set point.</p>
    <div class="grid g3" style="margin-top:10px">
      <div style="background:var(--bg4);border:1px solid rgba(0,255,157,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--g);margin-bottom:6px">Chave de Boia (Float Switch)</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Boia flutuante ligada mecanicamente a uma chave. Quando o nível sobe/desce, a boia move a chave. Simples, robusto e sem energia elétrica no elemento sensor.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Uso: alarme de nível alto/baixo, controle de bombas, caixas d'água</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--p);margin-bottom:6px">Chave de Nível por Condutividade</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Dois eletrodos metálicos: quando o líquido condutor (água) toca ambos, fecha o circuito elétrico e aciona o sinal. Sem partes móveis — excelente confiabilidade.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Funciona apenas com fluidos condutores. Não funciona com hidrocarbonetos.</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(255,192,64,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--y);margin-bottom:6px">Chave de Nível Vibratório (Diapasão)</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Um garfo vibra em frequência ressonante no ar. Quando imerso no líquido, a frequência muda — isso aciona o sinal de nível. Funciona com líquidos, pastas e sólidos granulados.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Sem partes móveis. Imune a espuma, bolhas e turbulência. Alta confiabilidade.</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(255,85,102,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--r);margin-bottom:6px">Chave de Nível por Pressão</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Pressostato configurado para atuar quando a pressão hidrostática (ρ×g×h) atinge o valor correspondente ao nível desejado. Versatil e econômico — usa infraestrutura de pressão existente.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Requer densidade do fluido constante e conhecida.</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(192,132,255,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--pu);margin-bottom:6px">Chave de Nível por Capacitância</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Um eletrodo forma capacitor com as paredes do tanque. A capacitância muda quando o fluido (dielétrico diferente do ar) cobre o eletrodo — isso aciona o sinal.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Funciona com líquidos, sólidos e materiais com aderência. Sensível à variação do produto.</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(255,144,64,0.2);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--or);margin-bottom:6px">Chave de Nível Magnética</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Boia com imã interno sobe/desce no líquido. Quando o imã passa por um reed switch externo ao tanque, aciona o contato. Isolamento total entre fluido e circuito elétrico.</p>
        <div style="font-size:11px;color:var(--t3);margin-top:6px">Ideal para fluidos tóxicos, pressurizados ou corrosivos. Certificação ATEX disponível.</div>
      </div>
    </div>
    <div class="alert ay" style="margin-top:10px">Chaves de nível são frequentemente usadas em malhas de segurança (alarme alto/baixo, desligamento de bombas). Em sistemas SIL, devem ser do tipo "Fail-Safe" — atuam na falha de energia.</div>
  </div>

  <div class="blk">
    <h3>Transmissores de Nível — Visão Comparativa</h3>
    <table class="tbl"><thead><tr><th>Tecnologia</th><th>Princípio</th><th>Saída</th><th>Melhor para</th><th>Limitação</th></tr></thead>
    <tbody>
      <tr><td style="color:var(--g)">Pressão diferencial</td><td>P = ρ×g×h</td><td>4–20 mA / HART</td><td>Tanques abertos e fechados, qualquer líquido</td><td>Requer ρ constante, pernas de impulso</td></tr>
      <tr><td>Boia + transmissor</td><td>Empuxo / posição</td><td>4–20 mA</td><td>Líquidos limpos, caixas d'água</td><td>Partes móveis, manutenção periódica</td></tr>
      <tr><td style="color:var(--p)">Ultrassom (TDR/pulso)</td><td>Tempo de eco sonoro</td><td>4–20 mA / HART</td><td>Sólidos e líquidos sem contato</td><td>Espuma, vapores e turbulência interferem</td></tr>
      <tr><td style="color:var(--p)">Radar FMCW</td><td>Frequência de eco (GHz)</td><td>4–20 mA / HART / FF</td><td>Alta precisão, presença de vapores, alta T/P</td><td>Custo elevado, setup complexo</td></tr>
      <tr><td>Capacitivo</td><td>Variação de capacitância</td><td>4–20 mA</td><td>Viscosos, pastas, sólidos</td><td>Depende da constante dielétrica do produto</td></tr>
      <tr><td>Laser</td><td>Tempo de voo de pulso laser</td><td>4–20 mA</td><td>Sólidos em silos, alta precisão (mm)</td><td>Poeira, janelas sujas interferem</td></tr>
      <tr><td style="color:var(--or)">Guided Wave Radar (GWR)</td><td>TDR guiado por sonda</td><td>4–20 mA / HART</td><td>Espuma, baixa refletividade, interface L-L</td><td>Sonda sujeita a incrustações</td></tr>
    </tbody></table>
  </div>

  <div class="blk">
    <h3>Segurança na Medição de Nível</h3>
    <ul>
      <li><strong style="color:var(--r)">Nunca remover um transmissor pressurizado</strong> sem isolar e despressurizar a linha primeiro — risco de jato de fluido quente/tóxico</li>
      <li>Em tanques com produtos inflamáveis: usar instrumentos com certificação ATEX/IECEx (Ex d, Ex ia)</li>
      <li>Transmissores de nível em caldeiras devem ter redundância mínima (2 sensores independentes)</li>
      <li>Verificar a pressão de referência (perna úmida/seca) nos transmissores de pressão diferencial antes da calibração</li>
    </ul>
  </div>

  <div class="alert ai" style="margin-top:10px">A equação de balanço de massa e Torricelli com diagramas detalhados estão em <button class="btn btn-p" onclick="S('formulas')" style="padding:4px 10px;font-size:12px">Fórmulas Visuais ★</button></div>

  <div class="blk" style="margin-top:12px">
    <h3>Calibração de Instrumentos de Nível</h3>
    <p>A calibração de transmissores de nível depende do método de medição utilizado. Os mais calibrados em campo são os transmissores de pressão diferencial.</p>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Calibração de LT por Pressão Diferencial (ΔP)</span><span class="xa">›</span></div>
    <div class="xbody">
      <ul>
        <li><strong style="color:var(--g)">0% (nível mínimo):</strong> com o tanque vazio ou perna de referência igualada, a saída deve ser 4 mA. Ajustar o zero se necessário.</li>
        <li><strong style="color:var(--g)">100% (nível máximo):</strong> aplicar pressão equivalente a 100% do span hidrostático (ρ×g×h_max) na tomada de alta. Saída deve ser 20 mA. Ajustar span.</li>
        <li>Para perna úmida (wet leg): descontar a pressão estática da coluna de referência no cálculo do span.</li>
        <li>Verificar se a densidade do fluido de processo e de referência estão nas condições de calibração.</li>
      </ul>
    </div></div>
    <div class="xb" onclick="X(this)"><div class="xh"><span>Calibração de LT por Ultrassom e Radar</span><span class="xa">›</span></div>
    <div class="xbody">
      <ul>
        <li>Configurar a distância mínima (0% = nível mínimo — geralmente o fundo ou o empty distance)</li>
        <li>Configurar a distância máxima (100% = nível cheio — span do tanque)</li>
        <li>Verificar o eco: usar refletor plano ou nível real como referência para ajuste do gain</li>
        <li>Radar: mapear ecos falsos (false echoes / blocking distance) gerados por agitadores, bocais e internos do tanque</li>
      </ul>
      <div class="alert ag" style="margin-top:6px">Radar e ultrassom são calibrados em distância (metros), não em pressão. O transmissor converte distância→nível usando a altura total do tanque configurada.</div>
    </div></div>
    <div style="text-align:center;margin-top:10px"><button class="btn btn-g" onclick="S('calibracao')" style="padding:6px 16px;font-size:12px">Ver Módulo Calibração completo →</button></div>
  </div>
</div>

<!-- ══════════════════════════════════════════════
     VAZÃO — Módulo 07 — Conteúdo Completo
══════════════════════════════════════════════ -->
<div class="screen" id="screen-vazao">
  <div class="h1">Vazão</div>
  <div class="sub">Módulo 07 · Variável de Processo · Fonte: SENAI-RJ, IFRN, IESA Automação, ISA</div>

  <!-- 1. DEFINIÇÃO -->
  <div class="blk">
    <h3>O que é Vazão?</h3>
    <p>Segundo a apostila <strong style="color:var(--y)">IFRN — Instrumentação Básica II (SENAI)</strong>, vazão é definida como a <em>quantidade volumétrica ou mássica de fluido que passa por uma seção transversal de uma tubulação ou canal por unidade de tempo</em>.</p>
    <p style="margin-top:8px">É a variável de processo que <strong style="color:var(--y)">requer os recursos tecnológicos mais diversos</strong> para sua idealização e fabricação de medidores e transmissores — existem mais de 10 princípios físicos diferentes utilizados comercialmente para medir vazão.</p>
    <div class="grid g2" style="margin-top:12px">
      <div style="background:var(--bg);border:1px solid rgba(255,192,64,0.2);border-radius:8px;padding:14px">
        <div style="font-family:var(--fm);font-size:20px;font-weight:600;margin-bottom:10px"><span style="color:var(--y)">Qv</span> = <span style="color:var(--g)">S</span> × <span style="color:var(--p)">v</span></div>
        <div style="font-size:12px;color:var(--t3);margin-bottom:8px;font-weight:600;color:var(--y)">Vazão Volumétrica</div>
        <table style="width:100%;font-size:12px;border-collapse:collapse">
          <tr><td style="padding:3px 6px;font-family:var(--fm);color:var(--y);font-weight:600;width:35px">Qv</td><td style="padding:3px 6px;color:var(--t1)">Vazão volumétrica</td><td style="padding:3px 6px;color:var(--t3);font-family:var(--fm);font-size:10px">m³/s, m³/h, L/min</td></tr>
          <tr><td style="padding:3px 6px;font-family:var(--fm);color:var(--g);font-weight:600">S</td><td style="padding:3px 6px;color:var(--t1)">Seção transversal</td><td style="padding:3px 6px;color:var(--t3);font-family:var(--fm);font-size:10px">m² (área interna do tubo)</td></tr>
          <tr><td style="padding:3px 6px;font-family:var(--fm);color:var(--p);font-weight:600">v</td><td style="padding:3px 6px;color:var(--t1)">Velocidade do fluido</td><td style="padding:3px 6px;color:var(--t3);font-family:var(--fm);font-size:10px">m/s (velocidade média)</td></tr>
        </table>
        <div style="font-size:11px;color:var(--t3);margin-top:8px">Muda com temperatura e pressão em gases — não é conservada em condições variáveis</div>
      </div>
      <div style="background:var(--bg);border:1px solid rgba(255,144,64,0.2);border-radius:8px;padding:14px">
        <div style="font-family:var(--fm);font-size:20px;font-weight:600;margin-bottom:10px"><span style="color:var(--or)">Qm</span> = <span style="color:var(--g)">ρ</span> × <span style="color:var(--y)">Qv</span></div>
        <div style="font-size:12px;font-weight:600;color:var(--or);margin-bottom:8px">Vazão Mássica</div>
        <table style="width:100%;font-size:12px;border-collapse:collapse">
          <tr><td style="padding:3px 6px;font-family:var(--fm);color:var(--or);font-weight:600;width:35px">Qm</td><td style="padding:3px 6px;color:var(--t1)">Vazão mássica</td><td style="padding:3px 6px;color:var(--t3);font-family:var(--fm);font-size:10px">kg/s, kg/h, t/h</td></tr>
          <tr><td style="padding:3px 6px;font-family:var(--fm);color:var(--g);font-weight:600">ρ</td><td style="padding:3px 6px;color:var(--t1)">Massa específica</td><td style="padding:3px 6px;color:var(--t3);font-family:var(--fm);font-size:10px">kg/m³ (densidade do fluido)</td></tr>
          <tr><td style="padding:3px 6px;font-family:var(--fm);color:var(--y);font-weight:600">Qv</td><td style="padding:3px 6px;color:var(--t1)">Vazão volumétrica</td><td style="padding:3px 6px;color:var(--t3);font-family:var(--fm);font-size:10px">m³/s</td></tr>
        </table>
        <div style="font-size:11px;color:var(--t3);margin-top:8px"><strong style="color:var(--g)">Não muda com T e P</strong> — preferida para gases, vapores e controle de processo químico</div>
      </div>
    </div>
  </div>

  <!-- 2. POR QUE MEDIR VAZÃO -->
  <div class="blk">
    <h3>Por que a Vazão é medida e controlada?</h3>
    <div class="grid g2" style="margin-top:10px">
      <div class="hl hl-y"><div class="hl-hdr">Controle de Processo</div><p>Razão entre reagentes A e B define a estequiometria de reações químicas. Controlar a vazão de cada componente garante qualidade e segurança da reação.</p></div>
      <div class="hl hl-g"><div class="hl-hdr">Medição de Consumo</div><p>Faturamento de energia (vapor, gás, água industrial). Cada m³ ou kg de fluido tem custo. Erros de medição de vazão representam prejuízo financeiro direto.</p></div>
      <div class="hl hl-p"><div class="hl-hdr">Segurança</div><p>Fluxo insuficiente de fluido de resfriamento em reatores → superaquecimento. Vazão zero em bombas centrifífugas → dano por cavitação. Detecção de vazamento em dutos.</p></div>
      <div class="hl hl-pu"><div class="hl-hdr">Eficiência Energética</div><p>Controle de vazão de vapor, água de resfriamento e ar comprimido otimiza o consumo energético. Pequenas reduções de vazão têm grande impacto no custo de operação.</p></div>
    </div>
  </div>

  <!-- 3. ESCOAMENTO E REYNOLDS -->
  <div class="blk">
    <h3>Regimes de Escoamento — Número de Reynolds</h3>
    <p>Antes de escolher um medidor de vazão, é preciso saber qual é o regime de escoamento. O <strong style="color:var(--y)">Número de Reynolds (Re)</strong> é o parâmetro que classifica o escoamento:</p>
    <div style="background:var(--bg);border:1px solid rgba(255,192,64,0.2);border-radius:8px;padding:12px 16px;font-family:var(--fm);font-size:17px;font-weight:600;margin:12px 0">
      <span style="color:var(--p)">Re</span> = ( <span style="color:var(--g)">ρ</span> × <span style="color:var(--y)">v</span> × <span style="color:var(--or)">D</span> ) / <span style="color:var(--r)">μ</span>
    </div>
    <table style="width:100%;font-size:12px;border-collapse:collapse;margin-bottom:12px">
      <tr><td style="padding:5px 8px;border-bottom:1px solid var(--bd);font-family:var(--fm);color:var(--p);font-weight:600;width:40px">Re</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500">Número de Reynolds</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t3);font-family:var(--fm);font-size:10px">adimensional</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">&lt;2300 laminar · 2300–4000 transição · &gt;4000 turbulento</td></tr>
      <tr><td style="padding:5px 8px;border-bottom:1px solid var(--bd);font-family:var(--fm);color:var(--g);font-weight:600">ρ</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500">Massa específica do fluido</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t3);font-family:var(--fm);font-size:10px">kg/m³</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">Água≈1000 · Ar≈1,2 · Óleo≈850</td></tr>
      <tr><td style="padding:5px 8px;border-bottom:1px solid var(--bd);font-family:var(--fm);color:var(--y);font-weight:600">v</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500">Velocidade do fluido</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t3);font-family:var(--fm);font-size:10px">m/s</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">Velocidade média na seção transversal</td></tr>
      <tr><td style="padding:5px 8px;border-bottom:1px solid var(--bd);font-family:var(--fm);color:var(--or);font-weight:600">D</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t1);font-weight:500">Diâmetro interno</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t3);font-family:var(--fm);font-size:10px">m</td><td style="padding:5px 8px;border-bottom:1px solid var(--bd);color:var(--t3);font-size:12px">Diâmetro interno da tubulação no ponto medido</td></tr>
      <tr><td style="padding:5px 8px;font-family:var(--fm);color:var(--r);font-weight:600">μ</td><td style="padding:5px 8px;color:var(--t1);font-weight:500">Viscosidade dinâmica</td><td style="padding:5px 8px;color:var(--t3);font-family:var(--fm);font-size:10px">Pa·s (cP)</td><td style="padding:5px 8px;color:var(--t3);font-size:12px">Resistência interna do fluido. Água≈0,001 · Óleo pesado≈0,1–1</td></tr>
    </table>
    <table class="tbl"><thead><tr><th>Regime</th><th>Valor de Re</th><th>Perfil de velocidade</th><th>Impacto na medição</th></tr></thead>
    <tbody>
      <tr><td style="color:var(--g)">Laminar</td><td>&lt; 2.300</td><td>Parabólico — zero na parede, máximo no centro</td><td>Perfil irregular dificulta medição precisa. Ocorre em fluidos viscosos ou baixas velocidades.</td></tr>
      <tr><td style="color:var(--y)">Transição</td><td>2.300 – 4.000</td><td>Instável — alterna entre laminar e turbulento</td><td>Resultados inconsistentes. Evitar medição nessa faixa.</td></tr>
      <tr><td style="color:var(--r)">Turbulento</td><td>&gt; 4.000</td><td>Aproximadamente plano — uniforme na seção</td><td>Perfil bem definido — medição mais fácil e precisa. Regime dominante na indústria.</td></tr>
    </tbody></table>
    <div class="alert ag" style="margin-top:8px">Em tubulações industriais com água a 2 m/s em tubo de 4" (D=0,1 m): Re = (1000 × 2 × 0,1) / 0,001 = <strong style="color:var(--g)">200.000</strong> — fortemente turbulento. Laminar é exceção na indústria, não a regra!</div>
  </div>

  <!-- 4. VISCOSIDADE -->
  <div class="blk">
    <h3>Viscosidade — a resistência ao escoamento</h3>
    <p>Segundo o <strong style="color:var(--y)">IFRN/SENAI</strong>, viscosidade é a propriedade de um fluido que representa sua resistência ao escoamento. Fluidos viscosos "resistem" a se mover — como mel versus água.</p>
    <div class="grid g2" style="margin-top:10px">
      <div style="background:var(--bg);border:1px solid var(--bd);border-radius:8px;padding:14px">
        <div style="font-family:var(--fm);font-size:16px;font-weight:600;margin-bottom:8px"><span style="color:var(--pu)">μ</span> = viscosidade dinâmica</div>
        <p style="font-size:12px;color:var(--t2)">Mede a força de atrito entre as camadas do fluido. Quanto mais viscoso, maior o μ. Unidade: Pa·s (SI) ou cP (centipoise).</p>
        <div style="font-size:12px;color:var(--t3);margin-top:8px">Água a 20°C = 1 cP · Óleo motor = 100–1000 cP · Mel = 2.000–10.000 cP</div>
      </div>
      <div style="background:var(--bg);border:1px solid var(--bd);border-radius:8px;padding:14px">
        <div style="font-family:var(--fm);font-size:16px;font-weight:600;margin-bottom:8px"><span style="color:var(--p)">ν</span> = <span style="color:var(--pu)">μ</span> / <span style="color:var(--g)">ρ</span></div>
        <p style="font-size:12px;color:var(--t2)">Viscosidade cinemática — considera também a densidade do fluido. Mostra como o fluido escoa levando em conta sua massa por volume.</p>
        <div style="font-size:12px;color:var(--t3);margin-top:8px">Unidade: m²/s (SI) ou cSt (centistoke). 1 cSt = 10⁻⁶ m²/s</div>
      </div>
    </div>
    <div class="alert aw" style="margin-top:10px">Fluidos muito viscosos têm Re baixo mesmo em velocidades altas → regime laminar. Isso impede o uso de medidores que requerem turbulência (como placa de orifício e vórtex). Para óleos pesados, prefere-se Coriolis ou deslocamento positivo.</div>
  </div>

  <!-- 5. TECNOLOGIAS -->
  <div class="blk">
    <h3>Tecnologias de Medição de Vazão — comparativo</h3>
    <table class="tbl"><thead><tr><th>Medidor</th><th>Princípio físico</th><th>Melhor aplicação</th><th>Limitação principal</th><th>Re mínimo</th></tr></thead>
    <tbody>
      <tr><td><strong style="color:var(--p)">Placa de Orifício</strong></td><td>Pressão diferencial (Bernoulli)</td><td>Gases, vapores, líquidos limpos</td><td>Perda de carga permanente ≈ 60% do ΔP</td><td>&gt;10.000</td></tr>
      <tr><td>Tubo Venturi</td><td>Pressão diferencial (Bernoulli)</td><td>Grandes vazões, baixa perda de carga</td><td>Custo e tamanho maiores que orifício</td><td>&gt;75.000</td></tr>
      <tr><td>Turbina</td><td>Rotação do rotor ∝ velocidade</td><td>Líquidos limpos, baixa viscosidade</td><td>Partes móveis — desgaste e sujeira</td><td>&gt;4.500</td></tr>
      <tr><td><strong style="color:var(--g)">Eletromagnético</strong></td><td>Lei de Faraday (tensão ∝ velocidade)</td><td>Líquidos condutores (água, polpa, lama)</td><td>Não funciona com hidrocarbonetos e gases</td><td>Qualquer</td></tr>
      <tr><td>Ultrassônico</td><td>Tempo de trânsito / Doppler</td><td>Clamp-on (sem corte da linha), águas</td><td>Sensível a bolhas, incrustações, curvas</td><td>Qualquer</td></tr>
      <tr><td>Vórtex</td><td>Frequência de vórtices de Kármán</td><td>Vapor, gases limpos, líquidos limpos</td><td>Não mede Re baixo — mínimo de velocidade</td><td>&gt;10.000</td></tr>
      <tr><td><strong style="color:var(--or)">Coriolis</strong></td><td>Distorção por força de Coriolis em tubos vibratórios</td><td>Medição mássica direta — qualquer fluido</td><td>Alto custo, tamanhos grandes são caros</td><td>Qualquer</td></tr>
      <tr><td>Deslocamento positivo</td><td>Volume de cavidades preenchidas sequencialmente</td><td>Fluidos viscosos, combustíveis</td><td>Partes móveis, sensível a partículas sólidas</td><td>Laminar OK</td></tr>
    </tbody></table>
  </div>

  <!-- 6. GASES E NORMALIZAÇÃO -->
  <div class="blk">
    <h3>Medição de Vazão de Gases — normalização e Boyle-Mariotte</h3>
    <p>Ao contrário de líquidos, <strong style="color:var(--y)">gases mudam de volume com temperatura e pressão</strong>. Por isso, medições de vazão de gás são convertidas para condições normalizadas de referência:</p>
    <div style="background:var(--bg);border:1px solid rgba(255,192,64,0.2);border-radius:8px;padding:12px 16px;font-family:var(--fm);font-size:15px;font-weight:600;margin:12px 0">
      <span style="color:var(--or)">Q_n</span> = <span style="color:var(--y)">Q_med</span> × ( <span style="color:var(--p)">P</span> / <span style="color:var(--t3)">P_ref</span> ) × ( <span style="color:var(--t3)">T_ref</span> / <span style="color:var(--g)">T</span> )
    </div>
    <ul>
      <li><strong style="color:var(--or)">Q_n</strong> = vazão nas condições normais de referência (0°C, 1 atm) → m³N/h</li>
      <li><strong style="color:var(--y)">Q_med</strong> = vazão medida nas condições reais da tubulação</li>
      <li>Isso garante que diferentes medições, em diferentes condições de P e T, possam ser comparadas</li>
      <li>Medidores fiscais de gás natural (faturamento) sempre reportam em m³N (metro cúbico normal)</li>
    </ul>
    <div class="alert ay" style="margin-top:8px">Na Lei de Boyle-Mariotte: P₁V₁/T₁ = P₂V₂/T₂. Se dobrarmos a pressão mantendo T constante, o volume é reduzido à metade — a mesma massa de gás ocupa metade do espaço. Por isso a vazão volumétrica de gás precisa ser normalizada!</div>
  </div>

  <!-- 7. APLICAÇÕES -->
  <div class="blk">
    <h3>Vazão nas indústrias — onde ela aparece?</h3>
    <table class="tbl"><thead><tr><th>Setor</th><th>Fluido</th><th>Medidor típico</th><th>Por que é crítica?</th></tr></thead>
    <tbody>
      <tr><td>Distribuição de gás</td><td>Gás natural</td><td>Ultrassônico / Turbina</td><td>Faturamento fiscal — cada m³N tem valor monetário</td></tr>
      <tr><td>Saneamento</td><td>Água potável e esgoto</td><td>Eletromagnético</td><td>Controle de consumo e tarifação</td></tr>
      <tr><td>Petroquímica</td><td>Vapor, hidrocarbonetos, reagentes</td><td>Coriolis / Vórtex / Orifício</td><td>Balanço de massa do processo e segurança</td></tr>
      <tr><td>Alimentícia</td><td>Leite, sucos, cerveja, óleo</td><td>Coriolis / Eletromagnético</td><td>Dosagem exata e higiene (CIP sem partes móveis)</td></tr>
      <tr><td>Farmacêutica</td><td>Solventes, APIs, água purificada</td><td>Coriolis / Magnético</td><td>Precisão mássica para cada lote de produção</td></tr>
      <tr><td>Energia</td><td>Vapor de alta pressão, água de resfriamento</td><td>Vórtex / Ultrassônico</td><td>Eficiência energética e controle de caldeiras</td></tr>
    </tbody></table>
  </div>

  <div class="alert ai" style="margin-top:10px">Fórmulas visuais de Qv, Qm, Reynolds, Torricelli e Bernoulli com diagramas SVG detalhados estão em <button class="btn btn-p" onclick="S('formulas')" style="padding:4px 10px;font-size:12px">Fórmulas Visuais ★</button></div>

  <!-- INSTRUMENTOS DO PDF SENAI — GRUPOS DE MEDIDORES -->
  <div class="blk" style="margin-top:14px">
    <h3>Grupo 1 — Medidores Deprimogênios (Pressão Diferencial)</h3>
    <p>Criam uma restrição na linha que gera queda de pressão proporcional ao quadrado da vazão. A raiz quadrada do ΔP é proporcional à vazão. São os mais utilizados na indústria pela robustez e baixo custo.</p>
    <div class="alert ai" style="margin-bottom:10px">Relação fundamental: Q = Cd × A × √(2ΔP/ρ) — dobrar a vazão quadruplica o ΔP. O transmissor extrai a raiz quadrada internamente para linearizar o sinal 4–20 mA.</div>
    <table class="tbl"><thead><tr><th>Medidor</th><th>Perda de carga permanente</th><th>Faixa de Re</th><th>Característica principal</th></tr></thead>
    <tbody>
      <tr><td style="color:var(--p)">Placa de Orifício</td><td>~60% do ΔP medido</td><td>Re > 10.000</td><td>Mais barato e simples. Fácil substituição. Muito usado em gás natural e vapor.</td></tr>
      <tr><td>Bico de Medição (Nozzle)</td><td>~40% do ΔP</td><td>Re > 50.000</td><td>Melhor perfil hidrodinâmico que a placa. Menor desgaste em fluidos abrasivos.</td></tr>
      <tr><td style="color:var(--g)">Tubo de Venturi</td><td>~5–10% do ΔP</td><td>Re > 75.000</td><td>Mínima perda de carga. Ideal para grandes vazões e bombas com pouca carga disponível.</td></tr>
      <tr><td>Tubo de Pitot</td><td>Desprezível</td><td>Re > 10.000</td><td>Mede velocidade num ponto. Uso em dutos de ar/gás de grande diâmetro (HVAC, chaminés).</td></tr>
      <tr><td>Annubar / Pitot Médio</td><td>Desprezível</td><td>Re > 4.000</td><td>Múltiplos pontos de amostragem — média da velocidade em toda a seção. Precisão melhorada.</td></tr>
    </tbody></table>
  </div>

  <div class="blk">
    <h3>Grupo 2 — Medidores Lineares de Vazão</h3>
    <p>Produzem sinal diretamente proporcional à vazão (sem relação de raiz quadrada). Mais simples de configurar e com melhor resolução em toda a faixa.</p>
    <table class="tbl"><thead><tr><th>Medidor</th><th>Princípio</th><th>Fluido ideal</th><th>Destaque</th></tr></thead>
    <tbody>
      <tr><td style="color:var(--p)">Eletromagnético (Magfômetro)</td><td>Lei de Faraday: tensão ∝ velocidade</td><td>Líquidos condutores (σ > 5 µS/cm)</td><td>Sem partes móveis, zero perda de carga, bidirecional. Padrão em água e esgoto.</td></tr>
      <tr><td style="color:var(--g)">Ultrassônico por Tempo de Trânsito</td><td>Diferença de tempo ultrassom a favor × contra o fluxo</td><td>Líquidos limpos ou com baixa concentração de sólidos</td><td>Clamp-on (instala sem cortar a linha). Medição não-invasiva. Retrofit em plantas existentes.</td></tr>
      <tr><td>Ultrassônico Doppler</td><td>Mudança de frequência por partículas em suspensão</td><td>Líquidos com sólidos ou bolhas (>100 ppm)</td><td>Funciona com lamas, polpas, efluentes com sólidos. Não funciona com líquido limpo.</td></tr>
      <tr><td style="color:var(--y)">Vórtex</td><td>Frequência de vórtices de von Kármán ∝ velocidade</td><td>Vapor, gases, líquidos limpos e não-viscosos</td><td>Sem partes móveis, funciona com vapor superaquecido. Mede temperatura simultânea (alguns modelos).</td></tr>
      <tr><td style="color:var(--or)">Coriolis</td><td>Distorção de tubos vibratórios por força de Coriolis</td><td>Qualquer fluido (líquido, gás, pasta)</td><td>Único que mede massa diretamente + densidade + temperatura. Mais preciso do mercado.</td></tr>
      <tr><td>Turbina</td><td>Rotação do rotor ∝ velocidade</td><td>Líquidos limpos e não-viscosos</td><td>Alta precisão em faixas estreitas. Usado em faturamento de combustíveis (petróleo, GLP).</td></tr>
    </tbody></table>
  </div>

  <div class="blk">
    <h3>Grupo 3 — Medidores Especiais e Volumétricos</h3>
    <div class="grid g2" style="margin-top:8px">
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--pu);margin-bottom:8px">Medidores Volumétricos (Deslocamento Positivo)</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6;margin-bottom:8px">Capturam volumes fixos do fluido mecanicamente a cada ciclo. O número de ciclos indica a vazão acumulada.</p>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--pu)">›</span><strong style="color:var(--pu)">Pistão Rotativo / Oval Gear:</strong> muito preciso, ideal para óleos viscosos e faturamento de combustíveis</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--pu)">›</span><strong style="color:var(--pu)">Helicoidal:</strong> funciona mesmo com viscosidade alta variável (óleos pesados, asfalto)</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--pu)">›</span><strong style="color:var(--pu)">Diafragma (gás):</strong> medidor de gás residencial e pequeno comercial. Opera por expansão de câmaras alternadas.</li>
        </ul>
      </div>
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--p);margin-bottom:8px">Medidores em Canais Abertos</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6;margin-bottom:8px">Usados quando o fluido escoa livremente em calhas, rios, canais de irrigação ou efluentes — sem pressão interna.</p>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">›</span><strong style="color:var(--p)">Vertedouro (weir):</strong> parede com entalhe padronizado. A vazão é calculada pela altura da lâmina d'água acima da crista.</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">›</span><strong style="color:var(--p)">Calha Parshall:</strong> geometria calibrada que cria uma garganta. Muito usada em ETEs e ETAs para medir efluentes e água bruta.</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">›</span>Em ambos: mede-se apenas a altura da lâmina (nível) e a vazão é calculada pela equação da geometria do canal.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="blk">
    <h3>Como Escolher o Medidor Correto?</h3>
    <table class="tbl"><thead><tr><th>Critério</th><th>Pergunta chave</th><th>Impacto na escolha</th></tr></thead>
    <tbody>
      <tr><td>Tipo de fluido</td><td>Líquido, gás, vapor, pasta?</td><td>Eletromagnético só para líquido condutor. Vórtex bom para vapor. Coriolis para qualquer fluido.</td></tr>
      <tr><td>Condutividade elétrica</td><td>σ > 5 µS/cm?</td><td>Eletromagnético exige condutividade. Hidrocarbonetos não são condutores.</td></tr>
      <tr><td>Viscosidade</td><td>Fluido muito viscoso?</td><td>Re baixo → evitar placa de orifício e vórtex. Preferir Coriolis ou deslocamento positivo.</td></tr>
      <tr><td>Perda de carga</td><td>Sistema tem pressão disponível?</td><td>Placa de orifício tem maior perda. Eletromagnético e ultrassom têm perda mínima.</td></tr>
      <tr><td>Precisão requerida</td><td>Faturamento fiscal ou controle?</td><td>Coriolis e ultrassom: 0,1–0,5%. Placa de orifício: 0,5–2%.</td></tr>
      <tr><td>Higiene / CIP</td><td>Indústria alimentícia ou farmacêutica?</td><td>Eletromagnético ou Coriolis — sem partes internas, limpeza garantida.</td></tr>
      <tr><td>Custo de instalação</td><td>Pode cortar a linha?</td><td>Ultrassom clamp-on: instalação sem parar a produção. Demais requerem corte da linha.</td></tr>
    </tbody></table>
  </div>

  <div class="blk">
    <h3>Transmissores de Vazão e Saída de Sinal</h3>
    <p>Todos os medidores de vazão são conectados a um transmissor que converte o sinal primário (ΔP, pulsos, tensão mV, frequência) em sinal padronizado para o CLP/SCADA:</p>
    <div class="grid g3" style="margin-top:8px">
      <div class="hl hl-p"><div class="hl-hdr">4–20 mA analógico</div><p>Padrão mais comum. 4 mA = 0% da escala (Qmin). 20 mA = 100% (Qmax). Para deprimogênios, inclui extração de raiz quadrada.</p></div>
      <div class="hl hl-g"><div class="hl-hdr">Saída de Pulso / Frequência</div><p>Cada pulso corresponde a um volume fixo (ex: 1 pulso = 1 litro). Totalização fácil no CLP. Comum em turbina e deslocamento positivo.</p></div>
      <div class="hl hl-y"><div class="hl-hdr">HART / Fieldbus / PROFIBUS</div><p>Sinal digital sobre 4–20 mA (HART) ou em rede (FF/PROFIBUS). Permite diagnóstico remoto, configuração e múltiplas variáveis simultâneas.</p></div>
    </div>
  </div>

  <div class="blk">
    <h3>Segurança na Medição de Vazão</h3>
    <ul>
      <li><strong style="color:var(--r)">Trecho reto antes e depois</strong> do medidor: a maioria exige 10–20 D antes e 5 D depois de curvas, válvulas e reduções para garantir perfil de velocidade desenvolvido</li>
      <li>Em linhas de vapor: usar separadores de umidade e condensadores antes dos medidores — gotículas d'água danificam medidores de gás</li>
      <li>Placa de orifício: sempre verificar a orientação correta do bisel (chanfro voltado para downstream)</li>
      <li>Medidores eletromagnéticos devem estar sempre completamente cheios — nunca operar parcialmente cheios (erro grave)</li>
      <li>Coriolis: verificar pressão mínima para evitar cavitação nos tubos internos</li>
    </ul>
  </div>

  <div class="blk">
    <h3>Calibração de Instrumentos de Vazão</h3>
    <p>A calibração de medidores de vazão é uma das mais complexas na instrumentação industrial, pois requer bancadas de fluido real ou comparação com padrões de referência certificados.</p>
    <table class="tbl"><thead><tr><th>Tipo de medidor</th><th>Método de calibração preferido</th><th>Observação</th></tr></thead>
    <tbody>
      <tr><td style="color:var(--p)">Placa de Orifício</td><td>Cálculo por ISO 5167 (não requer calibração in situ)</td><td>A placa é calculada, não calibrada. Verificar diâmetro e condição da aresta.</td></tr>
      <tr><td>Coriolis</td><td>Bancada de massa (gravimétrica)</td><td>Alta precisão (&lt;0,1%). Rastreável a padrões de massa INMETRO.</td></tr>
      <tr><td>Eletromagnético</td><td>Bancada volumétrica com padrão</td><td>Verifica o fator K (pulsos/litro). Ajusta ganho e zero de sinal.</td></tr>
      <tr><td>Ultrassônico</td><td>Comparação com padrão ou bancada</td><td>Requer verificação do perfil de velocidade — trecho reto crítico.</td></tr>
      <tr><td>Vórtex</td><td>Bancada com fluido real ou gás calibrado</td><td>Verificar frequência base do bluff body. Não ajustável em campo.</td></tr>
    </tbody></table>
    <div class="alert ay" style="margin-top:8px">Transmissores de ΔP conectados a medidores deprimogênios são calibrados separadamente em pressão — a calibração da placa de orifício é feita por cálculo normativo (ISO 5167 / AGA-3), não por bancada de fluido.</div>
    <div style="text-align:center;margin-top:10px"><button class="btn btn-y" onclick="S('calibracao')" style="padding:6px 16px;font-size:12px">Ver Módulo Calibração completo →</button></div>
  </div>
</div>

<!-- RELAÇÕES -->
<div class="screen" id="screen-relacoes">
  <div class="h1">Relações P · N · Q</div><div class="sub">Módulo 08 · Como Pressão, Nível e Vazão se conectam</div>
  <div class="alert ay">As três variáveis não existem isoladamente — entender suas relações é entender o processo.</div>
  <div class="blk"><h3 style="color:var(--p)">1 · Nível → Pressão (Stevin)</h3>
    <div style="background:var(--bg);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:10px 14px;font-family:var(--fm);font-size:17px;margin-bottom:10px"><span style="color:var(--p)">P</span> = <span style="color:var(--g)">ρ</span> × <span style="color:var(--or)">g</span> × <span style="color:var(--pu)">h</span></div>
    <ul><li>Coluna de líquido gera pressão proporcional à sua altura</li><li>Medir P no fundo = medir nível indiretamente</li><li>h = 5 m de água → P = <strong style="color:var(--p)">0,49 bar</strong></li></ul>
  </div>
  <div class="blk"><h3 style="color:var(--g)">2 · Pressão → Vazão (Bernoulli / Orifício)</h3>
    <div style="background:var(--bg);border:1px solid rgba(0,255,157,0.2);border-radius:8px;padding:10px 14px;font-family:var(--fm);font-size:15px;margin-bottom:10px"><span style="color:var(--y)">Q</span> ∝ √(<span style="color:var(--p)">ΔP</span>) → dobrar Q = quadruplicar ΔP</div>
    <ul><li>Restrição no fluido cria ΔP proporcional à vazão ao quadrado</li><li>Transmissor realiza extração de raiz internamente para linearizar 4–20 mA</li></ul>
  </div>
  <div class="blk"><h3 style="color:var(--y)">3 · Vazão → Nível (Balanço de Massa)</h3>
    <div style="background:var(--bg);border:1px solid rgba(255,192,64,0.2);border-radius:8px;padding:10px 14px;font-family:var(--fm);font-size:16px;margin-bottom:10px">d<span style="color:var(--pu)">h</span>/dt = (<span style="color:var(--y)">Q_in</span> − <span style="color:var(--r)">Q_out</span>) / <span style="color:var(--g)">A</span></div>
    <ul><li>Q_in > Q_out → nível sobe. Q_in &lt; Q_out → nível cai</li><li>Tanque grande (A grande) → resposta lenta → mais fácil de controlar</li></ul>
  </div>
  <div class="blk"><h3 style="color:var(--pu)">4 · Nível → Vazão (Torricelli)</h3>
    <div style="background:var(--bg);border:1px solid rgba(192,132,255,0.2);border-radius:8px;padding:10px 14px;font-family:var(--fm);font-size:16px;margin-bottom:10px"><span style="color:var(--p)">v</span> = √(2 × <span style="color:var(--or)">g</span> × <span style="color:var(--pu)">h</span>)</div>
    <ul><li>Em saídas gravitacionais, o nível determina a vazão de saída</li><li>Sistema auto-regulante: nível cai → vazão cai proporcionalmente</li></ul>
  </div>
  <div class="blk"><h3>Por que isso importa na automação?</h3><ul>
    <li>Controlador de <strong style="color:var(--p)">pressão</strong> atua na válvula de vapor → muda <strong style="color:var(--y)">vazão</strong> → impacta <strong style="color:var(--g)">nível</strong></li>
    <li>Controlador de <strong style="color:var(--g)">nível</strong> atua na válvula de entrada → muda <strong style="color:var(--y)">vazão</strong> → altera <strong style="color:var(--p)">pressão</strong> upstream</li>
    <li>Interação de malhas sem desacoplamento = instabilidade</li>
    <li>Solução: desacoplamento de malhas ou controladores MPC</li>
  </ul></div>
</div>

<!-- CENÁRIOS -->
<div class="screen" id="screen-cenarios">
  <div class="h1">Cenários Reais</div><div class="sub">Módulo 09 · Clique para expandir</div>
  <div class="alert ag">P, N e Q sempre aparecem juntas na indústria — veja como nos cenários abaixo.</div>
  <div class="scen-card" onclick="toggleScen(this)">
    <div class="scen-hdr"><div><div class="scen-title">Caldeira Industrial a Vapor</div><div class="scen-sub">Química · Papel e celulose · Petroquímica · Energia</div></div><span class="scen-arrow">›</span></div>
    <div class="scen-body">
      <div class="scen-vars"><span class="var-pill" style="background:rgba(0,212,255,0.12);color:var(--p)">Pressão vapor</span><span class="var-pill" style="background:rgba(0,255,157,0.12);color:var(--g)">Nível d'água</span><span class="var-pill" style="background:rgba(255,192,64,0.12);color:var(--y)">Vazão de água</span><span class="var-pill" style="background:rgba(255,192,64,0.12);color:var(--y)">Vazão de vapor</span></div>
      <div class="step"><div class="step-num" style="background:rgba(0,255,157,0.15);color:var(--g)">N</div><div class="step-txt">Nível controlado com precisão extrema. Baixo = tubos expostos = explosão. Alto = arraste de água no vapor = dano a turbinas.<div class="step-eq">Redundância 2oo3. Faixa: 40–60% do visor.</div></div></div>
      <div class="step"><div class="step-num" style="background:rgba(0,212,255,0.15);color:var(--p)">P</div><div class="step-txt">Pressão do vapor = variável principal de energia. P_vapor típica: 10–60 bar.</div></div>
      <div class="step"><div class="step-num" style="background:rgba(255,192,64,0.15);color:var(--y)">Q</div><div class="step-txt">Vazão de água controla nível. Vazão de vapor saindo determina pressão. As duas malhas interagem.<div class="step-eq">Malha N: LT→LC→FV_água | Malha P: PT→PC→FV_vapor</div></div></div>
      <div class="step"><div class="step-num" style="background:rgba(192,132,255,0.15);color:var(--pu)">!</div><div class="step-txt"><strong style="color:var(--pu)">Swell:</strong> demanda de vapor sobe → P cai → bolhas formam-se na água → nível aparentemente sobe mas massa real cai → controlador fecha válvula de água → nível real cai → perigo. Solução: controle 3-elementos.</div></div>
    </div>
  </div>
  <div class="scen-card" onclick="toggleScen(this)">
    <div class="scen-hdr"><div><div class="scen-title">Estação de Tratamento de Água (ETA)</div><div class="scen-sub">Saneamento · Abastecimento público · Tratamento industrial</div></div><span class="scen-arrow">›</span></div>
    <div class="scen-body">
      <div class="scen-vars"><span class="var-pill" style="background:rgba(0,255,157,0.12);color:var(--g)">Nível decantadores</span><span class="var-pill" style="background:rgba(255,192,64,0.12);color:var(--y)">Vazão entrada</span><span class="var-pill" style="background:rgba(0,212,255,0.12);color:var(--p)">Pressão bombas</span></div>
      <div class="step"><div class="step-num" style="background:rgba(255,192,64,0.15);color:var(--y)">Q</div><div class="step-txt">Vazão medida por eletromagnético. Dispara dosagem proporcional de cloro e coagulante.<div class="step-eq">Dosagem = k × Q_entrada [mg/L]</div></div></div>
      <div class="step"><div class="step-num" style="background:rgba(0,255,157,0.15);color:var(--g)">N</div><div class="step-txt">Nível dos floculadores determina tempo de residência. Nível errado = água mal tratada.</div></div>
      <div class="step"><div class="step-num" style="background:rgba(0,212,255,0.15);color:var(--p)">P</div><div class="step-txt">Bombas mantêm pressão de 10–50 mCA na rede. Pressão baixa = sem água nos andares altos.<div class="step-eq">1 mCA ≈ 0,1 bar</div></div></div>
      <div class="step"><div class="step-num" style="background:rgba(192,132,255,0.15);color:var(--pu)">↔</div><div class="step-txt">P das bombas → vazão distribuída → nível dos reservatórios → (via Stevin) P na rede por gravidade. Sistema interconectado e realimentado naturalmente.</div></div>
    </div>
  </div>
  <div class="scen-card" onclick="toggleScen(this)">
    <div class="scen-hdr"><div><div class="scen-title">Reator Químico com Jaqueta de Vapor</div><div class="scen-sub">Química fina · Farmacêutica · Alimentícia</div></div><span class="scen-arrow">›</span></div>
    <div class="scen-body">
      <div class="scen-vars"><span class="var-pill" style="background:rgba(0,255,157,0.12);color:var(--g)">Nível do reator</span><span class="var-pill" style="background:rgba(255,192,64,0.12);color:var(--y)">Vazão de reagentes</span><span class="var-pill" style="background:rgba(0,212,255,0.12);color:var(--p)">Pressão de vapor</span></div>
      <div class="step"><div class="step-num" style="background:rgba(0,255,157,0.15);color:var(--g)">N</div><div class="step-txt">Nível define quantidade de reagente e tempo de residência. Controlado pela válvula de saída do produto.</div></div>
      <div class="step"><div class="step-num" style="background:rgba(255,192,64,0.15);color:var(--y)">Q</div><div class="step-txt">Razão Q_A/Q_B determina a estequiometria. Medidor Coriolis é ideal — mede massa independente de T e P.<div class="step-eq">Q_A / Q_B = razão estequiométrica</div></div></div>
      <div class="step"><div class="step-num" style="background:rgba(0,212,255,0.15);color:var(--p)">P</div><div class="step-txt">Pressão de vapor na jaqueta controla a temperatura da reação. Para fluidos saturados: T_sat = f(P).<div class="step-eq">Curva de saturação: T_sat = f(P)</div></div></div>
    </div>
  </div>

  <!-- CENÁRIO 4 — TEMPERATURA -->
  <div class="scen-card" onclick="toggleScen(this)">
    <div class="scen-hdr"><div><div class="scen-title">Pasteurizador de Leite — Controle de Temperatura</div><div class="scen-sub">Alimentícia · Laticínios · Bebidas · Farmacêutica</div></div><span class="scen-arrow">›</span></div>
    <div class="scen-body">
      <div class="scen-vars">
        <span class="var-pill" style="background:rgba(192,132,255,0.12);color:var(--pu)">Temperatura do produto</span>
        <span class="var-pill" style="background:rgba(255,192,64,0.12);color:var(--y)">Vazão de leite</span>
        <span class="var-pill" style="background:rgba(0,212,255,0.12);color:var(--p)">Pressão de vapor</span>
        <span class="var-pill" style="background:rgba(0,255,157,0.12);color:var(--g)">Temperatura de saída</span>
      </div>
      <div class="step"><div class="step-num" style="background:rgba(192,132,255,0.15);color:var(--pu)">T</div><div class="step-txt"><strong style="color:var(--pu)">Pasteurização HTST (High Temperature Short Time):</strong> Leite deve atingir exatamente 72–75°C por 15 segundos. Temperatura baixa = não pasteurizado (risco sanitário). Alta = desnatura proteínas = produto degradado.<div class="step-eq">SP = 73°C · Tolerância: ±0,5°C · Sensor: PT100 classe A</div></div></div>
      <div class="step"><div class="step-num" style="background:rgba(255,192,64,0.15);color:var(--y)">Q</div><div class="step-txt">A vazão de leite determina o tempo de residência na seção de aquecimento. Se Q aumenta → tempo de exposição cai → pasteurização incompleta. Medidor eletromagnético mede Qv e controla a velocidade de bombeamento.<div class="step-eq">t_residência = L / v = L × A / Qv</div></div></div>
      <div class="step"><div class="step-num" style="background:rgba(0,212,255,0.15);color:var(--p)">P</div><div class="step-txt">Vapor de ~2 bar (T_sat ≈ 120°C) aquece o leite pelo trocador de calor a placas. A válvula de vapor é a MV da malha de temperatura. Pressão de vapor controlada → temperatura do fluido de aquecimento controlada.</div></div>
      <div class="step"><div class="step-num" style="background:rgba(255,85,102,0.15);color:var(--r)">!</div><div class="step-txt"><strong style="color:var(--r)">Desvio de temperatura:</strong> se TT (transmissor de temperatura) detectar T &lt; 72°C, a válvula de desvio (divert valve) redireciona o produto de volta para reaquecimento antes de seguir para o envase. Sistema de segurança obrigatório pela ANVISA / legislação sanitária.<div class="step-eq">TT → TC → TV_vapor + FV_desvio</div></div></div>
      <div class="step"><div class="step-num" style="background:rgba(0,255,157,0.15);color:var(--g)">CIP</div><div class="step-txt"><strong style="color:var(--g)">Limpeza CIP (Cleaning In Place):</strong> após a produção, o sistema lava e esteriliza automaticamente a 85–95°C com soda e ácido. Temperatura e vazão de limpeza são controladas pelos mesmos instrumentos do processo. Sensores PT100 devem suportar temperaturas de CIP sem deslocamento de calibração.</div></div>
    </div>
  </div>
</div>

<!-- FLASHCARDS -->
<div class="screen" id="screen-flash">
  <div class="h1">Flashcards</div><div class="sub">54 cards · Toque para virar · 8 categorias com filtro</div>
  <div class="fc-bar"><div class="fc-bfill" id="fcprog" style="width:2.5%"></div></div>
  <div class="fc-nav">
    <button class="btn" onclick="fcPrev()">← Anterior</button>
    <span class="fc-info" id="fccnt">1 / 40</span>
    <button class="btn" onclick="fcNext()">Próximo →</button>
  </div>
  <div class="fc-wrap" onclick="fcFlip()">
    <div class="fc-inner" id="fccard">
      <div class="fc-f"><div class="fc-cat" id="fccat">—</div><div class="fc-q" id="fcq">—</div><div class="fc-hint">toque para revelar a resposta</div></div>
      <div class="fc-b"><div class="fc-cat" id="fccatb">Resposta</div><div class="fc-a" id="fca">—</div></div>
    </div>
  </div>
  <div class="fc-btns">
    <button class="btn btn-r" onclick="fcShuffle()">Embaralhar</button>
    <button class="btn btn-p" onclick="fcFilt('Conceitos')">Conceitos</button>
    <button class="btn btn-g" onclick="fcFilt('Pressão')">Pressão</button>
    <button class="btn btn-g" onclick="fcFilt('Nível')">Nível</button>
    <button class="btn btn-y" onclick="fcFilt('Vazão')">Vazão</button>
    <button class="btn" onclick="fcFilt('Erros')">Erros</button>
    <button class="btn btn-pu" onclick="fcFilt('Relações')">Relações P·N·Q</button>
    <button class="btn btn-pu" onclick="fcFilt('Temperatura')">Temperatura</button>
    <button class="btn btn-y" onclick="fcFilt('Calibração')">Calibração</button>
    <button class="btn" onclick="fcReset()">Todos</button>
  </div>
</div>

<!-- QUIZ -->
<div class="screen" id="screen-quiz">
  <div class="h1">Quiz Aleatório</div><div class="sub">38 questões · Questões e alternativas embaralhadas a cada rodada</div>
  <div class="qz-hdr">
    <span style="font-size:13px;color:var(--t3);font-family:var(--fm)" id="qzstat">Escolha quantas questões:</span>
    <button class="btn btn-p" onclick="startQz(10)">10 questões</button>
    <button class="btn btn-g" onclick="startQz(15)">15 questões</button>
    <button class="btn btn-pu" onclick="startQz(38)">Todas (38)</button>
  </div>
  <div id="qzarea"><div class="blk" style="text-align:center;padding:28px"><p style="color:var(--t3);font-size:14px">Escolha a quantidade acima para começar.</p></div></div>
</div>

<!-- CALCULADORA -->
<div class="screen" id="screen-calc">
  <div class="h1">Calculadora</div><div class="sub">8 fórmulas interativas</div>
  <div class="grid g2">
    <div>
      <div class="cb-calc"><div class="calc-label">Erro Absoluto + Relativo</div><div class="calc-eq">EA = Indicado − Real · ER = EA/Real</div><div class="inp-row"><div class="ig"><label>Indicado</label><input id="c1a" type="number" value="6.12" step="0.01" oninput="C.c1()"></div><div class="ig"><label>Real</label><input id="c1b" type="number" value="6.00" step="0.01" oninput="C.c1()"></div></div><div class="res" id="r1"></div></div>
      <div class="cb-calc"><div class="calc-label">Erro % FS e % Span</div><div class="calc-eq">%FS=(EA/FS)×100 · %Span=(EA/Span)×100</div><div class="inp-row"><div class="ig"><label>EA</label><input id="c2a" type="number" value="0.12" step="0.01" oninput="C.c2()"></div><div class="ig"><label>URV/FS</label><input id="c2b" type="number" value="10" step="0.1" oninput="C.c2()"></div><div class="ig"><label>LRV</label><input id="c2c" type="number" value="0" step="0.1" oninput="C.c2()"></div></div><div class="res" id="r2"></div></div>
      <div class="cb-calc"><div class="calc-label">Acurácia em Engenharia</div><div class="calc-eq">Erro_max = FS × (%FS / 100)</div><div class="inp-row"><div class="ig"><label>FS (URV)</label><input id="c3a" type="number" value="16" step="0.1" oninput="C.c3()"></div><div class="ig"><label>Acurácia %FS</label><input id="c3b" type="number" value="0.25" step="0.01" oninput="C.c3()"></div></div><div class="res" id="r3"></div></div>
      <div class="cb-calc"><div class="calc-label">Pressão Hidrostática (Stevin)</div><div class="calc-eq">ΔP = ρ × g × h</div><div class="inp-row"><div class="ig"><label>ρ (kg/m³)</label><input id="c4a" type="number" value="1000" step="10" oninput="C.c4()"></div><div class="ig"><label>g (m/s²)</label><input id="c4b" type="number" value="9.81" step="0.01" oninput="C.c4()"></div><div class="ig"><label>h (m)</label><input id="c4c" type="number" value="2" step="0.1" oninput="C.c4()"></div></div><div class="res" id="r4"></div></div>
    </div>
    <div>
      <div class="cb-calc"><div class="calc-label">Nível a partir da Pressão</div><div class="calc-eq">h = P / (ρ × g)</div><div class="inp-row"><div class="ig"><label>P (Pa)</label><input id="c5a" type="number" value="19620" step="100" oninput="C.c5()"></div><div class="ig"><label>ρ (kg/m³)</label><input id="c5b" type="number" value="1000" step="10" oninput="C.c5()"></div><div class="ig"><label>g (m/s²)</label><input id="c5c" type="number" value="9.81" step="0.01" oninput="C.c5()"></div></div><div class="res" id="r5"></div></div>
      <div class="cb-calc"><div class="calc-label">Número de Reynolds</div><div class="calc-eq">Re = (ρ × v × D) / μ</div><div class="inp-row"><div class="ig"><label>ρ (kg/m³)</label><input id="c6a" type="number" value="1000" step="10" oninput="C.c6()"></div><div class="ig"><label>v (m/s)</label><input id="c6b" type="number" value="2" step="0.1" oninput="C.c6()"></div><div class="ig"><label>D (m)</label><input id="c6c" type="number" value="0.05" step="0.001" oninput="C.c6()"></div><div class="ig"><label>μ (Pa·s)</label><input id="c6d" type="number" value="0.001" step="0.0001" oninput="C.c6()"></div></div><div class="res" id="r6"></div></div>
      <div class="cb-calc"><div class="calc-label">Torricelli — Saída por gravidade</div><div class="calc-eq">v = √(2gh) · Q = A_orifício × v</div><div class="inp-row"><div class="ig"><label>h — nível (m)</label><input id="c7a" type="number" value="2" step="0.1" oninput="C.c7()"></div><div class="ig"><label>g (m/s²)</label><input id="c7b" type="number" value="9.81" step="0.01" oninput="C.c7()"></div><div class="ig"><label>D_orifício (m)</label><input id="c7c" type="number" value="0.05" step="0.001" oninput="C.c7()"></div></div><div class="res" id="r7"></div></div>
      <div class="cb-calc"><div class="calc-label">Conversor de Temperatura</div><div class="calc-eq">°C ↔ K ↔ °F</div><div class="inp-row"><div class="ig"><label>Valor</label><input id="tc_v" type="number" value="100" step="0.1" oninput="C.tc()"></div><div class="ig"><label>De</label><select id="tc_from" onchange="C.tc()" style="background:var(--bg);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:9px 10px;color:#fff;font-size:13px;width:80px;font-family:var(--fm)"><option>°C</option><option>K</option><option>°F</option></select></div></div><div class="res" id="tc_res"></div></div><div class="calc-eq">V₂ = P₁V₁T₂ / (T₁P₂)</div><div class="inp-row"><div class="ig"><label>P₁ (bar)</label><input id="c8a" type="number" value="1" step="0.1" oninput="C.c8()"></div><div class="ig"><label>V₁ (m³)</label><input id="c8b" type="number" value="1" step="0.1" oninput="C.c8()"></div><div class="ig"><label>T₁ (K)</label><input id="c8c" type="number" value="293" step="1" oninput="C.c8()"></div><div class="ig"><label>P₂ (bar)</label><input id="c8d" type="number" value="2" step="0.1" oninput="C.c8()"></div><div class="ig"><label>T₂ (K)</label><input id="c8e" type="number" value="293" step="1" oninput="C.c8()"></div></div><div class="res" id="r8"></div></div>
    </div>
  </div>
</div>

</div><!-- /content -->

<script>
const PAGES=['home','m1','m2','m3','m4','formulas','pressao','nivel','vazao','temperatura','relacoes','cenarios','calibracao','flash','quiz','calc','bernoulli'];
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
function scrollNav(delta){const nb=document.getElementById('navBar');if(nb)nb.scrollBy({left:delta,behavior:'smooth'});}
function SD(id){S(id);closeDrawer()}
function toggleDrawer(){document.getElementById('drawer').classList.toggle('open');document.getElementById('overlay').classList.toggle('open')}
function closeDrawer(){document.getElementById('drawer').classList.remove('open');document.getElementById('overlay').classList.remove('open')}
function X(el){el.classList.toggle('open')}
function toggleScen(el){el.classList.toggle('open')}

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

let fcActive=[...Array(CARDS.length).keys()],fcIdx=0;
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
function fcFlip(){document.getElementById('fccard').classList.toggle('flip')}
function fcNext(){fcIdx=(fcIdx+1)%fcActive.length;fcShow()}
function fcPrev(){fcIdx=(fcIdx-1+fcActive.length)%fcActive.length;fcShow()}
function fcShuffle(){fcActive=[...fcActive].sort(()=>Math.random()-.5);fcIdx=0;fcShow()}
function fcReset(){fcActive=[...Array(CARDS.length).keys()];fcIdx=0;fcShow()}
function fcFilt(cat){const f=CARDS.map((c,i)=>c.c===cat?i:-1).filter(i=>i>=0);fcActive=f.length?f:[...Array(CARDS.length).keys()];fcIdx=0;fcShow()}
setTimeout(fcShow,50);

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

let qzState={q:[],idx:0,score:0,answered:false,total:10};
function startQz(n){
  qzState.total=n;
  const s=[...QS].sort(()=>Math.random()-.5).slice(0,n);
  qzState.q=s.map(q=>{const ct=q.o[q.a];const so=[...q.o].sort(()=>Math.random()-.5);return{...q,o:so,a:so.indexOf(ct)};});
  qzState.idx=0;qzState.score=0;qzState.answered=false;renderQz();
}
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
function nextQz(){qzState.idx++;qzState.answered=false;renderQz()}

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
};
Object.values(C).forEach(fn=>fn());
</script>
<!-- ══════════════════════════════════════════════
     TEMPERATURA — Módulo 08 — Completo
══════════════════════════════════════════════ -->
<div class="screen" id="screen-temperatura">
  <div class="h1">Temperatura</div>
  <div class="sub">Módulo 08 · Variável de Processo · Fonte: PPT SENAI MVFI · Slides 159–234</div>

  <div class="blk">
    <h3>O que é Temperatura?</h3>
    <p>Temperatura é a grandeza física que representa o <strong style="color:var(--pu)">estado termodinâmico de um corpo</strong> — ou seja, o grau de agitação das moléculas que o compõem. Quanto mais agitadas as moléculas, maior a temperatura.</p>
    <p style="margin-top:8px">Na indústria, é a variável de processo de maior impacto em reações químicas, propriedades de materiais, segurança de processos e qualidade do produto final.</p>
    <div class="grid g3" style="margin-top:12px">
      <div class="hl hl-pu"><div class="hl-hdr">Importância na Qualidade</div><p>Temperatura incorreta altera propriedades físico-químicas do produto: viscosidade, reatividade, cristalização, pasteurização.</p></div>
      <div class="hl hl-p"><div class="hl-hdr">Importância na Segurança</div><p>Superaquecimento em reatores exotérmicos pode causar runaway. Temperaturas extremas danificam equipamentos e colocam operadores em risco.</p></div>
      <div class="hl hl-g"><div class="hl-hdr">Importância no Processo</div><p>Controla taxas de reação (Arrhenius), ponto de ebulição/condensação, eficiência de transferência de calor e propriedades de fluidos.</p></div>
    </div>
  </div>

  <div class="blk">
    <h3>Unidades de Temperatura e Conversões</h3>
    <div class="grid g3" style="margin-top:8px">
      <div style="background:var(--bg);border:1px solid rgba(192,132,255,0.25);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--pu);margin-bottom:6px">°C — Celsius</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Padrão no Brasil e na maioria dos países. 0°C = ponto de fusão da água. 100°C = ponto de ebulição (1 atm).</p>
        <div style="font-family:var(--fm);font-size:11px;color:var(--t3);margin-top:8px">Inventor: Anders Celsius (1742)</div>
      </div>
      <div style="background:var(--bg);border:1px solid rgba(0,212,255,0.25);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--p);margin-bottom:6px">K — Kelvin</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Escala absoluta — zero absoluto = 0 K = −273,15°C. Usada em cálculos termodinâmicos, gases e leis físicas.</p>
        <div style="font-family:var(--fm);font-size:11px;color:var(--t3);margin-top:8px">K = °C + 273,15</div>
      </div>
      <div style="background:var(--bg);border:1px solid rgba(255,192,64,0.25);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--y);margin-bottom:6px">°F — Fahrenheit</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Usado nos EUA. 32°F = fusão da água. 212°F = ebulição. Ainda presente em instrumentos importados.</p>
        <div style="font-family:var(--fm);font-size:11px;color:var(--t3);margin-top:8px">°F = (°C × 9/5) + 32</div>
      </div>
    </div>
    <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px;margin-top:10px">
      <div style="font-size:11px;font-weight:600;color:var(--pu);margin-bottom:10px;text-transform:uppercase;letter-spacing:1px">Tabela de Conversão Rápida</div>
      <table class="tbl"><thead><tr><th>Celsius (°C)</th><th>Kelvin (K)</th><th>Fahrenheit (°F)</th><th>Referência</th></tr></thead>
      <tbody>
        <tr><td>−273,15</td><td>0</td><td>−459,67</td><td>Zero absoluto</td></tr>
        <tr><td>0</td><td>273,15</td><td>32</td><td>Fusão do gelo</td></tr>
        <tr><td>20</td><td>293,15</td><td>68</td><td>Temperatura ambiente</td></tr>
        <tr><td>100</td><td>373,15</td><td>212</td><td>Ebulição da água (1 atm)</td></tr>
        <tr><td>200</td><td>473,15</td><td>392</td><td>Típico de processos industriais</td></tr>
        <tr><td>600</td><td>873,15</td><td>1112</td><td>Forno industrial / termopar</td></tr>
        <tr><td>1200</td><td>1473,15</td><td>2192</td><td>Alto-forno / siderurgia</td></tr>
      </tbody></table>
    </div>
  </div>

  <div class="blk">
    <h3>Princípios Físicos de Medição de Temperatura</h3>
    <p>Segundo o PPT SENAI MVFI, existem 5 grupos de princípios físicos utilizados na instrumentação de temperatura:</p>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">

      <div class="xb" onclick="X(this)"><div class="xh"><span style="color:var(--p)">① Dilatação de Líquido — Termômetro de Bulbo</span><span class="xa">›</span></div>
      <div class="xbody">
        <p>O líquido (mercúrio, álcool, tolueno) expande-se com o calor e sobe no capilar de vidro. A leitura é feita na escala do tubo. É o método mais simples e antigo.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
          <div style="background:var(--bg3);border:1px solid var(--bd);border-radius:6px;padding:10px;font-size:12px;color:var(--t2)"><strong style="color:var(--p)">Mercúrio:</strong> faixa −38°C a +600°C. Alta precisão, mas tóxico. Uso restrito pela legislação ambiental.</div>
          <div style="background:var(--bg3);border:1px solid var(--bd);border-radius:6px;padding:10px;font-size:12px;color:var(--t2)"><strong style="color:var(--g)">Álcool/Tolueno:</strong> faixa −90°C a +150°C. Não-tóxico, colorido para fácil leitura. Menos preciso.</div>
        </div>
        <div class="alert ai" style="margin-top:8px">Medição local apenas — não gera sinal elétrico. Usado para indicação visual em laboratórios e plantas industriais de pequeno porte.</div>
      </div></div>

      <div class="xb" onclick="X(this)"><div class="xh"><span style="color:var(--g)">② Dilatação de Sólido — Termômetro Bimetálico</span><span class="xa">›</span></div>
      <div class="xbody">
        <p>Dois metais com coeficientes de dilatação diferentes são soldados juntos. Com a variação de temperatura, a lâmina curva proporcionalmente à temperatura — a curvatura aciona um ponteiro ou chave.</p>
        <ul>
          <li>Faixa: −50°C a +600°C típica</li>
          <li>Sem energia elétrica — leitura local em manômetros e termostatos</li>
          <li>Também usado como chave de temperatura (termostato liga/desliga)</li>
          <li>Aplicação industrial: controle de temperatura em painéis, termostatos de caldeiras</li>
        </ul>
      </div></div>

      <div class="xb" onclick="X(this)"><div class="xh"><span style="color:var(--y)">③ Pressão de Gás — Termômetro a Gás</span><span class="xa">›</span></div>
      <div class="xbody">
        <p>Baseado na Lei de Gay-Lussac: P/T = constante para gás confinado a volume fixo. A pressão do gás inerte (nitrogênio) em um bulbo selado varia linearmente com a temperatura. Um manômetro converte a pressão em leitura de temperatura.</p>
        <ul>
          <li>Faixa: −40°C a +600°C</li>
          <li>Robusto, sem parte elétrica, imune a vibrações</li>
          <li>Utilizado em processos com risco de explosão (áreas classificadas)</li>
        </ul>
      </div></div>

      <div class="xb" onclick="X(this)"><div class="xh"><span style="color:var(--or)">④ Pressão de Vapor — Termômetro a Vapor</span><span class="xa">›</span></div>
      <div class="xbody">
        <p>Usa a relação não-linear entre temperatura e pressão de vapor saturado de um líquido volátil (propano, éter, cloreto de metila). A curva de saturação determina a temperatura pela pressão medida.</p>
        <ul>
          <li>Não-linear — requer escala especial calibrada para o fluido</li>
          <li>Boa sensibilidade em faixas estreitas</li>
          <li>Aplicação: refrigeração industrial, indústria petroquímica</li>
        </ul>
      </div></div>

      <div class="xb" onclick="X(this)"><div class="xh"><span style="color:var(--pu)">⑤ Resistência Elétrica — RTD / PT100 / Termistor</span><span class="xa">›</span></div>
      <div class="xbody">
        <p>A resistência elétrica dos metais aumenta linearmente com a temperatura (RTD) ou diminui exponencialmente (NTC) ou aumenta abruptamente (PTC).</p>
        <div class="grid g3" style="margin-top:8px">
          <div style="background:var(--bg3);border:1px solid rgba(192,132,255,0.2);border-radius:6px;padding:10px">
            <div style="font-size:11px;font-weight:600;color:var(--pu);margin-bottom:4px">PT100</div>
            <div style="font-size:11px;color:var(--t2);line-height:1.5">Platina · R=100Ω a 0°C · α=0,00385 Ω/°C. Faixa: −200°C a +850°C. Alta precisão. Padrão industrial.</div>
          </div>
          <div style="background:var(--bg3);border:1px solid rgba(192,132,255,0.2);border-radius:6px;padding:10px">
            <div style="font-size:11px;font-weight:600;color:var(--pu);margin-bottom:4px">PT1000</div>
            <div style="font-size:11px;color:var(--t2);line-height:1.5">R=1000Ω a 0°C. Mesma platina, mais sensível. Usado em circuitos de baixo ruído e longas distâncias.</div>
          </div>
          <div style="background:var(--bg3);border:1px solid var(--bd);border-radius:6px;padding:10px">
            <div style="font-size:11px;font-weight:600;color:var(--t2);margin-bottom:4px">NTC / PTC</div>
            <div style="font-size:11px;color:var(--t2);line-height:1.5">Termistores cerâmicos. NTC: resistência cai. PTC: resistência sobe. Muito sensíveis. Eletrônicos e HVAC.</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--t3);margin-top:10px">Conexão ao transmissor: 2 fios (básico), 3 fios (compensa resistência do cabo), 4 fios (máxima precisão — elimina toda resistência de cabo).</div>
      </div></div>

      <div class="xb" onclick="X(this)"><div class="xh"><span style="color:var(--r)">⑥ Termopar — Efeito Seebeck</span><span class="xa">›</span></div>
      <div class="xbody">
        <p>Quando dois metais diferentes são unidos em uma junção e a junção é aquecida, gera-se uma tensão termoelétrica (mV) proporcional à diferença de temperatura entre a junção quente (processo) e a junção fria (referência). Chamado de Efeito Seebeck (1821).</p>
        <div class="alert ai" style="margin-bottom:10px">O termopar é o sensor de temperatura mais robusto, barato e com maior faixa de medição da indústria. É gerador de sinal — não precisa de alimentação.</div>
        <table class="tbl"><thead><tr><th>Tipo</th><th>Materiais (+/−)</th><th>Faixa °C</th><th>Sensibilidade</th><th>Aplicação típica</th></tr></thead>
        <tbody>
          <tr><td style="color:var(--p)">J</td><td>Ferro / Constantan</td><td>−210 a +760</td><td>~52 µV/°C</td><td>Plásticos, polímeros, processos gerais</td></tr>
          <tr><td style="color:var(--g)">K</td><td>Chromel / Alumel</td><td>−270 a +1260</td><td>~41 µV/°C</td><td>Mais usado no mundo — fornos, caldeiras, gases</td></tr>
          <tr><td style="color:var(--y)">T</td><td>Cobre / Constantan</td><td>−270 a +370</td><td>~43 µV/°C</td><td>Criogenia, refrigeração, alimentos</td></tr>
          <tr><td style="color:var(--or)">E</td><td>Chromel / Constantan</td><td>−270 a +870</td><td>~68 µV/°C</td><td>Maior sensibilidade — aplicações críticas</td></tr>
          <tr><td style="color:var(--r)">N</td><td>Nicrosil / Nisil</td><td>−270 a +1300</td><td>~38 µV/°C</td><td>Alternativa moderna ao tipo K, mais estável</td></tr>
          <tr><td style="color:var(--t2)">R</td><td>Pt-Rh 13% / Pt</td><td>−50 a +1480</td><td>~10 µV/°C</td><td>Siderurgia, vidro, alta precisão</td></tr>
          <tr><td style="color:var(--t2)">S</td><td>Pt-Rh 10% / Pt</td><td>−50 a +1480</td><td>~10 µV/°C</td><td>Padrão de calibração, indústria nuclear</td></tr>
          <tr><td style="color:var(--t2)">B</td><td>Pt-Rh 30% / Pt-Rh 6%</td><td>+50 a +1820</td><td>~6 µV/°C</td><td>Maior temperatura — aço, vidro, cerâmica</td></tr>
        </tbody></table>
        <div class="alert aw" style="margin-top:10px">O termopar gera sinal em mV — muito baixo e sensível a ruídos. Deve ser conectado ao transmissor com cabo de compensação do mesmo tipo (ex: cabo tipo K para termopar K). Cabo comum introduz erro.</div>
      </div></div>

    </div>
  </div>

  <div class="blk">
    <h3>Comportamento Dinâmico — Tempo de Resposta</h3>
    <p>Diferente de pressão e nível, a temperatura tem <strong style="color:var(--pu)">inércia térmica</strong> — o sensor demora um tempo para equilibrar sua temperatura com o processo. Dois parâmetros definem isso:</p>
    <div class="grid g2" style="margin-top:10px">
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--pu);margin-bottom:6px">Constante de Tempo (τ)</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Tempo para o sensor atingir 63,2% da variação total após um degrau de temperatura. Depende da massa do sensor, condutividade e velocidade do fluido.</p>
        <div style="font-family:var(--fm);font-size:11px;color:var(--t3);margin-top:6px">Termopar nu: τ ≈ 0,1s — 1s &nbsp;|&nbsp; PT100 com poço: τ ≈ 10s — 60s</div>
      </div>
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px">
        <div style="font-size:13px;font-weight:600;color:var(--p);margin-bottom:6px">Tempo de Resposta (t95)</div>
        <p style="font-size:12px;color:var(--t2);line-height:1.6">Tempo para atingir 95% da variação total (≈ 3τ). Crítico em processos rápidos como pasteurização e reações exotérmicas.</p>
        <div style="font-family:var(--fm);font-size:11px;color:var(--t3);margin-top:6px">Reduz com: fluido em alta velocidade, sensor de menor massa, boa condução (pasta térmica).</div>
      </div>
    </div>
  </div>

  <div class="blk">
    <h3>Transmissores de Temperatura</h3>
    <p>Convertem o sinal elétrico fraco do sensor (mV para termopar, Ω para RTD) em sinal padronizado 4–20 mA ou digital (HART, PROFIBUS) para transmissão ao CLP/SCADA.</p>
    <table class="tbl"><thead><tr><th>Tipo</th><th>Entrada</th><th>Saída</th><th>Característica</th></tr></thead>
    <tbody>
      <tr><td>Transmissor de cabeçote</td><td>TC ou RTD</td><td>4–20 mA / HART</td><td>Instalado diretamente no sensor. Compacto, menor custo de instalação.</td></tr>
      <tr><td>Transmissor de campo</td><td>TC ou RTD</td><td>4–20 mA / HART / FF</td><td>Montado separado, resistente. Configurável para múltiplos tipos de sensor.</td></tr>
      <tr><td>Transmissor DIN rail</td><td>TC, RTD, mV</td><td>4–20 mA / 0–10V</td><td>Instalado em painel. Econômico para múltiplos canais.</td></tr>
    </tbody></table>
    <div class="alert ag" style="margin-top:8px">O transmissor realiza linearização automática (compensação de junção fria para termopares, conversão Ω→°C para RTD) e entrega sinal linear em 4–20 mA proporcional à faixa configurada.</div>
  </div>

  <div class="blk">
    <h3>Poço Termopar / Termopoço (Thermowell)</h3>
    <p>Tubo de proteção metálico ou cerâmico que isola o sensor do fluido de processo. Permite trocar o sensor sem interromper o processo (sem abertura da linha).</p>
    <ul>
      <li><strong style="color:var(--pu)">Vantagem:</strong> protege o sensor de pressão, velocidade e fluidos corrosivos</li>
      <li><strong style="color:var(--r)">Desvantagem:</strong> aumenta significativamente a constante de tempo τ — resposta mais lenta</li>
      <li>Material: aço inox 316L (padrão), Hastelloy (corrosivo), cerâmica (alta T)</li>
      <li>Comprimento de imersão (U): deve ser ≥ 10× o diâmetro do poço para boa troca de calor</li>
    </ul>
  </div>

  <div class="blk">
    <h3>Segurança na Medição de Temperatura</h3>
    <div class="alert aw">
      <strong>Riscos principais:</strong> queimaduras por contato com sensores quentes (termopares operam até 1300°C), risco elétrico em transmissores, rompimento de poços termopar por vibração excessiva (ressonância de von Kármán).
    </div>
    <ul style="margin-top:8px">
      <li>Sempre usar EPIs (luvas térmicas, óculos) ao manusear sensores em processo</li>
      <li>Verificar pressão da linha antes de remover um sensor sem poço termopar</li>
      <li>Validar a frequência natural do termopoço vs. frequência de vórtices do fluido</li>
      <li>Usar cabos de compensação adequados ao tipo de termopar — cabo errado gera erros grandes</li>
    </ul>
  </div>

  <div class="blk">
    <h3>Calibração de Instrumentos de Temperatura</h3>
    <p>A calibração de sensores de temperatura exige padrões de temperatura rastreáveis e ambiente controlado. É uma das calibrações mais delicadas — erros de referência ou condução de calor no sensor afetam diretamente o resultado.</p>
    <div class="grid g2" style="margin-top:10px">
      <div style="background:var(--bg4);border:1px solid rgba(192,132,255,0.2);border-radius:8px;padding:14px">
        <div style="font-size:12px;font-weight:600;color:var(--pu);margin-bottom:8px">Padrões de temperatura utilizados</div>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--pu)">›</span><strong>Banho de temperatura:</strong> líquido estabilizado em temperatura conhecida — precisão ±0,05°C</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--pu)">›</span><strong>Forno de calibração (dry block):</strong> bloco metálico aquecido com uniformidade — portátil, prático para campo</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--pu)">›</span><strong>Ponto fixo (ponto de fusão):</strong> padrão primário — água (0°C), gelo seco (−78,5°C), galium (29,76°C)</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--pu)">›</span><strong>PT100 de referência:</strong> RTD calibrado de alta precisão (classe AA ou 1/10 DIN)</li>
        </ul>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:14px">
        <div style="font-size:12px;font-weight:600;color:var(--p);margin-bottom:8px">Procedimento para PT100 / Termopar</div>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">1</span>Inserir o sensor e o padrão no banho/dry block</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">2</span>Estabilizar a temperatura em cada ponto (aguardar τ)</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">3</span>Comparar indicação do sensor com o padrão</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">4</span>Registrar As Found em pelo menos 5 pontos</li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0 3px 14px;position:relative"><span style="position:absolute;left:0;color:var(--p)">5</span>Ajustar o transmissor (se sensor não substituível)</li>
        </ul>
      </div>
    </div>
    <div class="alert aw" style="margin-top:8px">Sensores de temperatura (termopar, PT100) geralmente não são ajustáveis — o erro do sensor é documentado e compensado no transmissor. Sensores com desvio excessivo são substituídos.</div>
    <div style="text-align:center;margin-top:10px"><button class="btn btn-pu" onclick="S('calibracao')" style="padding:6px 16px;font-size:12px">Ver Módulo Calibração completo →</button></div>
  </div>
</div>

<!-- ══════════════════════════════════════════════
     CALIBRAÇÃO — Módulo 11
══════════════════════════════════════════════ -->
<div class="screen" id="screen-calibracao">
  <div class="h1">Calibração de Instrumentos</div>
  <div class="sub">Módulo 11 · Metrologia Industrial · Fonte: PPT SENAI MVFI — todos os módulos</div>

  <div class="blk">
    <h3>O que é Calibração?</h3>
    <p>Calibração é o <strong style="color:var(--y)">conjunto de operações que estabelece a relação entre os valores indicados por um instrumento de medição e os valores correspondentes conhecidos de uma grandeza</strong>, determinada por um padrão rastreável.</p>
    <p style="margin-top:8px">Segundo o <strong style="color:var(--y)">VIM (Vocabulário Internacional de Metrologia)</strong>, calibração não inclui o ajuste do instrumento — é apenas a verificação e documentação do erro. O ajuste para corrigir o erro é chamado de <em>ajuste</em> ou <em>regulagem</em>.</p>
    <div class="alert ay">Na prática industrial, o termo "calibração" costuma incluir tanto a verificação quanto o ajuste. O que importa é que ao final, o instrumento opere dentro dos limites de erro aceitáveis.</div>
  </div>

  <div class="blk">
    <h3>Por que Calibrar?</h3>
    <div class="grid g2" style="margin-top:8px">
      <div class="hl hl-y"><div class="hl-hdr">Qualidade do Produto</div><p>Instrumento descalibrado gera medições erradas → produto fora de especificação → rejeição, retrabalho, prejuízo.</p></div>
      <div class="hl hl-g"><div class="hl-hdr">Segurança</div><p>Um pressostato descalibrado pode não atuar no momento certo → superação de limites → explosão ou acidente.</p></div>
      <div class="hl hl-p"><div class="hl-hdr">Rastreabilidade e Normas</div><p>ISO 9001, ANVISA, regulamentações de petróleo e gás exigem calibração rastreável ao INMETRO/BIPM com certificado válido.</p></div>
      <div class="hl hl-pu"><div class="hl-hdr">Faturamento Fiscal</div><p>Medidores de gás natural, energia elétrica e água usados para faturamento devem ser calibrados por laboratórios acreditados.</p></div>
    </div>
  </div>

  <div class="blk">
    <h3>Rastreabilidade Metrológica</h3>
    <p>Cadeia de comparações que liga a medição do instrumento ao padrão nacional e internacional:</p>
    <div style="display:flex;flex-direction:column;gap:0;margin-top:12px">
      <div style="background:rgba(255,192,64,0.08);border:1px solid rgba(255,192,64,0.25);border-radius:8px 8px 0 0;padding:12px 16px;display:flex;align-items:center;gap:12px">
        <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,192,64,0.2);border:2px solid var(--y);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--y);flex-shrink:0">1</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--y)">BIPM — Bureau Internacional de Pesos e Medidas</div><div style="font-size:11px;color:var(--t3)">Padrão primário mundial (Paris, França)</div></div>
      </div>
      <div style="background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.2);border-top:none;padding:12px 16px;display:flex;align-items:center;gap:12px">
        <div style="width:28px;height:28px;border-radius:50%;background:rgba(0,212,255,0.15);border:2px solid var(--p);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--p);flex-shrink:0">2</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--p)">INMETRO — Instituto Nacional de Metrologia</div><div style="font-size:11px;color:var(--t3)">Padrão primário nacional brasileiro — rastreável ao BIPM</div></div>
      </div>
      <div style="background:rgba(0,255,157,0.05);border:1px solid rgba(0,255,157,0.18);border-top:none;padding:12px 16px;display:flex;align-items:center;gap:12px">
        <div style="width:28px;height:28px;border-radius:50%;background:rgba(0,255,157,0.12);border:2px solid var(--g);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--g);flex-shrink:0">3</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--g)">Laboratórios Acreditados (RBC)</div><div style="font-size:11px;color:var(--t3)">Rede Brasileira de Calibração — laboratórios certificados pelo INMETRO</div></div>
      </div>
      <div style="background:var(--bg4);border:1px solid var(--bd);border-top:none;border-radius:0 0 8px 8px;padding:12px 16px;display:flex;align-items:center;gap:12px">
        <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.08);border:2px solid var(--t3);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--t2);flex-shrink:0">4</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--t2)">Instrumento do processo industrial</div><div style="font-size:11px;color:var(--t3)">Calibrado contra o padrão do laboratório acreditado — certificado com número rastreável</div></div>
      </div>
    </div>
  </div>

  <div class="blk">
    <h3>Procedimento de Calibração — Passo a Passo</h3>
    <p>O procedimento padrão utilizado no SENAI e na indústria para calibração de transmissores (pressão, nível, temperatura, vazão):</p>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:12px">

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px;display:flex;gap:12px">
        <div style="width:32px;height:32px;border-radius:50%;background:rgba(0,212,255,0.15);border:2px solid var(--p);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:13px;font-weight:700;color:var(--p);flex-shrink:0">1</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--p);margin-bottom:4px">Identificação e Documentação</div><div style="font-size:12px;color:var(--t2);line-height:1.6">Registrar: TAG do instrumento, fabricante, modelo, número de série, data da última calibração, faixa de operação (LRV/URV), tolerância admissível e padrão utilizado.</div></div>
      </div>

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px;display:flex;gap:12px">
        <div style="width:32px;height:32px;border-radius:50%;background:rgba(0,255,157,0.12);border:2px solid var(--g);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:13px;font-weight:700;color:var(--g);flex-shrink:0">2</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--g);margin-bottom:4px">Verificação Inicial (As Found)</div><div style="font-size:12px;color:var(--t2);line-height:1.6">Aplicar os 5 pontos de calibração (0%, 25%, 50%, 75%, 100% do span) em ordem crescente e depois decrescente. Registrar o sinal de saída indicado para cada ponto. Isso documenta o estado do instrumento ANTES do ajuste.</div></div>
      </div>

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px;display:flex;gap:12px">
        <div style="width:32px;height:32px;border-radius:50%;background:rgba(255,192,64,0.12);border:2px solid var(--y);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:13px;font-weight:700;color:var(--y);flex-shrink:0">3</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--y);margin-bottom:4px">Cálculo dos Erros</div><div style="font-size:12px;color:var(--t2);line-height:1.6">Para cada ponto: Erro = Indicado − Padrão. Calcular erro em %FS e %Span. Comparar com a tolerância especificada. Se todos os erros estiverem dentro da tolerância → instrumento aprovado. Se não → ajuste necessário.</div></div>
      </div>

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px;display:flex;gap:12px">
        <div style="width:32px;height:32px;border-radius:50%;background:rgba(255,144,64,0.12);border:2px solid var(--or);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:13px;font-weight:700;color:var(--or);flex-shrink:0">4</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--or);margin-bottom:4px">Ajuste (quando necessário)</div>
        <div style="font-size:12px;color:var(--t2);line-height:1.6">
          <strong style="color:var(--or)">Ajuste de Zero:</strong> aplica-se 0% (LRV) e ajusta-se o potenciômetro/parâmetro de zero até a saída ser 4,00 mA (ou 0% da escala).<br>
          <strong style="color:var(--or)">Ajuste de Span:</strong> aplica-se 100% (URV) e ajusta-se o span até a saída ser 20,00 mA (ou 100% da escala).<br>
          Repetir em ciclos zero → span → zero até convergir dentro da tolerância.
        </div></div>
      </div>

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px;display:flex;gap:12px">
        <div style="width:32px;height:32px;border-radius:50%;background:rgba(192,132,255,0.12);border:2px solid var(--pu);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:13px;font-weight:700;color:var(--pu);flex-shrink:0">5</div>
        <div><div style="font-size:13px;font-weight:600;color:var(--pu);margin-bottom:4px">Verificação Final (As Left) e Relatório</div><div style="font-size:12px;color:var(--t2);line-height:1.6">Repetir os 5 pontos após o ajuste. Documentar os novos erros (As Left). Emitir o Certificado/Relatório de Calibração com: data, padrões utilizados, resultados As Found e As Left, assinatura do calibrador e prazo da próxima calibração.</div></div>
      </div>

    </div>
  </div>

  <div class="blk">
    <h3>Tabela de Pontos de Calibração — Exemplo</h3>
    <p style="font-size:12px;color:var(--t2);margin-bottom:10px">Transmissor de pressão: 0–10 bar → 4–20 mA. Tolerância: ±0,5% FS = ±0,05 bar = ±0,08 mA</p>
    <table class="tbl"><thead><tr><th>Ponto</th><th>Pressão padrão (bar)</th><th>Saída esperada (mA)</th><th>Saída medida (mA)</th><th>Erro (mA)</th><th>Erro %FS</th><th>Situação</th></tr></thead>
    <tbody>
      <tr><td>0% (LRV)</td><td>0,00</td><td>4,00</td><td>4,02</td><td>+0,02</td><td>+0,13%</td><td style="color:var(--g)">✓ OK</td></tr>
      <tr><td>25%</td><td>2,50</td><td>8,00</td><td>8,05</td><td>+0,05</td><td>+0,31%</td><td style="color:var(--g)">✓ OK</td></tr>
      <tr><td>50%</td><td>5,00</td><td>12,00</td><td>12,09</td><td>+0,09</td><td>+0,56%</td><td style="color:var(--r)">✗ Fora</td></tr>
      <tr><td>75%</td><td>7,50</td><td>16,00</td><td>16,11</td><td>+0,11</td><td>+0,69%</td><td style="color:var(--r)">✗ Fora</td></tr>
      <tr><td>100% (URV)</td><td>10,00</td><td>20,00</td><td>20,12</td><td>+0,12</td><td>+0,75%</td><td style="color:var(--r)">✗ Fora</td></tr>
    </tbody></table>
    <div class="alert aw" style="margin-top:8px">Instrumento fora da tolerância nos pontos 50%, 75% e 100% — necessita ajuste de span. O erro cresce com a variável → indicativo de erro de ganho (span incorreto), não de zero.</div>
  </div>

  <div class="blk">
    <h3>Relatório de Calibração — Campos Obrigatórios</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:7px;padding:12px">
        <div style="font-size:11px;font-weight:600;color:var(--y);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Identificação</div>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--y)">›</span>TAG do instrumento (ex: PT-101)
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--y)">›</span>Fabricante, modelo e nº de série
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--y)">›</span>Localização na planta (P&ID)
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--y)">›</span>Faixa de medição (LRV / URV)
          </li>
        </ul>
      </div>
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:7px;padding:12px">
        <div style="font-size:11px;font-weight:600;color:var(--p);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Rastreabilidade</div>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--p)">›</span>Padrão usado (nº certificado)
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--p)">›</span>Laboratório acreditado (RBC)
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--p)">›</span>Temperatura e umidade do ambiente
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--p)">›</span>Data e hora da calibração
          </li>
        </ul>
      </div>
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:7px;padding:12px">
        <div style="font-size:11px;font-weight:600;color:var(--g);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Resultados</div>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--g)">›</span>Tabela As Found (antes do ajuste)
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--g)">›</span>Tabela As Left (após ajuste)
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--g)">›</span>Erros calculados em %FS e %Span
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--g)">›</span>Conclusão: Aprovado / Reprovado
          </li>
        </ul>
      </div>
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:7px;padding:12px">
        <div style="font-size:11px;font-weight:600;color:var(--pu);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Assinaturas e Validade</div>
        <ul style="list-style:none;padding:0">
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--pu)">›</span>Nome e assinatura do calibrador
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--pu)">›</span>Aprovação da supervisão / engenharia
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--pu)">›</span>Data da próxima calibração
          </li>
          <li style="font-size:12px;color:var(--t2);padding:3px 0;padding-left:14px;position:relative">
            <span style="position:absolute;left:0;color:var(--pu)">›</span>Nº do relatório para rastreabilidade
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="blk">
    <h3>Periodicidade de Calibração</h3>
    <table class="tbl"><thead><tr><th>Critério</th><th>Fator que aumenta frequência</th><th>Fator que diminui frequência</th></tr></thead>
    <tbody>
      <tr><td>Criticidade do processo</td><td>Instrumento em malha de segurança (SIS)</td><td>Instrumento apenas indicador local</td></tr>
      <tr><td>Condições do fluido</td><td>Temperatura extrema, corrosivo, vibrações</td><td>Fluido limpo, temperatura ambiente</td></tr>
      <tr><td>Histórico do instrumento</td><td>Desvios frequentes nas calibrações passadas</td><td>Instrumento consistentemente estável</td></tr>
      <tr><td>Exigência normativa</td><td>ISO 9001, ANVISA, ANP exigem intervalos máximos</td><td>Processo sem requisito regulatório</td></tr>
    </tbody></table>
    <div class="alert ag" style="margin-top:8px">Frequência típica na indústria: 6 meses a 2 anos para instrumentos de processo. Instrumentos de segurança (SIS/SIL): podem exigir calibração mensal ou semestral conforme análise de risco.</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════
     BERNOULLI & CONTINUIDADE — Simulador v2
══════════════════════════════════════════════ -->
<div class="screen" id="screen-bernoulli">
  <div class="h1">Simulador — Continuidade &amp; Bernoulli</div>
  <div class="sub">Duas equações separadas · Passo a passo completo · Com valores numéricos substituídos</div>

  <!-- ── DADOS DE ENTRADA ── -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin-bottom:14px">

    <!-- Fluido -->
    <div class="blk" style="margin:0">
      <h3>Fluido</h3>
      <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:5px">ρ — Massa Específica (kg/m³)</label>
      <input id="b-rho" type="number" value="1000" step="0.1" min="0.01" style="background:var(--bg);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm);margin-bottom:8px">
      <div style="display:flex;gap:5px;flex-wrap:wrap">
        <button class="btn" style="padding:4px 9px;font-size:11px" onclick="document.getElementById('b-rho').value=1000">Água 1000</button>
        <button class="btn" style="padding:4px 9px;font-size:11px" onclick="document.getElementById('b-rho').value=850">Óleo 850</button>
        <button class="btn" style="padding:4px 9px;font-size:11px" onclick="document.getElementById('b-rho').value=1.2">Ar 1,2</button>
        <button class="btn" style="padding:4px 9px;font-size:11px" onclick="document.getElementById('b-rho').value=0.6">Vapor 0,6</button>
      </div>
    </div>

    <!-- S1 -->
    <div class="blk" style="margin:0;border-color:rgba(0,212,255,0.25)">
      <h3 style="color:var(--p)">Seção 1 — Entrada</h3>
      <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">D₁ — Diâmetro (m)</label>
      <input id="b-d1" type="number" value="0.1" step="0.001" min="0.001" style="background:var(--bg);border:1px solid rgba(0,212,255,0.25);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm);margin-bottom:10px">
      <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">V₁ — Velocidade (m/s)</label>
      <input id="b-v1" type="number" value="2" step="0.1" min="0" style="background:var(--bg);border:1px solid rgba(0,212,255,0.25);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm);margin-bottom:10px">
      <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">P₁ — Pressão (Pa)</label>
      <input id="b-p1" type="number" value="220000" step="100" style="background:var(--bg);border:1px solid rgba(0,212,255,0.25);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm);margin-bottom:4px">
      <div style="font-size:10px;color:var(--t3);margin-bottom:10px">220.000 Pa ≈ 2,2 bar manométrico</div>
      <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">z₁ — Altura (m) <span style="font-weight:400">padrão 0</span></label>
      <input id="b-z1" type="number" value="0" step="0.1" style="background:var(--bg);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm)">
    </div>

    <!-- S2 -->
    <div class="blk" style="margin:0;border-color:rgba(0,255,157,0.25)">
      <h3 style="color:var(--g)">Seção 2 — Saída</h3>
      <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">D₂ — Diâmetro (m)</label>
      <input id="b-d2" type="number" value="0.05" step="0.001" min="0.001" style="background:var(--bg);border:1px solid rgba(0,255,157,0.25);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm);margin-bottom:4px">
      <div style="font-size:10px;color:var(--t3);margin-bottom:10px">D₂ &lt; D₁ → fluido acelera → pressão cai</div>
      <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">z₂ — Altura (m) <span style="font-weight:400">padrão 0</span></label>
      <input id="b-z2" type="number" value="0" step="0.1" style="background:var(--bg);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm);margin-bottom:4px">
      <div style="font-size:10px;color:var(--t3);margin-bottom:14px">z₂ &gt; z₁ → fluido sobe → P₂ cai ainda mais</div>
      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:12px">
        <div style="font-size:11px;color:var(--t3);margin-bottom:8px">Serão calculados pelo simulador:</div>
        <div style="font-family:var(--fm);font-size:13px;color:var(--t3)">V₂ = <span style="color:var(--g)">?</span> m/s</div>
        <div style="font-family:var(--fm);font-size:13px;color:var(--t3);margin-top:4px">P₂ = <span style="color:var(--g)">?</span> Pa</div>
      </div>
    </div>

  </div>

  <!-- ERRO -->
  <div id="b-err" style="display:none;background:rgba(255,85,102,0.08);border:1px solid rgba(255,85,102,0.25);border-radius:8px;padding:11px 14px;font-size:13px;color:#ff7080;margin-bottom:12px"></div>

  <!-- BOTÕES -->
  <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap">
    <button class="btn btn-g" onclick="bernCalc()" style="flex:2;padding:13px;font-size:15px;font-weight:600">⚡ Calcular passo a passo</button>
    <button class="btn" onclick="bernReset()" style="flex:1;padding:13px">↺ Resetar</button>
  </div>

  <!-- ══ RESULTADO CONTINUIDADE ══ -->
  <div id="b-cont" style="display:none;margin-bottom:14px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="width:32px;height:32px;border-radius:50%;background:rgba(0,212,255,0.15);border:2px solid var(--p);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:14px;font-weight:700;color:var(--p);flex-shrink:0">1</div>
      <div>
        <div style="font-size:16px;font-weight:600;color:var(--p)">Equação da Continuidade</div>
        <div style="font-size:11px;color:var(--t3)">Conservação de massa — calcula a velocidade na Seção 2</div>
      </div>
    </div>
    <div id="b-cont-body" style="background:var(--bg3);border:1px solid rgba(0,212,255,0.2);border-radius:10px;padding:18px"></div>
  </div>

  <!-- ══ RESULTADO BERNOULLI ══ -->
  <div id="b-bern" style="display:none;margin-bottom:14px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="width:32px;height:32px;border-radius:50%;background:rgba(0,255,157,0.12);border:2px solid var(--g);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:14px;font-weight:700;color:var(--g);flex-shrink:0">2</div>
      <div>
        <div style="font-size:16px;font-weight:600;color:var(--g)">Equação de Bernoulli</div>
        <div style="font-size:11px;color:var(--t3)">Conservação de energia — calcula a pressão na Seção 2</div>
      </div>
    </div>
    <div id="b-bern-body" style="background:var(--bg3);border:1px solid rgba(0,255,157,0.2);border-radius:10px;padding:18px"></div>
  </div>

  <!-- ══ RESUMO FINAL ══ -->
  <div id="b-summary" style="display:none;margin-bottom:20px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="width:32px;height:32px;border-radius:50%;background:rgba(255,192,64,0.12);border:2px solid var(--y);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:14px;font-weight:700;color:var(--y);flex-shrink:0">✓</div>
      <div>
        <div style="font-size:16px;font-weight:600;color:var(--y)">Resumo dos Resultados</div>
        <div style="font-size:11px;color:var(--t3)">Todos os valores calculados em um só lugar</div>
      </div>
    </div>
    <div id="b-summary-body" style="background:var(--bg3);border:1px solid rgba(255,192,64,0.2);border-radius:10px;padding:18px"></div>
  </div>

  <!-- EXEMPLOS -->
  <div class="blk">
    <h3>Exemplos prontos — clique para carregar e calcular</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-top:10px">
      <div style="background:var(--bg4);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:12px;cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor='var(--p)'" onmouseout="this.style.borderColor='rgba(0,212,255,0.2)'" onclick="bernEx(1000,0.1,2,220000,0.05,0,0)">
        <div style="font-size:11px;font-weight:600;color:var(--p);margin-bottom:6px">Placa de Orifício</div>
        <div style="font-size:11px;color:var(--t3);line-height:1.6">Água · D1=10cm → D2=5cm<br>V1=2 m/s · P1=2,2 bar<br>Tubo horizontal (z=0)</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(0,255,157,0.2);border-radius:8px;padding:12px;cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor='var(--g)'" onmouseout="this.style.borderColor='rgba(0,255,157,0.2)'" onclick="bernEx(1000,0.15,1.5,300000,0.08,0,3)">
        <div style="font-size:11px;font-weight:600;color:var(--g);margin-bottom:6px">Bomba com Desnível</div>
        <div style="font-size:11px;color:var(--t3);line-height:1.6">Água · D1=15cm → D2=8cm<br>V1=1,5 m/s · P1=3 bar<br>S2 está 3 m acima de S1</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(255,192,64,0.2);border-radius:8px;padding:12px;cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor='var(--y)'" onmouseout="this.style.borderColor='rgba(255,192,64,0.2)'" onclick="bernEx(850,0.2,0.8,500000,0.1,0,0)">
        <div style="font-size:11px;font-weight:600;color:var(--y);margin-bottom:6px">Oleoduto</div>
        <div style="font-size:11px;color:var(--t3);line-height:1.6">Óleo ρ=850 · D1=20cm → D2=10cm<br>V1=0,8 m/s · P1=5 bar<br>Tubo horizontal</div>
      </div>
      <div style="background:var(--bg4);border:1px solid rgba(192,132,255,0.2);border-radius:8px;padding:12px;cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor='var(--pu)'" onmouseout="this.style.borderColor='rgba(192,132,255,0.2)'" onclick="bernEx(1.2,0.3,15,110000,0.15,0,0)">
        <div style="font-size:11px;font-weight:600;color:var(--pu);margin-bottom:6px">Duto de Ar / HVAC</div>
        <div style="font-size:11px;color:var(--t3);line-height:1.6">Ar ρ=1,2 · D1=30cm → D2=15cm<br>V1=15 m/s · P1≈1,1 bar<br>Sistema de ventilação</div>
      </div>
    </div>
  </div>

  <div class="alert ai" style="margin-top:12px">Fluido incompressível, escoamento permanente e sem perdas de carga (Bernoulli ideal). Em projetos reais, inclua o fator de atrito de Darcy-Weisbach.</div>
</div>

<script>
function bernEx(rho,d1,v1,p1,d2,z1,z2){
  document.getElementById('b-rho').value=rho;
  document.getElementById('b-d1').value=d1;
  document.getElementById('b-v1').value=v1;
  document.getElementById('b-p1').value=p1;
  document.getElementById('b-d2').value=d2;
  document.getElementById('b-z1').value=z1;
  document.getElementById('b-z2').value=z2;
  bernCalc();
}

function bernCalc(){
  const rho=parseFloat(document.getElementById('b-rho').value);
  const d1=parseFloat(document.getElementById('b-d1').value);
  const v1=parseFloat(document.getElementById('b-v1').value);
  const p1=parseFloat(document.getElementById('b-p1').value);
  const d2=parseFloat(document.getElementById('b-d2').value);
  const z1=parseFloat(document.getElementById('b-z1').value)||0;
  const z2=parseFloat(document.getElementById('b-z2').value)||0;
  const g=9.81;
  const errEl=document.getElementById('b-err');
  errEl.style.display='none';
  ['b-cont','b-bern','b-summary'].forEach(id=>document.getElementById(id).style.display='none');

  if([rho,d1,v1,p1,d2].some(isNaN)){
    errEl.textContent='Preencha todos os campos obrigatórios.';
    errEl.style.display='block';return;
  }
  if(d1<=0||d2<=0||rho<=0){
    errEl.textContent='Diâmetros e massa específica devem ser maiores que zero.';
    errEl.style.display='block';return;
  }

  /* ─── Cálculos ─── */
  const a1=Math.PI*Math.pow(d1/2,2);
  const a2=Math.PI*Math.pow(d2/2,2);
  const v2=v1*(a1/a2);
  const termCin = rho*(Math.pow(v1,2)-Math.pow(v2,2))/2;
  const termPot = rho*g*(z1-z2);
  const p2=p1+termCin+termPot;
  const qv=a1*v1;
  const re1=rho*v1*d1/0.001;
  const re2=rho*v2*d2/0.001;
  const regLabel=re=>re<2300?'Laminar':re<4000?'Transição':'Turbulento';
  const regColor=re=>re<2300?'var(--g)':re<4000?'var(--y)':'var(--r)';
  const dp=p1-p2;
  const horizontal=(z1===z2);

  /* ─── helper: linha de passo ─── */
  const step=(num,color,title,body)=>`
  <div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--bd)">
    <div style="width:26px;height:26px;border-radius:50%;background:${color}1a;border:1px solid ${color}55;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:12px;font-weight:700;color:${color};flex-shrink:0;margin-top:1px">${num}</div>
    <div style="flex:1">
      <div style="font-size:11px;font-weight:600;color:${color};text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px">${title}</div>
      ${body}
    </div>
  </div>`;

  const mathBox=(color,content)=>`<div style="background:var(--bg);border:1px solid ${color}30;border-radius:7px;padding:12px 16px;font-size:13px;color:var(--t2);line-height:2.4;margin:6px 0">${content}</div>`;

  const resultBox=(color,label,value,sub='')=>`
  <div style="background:${color}10;border:1px solid ${color}30;border-radius:8px;padding:12px 16px;margin-top:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
    <div style="font-size:13px;color:var(--t2)">${label}</div>
    <div style="text-align:right">
      <div style="font-size:20px;font-weight:700;color:${color};font-family:var(--fm)">${value}</div>
      ${sub?`<div style="font-size:11px;color:var(--t3)">${sub}</div>`:''}
    </div>
  </div>`;

  const miniCard=(label,value,sub,color='var(--p)')=>`
  <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:7px;padding:10px;text-align:center">
    <div style="font-size:10px;color:var(--t3);font-family:var(--fm);margin-bottom:4px">${label}</div>
    <div style="font-size:15px;font-weight:600;color:${color}">${value}</div>
    ${sub?`<div style="font-size:10px;color:var(--t3);margin-top:2px">${sub}</div>`:''}
  </div>`;

  /* ══════════════════════════════════════════════
     BLOCO 1 — CONTINUIDADE
  ══════════════════════════════════════════════ */
  let contHTML = '';

  contHTML += step('1','var(--p)','Identifique os dados conhecidos',`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:6px">
      ${miniCard('D₁ — Diâmetro S1',''+d1+' m','')}
      ${miniCard('V₁ — Velocidade S1',''+v1+' m/s','')}
      ${miniCard('D₂ — Diâmetro S2',''+d2+' m','(a encontrar: V₂)','var(--g)')}
    </div>`);

  contHTML += step('2','var(--p)','Calcule as áreas de cada seção',`
    <p style="font-size:12px;color:var(--t3);margin-bottom:6px">A área da seção circular é dada por: A = π × (D/2)²</p>
    ${mathBox('var(--p)',`
      \\( A_1 = \\pi \\cdot \\left(\\dfrac{${d1}}{2}\\right)^2 = \\pi \\cdot ${(d1/2).toFixed(4)}^2 = ${(a1).toFixed(6)}\\ \\text{m}^2 \\approx ${(a1*1e4).toFixed(3)}\\ \\text{cm}^2 \\)
      <br>
      \\( A_2 = \\pi \\cdot \\left(\\dfrac{${d2}}{2}\\right)^2 = \\pi \\cdot ${(d2/2).toFixed(4)}^2 = ${(a2).toFixed(6)}\\ \\text{m}^2 \\approx ${(a2*1e4).toFixed(3)}\\ \\text{cm}^2 \\)
    `)}`);

  contHTML += step('3','var(--p)','Escreva a equação da continuidade',`
    <p style="font-size:12px;color:var(--t3);margin-bottom:6px">A vazão volumétrica se conserva — o que entra deve sair. Para um fluido incompressível:</p>
    ${mathBox('var(--p)',`\\( Q_v = A_1 \\cdot V_1 = A_2 \\cdot V_2 \\)`)}
    <p style="font-size:12px;color:var(--t3);margin-top:6px">Isolando V₂:</p>
    ${mathBox('var(--p)',`\\( V_2 = V_1 \\cdot \\dfrac{A_1}{A_2} = V_1 \\cdot \\left(\\dfrac{D_1}{D_2}\\right)^2 \\)`)}`);

  contHTML += step('4','var(--p)','Substitua os valores numéricos',`
    ${mathBox('var(--p)',`
      \\( V_2 = ${v1} \\cdot \\left(\\dfrac{${d1}}{${d2}}\\right)^2 = ${v1} \\cdot \\left(${(d1/d2).toFixed(4)}\\right)^2 = ${v1} \\cdot ${((d1/d2)**2).toFixed(4)} \\)
    `)}`);

  contHTML += step('5','var(--p)','Resultado',`
    ${resultBox('var(--p)','V₂ — Velocidade na Seção 2',v2.toFixed(4)+' m/s',v2>v1?'↑ Fluido acelerou (A₂ < A₁)':'↓ Fluido desacelerou (A₂ > A₁)')}
    <p style="font-size:11px;color:var(--t3);margin-top:10px">
      ${v2>v1
        ? `Como D₂ (${d2}m) &lt; D₁ (${d1}m), a área diminuiu → pelo princípio da conservação de massa, o fluido precisa acelerar para "passar" pelo espaço menor.`
        : `Como D₂ (${d2}m) &gt; D₁ (${d1}m), a área aumentou → o fluido desacelera.`}
    </p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">
      ${miniCard('Vazão Qv (constante)',(qv*1000).toFixed(3)+' L/s',(qv*3600).toFixed(2)+' m³/h')}
      ${miniCard('Qm (Massa)',(rho*qv).toFixed(3)+' kg/s',(rho*qv*3600).toFixed(1)+' kg/h','var(--or)')}
    </div>`);

  // Remove última borda
  contHTML = `<div style="overflow:hidden">${contHTML.replace(/border-bottom:1px solid var\(--bd\)(?=[^}]*?<\/div>\s*<\/div>\s*$)/,'')}</div>`;

  /* ══════════════════════════════════════════════
     BLOCO 2 — BERNOULLI
  ══════════════════════════════════════════════ */
  let bernHTML = '';

  bernHTML += step('1','var(--g)','Identifique os dados conhecidos',`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:6px">
      ${miniCard('ρ — Massa específica',''+rho+' kg/m³','')}
      ${miniCard('V₁',''+v1+' m/s','Seção 1')}
      ${miniCard('V₂',v2.toFixed(4)+' m/s','Seção 2 — calculado','var(--p)')}
      ${miniCard('P₁',''+p1.toLocaleString('pt-BR')+' Pa','Seção 1')}
      ${miniCard('z₁ − z₂',''+z1+' − '+z2+' = '+(z1-z2)+' m','Desnível')}
    </div>`);

  bernHTML += step('2','var(--g)','Escreva a equação de Bernoulli entre os dois pontos',`
    <p style="font-size:12px;color:var(--t3);margin-bottom:6px">Para duas seções de um escoamento permanente sem perdas (forma por unidade de massa):</p>
    ${mathBox('var(--g)',`\\( \\dfrac{P_1}{\\rho} + \\dfrac{v_1^2}{2} + g\\,h_1 \\;=\\; \\dfrac{P_2}{\\rho} + \\dfrac{v_2^2}{2} + g\\,h_2 \\)`)}
    <p style="font-size:11px;color:var(--t3);margin-top:6px">Cada termo tem unidade de <strong style="color:var(--g)">J/kg</strong> (energia por unidade de massa): energia de pressão + energia cinética + energia potencial = constante.</p>`);

  bernHTML += step('3','var(--g)','Isole P₂/ρ e depois P₂',`
    <p style="font-size:12px;color:var(--t3);margin-bottom:6px">Passando os termos de P₂ para um lado:</p>
    ${mathBox('var(--g)',`\\( \\dfrac{P_2}{\\rho} = \\dfrac{P_1}{\\rho} + \\underbrace{\\dfrac{v_1^2 - v_2^2}{2}}_{\\text{variação cinética}} + \\underbrace{g\\,(h_1 - h_2)}_{\\text{variação potencial}} \\)`)}
    <p style="font-size:12px;color:var(--t3);margin-top:6px">Multiplicando ambos os lados por ρ para obter P₂ em Pascal:</p>
    ${mathBox('var(--g)',`\\( P_2 = P_1 + \\rho \\cdot \\dfrac{v_1^2 - v_2^2}{2} + \\rho \\cdot g \\cdot (h_1 - h_2) \\)`)}
    ${horizontal
      ? '<p style="font-size:11px;color:var(--t3);margin-top:6px">Como h₁ = h₂ = 0 (tubo horizontal), o termo potencial é zero e a equação simplifica.</p>'
      : `<p style="font-size:11px;color:var(--t3);margin-top:6px">Desnível h₁−h₂ = ${z1-z2} m → o termo potencial <strong style="color:${(z1-z2)>0?'var(--g)':'var(--r)'}">contribui ${(z1-z2)>0?'positivamente (P₂ sobe)':'negativamente (P₂ cai)'}</strong>.</p>`}`);

  bernHTML += step('4','var(--g)','Calcule cada parcela separadamente',`
    ${mathBox('var(--g)',`
      \\( \\text{Variação cinética} = ${rho} \\cdot \\dfrac{${v1}^2 - ${v2.toFixed(2)}^2}{2} = ${rho} \\cdot \\dfrac{${v1**2} - ${(v2**2).toFixed(4)}}{2} = ${termCin.toFixed(3)}\\ \\text{Pa} \\)
      <br>
      \\( \\text{Variação potencial} = ${rho} \\cdot ${g} \\cdot (${z1} - ${z2}) = ${termPot.toFixed(3)}\\ \\text{Pa} \\)
    `)}`);

  bernHTML += step('5','var(--g)','Substitua tudo e calcule P₂',`
    ${mathBox('var(--g)',`
      \\( P_2 = ${p1.toLocaleString('pt-BR')} + ${termCin.toFixed(3)} + ${termPot.toFixed(3)} \\)
      <br>
      \\( P_2 = ${p1.toLocaleString('pt-BR')} + (${(termCin+termPot).toFixed(3)}) \\)
    `)}`);

  bernHTML += step('6','var(--g)','Resultado',`
    ${resultBox('var(--g)','P₂ — Pressão na Seção 2',p2.toFixed(1)+' Pa',`${(p2/1000).toFixed(3)} kPa  ≈  ${(p2/1e5).toFixed(4)} bar`)}
    <p style="font-size:11px;color:var(--t3);margin-top:10px">
      ${p2<p1
        ? `P₂ (${(p2/1e5).toFixed(4)} bar) &lt; P₁ (${(p1/1e5).toFixed(4)} bar): a pressão caiu porque o fluido acelerou. Isso é o efeito de Bernoulli.`
        : `P₂ (${(p2/1e5).toFixed(4)} bar) &gt; P₁ (${(p1/1e5).toFixed(4)} bar): a pressão subiu porque o fluido desacelerou ou desceu de nível.`}
    </p>
    ${p2<0?'<div class="alert aw" style="margin-top:10px">⚠ P₂ negativo! Na prática isso causaria cavitação. Aumente P₁ ou reduza a diferença de diâmetros.</div>':''}`);

  bernHTML = `<div style="overflow:hidden">${bernHTML}</div>`;

  /* ══════════════════════════════════════════════
     BLOCO 3 — RESUMO FINAL
  ══════════════════════════════════════════════ */
  const summaryHTML=`
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:14px">
    ${miniCard('V₁ (entrada)',v1+' m/s','S1 — dado')}
    ${miniCard('V₂ (saída)',v2.toFixed(4)+' m/s','S1 → S2','var(--p)')}
    ${miniCard('P₁ (entrada)',p1.toLocaleString('pt-BR')+' Pa','S1 — dado')}
    ${miniCard('P₂ (saída)',p2.toFixed(1)+' Pa','calculado','var(--g)')}
    ${miniCard('ΔP = P₁ − P₂',dp.toFixed(1)+' Pa',dp>=0?'↑ Queda de pressão':'↓ Ganho de pressão',dp>=0?'var(--y)':'var(--r)')}
    ${miniCard('Qv (vazão)',(qv*1000).toFixed(3)+' L/s',(qv*3600).toFixed(2)+' m³/h')}
    ${miniCard('Re — S1',Math.round(re1).toLocaleString('pt-BR'),regLabel(re1),regColor(re1))}
    ${miniCard('Re — S2',Math.round(re2).toLocaleString('pt-BR'),regLabel(re2),regColor(re2))}
  </div>
  <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:14px;font-size:13px;color:var(--t2);line-height:1.7">
    <strong style="color:var(--y)">Interpretação física:</strong>
    O fluido passou de D₁=${d1}m para D₂=${d2}m${z1!==z2?' com desnível de '+(z1-z2)+' m':''}. 
    A área ${a2<a1?'diminuiu':'aumentou'} em ${Math.abs((1-a2/a1)*100).toFixed(1)}%, 
    portanto a velocidade ${v2>v1?'aumentou':'diminuiu'} de ${v1} m/s para ${v2.toFixed(4)} m/s 
    (${Math.abs((v2/v1-1)*100).toFixed(1)}% ${v2>v1?'mais rápido':'mais lento'}) 
    e a pressão ${p2<p1?'caiu':'subiu'} ${Math.abs(dp/1000).toFixed(3)} kPa 
    (de ${(p1/1e5).toFixed(4)} bar para ${(p2/1e5).toFixed(4)} bar).
  </div>`;

  /* ── Renderizar ── */
  document.getElementById('b-cont-body').innerHTML=contHTML;
  document.getElementById('b-bern-body').innerHTML=bernHTML;
  document.getElementById('b-summary-body').innerHTML=summaryHTML;
  document.getElementById('b-cont').style.display='block';
  document.getElementById('b-bern').style.display='block';
  document.getElementById('b-summary').style.display='block';

  if(window.MathJax&&MathJax.typesetPromise){
    MathJax.typesetPromise([
      document.getElementById('b-cont-body'),
      document.getElementById('b-bern-body')
    ]).catch(e=>console.warn(e));
  }
  setTimeout(()=>document.getElementById('b-cont').scrollIntoView({behavior:'smooth',block:'start'}),150);
}

function bernReset(){
  ['b-rho','b-d1','b-v1','b-p1','b-d2','b-z1','b-z2'].forEach((id,i)=>{
    document.getElementById(id).value=['1000','0.1','2','220000','0.05','0','0'][i];
  });
  document.getElementById('b-err').style.display='none';
  ['b-cont','b-bern','b-summary'].forEach(id=>document.getElementById(id).style.display='none');
}
</script>

</body>


  <!-- EXPLICAÇÃO TEÓRICA -->
  <div class="blk" style="margin-bottom:14px">
    <h3>Como funciona este simulador?</h3>
    <p>Você define as condições na <strong style="color:var(--p)">Seção 1 (entrada)</strong> e o diâmetro da <strong style="color:var(--g)">Seção 2 (saída)</strong>. O simulador aplica automaticamente as duas equações fundamentais:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
      <div style="background:var(--bg);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:12px">
        <div style="font-size:11px;font-weight:600;color:var(--p);margin-bottom:8px">① Equação da Continuidade</div>
        <div style="font-family:var(--fm);font-size:14px;color:var(--t1);margin-bottom:8px;letter-spacing:.5px">A₁ · V₁ = A₂ · V₂</div>
        <div style="font-size:12px;color:var(--t3)">A vazão volumétrica se conserva. Tubo mais estreito (A₂&lt;A₁) → fluido acelera (V₂&gt;V₁) para manter o mesmo Qv.</div>
      </div>
      <div style="background:var(--bg);border:1px solid rgba(0,255,157,0.2);border-radius:8px;padding:12px">
        <div style="font-size:11px;font-weight:600;color:var(--g);margin-bottom:8px">② Equação de Bernoulli (forma por unidade de massa)</div>
        <div style="font-size:13px;color:var(--t1);margin-bottom:8px;line-height:1.8">
          <span style="font-family:var(--fm)">P₁/ρ + v₁²/2 + g·h₁ = P₂/ρ + v₂²/2 + g·h₂</span>
        </div>
        <div style="font-size:12px;color:var(--t3)">A energia total por unidade de massa se conserva. Quando velocidade sobe, pressão cai — e vice-versa.</div>
      </div>
    </div>
  </div>

  <!-- FORMULÁRIO -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-bottom:14px">

    <!-- Fluido -->
    <div class="blk" style="margin:0">
      <h3>Propriedades do Fluido</h3>
      <div style="margin-bottom:12px">
        <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:5px">ρ — Massa Específica (kg/m³) <span style="color:var(--t3);font-weight:400">obrigatório</span></label>
        <input id="b-rho" type="number" value="1000" step="0.1" min="0.01" style="background:var(--bg);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm)">
        <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
          <button class="btn" style="padding:4px 10px;font-size:11px" onclick="document.getElementById('b-rho').value=1000">Água (1000)</button>
          <button class="btn" style="padding:4px 10px;font-size:11px" onclick="document.getElementById('b-rho').value=850">Óleo (850)</button>
          <button class="btn" style="padding:4px 10px;font-size:11px" onclick="document.getElementById('b-rho').value=1.2">Ar (1,2)</button>
          <button class="btn" style="padding:4px 10px;font-size:11px" onclick="document.getElementById('b-rho').value=0.6">Vapor (0,6)</button>
        </div>
      </div>
    </div>

    <!-- Seção 1 -->
    <div class="blk" style="margin:0;border-color:rgba(0,212,255,0.22)">
      <h3 style="color:var(--p)">Seção 1 — Entrada</h3>
      <div style="margin-bottom:10px">
        <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">D₁ — Diâmetro (m)</label>
        <input id="b-d1" type="number" value="0.1" step="0.001" min="0.001" placeholder="Ex: 0.1" style="background:var(--bg);border:1px solid rgba(0,212,255,0.25);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm)">
      </div>
      <div style="margin-bottom:10px">
        <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">V₁ — Velocidade (m/s)</label>
        <input id="b-v1" type="number" value="2" step="0.1" min="0" placeholder="Ex: 2" style="background:var(--bg);border:1px solid rgba(0,212,255,0.25);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm)">
      </div>
      <div style="margin-bottom:10px">
        <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">P₁ — Pressão (Pa)</label>
        <input id="b-p1" type="number" value="220000" step="100" placeholder="Ex: 220000" style="background:var(--bg);border:1px solid rgba(0,212,255,0.25);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm)">
        <div style="font-size:10px;color:var(--t3);margin-top:3px">220.000 Pa = 2,2 bar (manométrico)</div>
      </div>
      <div>
        <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">z₁ — Altura (m) <span style="font-weight:400">opcional — padrão 0</span></label>
        <input id="b-z1" type="number" value="0" step="0.1" placeholder="0" style="background:var(--bg);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm)">
      </div>
    </div>

    <!-- Seção 2 -->
    <div class="blk" style="margin:0;border-color:rgba(0,255,157,0.22)">
      <h3 style="color:var(--g)">Seção 2 — Saída</h3>
      <div style="margin-bottom:10px">
        <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">D₂ — Diâmetro (m)</label>
        <input id="b-d2" type="number" value="0.05" step="0.001" min="0.001" placeholder="Ex: 0.05" style="background:var(--bg);border:1px solid rgba(0,255,157,0.25);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm)">
        <div style="font-size:10px;color:var(--t3);margin-top:3px">D2 menor que D1 → fluido acelera → pressão cai</div>
      </div>
      <div>
        <label style="font-size:11px;color:var(--t3);font-family:var(--fm);display:block;margin-bottom:4px">z₂ — Altura (m) <span style="font-weight:400">opcional — padrão 0</span></label>
        <input id="b-z2" type="number" value="0" step="0.1" placeholder="0" style="background:var(--bg);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:9px 12px;color:#fff;font-size:14px;width:100%;font-family:var(--fm)">
        <div style="font-size:10px;color:var(--t3);margin-top:3px">Se z2 &gt; z1: fluido sobe → energia potencial aumenta → pressão cai ainda mais</div>
      </div>
      <div style="margin-top:14px;background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:12px">
        <div style="font-size:11px;color:var(--t3);margin-bottom:6px">V₂ e P₂ serão calculados →</div>
        <div style="font-family:var(--fm);font-size:13px;color:var(--t3)">V₂ = ?  m/s</div>
        <div style="font-family:var(--fm);font-size:13px;color:var(--t3);margin-top:3px">P₂ = ?  Pa</div>
      </div>
    </div>

  </div>

  <!-- ERRO -->
  <div id="b-err" style="display:none;background:rgba(255,85,102,0.08);border:1px solid rgba(255,85,102,0.25);border-radius:8px;padding:11px 14px;font-size:13px;color:#ff7080;margin-bottom:12px"></div>

  <!-- BOTÕES -->
  <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
    <button class="btn btn-g" onclick="bernCalc()" style="flex:2;padding:12px;font-size:15px;font-weight:600">⚡ Calcular V₂ e P₂</button>
    <button class="btn" onclick="bernReset()" style="flex:1;padding:12px">↺ Resetar</button>
  </div>

  <!-- RESULTADO -->
  <div id="b-res" style="display:none;background:var(--bg3);border:1px solid rgba(0,255,157,0.2);border-radius:10px;padding:18px">
    <div style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:var(--g);font-family:var(--fm);margin-bottom:14px">Resultado — Passo a Passo</div>
  </div>

  <!-- EXEMPLOS PRÁTICOS -->
  <div class="blk" style="margin-top:14px">
    <h3>Exemplos práticos para testar</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin-top:10px">

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:12px;cursor:pointer" onclick="bernEx(1000,0.1,2,220000,0.05,0,0)">
        <div style="font-size:12px;font-weight:600;color:var(--p);margin-bottom:4px">Placa de Orifício</div>
        <div style="font-size:11px;color:var(--t3);line-height:1.5">Água · D1=10cm → D2=5cm<br>V1=2 m/s · P1=2,2 bar<br>Tubo horizontal</div>
        <div style="font-size:10px;color:var(--p);margin-top:6px">→ Toque para carregar</div>
      </div>

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:12px;cursor:pointer" onclick="bernEx(1000,0.15,1.5,300000,0.08,0,3)">
        <div style="font-size:12px;font-weight:600;color:var(--g);margin-bottom:4px">Bomba com Desnível</div>
        <div style="font-size:11px;color:var(--t3);line-height:1.5">Água · D1=15cm → D2=8cm<br>V1=1,5 m/s · P1=3 bar<br>S2 está 3m acima de S1</div>
        <div style="font-size:10px;color:var(--g);margin-top:6px">→ Toque para carregar</div>
      </div>

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:12px;cursor:pointer" onclick="bernEx(850,0.2,0.8,500000,0.1,0,0)">
        <div style="font-size:12px;font-weight:600;color:var(--y);margin-bottom:4px">Oleoduto</div>
        <div style="font-size:11px;color:var(--t3);line-height:1.5">Óleo (ρ=850) · D1=20cm → D2=10cm<br>V1=0,8 m/s · P1=5 bar<br>Tubo horizontal</div>
        <div style="font-size:10px;color:var(--y);margin-top:6px">→ Toque para carregar</div>
      </div>

      <div style="background:var(--bg4);border:1px solid var(--bd);border-radius:8px;padding:12px;cursor:pointer" onclick="bernEx(1.2,0.3,15,110000,0.15,0,0)">
        <div style="font-size:12px;font-weight:600;color:var(--pu);margin-bottom:4px">Duto de Ar / HVAC</div>
        <div style="font-size:11px;color:var(--t3);line-height:1.5">Ar (ρ=1,2) · D1=30cm → D2=15cm<br>V1=15 m/s · P1≈1,1 bar<br>Sistema de ventilação</div>
        <div style="font-size:10px;color:var(--pu);margin-top:6px">→ Toque para carregar</div>
      </div>

    </div>
  </div>

  <div class="alert ai" style="margin-top:12px">Este simulador assume fluido incompressível, escoamento permanente e tubo sem perdas de carga (Bernoulli ideal). Para projetos reais, inclua coeficientes de perda (fator de atrito de Darcy-Weisbach).</div>
</div>


</body>
</html>

const VIEW_META = {
    dashboard:{ title:'Dashboard', sub:'Institutional usage monitoring across the CLARIFAI app' },
    users:{ title:'User analytics', sub:'Aggregated usage patterns across the patient base' },
    'user-detail':{ title:'Patient usage profile', sub:'Authorized, privacy-conscious usage details for an individual account' },
    reports:{ title:'Reports', sub:'Laboratory reports uploaded and processed through the app' },
    'report-detail':{ title:'Report detail', sub:'The explanation and laboratory values presented in the app' },
    languages:{ title:'Language usage', sub:'How Philippine languages are used across the app' },
    pipeline:{ title:'Pipeline health', sub:'How the Capture → Identify → Match → Explain → Deliver pipeline is performing' },
    settings:{ title:'Settings', sub:'Admin account, notifications, and access controls' }
  };




  function showView(name){
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.view===name));
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.getElementById('view-'+name).classList.add('active');
    document.getElementById('view-title').textContent = VIEW_META[name].title;
    document.getElementById('view-sub').textContent = VIEW_META[name].sub;
    document.querySelector('.content').scrollTop = 0;
  }




  // ---- Dashboard: trend chart ----
  (function(){
    const days = [
      {d:'Wed', v:0.62},{d:'Thu', v:0.7},{d:'Fri', v:0.55},{d:'Sat', v:0.4},
      {d:'Sun', v:0.45},{d:'Mon', v:0.82},{d:'Tue', v:1}
    ];
    const wrap = document.getElementById('trend-chart');
    days.forEach(day=>{
      const col = document.createElement('div'); col.className='col';
      const stack = document.createElement('div'); stack.className='stack'; stack.style.height='100px';
      const fill = document.createElement('div'); fill.className='fill'; fill.style.height=(day.v*100)+'%';
      stack.appendChild(fill);
      const lbl = document.createElement('div'); lbl.className='day'; lbl.textContent=day.d;
      col.appendChild(stack); col.appendChild(lbl);
      wrap.appendChild(col);
    });
  })();




  // ---- Dashboard: flagged breakdown ----
  const FLAGGED = [
    {name:'Fasting glucose', pct:34},
    {name:'White blood cells', pct:27},
    {name:'Platelets', pct:19},
    {name:'LDL cholesterol', pct:12},
    {name:'Creatinine', pct:8}
  ];
  (function(){
    const wrap = document.getElementById('flagged-breakdown');
    FLAGGED.forEach(f=>{
      wrap.innerHTML += `<div class="breakdown-row"><div class="name">${f.name}</div><div class="track"><div class="fill" style="width:${f.pct*2}%;"></div></div><div class="pct">${f.pct}%</div></div>`;
    });
  })();




  // ---- Dashboard: language usage ----
  const LANGS = [
    {name:'Filipino', pct:42, c:'#E8703A'},
    {name:'Cebuano', pct:18, c:'#F0A052'},
    {name:'English', pct:15, c:'#7A6A60'},
    {name:'Ilocano', pct:9, c:'#3FAE5C'},
    {name:'Hiligaynon', pct:7, c:'#D9601F'},
    {name:'Others', pct:9, c:'#C9B9AE'}
  ];
  (function(){
    const wrap = document.getElementById('lang-usage');
    LANGS.forEach(l=>{
      wrap.innerHTML += `<div class="lang-usage-row"><div class="chip" style="background:${l.c};"></div><div class="name">${l.name}</div><div class="pct">${l.pct}%</div></div>`;
    });
    const wrap2 = document.getElementById('lang-coverage');
    LANGS.forEach(l=>{
      wrap2.innerHTML += `<div class="breakdown-row"><div class="name">${l.name}</div><div class="track"><div class="fill" style="width:${l.pct*2}%;"></div></div><div class="pct">${l.pct}%</div></div>`;
    });
  })();




  // ---- Dashboard: activity feed (clickable -> relevant user/report) ----
  const ACTIVITY = [
    {dot:'ok', text:'<b>Patient #CLF-001</b> uploaded a Complete Blood Count report', time:'2 min ago', go:()=>openReportDetail('10502')},
    {dot:'warn', text:'<b>Fasting Glucose</b> flagged above range for <b>Patient #CLF-002</b>', time:'11 min ago', go:()=>openReportDetail('10501')},
    {dot:'err', text:'Processing failed on report #10482 — capture step timed out', time:'26 min ago', go:()=>openReportDetail('10482')},
    {dot:'ok', text:'<b>Patient #CLF-003</b> selected Ilocano as the report language', time:'44 min ago', go:()=>openUserDetail('AN')},
    {dot:'ok', text:'<b>Patient #CLF-004</b> uploaded a Lipid Profile report', time:'1 hr ago', go:()=>openUserDetail('KP')}
  ];
  (function(){
    const wrap = document.getElementById('activity-feed');
    ACTIVITY.forEach((a,i)=>{
      wrap.innerHTML += `<div class="feed-row" onclick="ACTIVITY[${i}].go()"><div class="dot ${a.dot}"></div><div class="tx"><p>${a.text}</p><span>${a.time}</span></div></div>`;
    });
  })();




  // ---- Shared data: reports (with result explanation breakdown) ----
  const REPORTS = {
    '10502':{ user:'MR', panel:'Complete Blood Count', date:'Sept 2, 2026', lang:'Filipino', audio:'Played · 2×', flagged:2, status:'warn',
      tests:[
        {name:'Hemoglobin', value:'14.5 g/dL', range:'12.0 – 16.0 g/dL', flag:'ok'},
        {name:'White Blood Cells', value:'12.4 ×10⁹/L', range:'4.5 – 11.0 ×10⁹/L', flag:'high'},
        {name:'Platelets', value:'142 ×10⁹/L', range:'150 – 450 ×10⁹/L', flag:'low'}
      ]},
    '10501':{ user:'RT', panel:'Fasting Glucose', date:'Sept 2, 2026', lang:'Cebuano', audio:'Not played', flagged:1, status:'warn',
      tests:[ {name:'Fasting Glucose', value:'118 mg/dL', range:'70 – 99 mg/dL', flag:'high'} ]},
    '10499':{ user:'AN', panel:'Lipid Profile', date:'Sept 1, 2026', lang:'Ilocano', audio:'Played · 1×', flagged:0, status:'ok',
      tests:[
        {name:'LDL Cholesterol', value:'92 mg/dL', range:'< 100 mg/dL', flag:'ok'},
        {name:'HDL Cholesterol', value:'54 mg/dL', range:'> 40 mg/dL', flag:'ok'}
      ]},
    '10496':{ user:'KP', panel:'Urinalysis', date:'Aug 31, 2026', lang:'English', audio:'Not played', flagged:0, status:'ok',
      tests:[ {name:'Protein', value:'Negative', range:'Negative', flag:'ok'} ]},
    '10488':{ user:'GU', panel:'Thyroid Panel', date:'Aug 30, 2026', lang:'Hiligaynon', audio:'Played · 3×', flagged:1, status:'warn',
      tests:[ {name:'TSH', value:'5.8 mIU/L', range:'0.4 – 4.0 mIU/L', flag:'high'} ]},
    '10482':{ user:'NS', panel:'Complete Blood Count', date:'Aug 29, 2026', lang:'Filipino', audio:'Not played', flagged:0, status:'err',
      tests:[ {name:'—', value:'—', range:'Processing failed at capture step', flag:'ok'} ]}
  };




  const USERS = {
    'MR':{ id:'CLF-001', reports:6, lang:'Filipino', active:'2 min ago', status:'ok', flags:3, audio:14 },
    'RT':{ id:'CLF-002', reports:3, lang:'Cebuano', active:'11 min ago', status:'ok', flags:1, audio:2 },
    'AN':{ id:'CLF-003', reports:9, lang:'Ilocano', active:'44 min ago', status:'ok', flags:2, audio:21 },
    'KP':{ id:'CLF-004', reports:2, lang:'English', active:'1 hr ago', status:'ok', flags:0, audio:0 },
    'GU':{ id:'CLF-005', reports:5, lang:'Hiligaynon', active:'3 hrs ago', status:'inactive', flags:1, audio:6 },
    'NS':{ id:'CLF-006', reports:4, lang:'Filipino', active:'1 day ago', status:'inactive', flags:0, audio:3 }
  };




  // ---- Users table ----
  (function(){
    const wrap = document.getElementById('users-body');
    Object.keys(USERS).forEach(id=>{
      const u = USERS[id];
      const init = u.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
      const pill = u.status==='ok' ? '<span class="pill ok">Active</span>' : '<span class="pill info">Inactive</span>';
      wrap.innerHTML += `<tr class="clickable" onclick="openUserDetail('${id}')">
        <td><div class="cell-user"><div class="av">${init}</div><div><h5>${u.name}</h5><span>${u.email}</span></div></div></td>
        <td>${u.reports}</td>
        <td>${u.lang}</td>
        <td>${u.active}</td>
        <td>${pill}</td>
        <td><button class="link-btn" onclick="event.stopPropagation(); openUserDetail('${id}')">View</button></td>
      </tr>`;
    });
  })();




  // ---- Reports table ----
  (function(){
    const wrap = document.getElementById('reports-body');
    Object.keys(REPORTS).forEach(id=>{
      const r = REPORTS[id];
      const u = USERS[r.user];
      const pill = r.status==='ok' ? '<span class="pill ok">Processed</span>' : r.status==='warn' ? '<span class="pill warn">Has lab flags</span>' : '<span class="pill err">Error</span>';
      wrap.innerHTML += `<tr class="clickable" onclick="openReportDetail('${id}')">
        <td>#${id}</td>
        <td><span class="anon-id">Patient #${u.id}</span></td>
        <td>${r.panel}</td>
        <td>${r.date}</td>
        <td>${r.flagged}</td>
        <td>${pill}</td>
        <td><button class="link-btn" onclick="event.stopPropagation(); openReportDetail('${id}')">View</button></td>
      </tr>`;
    });
  })();




  // ---- User detail ----
  function openUserDetail(id){
    const u = USERS[id];
    const init = u.id.slice(-2);
    document.getElementById('ud-init').textContent = init;
    document.getElementById('ud-name').textContent = 'Patient #' + u.id;
    document.getElementById('ud-email').textContent = 'Identifiable account details restricted by access policy';
    document.getElementById('ud-reports').textContent = u.reports;
    document.getElementById('ud-flags').textContent = u.flags;
    document.getElementById('ud-audio').textContent = u.audio;
    document.getElementById('ud-tags').innerHTML =
      `<span class="pill info">${u.lang}</span>` + (u.status==='ok' ? '<span class="pill ok">Active</span>' : '<span class="pill info">Inactive</span>');




    const body = document.getElementById('ud-reports-body');
    body.innerHTML = '';
    Object.keys(REPORTS).filter(rid=>REPORTS[rid].user===id).forEach(rid=>{
      const r = REPORTS[rid];
      const pill = r.status==='ok' ? '<span class="pill ok">Processed</span>' : r.status==='warn' ? '<span class="pill warn">Has lab flags</span>' : '<span class="pill err">Error</span>';
      body.innerHTML += `<tr class="clickable" onclick="openReportDetail('${rid}')">
        <td>#${rid}</td><td>${r.panel}</td><td>${r.date}</td><td>${r.lang}</td><td>${r.flagged}</td><td>${pill}</td>
      </tr>`;
    });
    if(!body.innerHTML){ body.innerHTML = '<tr><td colspan="6" style="color:var(--ink-500);">No reports uploaded yet.</td></tr>'; }




    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.getElementById('view-user-detail').classList.add('active');
    document.getElementById('view-title').textContent = VIEW_META['user-detail'].title;
    document.getElementById('view-sub').textContent = VIEW_META['user-detail'].sub;
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.view==='users'));
    document.querySelector('.content').scrollTop = 0;
  }




  // ---- Report detail ----
  function openReportDetail(id){
    const r = REPORTS[id];
    const u = USERS[r.user];
    document.getElementById('rd-title').textContent = r.panel + '  ·  #' + id;
    const pill = r.status==='ok' ? 'pill ok' : r.status==='warn' ? 'pill warn' : 'pill err';
    const pillText = r.status==='ok' ? 'Processed' : r.status==='warn' ? 'Has lab flags' : 'Error';
    const pillEl = document.getElementById('rd-status');
    pillEl.className = pill; pillEl.textContent = pillText;
    document.getElementById('rd-user').textContent = 'Patient #' + u.id;
    document.getElementById('rd-date').textContent = r.date;
    document.getElementById('rd-lang').textContent = r.lang;
    document.getElementById('rd-audio').textContent = r.audio;




    const wrap = document.getElementById('rd-tests');
    wrap.innerHTML = '';
    r.tests.forEach(t=>{
      const pillClass = t.flag==='ok' ? 'pill ok' : t.flag==='high' ? 'pill warn' : 'pill err';
      const pillLabel = t.flag==='ok' ? 'In range' : t.flag==='high' ? 'Above' : 'Below';
      wrap.innerHTML += `<div class="test-detail-row">
        <div class="mid"><h4>${t.name}</h4><div class="range">${t.range}</div></div>
        <span class="${pillClass}">${pillLabel}</span>
        <div class="val">${t.value}</div>
      </div>`;
    });




    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.getElementById('view-report-detail').classList.add('active');
    document.getElementById('view-title').textContent = VIEW_META['report-detail'].title;
    document.getElementById('view-sub').textContent = VIEW_META['report-detail'].sub;
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.view==='reports'));
    document.querySelector('.content').scrollTop = 0;
  }




  // ---- Languages page: users by language ----
  (function(){
    const counts = {};
    Object.values(USERS).forEach(u=>{ counts[u.lang] = (counts[u.lang]||0) + 1; });
    const total = Object.values(USERS).length;
    const wrap = document.getElementById('lang-users');
    Object.keys(counts).forEach(lang=>{
      const pct = Math.round((counts[lang]/total)*100);
      wrap.innerHTML += `<div class="breakdown-row"><div class="name">${lang}</div><div class="track"><div class="fill" style="width:${pct}%;"></div></div><div class="pct">${counts[lang]}</div></div>`;
    });
  })();




  // ---- Pipeline steps ----
  const STEPS = [
    {name:'Capture', desc:'Scanning the uploaded document', lat:'0.6s', pct:99.8},
    {name:'Identify', desc:'Finding test names, values, ranges', lat:'1.1s', pct:99.2},
    {name:'Match', desc:'Checking the medical knowledge base', lat:'0.9s', pct:99.9},
    {name:'Explain', desc:'Generating the plain-language explanation', lat:'1.7s', pct:98.6},
    {name:'Deliver', desc:'Preparing the results for the app', lat:'0.5s', pct:100}
  ];
  (function(){
    const wrap = document.getElementById('pipeline-steps');
    STEPS.forEach((s,i)=>{
      wrap.innerHTML += `<div class="card step-card">
        <div class="snum">${i+1}</div>
        <div class="mid"><h4>${s.name}</h4><span>${s.desc}</span></div>
        <div class="stat"><b>${s.lat}</b><small>${s.pct}% success</small></div>
      </div>`;
    });
  })();




  const ERRORS = [
    {time:'11:42 AM', report:'10482', step:'Capture', msg:'Image resolution too low to read reliably'},
    {time:'9:15 AM', report:'10470', step:'Match', msg:'Test name not matched to the curated knowledge base'},
    {time:'7:03 AM', report:'10461', step:'Explain', msg:'Audio explanation generation timed out'}
  ];
  (function(){
    const wrap = document.getElementById('errors-body');
    ERRORS.forEach(e=>{
      wrap.innerHTML += `<tr><td>${e.time}</td><td>#${e.report}</td><td>${e.step}</td><td>${e.msg}</td></tr>`;
    });
  })();

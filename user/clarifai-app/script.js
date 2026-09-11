function go(name){
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    document.querySelector('.panel[data-panel="'+name+'"]').classList.add('active');
  }

  function mockFile(){
    document.getElementById('filepreview').classList.add('show');
  }

  function runPipeline(){
    const steps = document.querySelectorAll('.step');
    steps.forEach(s=>s.classList.remove('on'));
    steps.forEach((s,i)=>{
      setTimeout(()=>{ s.classList.add('on'); }, 420*i + 200);
    });
    setTimeout(()=>{ go('results'); }, 420*steps.length + 500);
  }

  // ---- Test data for detail screen ----
  const TESTS = {
    hgb:{
      eyebrow:'Hemoglobin', title:'Hemoglobin', value:'14.5', unit:'g/dL',
      lo:'12.0', hi:'16.0', marker:56, tagIcon:'ok', tag:{en:"Within your lab's range", fil:'Nasa loob ng saklaw ng iyong lab'},
      simple:{en:"Hemoglobin carries oxygen through your blood. Your result sits comfortably within the range your lab expects for a healthy adult, so nothing here needs immediate attention.",
               fil:'Ang hemoglobin ang nagdadala ng oxygen sa iyong dugo. Ang iyong resulta ay nasa loob ng normal na saklaw para sa isang malusog na matanda, kaya walang kailangang agarang pansinin dito.'},
      technical:{en:"Hemoglobin (Hgb) measures the oxygen-carrying protein in red blood cells. 14.5 g/dL falls within the standard reference interval of 12.0–16.0 g/dL for adults, indicating adequate oxygen-carrying capacity.",
               fil:'Sinusukat ng hemoglobin (Hgb) ang proteinang nagdadala ng oxygen sa mga pulang selula ng dugo. Ang 14.5 g/dL ay nasa loob ng karaniwang saklaw na 12.0–16.0 g/dL para sa mga matanda.'}
    },
    wbc:{
      eyebrow:'White blood cells', title:'White Blood Cell Count', value:'12.4', unit:'×10⁹/L',
      lo:'4.5', hi:'11.0', marker:78, tagIcon:'high', tag:{en:"Above your lab's range", fil:'Mas mataas sa saklaw ng iyong lab'},
      simple:{en:"White blood cells help your body fight infection. Your count is a bit higher than what your lab expects for a healthy adult — this can happen for many reasons, including a recent infection. It's not a diagnosis on its own.",
               fil:'Ang mga white blood cell ay tumutulong labanan ang impeksyon. Ang iyong bilang ay bahagyang mas mataas sa inaasahan — maraming dahilan nito, kabilang ang kamakailang impeksyon. Hindi pa ito diagnosis.'},
      technical:{en:"WBC count of 12.4 ×10⁹/L exceeds the reference interval of 4.5–11.0 ×10⁹/L, consistent with leukocytosis. Common causes include infection, inflammation, or stress response; clinical correlation is required.",
               fil:'Ang WBC na 12.4 ×10⁹/L ay lampas sa saklaw na 4.5–11.0 ×10⁹/L, na kilala bilang leukocytosis. Kadalasang dahilan ay impeksyon o pamamaga; kailangan ng ebalwasyon ng doktor.'}
    },
    glu:{
      eyebrow:'Fasting glucose', title:'Fasting Glucose', value:'118', unit:'mg/dL',
      lo:'70', hi:'99', marker:82, tagIcon:'high', tag:{en:"Above your lab's range", fil:'Mas mataas sa saklaw ng iyong lab'},
      simple:{en:"This measures sugar in your blood after not eating for a while. Your result is above the usual range, which can relate to how your body processes sugar. One test alone isn't enough to explain why — your doctor may suggest a follow-up.",
               fil:'Sinusukat nito ang asukal sa dugo pagkatapos hindi kumain nang ilang oras. Ang iyong resulta ay mas mataas sa karaniwan. Isang sukat lang ay hindi sapat para malaman ang dahilan — maaaring magmungkahi ang doktor ng follow-up.'},
      technical:{en:"Fasting plasma glucose of 118 mg/dL exceeds the normal reference range (70–99 mg/dL) and falls in the range often associated with impaired fasting glucose. Confirmatory testing (e.g. HbA1c or repeat FPG) is typically recommended.",
               fil:'Ang fasting glucose na 118 mg/dL ay lampas sa normal na saklaw (70–99 mg/dL). Karaniwang inirerekomenda ang kumpirmasyong pagsusuri gaya ng HbA1c.'}
    },
    crea:{
      eyebrow:'Creatinine', title:'Creatinine', value:'0.9', unit:'mg/dL',
      lo:'0.6', hi:'1.3', marker:43, tagIcon:'ok', tag:{en:"Within your lab's range", fil:'Nasa loob ng saklaw ng iyong lab'},
      simple:{en:"Creatinine is a waste product your kidneys filter out of your blood. Your result is within the typical range, suggesting your kidneys are filtering as expected.",
               fil:'Ang creatinine ay isang basura na sinasala ng iyong mga bato mula sa dugo. Ang iyong resulta ay nasa loob ng karaniwang saklaw, na nagpapahiwatig na normal ang paggana ng mga bato.'},
      technical:{en:"Serum creatinine of 0.9 mg/dL is within the standard reference interval (0.6–1.3 mg/dL), suggesting normal glomerular filtration at this point in time.",
               fil:'Ang serum creatinine na 0.9 mg/dL ay nasa loob ng saklaw (0.6–1.3 mg/dL), na nagpapahiwatig ng normal na paggana ng bato sa ngayon.'}
    },
    plt:{
      eyebrow:'Platelets', title:'Platelet Count', value:'142', unit:'×10⁹/L',
      lo:'150', hi:'450', marker:14, tagIcon:'low', tag:{en:"Below your lab's range", fil:'Mas mababa sa saklaw ng iyong lab'},
      simple:{en:"Platelets help your blood clot. Your count is a little below the usual range. Small dips can happen for many harmless reasons, but it's worth mentioning to your doctor, especially alongside your other results today.",
               fil:'Ang mga platelet ay tumutulong sa pamumuo ng dugo. Ang iyong bilang ay bahagyang mas mababa sa karaniwan. Maaaring hindi ito seryoso, pero sulit itong sabihin sa iyong doktor.'},
      technical:{en:"Platelet count of 142 ×10⁹/L is mildly below the reference interval (150–450 ×10⁹/L), consistent with mild thrombocytopenia. Correlate with clinical history and consider a repeat count if isolated.",
               fil:'Ang platelet count na 142 ×10⁹/L ay bahagyang mas mababa sa saklaw (150–450 ×10⁹/L), na maaaring mild thrombocytopenia. Iminumungkahi ang muling pagsusuri.'}
    }
  };
  let currentTest = 'wbc';
  let currentLevel = 'simple';
  let currentLang = 'en';

  function openTest(id){
    currentTest = id;
    renderTest();
    go('detail');
  }

  function renderTest(){
    const t = TESTS[currentTest];
    document.getElementById('d-eyebrow').textContent = t.eyebrow;
    document.getElementById('d-title').textContent = t.title;
    document.getElementById('d-value').textContent = t.value;
    document.getElementById('d-unit').textContent = t.unit;
    document.getElementById('d-lo').textContent = t.lo;
    document.getElementById('d-hi').textContent = t.hi;
    document.getElementById('d-marker').style.left = t.marker + '%';

    const tagEl = document.getElementById('d-tag');
    const arrowUp = '<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
    const arrowDown = '<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
    const dot = '<svg viewBox="0 0 24 24" fill="none" width="10" height="10"><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>';
    let icon = t.tagIcon === 'high' ? arrowUp : (t.tagIcon === 'low' ? arrowDown : dot);
    tagEl.innerHTML = icon + t.tag[currentLang];

    document.getElementById('d-explain').textContent = t[currentLevel][currentLang];
  }

  function setLevel(l){
    currentLevel = l;
    document.querySelectorAll('#grp-level .toggle-opt').forEach(b=>b.classList.toggle('active', b.dataset.level===l));
    renderTest();
  }
  function setLang(l){
    currentLang = l;
    document.querySelectorAll('#grp-lang .toggle-opt').forEach(b=>b.classList.toggle('active', b.dataset.lang===l));
    renderTest();
  }

  // build waveform bars once
  (function(){
    const wrap = document.getElementById('waves');
    for(let i=0;i<28;i++){
      const bar = document.createElement('i');
      const h = 4 + Math.round(Math.abs(Math.sin(i*0.9))*16);
      bar.style.height = h+'px';
      wrap.appendChild(bar);
    }
  })();

  let playing = false, audioTimer = null, elapsed = 0;
  function toggleAudio(){
    playing = !playing;
    const icon = document.getElementById('play-icon');
    if(playing){
      icon.innerHTML = '<rect x="6" y="5" width="4" height="14" rx="1" fill="#fff"/><rect x="14" y="5" width="4" height="14" rx="1" fill="#fff"/>';
      audioTimer = setInterval(()=>{
        elapsed++;
        if(elapsed>24){ elapsed=0; playing=false; clearInterval(audioTimer); icon.innerHTML='<path d="M8 5v14l11-7L8 5Z" fill="#fff"/>'; }
        document.getElementById('audio-time').textContent = '0:'+String(elapsed).padStart(2,'0')+' / 0:24';
        const bars = document.querySelectorAll('#waves i');
        bars.forEach((b,i)=>{ b.style.background = i < (elapsed/24)*bars.length ? 'var(--ember-500)' : 'var(--ink-300)'; });
      },200);
    } else {
      icon.innerHTML = '<path d="M8 5v14l11-7L8 5Z" fill="#fff"/>';
      clearInterval(audioTimer);
    }
  }

  renderTest();

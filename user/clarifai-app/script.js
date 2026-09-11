function go(name) {
  const panel = document.querySelector(`.panel[data-panel="${name}"]`);
  if (!panel) return;
  document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
  panel.classList.add('active');
}

function mockFile() {
  document.getElementById('filepreview')?.classList.add('show');
}

function runPipeline() {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step) => step.classList.remove('on'));
  steps.forEach((step, index) => {
    setTimeout(() => step.classList.add('on'), 420 * index + 200);
  });
  setTimeout(() => go('results'), 420 * steps.length + 500);
}

const TESTS = {
  hgb: {
    eyebrow: 'Hemoglobin', title: 'Hemoglobin', value: '14.5', unit: 'g/dL', lo: '12.0', hi: '16.0', marker: 56, tagIcon: 'ok',
    tag: { en: "Within your lab's range", fil: 'Nasa loob ng saklaw ng iyong lab' },
    simple: { en: 'Your hemoglobin result is within the reference range shown on this report.', fil: 'Ang iyong resulta ng hemoglobin ay nasa loob ng saklaw na nakalagay sa ulat na ito.' },
    technical: { en: 'Hemoglobin carries oxygen through your blood. 14.5 g/dL is within the reference interval of 12.0–16.0 g/dL.', fil: 'Ang hemoglobin ang nagdadala ng oxygen sa dugo. Ang 14.5 g/dL ay nasa saklaw na 12.0–16.0 g/dL.' },
    tips: { en: ['This result is reassuring when considered with the other results on your report.', 'Discuss any ongoing symptoms with your healthcare professional.'], fil: ['Nakakapanatag ang resultang ito kapag isinasaalang-alang kasama ng iba pang resulta.', 'Sabihin sa health professional kung may patuloy kang sintomas.'] }
  },
  wbc: {
    eyebrow: 'White blood cells', title: 'White Blood Cell Count', value: '12.4', unit: '×10⁹/L', lo: '4.5', hi: '11.0', marker: 78, tagIcon: 'high',
    tag: { en: "Above your lab's range", fil: 'Mas mataas sa saklaw ng iyong lab' },
    simple: { en: "Your white blood cell count is a bit higher than the reference range shown on this report. This can happen for many reasons, including a recent infection; it is not a diagnosis on its own.", fil: 'Ang iyong bilang ng white blood cell ay bahagyang mas mataas sa saklaw na nakalagay sa ulat. Maraming posibleng dahilan nito, kabilang ang kamakailang impeksyon; hindi pa ito diagnosis.' },
    technical: { en: 'WBC count of 12.4 ×10⁹/L is above the reference interval of 4.5–11.0 ×10⁹/L. Clinical context is needed to understand what this result means.', fil: 'Ang WBC na 12.4 ×10⁹/L ay lampas sa saklaw na 4.5–11.0 ×10⁹/L. Kailangan ang konteksto ng kalusugan upang maunawaan ito.' },
    tips: { en: ['Rest and stay hydrated while you monitor how you feel.', 'Mention fever, unusual fatigue, or new symptoms at your next visit.', 'A repeat test may help your doctor see whether this was temporary.'], fil: ['Magpahinga at uminom ng sapat na tubig habang mino-monitor ang pakiramdam mo.', 'Sabihin sa doktor ang lagnat, kakaibang pagkapagod, o bagong sintomas.', 'Maaaring makatulong ang repeat test upang makita kung pansamantala ito.'] }
  },
  glu: {
    eyebrow: 'Fasting glucose', title: 'Fasting Glucose', value: '118', unit: 'mg/dL', lo: '70', hi: '99', marker: 82, tagIcon: 'high',
    tag: { en: "Above your lab's range", fil: 'Mas mataas sa saklaw ng iyong lab' },
    simple: { en: "Your fasting glucose is above the reference range shown on this report. One result alone cannot explain why; your doctor may suggest follow-up.", fil: 'Ang iyong fasting glucose ay mas mataas sa saklaw na nakalagay sa ulat. Hindi sapat ang isang resulta para malaman ang dahilan; maaaring magmungkahi ang doktor ng follow-up.' },
    technical: { en: 'Fasting glucose of 118 mg/dL is above the reference range of 70–99 mg/dL. Follow-up testing may be considered by your healthcare professional.', fil: 'Ang fasting glucose na 118 mg/dL ay lampas sa saklaw na 70–99 mg/dL. Maaaring isaalang-alang ng health professional ang follow-up test.' },
    tips: { en: ['Ask your doctor whether a follow-up or HbA1c test is appropriate for you.', 'Bring this report to your next appointment for context.'], fil: ['Tanungin ang doktor kung angkop sa iyo ang follow-up o HbA1c test.', 'Dalhin ang ulat na ito sa susunod na appointment para sa tamang konteksto.'] }
  },
  crea: {
    eyebrow: 'Creatinine', title: 'Creatinine', value: '0.9', unit: 'mg/dL', lo: '0.6', hi: '1.3', marker: 43, tagIcon: 'ok',
    tag: { en: "Within your lab's range", fil: 'Nasa loob ng saklaw ng iyong lab' },
    simple: { en: 'Your creatinine result is within the reference range shown on this report.', fil: 'Ang iyong resulta ng creatinine ay nasa loob ng saklaw na nakalagay sa ulat na ito.' },
    technical: { en: 'Serum creatinine of 0.9 mg/dL is within the reference interval of 0.6–1.3 mg/dL.', fil: 'Ang serum creatinine na 0.9 mg/dL ay nasa saklaw na 0.6–1.3 mg/dL.' },
    tips: { en: ['This result is reassuring when considered with the other results on your report.', 'Your healthcare professional can interpret it alongside your medical history.'], fil: ['Nakakapanatag ang resultang ito kapag isinasaalang-alang kasama ng iba pang resulta.', 'Maaaring bigyang-kahulugan ito ng health professional kasama ng iyong medical history.'] }
  },
  plt: {
    eyebrow: 'Platelets', title: 'Platelet Count', value: '142', unit: '×10⁹/L', lo: '150', hi: '450', marker: 14, tagIcon: 'low',
    tag: { en: "Below your lab's range", fil: 'Mas mababa sa saklaw ng iyong lab' },
    simple: { en: 'Your platelet count is a little below the reference range shown on this report. It is worth mentioning alongside your other results.', fil: 'Ang iyong platelet count ay bahagyang mas mababa sa saklaw na nakalagay sa ulat. Mainam itong banggitin kasama ng iba mo pang resulta.' },
    technical: { en: 'Platelet count of 142 ×10⁹/L is below the reference interval of 150–450 ×10⁹/L. Clinical context is needed for interpretation.', fil: 'Ang platelet count na 142 ×10⁹/L ay mas mababa sa saklaw na 150–450 ×10⁹/L. Kailangan ang konteksto ng kalusugan para sa interpretasyon.' },
    tips: { en: ['Mention unusual bruising or bleeding at your next visit.', 'Your doctor may recommend a repeat count to check whether this was temporary.'], fil: ['Sabihin sa doktor kung may hindi pangkaraniwang pasa o pagdurugo.', 'Maaaring magrekomenda ang doktor ng repeat count upang makita kung pansamantala ito.'] }
  }
};

let currentTest = 'wbc';
let currentLevel = 'simple';
let currentLang = 'en';

function openTest(id) {
  if (!TESTS[id]) return;
  currentTest = id;
  renderTest();
  go('detail');
}

function renderTest() {
  const test = TESTS[currentTest];
  document.getElementById('d-eyebrow').textContent = test.eyebrow;
  document.getElementById('d-title').textContent = test.title;
  document.getElementById('d-value').textContent = test.value;
  document.getElementById('d-unit').textContent = test.unit;
  document.getElementById('d-lo').textContent = test.lo;
  document.getElementById('d-hi').textContent = test.hi;
  document.getElementById('d-marker').style.left = `${test.marker}%`;

  const arrowUp = '<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  const arrowDown = '<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  const dot = '<svg viewBox="0 0 24 24" fill="none" width="10" height="10"><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>';
  const icon = test.tagIcon === 'high' ? arrowUp : test.tagIcon === 'low' ? arrowDown : dot;
  document.getElementById('d-tag').innerHTML = icon + test.tag[currentLang];
  document.getElementById('d-explain').textContent = test[currentLevel][currentLang];

  const tips = document.getElementById('d-tips');
  if (tips) {
    const check = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="var(--sand-100)"/><path d="M7.5 12.5l3 3 6-6.5" stroke="var(--green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    tips.innerHTML = (test.tips?.[currentLang] || []).map((tip) => `<li>${check}<span>${tip}</span></li>`).join('');
  }
}

function setLevel(level) {
  currentLevel = level;
  document.querySelectorAll('#grp-level .toggle-opt').forEach((button) => button.classList.toggle('active', button.dataset.level === level));
  renderTest();
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('#grp-lang .toggle-opt').forEach((button) => button.classList.toggle('active', button.dataset.lang === lang));
  renderTest();
}

(function buildWaveform() {
  const wrap = document.getElementById('waves');
  if (!wrap) return;
  for (let i = 0; i < 20; i += 1) {
    const bar = document.createElement('i');
    bar.style.height = `${4 + Math.round(Math.abs(Math.sin(i * 0.9)) * 16)}px`;
    wrap.appendChild(bar);
  }
})();

let playing = false;
let audioTimer = null;
let elapsed = 0;

function toggleAudio() {
  playing = !playing;
  const icon = document.getElementById('play-icon');
  if (!icon) return;
  if (playing) {
    icon.innerHTML = '<rect x="6" y="5" width="4" height="14" rx="1" fill="#fff"/><rect x="14" y="5" width="4" height="14" rx="1" fill="#fff"/>';
    audioTimer = setInterval(() => {
      elapsed += 1;
      if (elapsed > 24) { elapsed = 0; playing = false; clearInterval(audioTimer); icon.innerHTML = '<path d="M8 5v14l11-7L8 5Z" fill="#fff"/>'; }
      document.getElementById('audio-time').textContent = `0:${String(elapsed).padStart(2, '0')} / 0:24`;
      document.querySelectorAll('#waves i').forEach((bar, index, bars) => { bar.style.background = index < (elapsed / 24) * bars.length ? 'var(--ember-500)' : 'var(--ink-300)'; });
    }, 200);
  } else {
    icon.innerHTML = '<path d="M8 5v14l11-7L8 5Z" fill="#fff"/>';
    clearInterval(audioTimer);
  }
}

renderTest();

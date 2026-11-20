const SFX={};
function beep(freq=660,dur=0.12,type='sine'){try{const ctx=new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator();const g=ctx.createGain();o.type=type;o.frequency.value=freq;o.connect(g);g.connect(ctx.destination);g.gain.setValueAtTime(0.18,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);o.start();o.stop(ctx.currentTime+dur)}catch(e){}}
const WORLDS={
 burti:[{q:'Kurš burts ir A?',opts:[{t:'B',c:false},{t:'A',c:true},{t:'C',c:false}]},
  {q:'Kurš burts ir L?',opts:[{t:'L',c:true},{t:'M',c:false},{t:'K',c:false}]},
  {q:'Kurš vārds sākas ar M?',opts:[{t:'Māja',c:true},{t:'Zivs',c:false},{t:'Kaķis',c:false}]},
  {q:'Kurš vārds beidzas ar S?',opts:[{t:'Māja',c:false},{t:'Zivs',c:true},{t:'Kaķis',c:false}]}],
 matematika:[{q:'Cik ir 2 + 3?',opts:[{t:'4',c:false},{t:'5',c:true},{t:'6',c:false}]},
  {q:'Cik ir 5 - 2?',opts:[{t:'2',c:false},{t:'3',c:true},{t:'4',c:false}]},
  {q:'Cik ir 4 + 4?',opts:[{t:'7',c:false},{t:'8',c:true},{t:'9',c:false}]},
  {q:'Kurš skaitlis ir lielākais?',opts:[{t:'3',c:false},{t:'7',c:true},{t:'5',c:false}]}],
 logika:[{q:'Kas neder?',opts:[{t:'🍎',c:false},{t:'🍌',c:false},{t:'🚗',c:true}]},
  {q:'Kurš ir nākamais? 🔴🔵🔴🔵 ?',opts:[{t:'🔴',c:true},{t:'🔵',c:false},{t:'🟢',c:false}]},
  {q:'Kurš ir smagāks?',opts:[{t:'Plūme',c:false},{t:'Arbūzs',c:true},{t:'Ola',c:false}]},
  {q:'Kas ir lieks? 🐶🐱🐟🚗',opts:[{t:'🐶',c:false},{t:'🐱',c:false},{t:'🚗',c:true}]}],
 daba:[{q:'Kurš ir suns?',opts:[{t:'🐶',c:true},{t:'🐱',c:false},{t:'🐰',c:false}]},
  {q:'Kur dzīvo zivs?',opts:[{t:'Ezerā',c:true},{t:'Mežā',c:false},{t:'Dārzā',c:false}]},
  {q:'Kas aug kokā?',opts:[{t:'Ābols',c:true},{t:'Zivs',c:false},{t:'Kaķis',c:false}]},
  {q:'Kurš dzīvo mežā?',opts:[{t:'Lācis',c:true},{t:'Zivs',c:false},{t:'Kaķis',c:false}]}],
 valodas:[{q:'Kā angļu valodā ir "kaķis"?',opts:[{t:'Dog',c:false},{t:'Cat',c:true},{t:'Fish',c:false}]},
  {q:'Kā angļu valodā ir "suns"?',opts:[{t:'Dog',c:true},{t:'Cat',c:false},{t:'Bird',c:false}]},
  {q:'Kā angļu valodā ir "māja"?',opts:[{t:'House',c:true},{t:'Tree',c:false},{t:'Car',c:false}]},
  {q:'Kā angļu valodā ir "zivs"?',opts:[{t:'Fish',c:true},{t:'Bird',c:false},{t:'Dog',c:false}]}],
 ikdiena:[{q:'Cikos bērni parasti iet gulēt?',opts:[{t:'Pusdienlaikā',c:false},{t:'Vakarā',c:true},{t:'Rītā',c:false}]},
  {q:'Kurš ir dārgāks?',opts:[{t:'Rotaļlieta',c:true},{t:'Ābols',c:false}]},
  {q:'Kas ir nauda?',opts:[{t:'Euro',c:true},{t:'Ābols',c:false},{t:'Kaķis',c:false}]},
  {q:'Cik ir 1 stunda minūtēs?',opts:[{t:'30',c:false},{t:'60',c:true},{t:'100',c:false}]}]
};
function confetti(el){const r=el.getBoundingClientRect();const cx=r.left+r.width/2;const cy=r.top+r.height/2;for(let i=0;i<22;i++){const s=document.createElement('span');s.className='confetti';s.textContent=['🎉','⭐','✨','🌟','💖','🎈'][i%6];const dx=(Math.random()*2-1)*180;const dy=(Math.random()*2-1)*180-80;s.style.left=cx+'px';s.style.top=cy+'px';s.style.setProperty('--dx',dx+'px');s.style.setProperty('--dy',dy+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),1400)}}
function spawnFloaters(){const icons=['⭐','🌈','✨','🎈','🌟','💖'];for(let i=0;i<14;i++){const d=document.createElement('div');d.className='floating';d.textContent=icons[i%icons.length];d.style.left=Math.random()*100+'vw';d.style.top=Math.random()*100+'vh';d.style.animationDelay=(Math.random()*5)+'s';d.style.fontSize=(1.4+Math.random()*1.6)+'rem';document.body.appendChild(d)}}
let muted=false;function toggleMute(){muted=!muted}function speak(t){if(muted)return;try{const u=new SpeechSynthesisUtterance(t);u.lang='lv-LV';window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}catch(e){}}
function initQuiz(worldKey){const qs=WORLDS[worldKey];let i=0,score=0;const qEl=document.getElementById('q');const optsEl=document.getElementById('opts');const fb=document.getElementById('fb');const sc=document.getElementById('score');const bar=document.getElementById('bar');function render(){const q=qs[i%qs.length];if(worldKey==='burti_A'){qEl.style.display='none'}else{qEl.style.display='';qEl.textContent=q.q}optsEl.innerHTML='';fb.textContent='';bar.style.width=(i/qs.length*100)+'%';speakLatvian(q.q+' . Izvēlies pareizo burtu!');q.opts.forEach(o=>{const b=document.createElement('button');b.className='btn';b.textContent=o.t;b.onclick=()=>{if(o.c){b.classList.add('correct');fb.textContent='✅ Pareizi! Lieliski!';fb.style.color='#16a34a';score++;beep(880,0.15);confetti(b);speakLatvian('Pareizi!')}else{b.classList.add('wrong');fb.textContent='❌ Mēģini vēlreiz!';fb.style.color='#dc2626';beep(220,0.2,'square');speakLatvian('Mēģini vēlreiz')}sc.textContent='Punkti: '+score;setTimeout(()=>{i++;render()},1100)};optsEl.appendChild(b)})}render()}
document.addEventListener('DOMContentLoaded',spawnFloaters);
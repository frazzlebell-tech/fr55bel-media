
const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>{loader.classList.add('hidden');document.body.classList.remove('is-loading')},850));

const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30));

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      if(entry.target.classList.contains('stat')) animateStat(entry.target);
    }
  })
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function animateStat(stat){
  const n=stat.querySelector('[data-count]');
  if(!n||n.dataset.done)return;
  n.dataset.done='true';
  const target=Number(n.dataset.count),start=performance.now(),duration=1100;
  function frame(now){
    const p=Math.min((now-start)/duration,1);
    n.textContent=Math.floor(target*(1-Math.pow(1-p,3)))+'+';
    if(p<1)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.getElementById('enquiryForm').addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(e.currentTarget);
  const subject=encodeURIComponent(`Website enquiry from ${d.get('name')}`);
  const body=encodeURIComponent(`Name: ${d.get('name')}
Business / Brand: ${d.get('business')}
Email: ${d.get('email')}
Phone: ${d.get('phone')}
Service: ${d.get('service')}

Project details:
${d.get('message')}`);
  window.location.href=`mailto:fraser.media18@gmail.com?subject=${subject}&body=${body}`;
});

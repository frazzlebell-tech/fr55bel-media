
document.querySelectorAll('.portal-filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.portal-filter').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('.portal-media-card').forEach(card=>{
    card.style.display=(f==='all'||card.classList.contains(f+'-card'))?'':'none';
  });
}));

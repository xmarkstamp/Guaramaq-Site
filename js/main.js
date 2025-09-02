
// Simple copy-to-clipboard for phone
document.querySelectorAll('[data-copy]').forEach(el=>{
  el.addEventListener('click', ()=>{
    const val = el.getAttribute('data-copy');
    navigator.clipboard.writeText(val).then(()=>{
      el.innerText='Número copiado!';
      setTimeout(()=>{ el.innerText='Copiar telefone'; }, 1600);
    });
  });
});

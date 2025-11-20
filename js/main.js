// main.js — small interactive bits
document.addEventListener('DOMContentLoaded', () => {
    // Year in footer
    const y = new Date().getFullYear();
    document.getElementById('year').textContent = y;
  
    // contact form simple handler (replace with real backend or form provider)
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name'), email = fd.get('email'), message = fd.get('message');
      // Minimal validation
      if(!name || !email || !message){
        alert('Please complete all fields before sending.');
        return;
      }
      // For demo: pretend to send message and clear
      alert('Message sent — (demo). Replace with real endpoint or form handler.');
      form.reset();
    });
  
    // small accessibility: focus visible
    document.addEventListener('keydown', e => {
      if(e.key === 'Tab') document.body.classList.add('show-focus');
    });
  });
  
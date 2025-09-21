document.addEventListener("DOMContentLoaded", () => {
  console.log("Interactive Resume Loaded 🚀");
});
// script.js

// Sticky nav + smooth scroll
const header = document.getElementById('siteHeader');
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...navLinks].map(l => document.querySelector(l.getAttribute('href')));

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) header.classList.add('sticky');
  else header.classList.remove('sticky');

  let idx = sections.findIndex(s => {
    if (!s) return false;
    const r = s.getBoundingClientRect();
    return (r.top <= 120 && r.bottom > 120);
  });

  navLinks.forEach(n => n.classList.remove('active'));
  if (idx >= 0) navLinks[idx].classList.add('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// ✅ Initialize EmailJS
(function(){
  emailjs.init("YOUR_PUBLIC_KEY"); // replace with your EmailJS Public Key
})();

// Handle form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formStatus = document.getElementById('formStatus');
  formStatus.textContent = "Sending...";

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  })
  .then(() => {
    formStatus.textContent = "✅ Message sent successfully!";
    this.reset();
  }, (err) => {
    formStatus.textContent = "❌ Failed to send. Try again.";
    console.error(err);
  });
});
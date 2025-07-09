document.addEventListener("DOMContentLoaded", () => {
    fetch('header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('site-header').innerHTML = data;
        initNav();
      })
      .catch(err => {
        console.error("Error loading header:", err);
      });
  });
  
  function initNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
  
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
          .scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const navItem = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        if (navItem) {
          if (scrollY >= top && scrollY < bottom) {
            navItem.classList.add('active');
          } else {
            navItem.classList.remove('active');
          }
        }
      });
    });
  }
  
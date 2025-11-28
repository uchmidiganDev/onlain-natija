// 🧮 MATEMATIK.UZ - TO'LIQ FUNKSIONAL!
document.addEventListener('DOMContentLoaded', function () {
  console.log('🧮 Matematik.uz yuklandi!');

  // 🔥 TELEGRAM BOT (SIZNING BOTINGIZ)
  const BOT_TOKEN = '8320376402:AAEySJdq_bw88_TuRgK5qmxHDjFT0ll9x0A';
  const CHAT_ID = '8172404961';

  // 📱 MOBILE MENU
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ⌨️ MATEMATIKA TYPING
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const texts = ['Matematik.uz', 'Algebra Mutaxassisi', 'DTM O\'qituvchisi', 'Geometriya Guru'];
    let textIndex = 0, charIndex = 0, isDeleting = false;
    function typeWriter() {
      const currentText = texts[textIndex];
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      let typeSpeed = isDeleting ? 50 : 150;
      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      setTimeout(typeWriter, typeSpeed);
    }
    setTimeout(typeWriter, 1000);
  }

  // 🎯 SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
      }
    });
  });

  // ACTIVE LINK
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 200;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  // 📊 SKILL BARS
  const skillProgressBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.getAttribute('data-width');
        progressBar.style.width = width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  skillProgressBars.forEach(bar => skillObserver.observe(bar));

  // 🚀 TELEGRAM FORM (MATEMATIKA!)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim() || '';
      const phone = document.getElementById('phone')?.value.trim() || '';
      const classLevel = document.getElementById('class')?.value.trim() || '';
      const service = document.getElementById('service')?.value || '';
      const message = document.getElementById('message')?.value.trim() || '';

      if (!name || !phone || !classLevel || !service || !message) {
        showNotification('❌ Barcha maydonlarni toʻldiring!', 'error');
        return;
      }

      const cleanPhone = phone.replace(/\D/g, '');
      if (!/^(998|0)?[0-9]{9}$/.test(cleanPhone)) {
        showNotification('❌ Telefon raqam notoʻgʻri!\n+998 90 123 45 67', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '⏳ Yuborilmoqda...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `🧮 *YANGI O\'QUVCHI YOZILDI!* 

👤 *Ism:* ${name}
📚 *Sinf:* ${classLevel}
📞 *Telefon:* ${phone}
🎓 *Xizmat:* ${service === 'individual' ? 'Individual dars' : service === 'group' ? 'Guruh dars' : service === 'online' ? 'Onlayn dars' : 'Kurs'}
💬 *Xabar:* ${message}

⏰ *Vaqt:* ${new Date().toLocaleString('uz-UZ', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}`,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
          })
        });

        const data = await response.json();

        if (data.ok) {
          showNotification('✅ Darsga yozildingiz!\n1 soat ichida bog\'lanaman! 📚', 'success');
          contactForm.reset();
        } else {
          throw new Error(data.description || 'Xato');
        }
      } catch (error) {
        console.error('❌ Xato:', error);
        showNotification('❌ Internet xatosi! Qayta urinib koʻring.', 'error');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // 📱 TELEFON MASK
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    function formatPhone(value) {
      let numbers = value.replace(/\D/g, '');
      if (numbers.startsWith('0')) numbers = numbers.substring(1);
      if (numbers.startsWith('9') && numbers.length === 9) numbers = '998' + numbers;
      let formatted = '+998 ';
      if (numbers.length > 3) formatted += numbers.substring(3, 5) + ' ';
      if (numbers.length > 5) formatted += numbers.substring(5, 8) + ' ';
      if (numbers.length > 8) formatted += numbers.substring(8);
      return formatted.trim();
    }
    phoneInput.addEventListener('input', (e) => e.target.value = formatPhone(e.target.value));
    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value.trim()) phoneInput.value = '+998 ';
    });
  }

  // 🔔 NOTIFICATION
  function showNotification(message, type = 'success') {
    const old = document.querySelector('.notification');
    if (old) old.remove();
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message.replace(/\n/g, '<br>')}</span>
            <button class="notification-close">×</button>
        `;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 100);
    notif.querySelector('.notification-close').onclick = () => {
      notif.classList.remove('show');
      setTimeout(() => notif.remove(), 300);
    };
    setTimeout(() => {
      if (notif.parentNode) {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
      }
    }, 5000);
  }

  // ⬆️ SCROLL TOP
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () =>
      scrollTopBtn.classList.toggle('show', window.pageYOffset > 300)
    );
    scrollTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // ✨ LOADING
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 3000);
  }

  // 🎉 COUNTERS
  function animateCounters() {
    document.querySelectorAll('.stat h4').forEach(counter => {
      const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
      let current = 0;
      const increment = target / 50;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current) + (target > 10 ? '+' : '%');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (target > 10 ? '+' : '%');
        }
      };
      updateCounter();
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) statsObserver.observe(statsSection);

  console.log('✅ MATEMATIK.UZ - TO\'LIQ TAYYOR! 🧮');
});

// CSS INJECTION
if (!document.querySelector('#math-styles')) {
  const style = document.createElement('style');
  style.id = 'math-styles';
  style.textContent = `
        .hamburger.active span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }
        .nav-menu.active { left: 0 !important; }
        .scroll-top.show { opacity: 1 !important; visibility: visible !important; }
        .notification {
            position: fixed; top: 20px; right: 20px; z-index: 10000;
            background: white; padding: 1.5rem 2rem; border-radius: 15px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            display: flex; align-items: flex-start; gap: 12px; max-width: 420px;
            font-family: 'Poppins', sans-serif;
            transform: translateX(400px); opacity: 0; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            border-left: 5px solid #059669;
        }
        .notification.show { transform: translateX(0); opacity: 1; }
        .notification-error { border-left-color: #dc2626; }
        .notification-success { border-left-color: #059669; }
        .notification-info { border-left-color: #1e3a8a; }
        .notification-close {
            margin-left: auto; background: none; border: none; font-size: 24px;
            width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
            color: #9ca3af; display: flex; align-items: center; justify-content: center;
            transition: all 0.2s ease;
        }
        .notification-close:hover { background: #f3f4f6; color: #374151; }
        .loader.hidden { opacity: 0 !important; visibility: hidden !important; }
        @media (max-width: 768px) { .notification { right: 10px; left: 10px; max-width: none; } }
    `;
  document.head.appendChild(style);
}
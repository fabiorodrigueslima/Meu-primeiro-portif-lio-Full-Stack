/* ========================================
   FÁBIO RODRIGUES - PORTFÓLIO
   JavaScript Completo e Moderno
======================================== */

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================

const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contatoForm = document.getElementById('contatoForm');

// ========================================
// MENU MOBILE
// ========================================

// Toggle do menu mobile
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
  document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ========================================
// HEADER COM SOMBRA NO SCROLL
// ========================================

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

// ========================================
// NAVEGAÇÃO ATIVA (SCROLL SPY)
// ========================================

const sections = document.querySelectorAll('section[id]');

function activateMenuOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', activateMenuOnScroll);

// ========================================
// SCROLL SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER)
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll(`
  .hero-text,
  .hero-image,
  .section-header,
  .sobre-text,
  .sobre-skills,
  .servico-card,
  .portfolio-item,
  .contato-info,
  .contato-form-wrapper,
  .stat-item,
  .skill-category
`);

animateElements.forEach(el => {
  el.classList.add('animate-element');
  observer.observe(el);
});

// ========================================
// ANIMAÇÃO CASCATA PARA CARDS
// ========================================

const cascadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.children;
      Array.from(cards).forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-in');
        }, index * 150); // Delay de 150ms entre cada card
      });
      cascadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplicar animação cascata nos grids
const grids = document.querySelectorAll('.servicos-grid, .portfolio-grid');
grids.forEach(grid => {
  const cards = grid.children;
  Array.from(cards).forEach(card => {
    card.classList.add('animate-element');
  });
  cascadeObserver.observe(grid);
});

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

contatoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = contatoForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Desabilitar botão e mostrar loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  
  // Coletar dados do formulário
  const formData = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    servico: document.getElementById('servico').value,
    mensagem: document.getElementById('mensagem').value
  };
  
  try {
    // Simular envio (substitua por sua integração real)
    await simulateFormSubmit(formData);
    
    // Sucesso
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
    submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
    
    // Resetar formulário
    contatoForm.reset();
    
    // Mostrar mensagem de sucesso
    showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    
    // Restaurar botão após 3 segundos
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
    }, 3000);
    
  } catch (error) {
    // Erro
    submitBtn.innerHTML = '<i class="fas fa-times"></i> Erro ao enviar';
    submitBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    
    showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.', 'error');
    
    // Restaurar botão após 3 segundos
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
    }, 3000);
  }
});

// Função para simular envio do formulário
function simulateFormSubmit(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Dados do formulário:', data);
      
      // Simular sucesso (90% de chance)
      if (Math.random() > 0.1) {
        resolve();
      } else {
        reject(new Error('Erro simulado'));
      }
    }, 2000);
  });
}

// ========================================
// SISTEMA DE NOTIFICAÇÕES
// ========================================

function showNotification(message, type = 'success') {
  // Remover notificação existente
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Criar notificação
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Adicionar ao body
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Remover após 5 segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// ========================================
// MÁSCARA DE TELEFONE
// ========================================

const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.length <= 11) {
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  }
  
  e.target.value = value;
});

// ========================================
// VALIDAÇÃO DE EMAIL EM TEMPO REAL
// ========================================

const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', (e) => {
  const email = e.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email && !emailRegex.test(email)) {
    e.target.style.borderColor = '#e74c3c';
    showNotification('Por favor, insira um email válido.', 'error');
  } else {
    e.target.style.borderColor = '';
  }
});

// ========================================
// PREVENÇÃO DE ANIMAÇÕES NO RESIZE
// ========================================

let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});

// ========================================
// LAZY LOADING DE IMAGENS
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// EFEITO DE DIGITAÇÃO NO HERO (OPCIONAL)
// ========================================

const heroSubtitle = document.querySelector('.hero-subtitle .gradient-text');
if (heroSubtitle) {
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroSubtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Iniciar após 500ms
  setTimeout(typeWriter, 500);
}

// ========================================
// CONTADOR ANIMADO PARA STATS (OPCIONAL)
// ========================================

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Observar stats para animar quando visível
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('strong');
      const numberText = statNumber.textContent;
      const number = parseInt(numberText);
      
      if (!isNaN(number)) {
        animateCounter(statNumber, number);
      }
      
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});

// ========================================
// EASTER EGG - KONAMI CODE (OPCIONAL)
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  showNotification('🎉 Você encontrou o Easter Egg! Parabéns, desenvolvedor curioso!', 'success');
  
  // Adicionar efeito visual divertido
  document.body.style.animation = 'rainbow 2s linear';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 2000);
}

// ========================================
// PERFORMANCE - DEBOUNCE PARA SCROLL
// ========================================

function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar debounce no scroll
window.addEventListener('scroll', debounce(() => {
  activateMenuOnScroll();
}, 10));

// ========================================
// ACESSIBILIDADE - FOCO VISÍVEL
// ========================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('user-is-tabbing');
});

// ========================================
// CONSOLE LOG PERSONALIZADO
// ========================================

console.log(
  '%c👋 Olá, Desenvolvedor Curioso!',
  'color: #4a90e2; font-size: 20px; font-weight: bold;'
);
console.log(
  '%c🚀 Portfólio desenvolvido por Fábio Rodrigues',
  'color: #6c5ce7; font-size: 14px;'
);
console.log(
  '%c💼 Interessado em trabalhar comigo? Entre em contato!',
  'color: #27ae60; font-size: 12px;'
);
console.log(
  '%c📧 contato@fabiorodrigues.dev',
  'color: #e74c3c; font-size: 12px; font-weight: bold;'
);

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Portfólio carregado com sucesso!');
  
  // Adicionar classe ao body quando tudo estiver carregado
  document.body.classList.add('loaded');
  
  // Ativar menu correto no carregamento
  activateMenuOnScroll();
});


// Seu código JavaScript atual aqui...

// ADICIONE ESTE CÓDIGO NO FINAL:
document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('/enviar-contato', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('✅ ' + data.message);
        this.reset(); // Limpa o formulário
    })
    .catch(error => {
        alert('❌ Erro ao enviar mensagem. Tente novamente.');
        console.error('Erro:', error);
    });
});

// Lógica para o formulário com Flask
const ContatoForm = document.getElementById('contatoForm');
if (contatoForm) {
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o recarregamento da página
        
        const formData = new FormData(this);
        
        fetch('/enviar-contato', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('✅ Mensagem enviada com sucesso!');
            this.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('❌ Erro ao enviar. Verifique o terminal do Python.');
        });
    });
}




// ========================================
// FIM DO JAVASCRIPT
// ========================================
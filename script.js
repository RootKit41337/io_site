// Мобильное меню
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

let isMenuOpen = false;
menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        isMenuOpen = false;
    });
});

// Закрытие меню при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        isMenuOpen = false;
    }
});

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления элементов
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .card, .timeline-item').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Стили для анимации
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Параллакс эффект
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            const hero = document.querySelector('.hero');
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            scrollTimeout = null;
        }, 10);
    }
});

// Анимации для карточек
document.querySelectorAll('.attraction-card, .place-card, .tradition-card, .institution-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotate(1deg)';
        card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotate(0)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Анимации для кнопок
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-8px) scale(1.05)';
        button.style.boxShadow = '0 15px 30px rgba(231, 76, 60, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.3)';
    });
});

// Анимации для изображений
document.querySelectorAll('.gallery-grid img, .card img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.08) rotate(1deg)';
        img.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotate(0)';
        img.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Анимации для временной шкалы
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const content = item.querySelector('.timeline-content');
        content.style.transform = 'scale(1.08) rotate(1deg)';
        content.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        const content = item.querySelector('.timeline-content');
        content.style.transform = 'scale(1) rotate(0)';
        content.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Анимация появления заголовков
document.querySelectorAll('h1, h2, h3').forEach(heading => {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(30px)';
    heading.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });
    
    headingObserver.observe(heading);
});

// Эффект набора текста для заголовков
document.querySelectorAll('.hero-content h1').forEach(heading => {
    const text = heading.textContent;
    heading.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    typeWriter();
}); 
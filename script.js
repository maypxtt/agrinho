/**
 * ============================================
 * ENERGIAS NO CAMPO - BLOG MAGAZINE STYLE
 * JavaScript ES6+ - Funcionalidades Interativas
 * ============================================
 */

// ========== MOCK DATA - ARRAY DE NOTÍCIAS ==========
const newsData = [
    {
        id: 1,
        title: "Energia Solar: A Revolução Silenciosa nas Fazendas do Paraná",
        excerpt: "Produtores rurais do Paraná estão reduzindo em até 95% seus custos com energia elétrica através da instalação de painéis fotovoltaicos. Descubra como a energia solar está transformando o agronegócio paranaense.",
        image: "img/solar.jpg",
        category: "Solar",
        date: "04 Jun 2026",
        readTime: "6 min",
        featured: true
    },
    {
        id: 2,
        title: "Biogás: Como Transformar Dejetos Animais em Energia e Lucro",
        excerpt: "A decomposição de resíduos orgânicos em biodigestores gera eletricidade e combustível, além de reduzir a emissão de gases de efeito estufa nas propriedades rurais.",
        image: "img/biogas.jpg",
        category: "Biogás",
        date: "03 Jun 2026",
        readTime: "5 min",
        featured: false
    },
    {
        id: 3,
        title: "Aerogeradores no Campo: Ventos que Geram Independência Energética",
        excerpt: "A energia eólica apresenta baixo custo operacional e é uma fonte inesgotável. Saiba como propriedades em regiões com ventos constantes estão aproveitando esse recurso.",
        image: "img/eolica.jpg",
        category: "Eólica",
        date: "02 Jun 2026",
        readTime: "4 min",
        featured: false
    },
    {
        id: 4,
        title: "Biomassa: O Aproveitamento Inteligente dos Resíduos Agrícolas",
        excerpt: "Restos de culturas, madeira e dejetos animais são transformados em energia,ax em resíduos agrícolas, reduzindo desperdício e gerando fertilizantes como subproduto sustentável.",
        image: "img/biomassa.jpg",
        category: "Biomassa",
        date: "01 Jun 2026",
        readTime: "5 min",
        featured: false
    },
    {
        id: 5,
        title: "Sustentabilidade: O Caminho para uma Agricultura de Baixo Carbono",
        excerpt: "O uso de energias renováveis contribui para a redução das emissões de carbono e menor dependência de combustíveis fósseis, tornando a produção agrícola mais sustentável.",
        image: "img/sustentabilidade.jpg",
        category: "Sustentabilidade",
        date: "31 Mai 2026",
        readTime: "7 min",
        featured: false
    },
    {
        id: 6,
        title: "Brasil Lidera Matriz Energética Renovável na América Latina",
        excerpt: "Com abundância de sol, ventos e produção agrícola, o Brasil possui grande potencial para geração de energia renovável. O agronegócio participa ativamente da matriz energética nacional.",
        image: "img/eolica.jpg", // Adaptado para energia eólica/renovável conforme o tema anterior
        category: "Solar",
        date: "30 Mai 2026",
        readTime: "6 min",
        featured: false
    },
    {
        id: 7,
        title: "Financiamento Rural: Linhas de Crédito para Energia Renovável",
        excerpt: "Conheça as principais linhas de financiamento disponíveis para produtores rurais que desejam investir em sistemas de energia solar, eólica e biogás em suas propriedades.",
        image: "img/financiamento.jpg",
        category: "Sustentabilidade",
        date: "29 Mai 2026",
        readTime: "8 min",
        featured: false
    },
    {
        id: 8,
        title: "Irrigação Solar: Tecnologia que Aumenta Produtividade e Reduz Custos",
        excerpt: "Sistemas de irrigação movidos a energia solar estão revolucionando a agricultura, permitindo o bombeamento de água de forma eficiente e económica durante todo o ano.",
        image: "img/irrigacao.jpg",
        category: "Solar",
        date: "28 Mai 2026",
        readTime: "5 min",
        featured: false
    }
];

// ========== DOM ELEMENTS ==========
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const themeToggle = document.getElementById('theme-toggle');
const newsGrid = document.getElementById('news-grid');
const header = document.getElementById('header');
const newsletterForm = document.getElementById('newsletter-form');

// ========== MENU HAMBÚRGUER ==========
/**
 * Gerencia a abertura e fechamento do menu mobile
 */
function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Atualiza o atributo aria-expanded para acessibilidade
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    
    // Previne scroll do body quando o menu está aberto
    document.body.style.overflow = isExpanded ? 'hidden' : '';
}

/**
 * Fecha o menu ao clicar em um link
 */
function closeMenuOnLinkClick() {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

// Event Listener para o menu hambúrguer
hamburger.addEventListener('click', toggleMenu);
closeMenuOnLinkClick();

// ========== DARK MODE / LIGHT MODE ==========
/**
 * Obtém o tema salvo no localStorage ou usa o padrão do sistema
 */
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    // Verifica preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Aplica o tema especificado
 * @param {string} theme - 'light' ou 'dark'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

/**
 * Alterna entre os temas claro e escuro
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Inicializa o tema ao carregar a página
setTheme(getPreferredTheme());

// Event Listener para alternar tema
themeToggle.addEventListener('click', toggleTheme);

// ========== RENDERIZAÇÃO DINÂMICA DE NOTÍCIAS ==========
/**
 * Cria o HTML de um card de notícia
 * @param {Object} news - Objeto com dados da notícia
 * @returns {string} HTML do card
 */
function createNewsCard(news) {
    return `
        <article class="news-card" data-category="${news.category.toLowerCase()}">
            <div class="news-card__image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <span class="news-card__category">${news.category}</span>
            </div>
            <div class="news-card__content">
                <h3 class="news-card__title">${news.title}</h3>
                <p class="news-card__excerpt">${news.excerpt}</p>
                <div class="news-card__meta">
                    <span class="news-card__date">📅 ${news.date}</span>
                    <span class="news-card__read">⏱ ${news.readTime}</span>
                </div>
            </div>
        </article>
    `;
}

/**
 * Renderiza todos os cards de notícias no grid
 */
function renderNews() {
    if (!newsGrid) return;
    
    // Ordena para colocar notícias em destaque primeiro
    const sortedNews = [...newsData].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    });
    
    // Gera o HTML de todos os cards
    const newsHTML = sortedNews.map(news => createNewsCard(news)).join('');
    
    // Insere no grid
    newsGrid.innerHTML = newsHTML;
}

// Renderiza as notícias ao carregar a página
renderNews();

// ========== HEADER SCROLL EFFECT ==========
/**
 * Adiciona efeito de sombra ao header ao rolar a página
 */
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ========== SMOOTH SCROLL PARA LINKS INTERNOS ==========
/**
 * Implementa scroll suave para links âncora
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

initSmoothScroll();

// ========== NEWSLETTER FORM ==========
/**
 * Gerencia o envio do formulário de newsletter
 */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('.newsletter__input');
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Simula envio do formulário
        alert(`✅ Obrigado por se inscrever!\n\nVocê receberá nossas novidades em: ${email}`);
        emailInput.value = '';
    } else {
        alert('❌ Por favor, insira um e-mail válido.');
    }
}

/**
 * Valida formato de e-mail
 * @param {string} email - E-mail a ser validado
 * @returns {boolean} Se o e-mail é válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
/**
 * Atualiza o link ativo na navegação baseado na seção visível
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('nav__link--active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========== INTERSECTION OBSERVER PARA ANIMAÇÕES ==========
/**
 * Anima elementos quando entram na viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa cards de categorias e benefícios
    document.querySelectorAll('.category-card, .benefit-item, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializa animações após o carregamento do DOM
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ========== CATEGORY FILTER (BONUS) ==========
/**
 * Filtra notícias por categoria quando um card de categoria é clicado
 */
function initCategoryFilter() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            filterNewsByCategory(category);
            
            // Scroll suave para a seção de notícias
            const noticiasSection = document.getElementById('noticias');
            if (noticiasSection) {
                noticiasSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Filtra os cards de notícias por categoria
 * @param {string} category - Categoria a ser filtrada
 */
function filterNewsByCategory(category) {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

initCategoryFilter();

// ========== CONSOLE LOG PARA DEBUG ==========
console.log('[v0] Energias no Campo - Blog carregado com sucesso!');
console.log('[v0] Total de notícias carregadas:', newsData.length);
console.log('[v0] Tema atual:', getPreferredTheme());
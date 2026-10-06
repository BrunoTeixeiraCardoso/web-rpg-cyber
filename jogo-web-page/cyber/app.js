/**
 * Inicializa a aplicação web injetando os dados estáticos estruturados.
 * Segue o padrão assíncrono para evitar o bloqueio de renderização do navegador.
 */
async function initSite() {
    try {
        const response = await fetch('content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 1. Renderização do Cabeçalho (Header)
        const logoElement = document.getElementById('js-logo');
        if (logoElement) {
            logoElement.textContent = data.header.logo;
            logoElement.setAttribute('aria-label', data.header.logo);
        }
        
        const menuContainer = document.getElementById('js-menu');
        if (menuContainer) {
            data.header.menu.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.link;
                a.className = 'header__link';
                a.textContent = item.label;
                li.appendChild(a);
                menuContainer.appendChild(li);
            });
        }

        // 2. Renderização da Seção de Destaque (Hero)
        const heroTitle = document.getElementById('js-hero-title');
        const heroSubtitle = document.getElementById('js-hero-subtitle');
        const btnPrimary = document.getElementById('js-hero-primary');
        const btnSecondary = document.getElementById('js-hero-secondary');

        if (heroTitle) heroTitle.textContent = data.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
        
        if (btnPrimary) {
            btnPrimary.textContent = data.hero.primaryBtn.label;
            btnPrimary.href = data.hero.primaryBtn.link;
        }
        if (btnSecondary) {
            btnSecondary.textContent = data.hero.secondaryBtn.label;
            btnSecondary.href = data.hero.secondaryBtn.link;
        }

        // 3. Renderização da Seção "Sobre o Sistema"
        const aboutTitle = document.getElementById('js-about-title');
        const aboutText = document.getElementById('js-about-text');

        if (aboutTitle) aboutTitle.textContent = data.about.title;
        if (aboutText) aboutText.innerHTML = data.about.text;

        // 4. Renderização Dinâmica dos Recursos/Downloads (Grid & Cards)
        const featuresTitle = document.getElementById('js-features-title');
        const featuresIntro = document.getElementById('js-features-intro');
        const gridContainer = document.getElementById('js-grid');

        if (featuresTitle) featuresTitle.textContent = data.features.title;
        if (featuresIntro) featuresIntro.textContent = data.features.intro;
        
        if (gridContainer) {
            data.features.cards.forEach(card => {
                const article = document.createElement('article');
                article.className = 'card';
                article.innerHTML = `
                    <h3 class="card__title">${card.title}</h3>
                    <p class="card__text">${card.text}</p>
                    <a href="${card.linkUrl}" class="card__link" download>${card.linkLabel}</a>
                `;
                gridContainer.appendChild(article);
            });
        }

        // 5. Renderização do Rodapé (Footer)
        const footerCopyright = document.getElementById('js-footer-copyright');
        const footerMeta = document.getElementById('js-footer-meta');

        if (footerCopyright) footerCopyright.innerHTML = data.footer.copyright;
        if (footerMeta) footerMeta.textContent = data.footer.meta;

    } catch (error) {
        console.error('Erro crítico na inicialização do terminal de dados:', error);
    }
}

// Garante a execução do código apenas após a árvore DOM estar totalmente montada
document.addEventListener('DOMContentLoaded', initSite);

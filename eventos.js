// Animação de entrada dos blocos
const observarScroll = () => {
    const blocos = document.querySelectorAll('.detalhe-bloco');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12 });

    blocos.forEach(bloco => observer.observe(bloco));
};

// Lightbox para abrir imagens dos cards e detalhes
const configurarLightbox = () => {
    const itens = document.querySelectorAll('[data-img], .foto-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (!lightbox || !lightboxImg) return;

    itens.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-img') || item.src;
            lightboxImg.src = src;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('open');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }
    });
};

window.addEventListener('DOMContentLoaded', () => {
    observarScroll();
    configurarLightbox();
});

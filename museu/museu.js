// 1. Animação de Scroll (Revelação)
const observarScroll = () => {
    const blocos = document.querySelectorAll('.detalhe-bloco');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 }); // Ativa quando 10% do bloco aparece

    blocos.forEach(bloco => observer.observe(bloco));
};

// 2. Função de Abrir Foto (Lightbox)
const configurarLightbox = () => {
    const imagens = document.querySelectorAll('.foto-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    imagens.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src; // Copia o caminho da foto clicada
            lightbox.classList.add('open'); // Abre o modal
        });
    });
};

// Iniciar funções ao carregar a página
window.addEventListener("load", () => {
    observarScroll();
    configurarLightbox();
});

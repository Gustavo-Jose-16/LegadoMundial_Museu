// Reveal on scroll usado pelo conteúdo novo
(function () {
    const els = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const delay = parseInt(e.target.getAttribute('data-delay') || '0', 10);

                setTimeout(() => {
                    e.target.classList.add('is-visible');
                }, delay);

                io.unobserve(e.target);
            }
        });
    }, {
        threshold: 0.15
    });

    els.forEach((el) => io.observe(el));
})();

/* ===== INDEX page script — parallax hero + 3D trophy carousel ===== */
(function () {

    // Parallax
    const heroBg = document.getElementById('hero-bg');

    if (heroBg) {
        const onScroll = () => {
            const y = window.scrollY;

            heroBg.style.transform =
                `translate3d(0, ${y * 0.4}px, 0) scale(${1 + y * 0.0004})`;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // 3D trophy carousel
    const spin = document.getElementById('carousel-spin');

    if (spin) {

        const COUNT = 8;

        for (let i = 0; i < COUNT; i++) {

            const img = document.createElement('img');

            img.src = 'img/taça-2026.png';
            img.alt = 'FIFA World Cup Trophy';

            spin.appendChild(img);
        }

        const layout = () => {

            const isMobile = window.innerWidth < 768;
            const radius = isMobile ? 170 : 320;

            const imgs = spin.querySelectorAll('img');

            imgs.forEach((img, i) => {

                const angle = (i * 360) / imgs.length;

                img.style.transform =
                    `rotateY(${angle}deg) translateZ(${radius}px)`;

                img.style.transitionDelay =
                    `${(imgs.length - i) / 6}s`;
            });
        };

        layout();

        window.addEventListener('resize', layout);
    }

})();

let leitorAtivo = false;
let ultimoTexto = "";
let timeout;

// Ativar / desativar
function ativarLeitor() {

    leitorAtivo = !leitorAtivo;

    const container = document.getElementById("iconeContainer");

    const iconSom = `
    <svg viewBox="0 0 24 24">
        <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16.03C15.5,15.29 16.5,13.77 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
    </svg>`;

    const iconMudo = `
    <svg viewBox="0 0 24 24">
        <path d="M12,4L9.91,6.09L12,8.18V4M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L4.27,3"/>
    </svg>`;

    container.innerHTML = leitorAtivo ? iconMudo : iconSom;

    const aviso = leitorAtivo
        ? "Leitor ativado"
        : "Leitor desativado";

    ultimoTexto = "";

    falar(aviso);
}

// Função de fala
function falar(texto) {

    if (!texto || texto === ultimoTexto) return;

    ultimoTexto = texto;

    clearTimeout(timeout);

    timeout = setTimeout(() => {

        const fala = new SpeechSynthesisUtterance(texto);

        fala.lang = "pt-BR";

        speechSynthesis.cancel();
        speechSynthesis.speak(fala);

    }, 300);
}

// Pegar texto inteligente
function pegarTexto(el) {

    if (!el) return "";

    return (
        el.getAttribute("aria-label") ||
        el.alt ||
        el.placeholder ||
        el.title ||
        el.innerText
    );
}

// Mouse mais preciso
document.addEventListener("mousemove", function (e) {

    if (!leitorAtivo) return;

    const elemento = document.elementFromPoint(e.clientX, e.clientY);

    if (!elemento) return;

    if (elemento.matches("button, a, p, h1, h2, h3, span, img, input, label")) {

        const texto = pegarTexto(elemento);

        falar(texto);
    }
});

// Toque no celular
document.addEventListener("touchstart", function (e) {

    if (!leitorAtivo) return;

    const elemento = e.target;

    if (elemento.matches("button, a, p, h1, h2, h3, span, img, input, label")) {

        const texto = pegarTexto(elemento);

        falar(texto);
    }
});

// Tradução
let currentLang = "pt";

function toggleLanguage() {

    const texto = document.getElementById("lang-text");

    currentLang = currentLang === "pt"
        ? "en"
        : "pt";

    document.querySelectorAll("[data-pt]").forEach(el => {

        el.innerText = el.getAttribute("data-" + currentLang);
    });

    texto.innerText = currentLang.toUpperCase();
}

// Cookies
function aceitarCookies() {

    localStorage.setItem("cookieConsent", "accepted");

    ativarScripts();
    fecharBanner();
}

function recusarCookies() {

    localStorage.setItem("cookieConsent", "rejected");

    fecharBanner();
}

function fecharBanner() {

    document.getElementById("cookieBanner").style.display = "none";
}

function ativarScripts() {

    const scripts = document.querySelectorAll('script[type="text/plain"]');

    scripts.forEach(script => {

        const novoScript = document.createElement("script");

        if (script.src) {
            novoScript.src = script.src;
        } else {
            novoScript.textContent = script.textContent;
        }

        document.body.appendChild(novoScript);
    });
}

// Mostrar banner
window.onload = function () {

    document.getElementById("cookieBanner").style.display = "flex";

    const consent = localStorage.getItem("cookieConsent");

    if (consent === "accepted") {
        ativarScripts();
    }
};

// VLibras
new window.VLibras.Widget('https://vlibras.gov.br/app');
let currentLang = "pt";

function toggleLanguage() {
    const texto = document.getElementById("lang-text");

    currentLang = currentLang === "pt" ? "en" : "pt";

    document.querySelectorAll("[data-pt]").forEach(el => {
        el.innerText = el.getAttribute("data-" + currentLang);
    });

    // 🔥 muda só o texto, NÃO o botão inteiro
    texto.innerText = currentLang.toUpperCase();
}
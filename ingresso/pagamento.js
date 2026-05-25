let ingressoTipo = "";
let ingressoPreco = 0;


let idioma = document.documentElement.lang || "pt";

let tituloEmail =
    idioma === "en"
        ? "Thank You for Your Order!"
        : "Obrigado pela sua compra!";

let mensagemEmail =
    idioma === "en"
        ? "Your ticket purchase has been confirmed successfully."
        : "Sua compra de ingressos foi confirmada com sucesso.";

let textoQuantidade =
    idioma === "en"
        ? "Quantity"
        : "Quantidade";

let textoPagamento =
    idioma === "en"
        ? "Payment Method"
        : "Método de Pagamento";

let textoTotal =
    idioma === "en"
        ? "Order Total"
        : "Total do Pedido";


/**
 * Abre o modal com os dados do ingresso
 */
function abrirPagamento(tipo, preco) {
    ingressoTipo = tipo;
    ingressoPreco = Number(preco);

    document.getElementById("modal").style.display = "block";

    document.getElementById("produto").innerText = tipo;
    document.getElementById("preco").innerText = preco;
    document.getElementById("quantidade").value = 1;

    calcularTotal();
}

/**
 * Fecha o modal
 */
function fecharModal() {
    document.getElementById("modal").style.display = "none";
}


/**
 * Calcula o total
 */
function calcularTotal() {
    let quantidade = Number(document.getElementById("quantidade").value);
    let total = quantidade * ingressoPreco;

    document.getElementById("total").innerText = total.toFixed(2);
}

/**
 * Espera o HTML carregar antes de adicionar eventos
 */
document.addEventListener("DOMContentLoaded", function () {

    // Atualiza total
    document.getElementById("quantidade").addEventListener("input", calcularTotal);

    // Seleção de pagamento por continente
    document.getElementById("continente").addEventListener("change", function () {
        let continente = this.value;
        let pagamento = document.getElementById("pagamento");

        pagamento.innerHTML = "";

        let opcoes = [];

        if (continente === "america") opcoes = ["Cartão", "PIX", "PayPal"];
        else if (continente === "europa") opcoes = ["Visa", "Mastercard", "SEPA"];
        else if (continente === "asia") opcoes = ["Alipay", "WeChat Pay", "UnionPay"];
        else if (continente === "africa") opcoes = ["M-Pesa", "Cartão", "Transferência"];

        opcoes.forEach(opcao => {
            let option = document.createElement("option");
            option.value = opcao;
            option.text = opcao;
            pagamento.appendChild(option);
        });
    });

});

/**
 * Finaliza compra
 */
function finalizarCompra() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let pais = document.getElementById("pais").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let metodo = document.getElementById("pagamento").value;

    let total = quantidade * ingressoPreco;

    if (!nome || !email || !pais || !quantidade || !metodo) {
        alert("Por favor, preencha todos os campos antes de finalizar!");
        return;
    }

    let templateParams = {
        name: nome,
        email: email,  // Altere de 'user_email' para 'to_email'
        tipo_ingresso: ingressoTipo,
        qtd: quantidade,
        pagamento_metodo: metodo,
        valor_total: "U$ " + total.toFixed(2)
    };

    emailjs.send('service_bl6nyfh', 'template_tpkysfs', templateParams)
        .then(function (response) {
            alert("Sucesso! Compra finalizada!");
            fecharModal();
        })
        .catch(function (error) {
            alert("Erro ao enviar o e-mail.");
            console.log(error);
        });
}

function adicionarAnimacoes() {
    const elementos = document.querySelectorAll(
        ".hero-section h1, .ticket-card, footer"
    );

    elementos.forEach((elemento) => {
        elemento.classList.add("animar");
    });

    const observador = new IntersectionObserver((itens) => {
        itens.forEach((item) => {
            if (item.isIntersecting) {
                item.target.classList.add("apareceu");
            }
        });
    }, {
        threshold: 0.15
    });

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    adicionarAnimacoes();
});
// ==========================================
// SELEÇÃO DOS ELEMENTOS DO DOM
// ==========================================

// Elementos originais
let btnTema = document.getElementById("btn-tema");
let campoNome = document.getElementById("campo-nome");
let mensagemSaudacao = document.getElementById("mensagem-saudacao");
let btnCurtir = document.getElementById("btn-curtir");
let contadorCurtidas = document.getElementById("contador-curtidas");
let cartoes = document.querySelectorAll(".cartao");

// Novos elementos
let btnCuriosidade = document.getElementById("btn-curiosidade");
let caixaCuriosidade = document.getElementById("caixa-curiosidade");
let blocoItem = document.getElementById("bloco-item");
let mensagemItem = document.getElementById("mensagem-item");


// ==========================================
// VARIÁVEIS DE CONTROLE
// ==========================================

let totalCurtidas = 0;
let modoEscuroAtivo = false;
let curiosidadeVisivel = false;

// Lista de itens sorteados ao clicar no bloco do Mario
let itensMario = [
    "🍄 Você ganhou um Super Cogumelo! (Cresceu!)",
    "🔥 Você ganhou uma Flor de Fogo! (Pode atirar bolas de fogo!)",
    "⭐ Você ganhou uma Estrela! (Ficou Invencível!)",
    "🪙 Você coletou 1 Moeda!",
    "🥚 Você encontrou um Ovo do Yoshi!"
];


// ==========================================
// REGISTRO DOS EVENTOS E FUNÇÕES
// ==========================================

// EVENTO 1: Leitura do input do nome em tempo real
campoNome.addEventListener("input", function() {
    let nomeDigitado = campoNome.value;

    if (nomeDigitado !== "") {
        mensagemSaudacao.textContent = "Olá, " + nomeDigitado + "! Vamos jogar Super Mario!";
        mensagemSaudacao.style.color = "#e52521";
    } else {
        mensagemSaudacao.textContent = "Esperando seu nome...";
        mensagemSaudacao.style.color = "#007bf5";
    }
});


// EVENTO 2: Contador de Curtidas
btnCurtir.addEventListener("click", function() {
    totalCurtidas = totalCurtidas + 1;
    contadorCurtidas.textContent = totalCurtidas;
    contadorCurtidas.style.fontWeight = "bold";
    contadorCurtidas.style.color = "#4caf50";
});


// EVENTO 3: Alternar Modo Escuro / Claro (Com ajuste nos cartões)
btnTema.addEventListener("click", function() {
    if (modoEscuroAtivo === false) {
        document.body.style.backgroundColor = "#121212";
        document.body.style.color = "#ffffff";

        for (let i = 0; i < cartoes.length; i++) {
            cartoes[i].style.backgroundColor = "#242424";
            cartoes[i].style.color = "#ffffff";
            cartoes[i].style.borderColor = "#444444";
        }

        btnTema.textContent = "Mudar para Modo Claro";
        modoEscuroAtivo = true;
    } else {
        document.body.style.backgroundColor = "#f0f0f0";
        document.body.style.color = "#333333";

        for (let i = 0; i < cartoes.length; i++) {
            cartoes[i].style.backgroundColor = "#ffffff";
            cartoes[i].style.color = "#333333";
            cartoes[i].style.borderColor = "#cccccc";
        }

        btnTema.textContent = "Mudar para Modo Escuro";
        modoEscuroAtivo = false;
    }
});


// EVENTO 4 (NOVO): Mostrar/Esconder Seção de Curiosidades
btnCuriosidade.addEventListener("click", function() {
    if (curiosidadeVisivel === false) {
        caixaCuriosidade.style.display = "block";
        btnCuriosidade.textContent = "Ocultar Curiosidade 🙈";
        curiosidadeVisivel = true;
    } else {
        caixaCuriosidade.style.display = "none";
        btnCuriosidade.textContent = "Mostrar Curiosidade 💡";
        curiosidadeVisivel = false;
    }
});


// EVENTO 5 (NOVO): Clique no Bloco de Surpresa do Mario
blocoItem.addEventListener("click", function() {
    // Sorteia um número aleatório entre 0 e a quantidade de itens da lista
    let indiceAleatorio = Math.floor(Math.random() * itensMario.length);
    
    // Altera o texto abaixo do bloco
    mensagemItem.textContent = itensMario[indiceAleatorio];
    mensagemItem.style.color = "#ff9800";
});
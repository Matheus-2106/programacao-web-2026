// Seleção dos elementos do DOM
const form = document.getElementById('form-tarefa');
const inputTitulo = document.getElementById('titulo');
const inputPrioridade = document.getElementById('prioridade');
const listaTarefas = document.getElementById('lista-tarefas');
const btnLimpar = document.getElementById('btn-limpar');

// Função para buscar as tarefas salvas no localStorage
function obterTarefasSalvas() {
  const dados = localStorage.getItem('minhas_tarefas');
  // Se for null (1ª vez), retorna array vazio, senão faz o parse
  return dados ? JSON.parse(dados) : [];
}

// Função para renderizar os itens na tela
function renderizarTarefas() {
  const tarefas = obterTarefasSalvas();
  
  // Limpa o conteúdo atual da UL para não duplicar
  listaTarefas.innerHTML = '';

  // Percorre o array de objetos utilizando for...of
  for (const tarefa of tarefas) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${tarefa.titulo}</strong></span>
      <span>Prioridade: ${tarefa.prioridade}</span>
    `;
    listaTarefas.appendChild(li);
  }
}

// Passo 1 e 4: Captura o submit do formulário e salva a nova tarefa
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o recarregamento padrão da página

  // Passo 2: Criação do objeto com tratamento de tipo (Number)
  const novaTarefa = {
    titulo: inputTitulo.value.trim(),
    prioridade: Number(inputPrioridade.value)
  };

  // Passo 3: Recupera a lista atual
  const tarefas = obterTarefasSalvas();

  // Passo 4: Adiciona o novo objeto e salva com JSON.stringify
  tarefas.push(novaTarefa);
  localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));

  // Limpa os campos do formulário
  form.reset();
  inputTitulo.focus();

  // Atualiza a exibição na tela
  renderizarTarefas();
});

// Ação do botão para limpar o localStorage
btnLimpar.addEventListener('click', function () {
  if (confirm('Deseja realmente apagar todos os registros?')) {
    localStorage.removeItem('minhas_tarefas');
    renderizarTarefas(); // Atualiza a tela (vai ficar vazia)
  }
});

// Passo 6: Exibe os registros ao carregar/recarregar a página
document.addEventListener('DOMContentLoaded', renderizarTarefas);
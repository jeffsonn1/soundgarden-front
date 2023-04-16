// Receber o ID da URL
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log(id);

// Pegando os campos
let excluirButton = document.getElementById('excluir');
let nomeInput = document.getElementById('nome');
let bannerInput = document.getElementById('banner');
let atracaoInput = document.getElementById('atracoes');
let descricaoInput = document.getElementById('descricao');
let dataInput = document.getElementById('data');
let lotacaoInput = document.getElementById('lotacao');

// Função para obter os dados do evento da API
function getApiEventos() {
  fetch("https://soundgarden-api.vercel.app/events/" + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resposta) => {
      return resposta.json();
  }).then((resposta) => {
    console.log(resposta);

    let scheduled = resposta.scheduled.substring(0, 10);

    // Atribuindo valores aos campos de input
    nomeInput.value = resposta.name;
    bannerInput.value = resposta.poster;
    atracaoInput.value = resposta.attractions;
    descricaoInput.value = resposta.description;
    dataInput.value = scheduled;
    lotacaoInput.value = resposta.number_tickets;

  }).catch((erro) => {
    console.log(erro);
    window.location.href = 'admin.html';
  });
}
getApiEventos();

// Função para deletar o evento da API
function deleteApiEventos() {
  fetch("https://soundgarden-api.vercel.app/events/" + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resposta) => {
    console.log(resposta);
  }).catch((erro) => {
    console.log(erro);
  });
}

// Função de clique do botão de excluir
excluirButton.onclick = function(event){
  deleteApiEventos();
}


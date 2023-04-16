// Receber o ID da URL
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log(id);

// Pegando os campos
let editarButton = document.getElementById('editar');
let nomeInput = document.getElementById('nome');
let bannerInput = document.getElementById('banner');
let atracaoInput = document.getElementById('atracoes');
let descricaoInput = document.getElementById('descricao');
let dataInput = document.getElementById('data');
let lotacaoInput = document.getElementById('lotacao');
let lnome_msg = document.getElementById('msg-vld-lname');

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
  
      // Atribuir valores aos campos de input
      nomeInput.value = resposta.name;
      bannerInput.value = resposta.poster;
      atracaoInput.value = resposta.attractions;
      descricaoInput.value = resposta.description;
      dataInput.value = scheduled;
      lotacaoInput.value = resposta.number_tickets;
  
    }).catch((erro) => {
      console.log(erro);
    });
  }
  
getApiEventos();

editarButton.onclick = function(event){
    lnome_msg.style.display = 'none';
    if (nomeInput.value === "" || bannerInput.value === "" || atracaoInput.value === "" || descricaoInput.value === "" || dataInput.value === "" || lotacaoInput.value === "") {
        event.preventDefault(); // Impede o envio do formulário
        lnome_msg.style.display = 'block';
    } else {
        event.preventDefault();

        // Converte a data para o formato ISO 8601
        var dataFormatada = new Date(dataInput.value).toISOString();

        var requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({   
                "name": nomeInput.value,
                "poster": "link da imagem",
                "attractions": [
                    atracaoInput.value,
                ],
                "description": descricaoInput.value,
                "scheduled": dataFormatada, // Usa a data formatada em ISO 8601
                "number_tickets": lotacaoInput.value,
            }),
        };
          
        fetch("https://soundgarden-api.vercel.app/events/" + id, requestOptions)
            .then(response => response.text())
            .then((resposta) => {
                console.log(resposta);
                window.location.href = 'admin.html';
            }).catch((error) => {
                console.log(error);
            });
    }
}
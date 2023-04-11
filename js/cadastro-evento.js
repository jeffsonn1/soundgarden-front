document.addEventListener('DOMContentLoaded', function() {

let enviarButton = document.getElementById('enviar');
let nomeInput = document.getElementById('nome');
let atracaoInput = document.getElementById('atracoes');
let descricaoInput = document.getElementById('descricao');
let dataInput = document.getElementById('data');
let lotacaoInput = document.getElementById('lotacao');
let lnome_msg = document.getElementById('msg-vld-lname');

enviarButton.onclick = function(event){
    lnome_msg.style.display = 'none';
    if (nomeInput.value === "" || atracaoInput.value === "" || descricaoInput.value === "" || dataInput.value === "" || lotacaoInput.value === "") {
        event.preventDefault(); // Impede o envio do formulário
        lnome_msg.style.display = 'block';
    } else {
    event.preventDefault();
    var dataISO = new Date(dataInput.value).toISOString();
    var requestOptions = {
        method: 'POST',
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
            "scheduled": dataISO,
            "number_tickets": lotacaoInput.value,
        }),
    };
      
    fetch("https://soundgarden-api.vercel.app/events", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    //limpar campos após o envio
    nomeInput.value = "";
    atracaoInput.value = "";
    descricaoInput.value = "";
    dataInput.value = "";
    lotacaoInput.value = "";
    }
}

});

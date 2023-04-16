let enviarButton = document.getElementById('enviar');
let nomeInput = document.getElementById('nome');
let emailInput = document.getElementById('email');
let quantidadeInput = document.getElementById('quantidade');
let lnome_msg = document.getElementById('msg-vld-lname');
let id;

//listar eventos
function getApiEventos() {
    fetch("https://soundgarden-api.vercel.app/events", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resposta) => {
      return resposta.json();
    }).then((resposta) => {
      //criar posts
      var lmEvento = "";
      console.log(resposta);
      resposta.reverse().forEach((user) => {
        id = user._id;
        //pega os primeiros 10 digitos
        let scheduled = user.scheduled.substring(0, 10);

        lmEvento+='<article class="evento card p-5 m-3"><h2>'+user.name+' - '+scheduled+'</h2>';
        lmEvento+="<h4>"+user.attractions
        +"</h4>";
        lmEvento+="<p>"+user.description+"</p>";
        lmEvento+='<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">reservar ingresso</button>';
        lmEvento+="</article>";
      });
      document.getElementById("lsEvento").innerHTML = lmEvento;

    }).catch((erro) => {
      console.log(erro);
    });
}
getApiEventos();

enviarButton.onclick = function(event){
    lnome_msg.style.display = 'none';
    if (nomeInput.value === "" || emailInput.value === "" || quantidadeInput.value === "") {
        event.preventDefault(); // Impede o envio do formulário
        lnome_msg.style.display = 'block';
    } else {
        event.preventDefault();
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "owner_name": nomeInput.value,
              "owner_email": emailInput.value,
              "number_tickets": quantidadeInput.value,
              "event_id": id
          }),
        };
          
        fetch("https://soundgarden-api.vercel.app/bookings", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
        // Limpa os campos após o envio
        nomeInput.value = "";
        emailInput.value = "";
        quantidadeInput.value = "";
    }
}
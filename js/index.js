let enviarButton = document.getElementById('enviar');
let nomeInput = document.getElementById('nome');
let emailInput = document.getElementById('email');
let quantidadeInput = document.getElementById('quantidade');
let lnome_msg = document.getElementById('msg-vld-lname');
let id;

function getApiEventos() {
    fetch("https://soundgarden-api.vercel.app/events", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resposta) => {
      return resposta.json();
    }).then((resposta) => {
      //criar carrossel
      var lmEvento = '<div class="carousel-item active"><img src="https://github.com/jeffsonn1/soundgarden-front/blob/main/img/show.jpg?raw=true" class="d-block w-100" alt="foto de um show"><div class="carousel-caption d-none d-md-block"><h1>Sound Garden</h1><h3>Confira os eventos neste carrossel!</h3></div></div>';
      resposta.reverse().forEach((user) => {
        lmEvento+='<div class="carousel-item"> <img src="https://github.com/jeffsonn1/soundgarden-front/blob/main/img/show.jpg?raw=true" class="d-block w-100" alt="foto de um show"> <div class="carousel-caption d-none d-md-block">';
        lmEvento+='<h1>'+user.name+'</h1>';
        lmEvento+='<h3>'+user.description+'</h3>';
        lmEvento+='</div> </div>';
      });
      document.getElementById("lsEvento").innerHTML = lmEvento;

    }).catch((erro) => {
      console.log(erro);
    });
}
getApiEventos();

function getApiEventos2() {
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
      resposta.reverse().slice(0, 3).forEach((user) => {
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
      document.getElementById("lsEvento2").innerHTML = lmEvento;

    }).catch((erro) => {
      console.log(erro);
    });
}
getApiEventos2();

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
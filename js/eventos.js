console.log('deu certo')

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
      resposta.forEach((user) => {
        //pega os primeiros 10 digitos
        let scheduled = user.scheduled.substring(0, 10);

        lmEvento+='<article class="evento card p-5 m-3"><h2>'+user.name+' - '+scheduled+'</h2>';
        lmEvento+="<h4>"+user.attractions
        +"</h4>";
        lmEvento+="<p>"+user.description+"</p>";
        lmEvento+='<a href="#" class="btn btn-primary">reservar ingresso</a>';
        lmEvento+="</article>";
      });
      document.getElementById("lsEvento").innerHTML = lmEvento;

    }).catch((erro) => {
      console.log(erro);
    });
}
  

getApiEventos();
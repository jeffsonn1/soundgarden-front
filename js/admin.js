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
      //criar tabelinha
      var tmEvento = "";
      var id = 1
      console.log(resposta);
      resposta.forEach((user) => {
        //pega os primeiros 10 digitos
        let scheduled = user.scheduled.substring(0, 10);

        tmEvento+="<tr><th scope='row'>"+id
        +"</th>";
        tmEvento+="<td>"+scheduled
        +"</td>";
        tmEvento+="<td>"+user.name+"</td>";
        tmEvento+="<td>"+user.attractions+"</td>";
        tmEvento+="<td><a href='reservas.html' class='btn btn-dark'>ver reservas</a> <a href='editar-evento.html' class='btn btn-secondary'>editar</a> <a href='excluir-evento.html' class='btn btn-danger'>excluir</a></td>";
        tmEvento+="</tr>";
        id++;
      });
      document.getElementById("tbEvento").innerHTML = tmEvento;

    }).catch((erro) => {
      console.log(erro);
    });
}
  

getApiEventos();
console.log('deu certo')

//listar ingressos
function getApiIngressos() {
    fetch("https://soundgarden-api.vercel.app/bookings", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resposta) => {
      return resposta.json();
    }).then((resposta) => {
      //criar tabelinha
      var tmIngresso = "";
      var id = 1
      console.log(resposta);
      resposta.forEach((user) => {
        tmIngresso+="<tr><th scope='row'>"+id
        +"</th>";
        tmIngresso+="<td>"+user.owner_name+"</td>";
        tmIngresso+="<td>"+user.owner_email+"</td>";
        tmIngresso+="<td>"+user.number_tickets+"</td>";
        tmIngresso+="</tr>";
        id++;
      });
      document.getElementById("tbIngresso").innerHTML = tmIngresso;

    }).catch((erro) => {
      console.log(erro);
    });
}
  

getApiIngressos();
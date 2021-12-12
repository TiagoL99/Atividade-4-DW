async function enviarRegisto() {
    const urlBase = "http://localhost:8050/boxoffice";
    const news = document.getElementsByName("news").value;
    const falhou = document.getElementsById("falhou");

    if (news == ""){
        falhou.innerHTML = "Deve informar o nome do site de notícias que quer obter.";
        return;
    }

    var myInit = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      noticia: `${news}`,
    }),
    };

    var myRequest = new Request(`${urlBase}`, myInit);

    await fetch(myRequest).then(async function (response) {
        if (!response.ok) {
          falhou.innerHTML = "Algo correu mal!";
        } else {
           resposta = await response.json();
           console.log(resposta.message);
           resultado.innerHTML = resposta.message;
        }
      }); 
}
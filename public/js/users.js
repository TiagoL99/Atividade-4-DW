const urlBase = "http://localhost:8050";
const modalLogin = document.getElementById("modalLogin");
      const bsModalLogin = new bootstrap.Modal(
        modalLogin,
        (backdrop = "static")
      );
      const modalRegistar = document.getElementById("modalRegistar");
      const bsModalRegistar = new bootstrap.Modal(
        modalRegistar,
        (backdrop = "static")
      ); 

const btnModalLogin = document.getElementById("btnModalLogin");
const btnModalRegistar = document.getElementById("btnModalRegistar");
const btnLogoff = document.getElementById("btnLogoff");

modalLogin.addEventListener("shown.bs.modal", () => {
    document.getElementById("usernameLogin").focus();
  });
  btnModalLogin.addEventListener("click", () => {
    bsModalLogin.show();
  });
  btnModalRegistar.addEventListener("click", () => {
    bsModalRegistar.show();
  });
  btnLogoff.addEventListener("click", () => {
    localStorage.removeItem("token");
    document.getElementById("btnLogoff").style.display = "none";
    window.location.replace("index.html");
  });

function validaRegisto() {
    let email = document.getElementById("usernameRegistar").value; // email é validado pelo próprio browser
    let senha = document.getElementById("senhaRegistar").value; // tem de ter uma senha
    const statReg = document.getElementById("statusRegistar");
    if (senha.length < 4) {
      document.getElementById("passErroLogin").innerHTML =
        "A senha tem de ter ao menos 4 carateres";
      return;
    }
    fetch(`${urlBase}/registar`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: `email=${email}&password=${senha}`,
    })
      .then(async (response) => {
        if (!response.ok) {
          erro = response.statusText;
          statReg.innerHTML = response.statusText;
          throw new Error(erro);
        }
        result = await response.json();
        console.log(result.message);
        statReg.innerHTML = result.message;
      })
      .catch((error) => {
        document.getElementById(
          "statusRegistar"
        ).innerHTML = `Pedido falhado: ${error}`;
      });
} 

function validaLogin() {
    let email = document.getElementById("usernameLogin").value; 
    let senha = document.getElementById("senhaLogin").value;
    if (senha.length < 4) {
      document.getElementById("passErroLogin").innerHTML =
        "A senha tem de ter ao menos 4 carateres";
      return;
    }
    fetch(`${urlBase}/login`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST", 
      body: `email=${email}&password=${senha}`,
    })
      .then(async (response) => {
        if (!response.ok) {
          erro = response.statusText;
          statReg.innerHTML = response.statusText;
          throw new Error(erro);
        }
        result = await response.json();
        console.log(result.accessToken);
        const token = result.accessToken;
        localStorage.setItem("token", token);
        document.getElementById("statusLogin").innerHTML = "Sucesso!";
        document.getElementById("btnLoginClose").click()
      })
      .catch((error) => {
        document.getElementById(
          "statusRegistar"
        ).innerHTML = `Pedido falhado: ${error}`;
      });
}

async function getNoticias_Deadline() {
  const urlBase = "http://localhost:8050/boxoffice";
  const listaNoticias = document.getElementById("listaNoticias");
  const criterio = document.getElementById("searchkey").value;
  const varUrl = "http://localhost:8050/boxoffice/Deadline"
  console.log("Criterio: " + criterio);
  
  let Deadline= urlBase;
  const token = localStorage.token;
  console.log(token)


  console.log("URL: " + Deadline);
  const myInit = {
      method: "GET",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
      },
  };
  const myRequest = new Request(varUrl, myInit);

  await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
          listaNoticias.innerHTML = "Não posso mostrar notícias de momento.";
      } else {
        artigos = await response.json();
          console.log(artigos);
          let texto = "";
          if (Object.keys(artigos).length == 1) {
              artigo = artigos[0];
              texto += `
              <div>
                  <h4>${artigo.artigos}</h4>
              </div>`
          } else {
              for (const artigo of artigos){
                  texto += `
              <div>
                  <h4>${artigo.url}
              </div>`
              }
          }
          listaNoticias.innerHTML = texto;
      }
  })
}

async function getNoticias_HollywoodReporter() {
  const urlBase = "http://localhost:8050/boxoffice";
  const listaNoticias = document.getElementById("listaNoticias");
  const criterio = document.getElementById("searchkey").value;
  const varUrl = "http://localhost:8050/boxoffice/Hollywood%20Reporter"
  console.log("Criterio: " + criterio);
  
  let HollywoodReporter= urlBase;
  const token = localStorage.token;
  console.log(token)


  console.log("URL: " + HollywoodReporter);
  const myInit = {
      method: "GET",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
      },
  };
  const myRequest = new Request(varUrl, myInit);

  await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
          listaNoticias.innerHTML = "Não posso mostrar notícias de momento.";
      } else {
        artigos = await response.json();
          console.log(artigos);
          let texto = "";
          if (Object.keys(artigos).length == 1) {
              artigo = artigos[0];
              texto += `
              <div>
                  <h4>${artigo.artigos}</h4>
              </div>`
          } else {
              for (const artigo of artigos){
                  texto += `
              <div>
                  <h4>${artigo.url}
              </div>`
              }
          }
          listaNoticias.innerHTML = texto;
      }
  })
}

async function getNoticias_Variety() {
  const urlBase = "http://localhost:8050/boxoffice";
  const listaNoticias = document.getElementById("listaNoticias");
  const criterio = document.getElementById("searchkey").value;
  const varUrl = "http://localhost:8050/boxoffice/Variety"
  console.log("Criterio: " + criterio);
  
  let Variety= urlBase;
  const token = localStorage.token;
  console.log(token)


  console.log("URL: " + Variety);
  const myInit = {
      method: "GET",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
      },
  };
  const myRequest = new Request(varUrl, myInit);

  await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
          listaNoticias.innerHTML = "Não posso mostrar notícias de momento.";
      } else {
        artigos = await response.json();
          console.log(artigos);
          let texto = "";
          if (Object.keys(artigos).length == 1) {
              artigo = artigos[0];
              texto += `
              <div>
                  <h4>${artigo.artigos}</h4>
              </div>`
          } else {
              for (const artigo of artigos){
                  texto += `
              <div>
                  <h4>${artigo.url}
              </div>`
              }
          }
          listaNoticias.innerHTML = texto;
      }
  })
}

async function getNoticias_theNumbers() {
  const urlBase = "http://localhost:8050/boxoffice";
  const listaNoticias = document.getElementById("listaNoticias");
  const criterio = document.getElementById("searchkey").value;
  const varUrl = "http://localhost:8050/boxoffice/The%20Numbers"
  console.log("Criterio: " + criterio);
  
  let theNumbers= urlBase;
  const token = localStorage.token;
  console.log(token)


  console.log("URL: " + theNumbers);
  const myInit = {
      method: "GET",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
      },
  };
  const myRequest = new Request(varUrl, myInit);

  await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
          listaNoticias.innerHTML = "Não posso mostrar notícias de momento.";
      } else {
        artigos = await response.json();
          console.log(artigos);
          let texto = "";
          if (Object.keys(artigos).length == 1) {
              artigo = artigos[0];
              texto += `
              <div>
                  <h4>${artigo.artigos}</h4>
              </div>`
          } else {
              for (const artigo of artigos){
                  texto += `
              <div>
                  <h4>${artigo.url}
              </div>`
              }
          }
          listaNoticias.innerHTML = texto;
      }
  })
}

async function getNoticias_boxofficepro() {
  const urlBase = "http://localhost:8050/boxoffice";
  const listaNoticias = document.getElementById("listaNoticias");
  const criterio = document.getElementById("searchkey").value;
  const varUrl = "http://localhost:8050/boxoffice/Box%20Office%20Pro"
  console.log("Criterio: " + criterio);
  
  let boxofficepro= urlBase;
  const token = localStorage.token;
  console.log(token)


  console.log("URL: " + boxofficepro);
  const myInit = {
      method: "GET",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
      },
  };
  const myRequest = new Request(varUrl, myInit);

  await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
          listaNoticias.innerHTML = "Não posso mostrar notícias de momento.";
      } else {
        artigos = await response.json();
          console.log(artigos);
          let texto = "";
          if (Object.keys(artigos).length == 1) {
              artigo = artigos[0];
              texto += `
              <div>
                  <h4>${artigo.artigos}</h4>
              </div>`
          } else {
              for (const artigo of artigos){
                  texto += `
              <div>
                  <h4>${artigo.url}
              </div>`
              }
          }
          listaNoticias.innerHTML = texto;
      }
  })
}
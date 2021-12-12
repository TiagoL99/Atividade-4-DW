window.onload = () => {
   (async () => {
        const urlBase = "http://localhost:8050/boxoffice";
        const listaNoticias = document.getElementById("listaNoticias");
        let texto = "";
        var myHeaders = new Headers();

        var myInit = { method: "GET", headers: myHeaders};

        var myRequest = new Request(`${urlBase}`, myInit);

        await fetch(myRequest).then(async function (response) {
            if (!response.ok) {
                listaNoticias.innerHTML = 
                    "Não posso mostrar quaisquer noticias de momento."
            } else {
                noticias = await response.json();
                console.log(noticias);
                for (const noticia of noticias){
                    texto += `
                            <div>
                        <h4>${noticia.noticia}
                    </div>`
                }
                listaNoticias.innerHTML = texto;
            }
        });
    })();
}
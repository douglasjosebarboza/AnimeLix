import urlApi from './api.js'

// Variaveis Globais
    let dados
    let jsonDados
    let loading

// Função de ativar o Loading
    const enableLoading = () => {
        loading = document.querySelector('.container-loader').style.display = "flex"
    }

// Função de desativar o Loading
    const disableLoading = () => {
        loading = document.querySelector('.container-loader').style.display = "none"   
    }

// Função para preencher a pagina
    const showAnimes = (param) => {
        if (param === 'anime'){
            for(let i = 0; i < jsonDados.data.length; i++){
                if(jsonDados.data[i].rating != "Rx - Hentai"){
                    let divMain = document.querySelector(".container-main")
                    let divAnimeContainer = document.createElement("div")
                    let linkAnimePage= document.createElement("a")
                    let imgPoster = document.createElement("img")
                    let titleAnime = document.createElement("p")
    
    
                    divMain.appendChild(divAnimeContainer)
                    divAnimeContainer.classList.add("container-main--anime")
                    divAnimeContainer.setAttribute('id', jsonDados.data[i].mal_id);
    
                    divAnimeContainer.appendChild(linkAnimePage)
                    linkAnimePage.href = "../html/anime.html?anime=" + jsonDados.data[i].mal_id
    
                    linkAnimePage.appendChild(imgPoster)
                    imgPoster.classList.add("anime--poster")
    
                    linkAnimePage.appendChild(titleAnime)
                    titleAnime.classList.add("anime--title")
    
    
                    imgPoster.src = jsonDados.data[i].images.jpg.image_url
                    titleAnime.innerHTML = jsonDados.data[i].title
                }
            }

            disableLoading()
        }

        else if(param === 'results'){
            for(let i = 0; i < jsonDados.data.length; i++){
                if(jsonDados.data[i].rating != "Rx - Hentai"){
                    let divMain = document.querySelector(".container-main")
                    let divAnimeContainer = document.createElement("div")
                    let linkAnimePage= document.createElement("a")
                    let imgPoster = document.createElement("img")
                    let titleAnime = document.createElement("p")


                    divMain.appendChild(divAnimeContainer)
                    divAnimeContainer.classList.add("container-main--anime")
                    divAnimeContainer.setAttribute('id', jsonDados.data[i].mal_id);

                    divAnimeContainer.appendChild(linkAnimePage)
                    linkAnimePage.href = "../html/anime.html?anime=" + jsonDados.data[i].mal_id

                    linkAnimePage.appendChild(imgPoster)
                    imgPoster.classList.add("anime--poster")

                    linkAnimePage.appendChild(titleAnime)
                    titleAnime.classList.add("anime--title")


                    imgPoster.src = jsonDados.data[i].images.jpg.image_url
                    titleAnime.innerHTML = jsonDados.data[i].title
                }
            }
            
            disableLoading()
        }

        else if(param === 'episodes'){
            for(let i = 0; i < jsonDados.episodes.length; i++){
                let divMain = document.querySelector(".container-main")
                let divAnimeContainer = document.createElement("div")

                divMain.appendChild(divAnimeContainer)
                divAnimeContainer.classList.add("container-main--anime")
                divAnimeContainer.setAttribute('id', jsonDados.anime[i].mal_id);

                let linkAnimePage= document.createElement("a")
                divAnimeContainer.appendChild(linkAnimePage)
                linkAnimePage.href = "../html/anime.html?anime=" + jsonDados.anime[i].mal_id

                let imgPoster = document.createElement("img")
                let titleAnime = document.createElement("p")

                linkAnimePage.appendChild(imgPoster)
                imgPoster.classList.add("anime--poster")

                linkAnimePage.appendChild(titleAnime)
                titleAnime.classList.add("anime--title")

                imgPoster.src = jsonDados.episodes[i].image_url
                titleAnime.innerHTML = jsonDados.episodes[i].title
            }
            disableLoading()
        }
    }

//  Função para remover o conteudo da pagina
    const removeContent = () => {
        enableLoading()
        let divMain = document.getElementsByClassName("container-main--anime")
        for(let i = divMain.length - 1; i >= 0; i--){
            divMain[i].remove()
        }
        let imgPoster = document.getElementsByClassName("anime--poster")
        for(let i = imgPoster.length - 1; i >= 0; i--){
            imgPoster[i].remove()
        }
        let titleAnime = document.getElementsByClassName("anime--title")
        for(let i = titleAnime.length - 1; i >= 0; i--){
            titleAnime[i].remove()
        }
    }

// Função para pegar dados da API de acordo com a temporada atual
    const pesquisaInicialApi = async() => {
        removeContent()
        dados = await fetch(`${urlApi}seasons/now`)
        jsonDados = await dados.json()
        showAnimes('anime')
    }

// Função de pesquisa
    const pesquisaInput = async () => {
        const text = document.getElementById("input").value
        const url = text
        if(text === ''){
            pesquisaInicialApi()
        }
        else{
            removeContent()
            dados = await fetch(`${urlApi}anime?q=${url}`)
            jsonDados = await dados.json()
            showAnimes('results')
        }
    }

// Função para pesquisar pelo genero
    async function pesquisaGeneroAnimes(genero) {
        removeContent()
        switch (genero) {
            case "acao":
                dados = await fetch(`${urlApi}anime?genres=1`)
                jsonDados = await dados.json()   
                showAnimes('anime')
                break;

            case "drama":
                dados = await fetch(`${urlApi}anime?genres=6`)
                jsonDados = await dados.json()  
                showAnimes('anime')
                break;

            case "romance":
                dados = await fetch(`${urlApi}anime?genres=12`)
                jsonDados = await dados.json() 
                console.log(jsonDados) 
                showAnimes('anime')
                break;

            case "comedia":
                dados = await fetch(`${urlApi}anime?genres=4`)
                jsonDados = await dados.json() 
                showAnimes('anime')
                break;
        }
    }

    document.getElementById("click-home").addEventListener("click", function(){
        pesquisaInicialApi()
    }, true)

    document.getElementById("click-acao").addEventListener("click", function (){
        pesquisaGeneroAnimes('acao')}, true)
    document.getElementById("click-acao-mobile").addEventListener("click", function (){
        pesquisaGeneroAnimes('acao')}, true)

    document.getElementById("click-drama").addEventListener("click", function (){
        pesquisaGeneroAnimes('drama')}, true)
    document.getElementById("click-drama-mobile").addEventListener("click", function (){
        pesquisaGeneroAnimes('drama')}, true)

    document.getElementById("click-romance").addEventListener("click", function (){
        pesquisaGeneroAnimes('romance')}, true)
    document.getElementById("click-romance-mobile").addEventListener("click", function (){
        pesquisaGeneroAnimes('romance')}, true)
        
    document.getElementById("click-comedia").addEventListener("click", function (){
        pesquisaGeneroAnimes('comedia')}, true)
    document.getElementById("click-comedia-mobile").addEventListener("click", function (){
        pesquisaGeneroAnimes('comedia')}, true)

// Verifica quando o usuario tecla "Enter" para pesquisar
    document.getElementById("input").addEventListener('keypress', function(evento){
        if (evento.key === 'Enter'){
            pesquisaInput()
        }  
    })

// Chama a função inicial do site
    pesquisaInicialApi()
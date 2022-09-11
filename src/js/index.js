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
        loading =document.querySelector('.container-loader').style.display = "none"   
    }

// Função para preencher a pagina
    const showAnimes = (param) => {
        console.log(jsonDados)
        if (param === 'anime'){
            for(i = 0; i < jsonDados.anime.length; i++){

                if(jsonDados.anime[i].explicit_genres.length === 0){
                    if(jsonDados.anime[i].rated != "Rx"){
                        let divMain = document.querySelector(".container-main")
                        let divAnimeContainer = document.createElement("div")
                        let linkAnimePage= document.createElement("a")
                        let imgPoster = document.createElement("img")
                        let titleAnime = document.createElement("p")
        
        
                        divMain.appendChild(divAnimeContainer)
                        divAnimeContainer.classList.add("container-main--anime")
                        divAnimeContainer.setAttribute('id', jsonDados.anime[i].mal_id);
        
                        divAnimeContainer.appendChild(linkAnimePage)
                        linkAnimePage.href = "../html/anime.html?anime=" + jsonDados.anime[i].mal_id
        
                        linkAnimePage.appendChild(imgPoster)
                        imgPoster.classList.add("anime--poster")
        
                        linkAnimePage.appendChild(titleAnime)
                        titleAnime.classList.add("anime--title")
        
        
                        imgPoster.src = jsonDados.anime[i].image_url
                        titleAnime.innerHTML = jsonDados.anime[i].title
        
                    }
                }
            }

            disableLoading()
        }

        else if(param === 'results'){

            for(i = 0; i < jsonDados.results.length; i++){
                if(jsonDados.results[i].rated != "Rx"){
                    let divMain = document.querySelector(".container-main")
                    let divAnimeContainer = document.createElement("div")
                    let linkAnimePage= document.createElement("a")
                    let imgPoster = document.createElement("img")
                    let titleAnime = document.createElement("p")


                    divMain.appendChild(divAnimeContainer)
                    divAnimeContainer.classList.add("container-main--anime")
                    divAnimeContainer.setAttribute('id', jsonDados.anime[i].mal_id);

                    divAnimeContainer.appendChild(linkAnimePage)
                    linkAnimePage.href = "../html/anime.html?anime=" + jsonDados.anime[i].mal_id

                    divAnimeContainer.appendChild(imgPoster)
                    imgPoster.classList.add("anime--poster")

                    divAnimeContainer.appendChild(titleAnime)
                    titleAnime.classList.add("anime--title")


                    imgPoster.src = jsonDados.results[i].image_url
                    titleAnime.innerHTML = jsonDados.results[i].title

                    
                    idAnimes(i, 'results')
                }
            }

            disableLoading()
        }

        else if(param === 'episodes'){
            for(i = 0; i < jsonDados.episodes.length; i++){
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

                divAnimeContainer.appendChild(imgPoster)
                imgPoster.classList.add("anime--poster")

                divAnimeContainer.appendChild(titleAnime)
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
        for(i = divMain.length - 1; i >= 0; i--){
            divMain[i].remove()
        }
        let imgPoster = document.getElementsByClassName("anime--poster")
        for(i = imgPoster.length - 1; i >= 0; i--){
            imgPoster[i].remove()
        }
        let titleAnime = document.getElementsByClassName("anime--title")
        for(i = titleAnime.length - 1; i >= 0; i--){
            titleAnime[i].remove()
        }
    }

// Função para pegar dados da API de acordo com a temporada atual
    const pesquisaInicialApi = async() => {
        removeContent()
        const data = new Date()
        const month = data.getMonth()
        const year = String(data.getFullYear())
        if (month >=0 && month <= 2) {
            var string_month = 'winter'
        }
        else if (month >=3 && month <= 5){
            string_month = 'spring'
        }
        else if (month >=6 && month <= 8){
            string_month = 'summer'
        }
        else if (month >=9 && month <= 12){
            string_month = 'fall'
        }
        dados = await fetch(`https://jikan1.p.rapidapi.com/season/${year}/${string_month}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "jikan1.p.rapidapi.com",
                "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
            }
        })
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
            dados = await fetch(`https://jikan1.p.rapidapi.com/search/anime?q=${url}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "jikan1.p.rapidapi.com",
                    "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
                }
            })
            jsonDados = await dados.json()
            showAnimes('results')
        }
    }

// Função para pesquisar pelo genero
    const pesquisaGeneroAnimes = async (genero) => {
        removeContent()  
        switch (genero) {
            case 'açao':
                dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/1", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "jikan1.p.rapidapi.com",
                        "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
                    }
                })
                jsonDados = await dados.json() 
                break

            case 'drama':
                dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/8", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "jikan1.p.rapidapi.com",
                        "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
                    }
                })
                jsonDados = await dados.json()
                break

            case 'romance':
                dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/22", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "jikan1.p.rapidapi.com",
                        "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
                    }
                })
                jsonDados = await dados.json()
                break
            
            case 'comedia':
                dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/4", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "jikan1.p.rapidapi.com",
                        "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
                    }
                })
                jsonDados = await dados.json()
                break
        }
        showAnimes('anime')
    }

// Verifica quando o usuario tecla "Enter" para pesquisar
    document.getElementById("input").addEventListener('keypress', function(evento){
        if (evento.key === 'Enter'){
            pesquisaInput()
        }  
    })

// Chama a função inicial do site
    pesquisaInicialApi()
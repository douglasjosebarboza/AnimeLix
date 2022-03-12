let dados
let jsonDados
let id
let idAnime = []

const idAnimes = (i, type) => {
    if(type === 'anime'){
        idAnime.push(jsonDados.anime[i].mal_id)
    }
    else if(type === 'results'){
        idAnime.push(jsonDados.results[i].mal_id)
    }
}

const removeIds = () => {
    idAnime.length = 0
}

const showAnimes = (param) => {
    if (param === 'anime'){
        for(i = 0; i < jsonDados.anime.length; i++){
            if(jsonDados.anime[i].explicit_genres.length === 0){
                let divMain = document.querySelector(".container-main")
                let divAnimeContainer = document.createElement("div")
                divMain.appendChild(divAnimeContainer)
                divAnimeContainer.classList.add("container-main--anime")
                let imgPoster = document.createElement("img")
                let titleAnime = document.createElement("p")
                divAnimeContainer.appendChild(imgPoster)
                imgPoster.classList.add("anime--poster")
                divAnimeContainer.appendChild(titleAnime)
                titleAnime.classList.add("anime--title")
                imgPoster.src = jsonDados.anime[i].image_url
                titleAnime.innerHTML = jsonDados.anime[i].title
                idAnimes(i, 'anime')
            }
        }
    }
    else if(param === 'results'){
        for(i = 0; i < jsonDados.results.length; i++){
            let divMain = document.querySelector(".container-main")
            let divAnimeContainer = document.createElement("div")
            divMain.appendChild(divAnimeContainer)
            divAnimeContainer.classList.add("container-main--anime")
            let imgPoster = document.createElement("img")
            let titleAnime = document.createElement("p")
            divAnimeContainer.appendChild(imgPoster)
            imgPoster.classList.add("anime--poster")
            divAnimeContainer.appendChild(titleAnime)
            titleAnime.classList.add("anime--title")
            imgPoster.src = jsonDados.results[i].image_url
            titleAnime.innerHTML = jsonDados.results[i].title
            idAnimes(i, 'results')
        }
    }
    // else if(param === 'episodes'){
    //     for(i = 0; i < jsonDados.episodes.length; i++){
    //         let divMain = document.querySelector(".container-main")
    //         let divAnimeContainer = document.createElement("div")
    //         divMain.appendChild(divAnimeContainer)
    //         divAnimeContainer.classList.add("container-main--anime")
    //         let imgPoster = document.createElement("img")
    //         let titleAnime = document.createElement("p")
    //         divAnimeContainer.appendChild(imgPoster)
    //         imgPoster.classList.add("anime--poster")
    //         divAnimeContainer.appendChild(titleAnime)
    //         titleAnime.classList.add("anime--title")
    //         imgPoster.src = jsonDados.episodes[i].image_url
    //         titleAnime.innerHTML = jsonDados.episodes[i].title
    //     }
    //}
}

const removeContent = () => {
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
    removeIds()
}

const pesquisaInicialApi = async() => {
    dados = await fetch("https://jikan1.p.rapidapi.com/season/2022/winter", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
        }
    })
    jsonDados = await dados.json()
    removeContent()
    showAnimes('anime')
}

const pesquisaInput = async () => {
    console.log('funciona');
    removeContent()
    const text = document.getElementById("input").value
    if(text === ''){
        pesquisaInicialApi()
    }
    const url = text
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

const pesquisaActionAnimes = async () => {
    dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
        }
    })
    jsonDados = await dados.json()
    removeContent()    
    showAnimes('anime')
}

const pesquisaDramaAnimes = async () => {
    dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/8", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
        }
    })
    jsonDados = await dados.json()
    removeContent()    
    showAnimes('anime')
}

const pesquisaRomanceAnimes = async () => {
    dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/22", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
        }
    })
    jsonDados = await dados.json()
    removeContent()  
    showAnimes('anime')
}

const pesquisaComedyAnimes = async () => {
    dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/4", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
        }
    })
    jsonDados = await dados.json()
    removeContent()   
    showAnimes('anime')
}

document.getElementById("input").addEventListener('keypress', function(evento){
    if (evento.key === 'Enter'){
        pesquisaInput()
    }  
})
pesquisaInicialApi()


// const animeInfos = async() => {
//    dados = await fetch("https://jikan1.p.rapidapi.com/anime/16498/videos", {
//        "method": "GET",
//        "headers": {
//            "x-rapidapi-host": "jikan1.p.rapidapi.com",
//            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
//         }
//     })
//     jsonDados = await dados.json()
//     showAnimes('episodes')
// }

// animeInfos()

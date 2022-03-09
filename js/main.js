const pesquisaInicialApi = async() => {
    const dados = await fetch("https://jikan1.p.rapidapi.com/season/2022/winter", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
        }
    })
    const jsonDados = await dados.json()
    
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
        }
    }
}

const pesquisaInput = async () => {
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

    const text = document.getElementById("input").value
    console.log(text)
    if(text === ''){
        pesquisaInicialApi()
    }
    const url = text
    const dados = await fetch(`https://jikan1.p.rapidapi.com/search/anime?q=${url}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
        }
    })
    const jsonDados = await dados.json()
    console.log(jsonDados);
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
    }
    console.log(jsonDados.results[50].title);
}

document.getElementById("input").addEventListener('focusout', pesquisaInput)
pesquisaInicialApi()



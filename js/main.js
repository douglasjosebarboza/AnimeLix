const pesquisaApi = async() => {
    const dados = await fetch("https://jikan1.p.rapidapi.com/genre/anime/1/1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
        }
    })
    const jsonDados = await dados.json()
    
    for(i = 0; i < jsonDados.anime.length; i++){
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
pesquisaApi()


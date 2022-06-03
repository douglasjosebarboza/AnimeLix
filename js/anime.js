let dados
let jsonDados
let id
let idAnime = []
let loading

const enableLoading = () => {
    loading = document.querySelector('.container-loader').style.display = "flex"
}

const disableLoading = () => {
    loading =document.querySelector('.container-loader').style.display = "none"   
}

const removeIds = () => {
    idAnime.length = 0
}

const animeInfoApi = async () => {
    fetch("https://jikan1.p.rapidapi.com/anime/16498/episodes", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "jikan1.p.rapidapi.com",
		    "x-rapidapi-key": "92c4ba8727mshee291ea0e5bca6dp13e5bdjsnb54d27d9bf00"
	    }
    })
    jsonDados = await dados.json()
    console.log(jsonDados)

    for(i = 0; i < jsonDados.results.length; i++){
        if(jsonDados.results[i].rated != "Rx"){
            let divMain = document.querySelector(".container-main")
            let divAnimeContainer = document.createElement("div")
            let imgPoster = document.createElement("img")
            let titleAnime = document.createElement("p")
    
    
            divMain.appendChild(divAnimeContainer)
            divAnimeContainer.classList.add("container-main--anime")
    
            divAnimeContainer.appendChild(imgPoster)
            imgPoster.classList.add("anime--poster")
    
            divAnimeContainer.appendChild(titleAnime)
            titleAnime.classList.add("anime--title")
    
    
            imgPoster.src = jsonDados.results[i].image_url
            titleAnime.innerHTML = jsonDados.results[i].title
    
            
            idAnimes(i, 'results')
        }
    }
}



disableLoading()

animeInfoApi()

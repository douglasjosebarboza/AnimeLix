let dados
let jsonDados
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
}

import urlApi from './api.js'

let dados
let jsonDados
let loading
const urlParams = new URLSearchParams(window.location.search)
const animeParam = urlParams.get('anime')

const enableLoading = () => {
    loading = document.querySelector('.container-loader').style.display = "flex"
}

const disableLoading = () => {
    loading = document.querySelector('.container-loader').style.display = "none"   
}


const animeInfoApi = async () => {
    dados = await fetch(urlApi+"anime/"+animeParam+"/full",{
    })
    jsonDados = await dados.json()
    console.log(jsonDados)

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


    imgPoster.src = jsonDados.data.images.jpg.image_url
    titleAnime.innerHTML = jsonDados.data.titles[0].title
}

disableLoading()
animeInfoApi()
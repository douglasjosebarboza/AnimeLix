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
    let dados = await fetch("https://api.jikan.moe/v4/"+"anime/"+animeParam+"/full")
    let jsonDados = await dados.json()
    preencherTela(jsonDados)
}


const preencherTela = (dados) => {
    let titleAnime = document.querySelector(".anime--title--spot")
    let posterAnime = document.querySelector(".anime-poster")
    let synopsisAnime = document.querySelector(".anime-synopsis")

    titleAnime.innerHTML = dados.data.titles[0].title
    posterAnime.src = dados.data.images.jpg.image_url
    synopsisAnime.innerHTML = dados.data.synopsis.replace('[Written by MAL Rewrite]', '')

    let animeTrailer = document.querySelector(".anime-trailer")
    animeTrailer.src = dados.data.trailer.url

}

disableLoading()
animeInfoApi()

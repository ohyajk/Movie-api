import _ from 'lodash'
import './style.css'
import "./index.html"

console.log('I hav arrived...')

const input = document.querySelector('#input')
const form = document.querySelector('#form')
const MovieDiv = document.querySelector('#Movies')

let titleArr = []
let imgArr = []
const storeTitle = JSON.parse(localStorage.getItem('titles'));
const storeImg = JSON.parse(localStorage.getItem('images'));


const getMovies = async () => {
    const movies = await fetch('https://imdb8.p.rapidapi.com/title/v2/find?title=' + input.value + '&limit=10',
    {
        method: 'GET',
        headers:
        {
            'X-RapidAPI-Key': 'cb3614cd01msh06589958aa1f6e1p1e41d4jsn446e75f38f19',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    })
    .catch(err => console.error('error:' + err))

    const res = await movies.json()
    const strObj = JSON.stringify(res.results)
    const parseObj = JSON.parse(strObj)
    console.log(parseObj)
    titleArr = []
    imgArr = []
    localStorage.clear()
    localStorage.setItem('titles', JSON.stringify(titleArr)); 
    localStorage.setItem('images', JSON.stringify(imgArr)); 
    parseObj.forEach((obj) => {
        
        if(obj.image != null) {
            titleArr.push(obj.title)
            localStorage.setItem('titles', JSON.stringify(titleArr)); 
            imgArr.push(obj.image.url)
            localStorage.setItem('images', JSON.stringify(imgArr)); 
        }
    })
    window.location.reload()
}
if(storeTitle.length != 0){
    for(let i = 0; i < storeTitle.length; i++){
        MovieDiv.innerHTML += `<div class="movieBlock"><span class="span"><h2 class="title">${storeTitle[i]}</h2></span><img class="img" src=${storeImg[i]}/></div>`
    }
}else {
    MovieDiv.innerHTML = '<h2>No Movies Available...</h2>'
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getMovies()
})

import './fetch-images.js'
//import { renderCatInfo } from './cat-api.js'
import '../css/styles.css'
import { fetchData } from './fetch-images.js'


const btnSearch = document.querySelector(".search-form button")
const inputSearch = document.querySelector("input[name=searchQuery]")
const btnLoadMore = document.querySelector(".load-more")

btnSearch.addEventListener("click", function(e){
    e.preventDefault()

    console.log('asd:', inputSearch.value.length);

    if(inputSearch.value.length == 0){
        return
    }

    fetchData(inputSearch.value)

    console.log('submit');
})

btnLoadMore.addEventListener("click", function(e){
    e.preventDefault()


    const offset = document.querySelectorAll(".photo-card").length
    const page = this.dataset.nextPage

    fetchData(inputSearch, page, offset)

    //console.log('page:',page);

    
})
import axios from "axios";

// https://pixabay.com/api/
// Your API key: 44360334-36ebf903b1de9e2c9dc7dfbf4

const API_KEY = '44360334-36ebf903b1de9e2c9dc7dfbf4'
const API_PARAM = '&image_type="photo"&orientation="horizontal"&safesearch="true"'
const POSTS_PER_PAGE = 20

const galleryEl = document.querySelector(".gallery")
const btnLoadMore = document.querySelector(".load-more")
const gallaryAllShown = document.querySelector(".gallery-all-shown")

//let URL = "https://pixabay.com/api/?key=" + API_KEY + API_PARAM + "&q=" + encodeURIComponent('dog white');
let URL = "https://pixabay.com/api/?key=" + API_KEY + API_PARAM + "";

async function fetchData(keyWord, page = 1, offset = 20) {

    try {
        const response = await axios.get(URL + "&q=" + encodeURIComponent(keyWord) + "&page="+ page );
        console.log('Data:', response.data);

        //console.log(typeof(response.data.hits));

        const markup = response.data.hits.map(({webformatURL, tags, likes, views, comments, downloads})=>
            `<div class="photo-card">
                 <div class="photo-card__image">
                     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                 </div>
                 <div class="info">
                 <p class="info-item">
                     <b>Likes</b>
                     <span>${likes}</span>
                 </p>
                 <p class="info-item">
                     <b>Views</b>
                     <span>${views}</span>
                 </p>
                 <p class="info-item">
                     <b>Comments</b>
                     <span>${comments}</span>
                 </p>
                 <p class="info-item">
                     <b>Downloads</b>
                     <span>${downloads}</span>
                 </p>
                 </div>
             </div>`
        ).join("")
    

        if(page == 1){
            galleryEl.innerHTML = markup
        }else{
           const htmlElement = stringToHtml(markup);
           galleryEl.append(htmlElement);
        }

        const totalHits = response.data.totalHits

        const pages = Math.ceil(totalHits / POSTS_PER_PAGE)     
        console.log('pages:',pages);

        if((POSTS_PER_PAGE + offset) < totalHits){
            page++
            btnLoadMore.dataset.nextPage = page
            btnLoadMore.style.display = 'block'
        }else{
            btnLoadMore.style.display = 'none'
            gallaryAllShown.style.display = 'block'
        }

        btnLoadMore.dataset.total = totalHits

    } catch (error) {
        // Handle the error here
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
    }
}

export { fetchData }

// Function to convert an HTML string to an HTML element
function stringToHtml(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    console.log('doc',doc.body.firstChild);
    return doc.body.firstChild;
}

// Example usage
//const htmlString = '<div class="new-element">This is a new element</div>';
//const htmlElement = stringToHtml(htmlString);

// Now you can append the htmlElement to the DOM or manipulate it
//document.body.appendChild(htmlElement);

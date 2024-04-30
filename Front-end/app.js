

// form-validation 
const form = document.getElementById("account");


form?.addEventListener('submit', function(event) {
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const username = usernameInput.value.trim();

    const password = passwordInput.value;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;


    if (username === '' || password === '') {
        event.preventDefault(); // Prevent form submission
        alert('Please fill out all fields.');
        return;
    }

    if (!usernameRegex.test(username)) {
        event.preventDefault(); // Prevent form submission
        const reg = document.getElementById("error")
        reg.innerText += 'special characters not allowed'
        reg.style.display = 'block'
        return;
    }

    // if(password.length < 4){
    //     const pass = document.getElementById("error")
    //     pass.innerHTML += 'password less than four characters'
    //     pass.style.display = 'block'
    // }


});





const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list")

const ball = document.querySelector(".toggle-ball")
const items = document.querySelectorAll(".container, .movie-list-title, .navbar-container, .sidebar, .left-menu-icon, .toggle, a, .table-body, span")

// dark mode logic 
ball?.addEventListener("click", ()=>{
    items.forEach(item=>{
        item.classList.toggle("active")
    })
    ball.classList.toggle("active")
})



// Display username on the page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');

// if (username) {
//     document.getElementById("usernameDisplay").innerText = username;
// }
// else{
//     document.getElementById("usernameDisplay").innerText = 'name';
// }



// Display error on page 
const query = window.location.search;
const ur = new URLSearchParams(query);
const error = urlParams.get('error');

if(error) {
    const tmp = document.getElementById("error");
    tmp.innerHTML += error
    tmp.style.display = 'block'
}



// drop-down
let i = 1
const profileContainer = document.querySelector('.profile-text-container');
const dropdown = document.getElementById('drop-down');

profileContainer?.addEventListener('click', function() {
    if(i == 1){
        dropdown.style.display = 'block';
        i = -1
    }
    else {
          dropdown.style.display = 'none';
          i = 1
    }
});



// logic for horizontal scrolling 
arrows?.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length
    let clickCounter = 0
    arrow.addEventListener("click", () => {
        const ratio = Math.floor(window.innerWidth / 270)
        clickCounter++
        if(itemNumber - (4 + clickCounter) + (4 - ratio) >= 0){
            movieLists[i].style.transform = `translateX(${
                movieLists[i].computedStyleMap().get("transform")[0].x.value-300}px)`
            } else {
                movieLists[i].style.transform = "translateX(0)"
                clickCounter = 0
            }
    })

    console.log(movieLists[i].querySelector("img").length)
})





// Event listener for checkbox
const checkbox = document.querySelector(".check-box");
checkbox?.addEventListener('change', function() {
    if (this.checked) {
        getMovies(BASE_URL + '/movie/top_rated?language=en-US&page=2&' + API_KEY);
    }
    else {
        const tableBody = document.querySelector(".table-body");
        tableBody.innerHTML = '';
        getMovies(BASE_URL + '/movie/top_rated?language=en-US&page=1&' + API_KEY);
    } 
});


const API_KEY = 'api_key=e0f225f95777b19d6dbb2d2a4b71217c'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/movie/top_rated?language=en-US&page=1&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const searchURL = BASE_URL + '/search/movie?' + API_KEY

getMovies(API_URL)

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showMovies(data.results)        
    })
}

function showMovies(data) {
    const tableBody = document.querySelector(".table-body");
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie
        const row = `<tr>
                        <td><img class="top-img" src="${IMG_URL+poster_path}"></td>
                        <td>${vote_average.toFixed(1)}</td>
                        <td>${overview}</td>
                        <td>${release_date}</td>
                      </tr>`;
        tableBody.innerHTML += row;
    })
}


const button = document.getElementById('search')
const input = document.getElementById('search-input')


button?.addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = input.value
    input.value = ''
    console.log(searchTerm)

    if(searchTerm){
        getSearch(searchURL+'&query='+searchTerm)
    }
})

function getSearch(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        search(data.results)        
    })
}

function search(data){
    const results = document.getElementById('search-result')
    results.innerHTML = ''
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie
        const maxOverviewLength = 100; 

        const truncatedOverview = overview.length > maxOverviewLength ? 
            overview.substring(0, maxOverviewLength) + '...' : 
            overview;

        const item = `<div class="search-item">
                        <img src="${IMG_URL+poster_path}">
                        <div class="search-item-title">"${title}"</div>
                        <div class="search-item-desc">"${truncatedOverview}"</div>
                        <div class="search-item-button">TRAILER</div>
                      </div>`
        results.innerHTML += item
    })
}

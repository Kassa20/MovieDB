//fetch movies from MovieAPI

const url = 'https://online-movie-database.p.rapidapi.com/title/v2/get-chart-rankings?rankingsChartType=TOP_250&first=100';
let topMoviesCount = 20; 
fetchMovies(topMoviesCount);

function fetchMovies(count) {
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '141d834db9msh6963c5ac2621dfdp121ed7jsn3784efe1e456',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        const list = data.data.titleChartRankings.edges.slice(0, count); 
        console.log(list);
        let rank = 1;

        const tableBody = document.querySelector('.table-body');
        tableBody.innerHTML = ''; 

        list.forEach(item => {
            const rating = item.node.chartRating.toFixed(1);
            const title = item.node.item.originalTitleText.text;
            const year = item.node.item.releaseYear.year;
            const movie = `
                <tr>
                    <td>${rank}</td>
                    <td>${title}</td>
                    <td>${rating}</td>
                    <td>${year}</td>
                </tr>`;
            tableBody.innerHTML += movie;
            rank++;
        });
    })
    .catch(err => {
        console.log(err);
    });
}



// Event listener for checkbox
const checkbox = document.querySelector('.check-box');
checkbox.addEventListener('change', function() {
    if (this.checked) {
        topMoviesCount = 100; 
    } else {
        topMoviesCount = 20; 
    }
    fetchMovies(topMoviesCount); 
});




const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list")

const ball = document.querySelector(".toggle-ball")
const items = document.querySelectorAll(".container, .movie-list-title, .navbar-container, .sidebar, .left-menu-icon, .toggle")

// dark mode logic 
ball.addEventListener("click", ()=>{
    items.forEach(item=>{
        item.classList.toggle("active")
    })
    ball.classList.toggle("active")
})


// Display username on the page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');

if (username) {
    document.getElementById("usernameDisplay").innerText = username;
}



// logic for horizontal scrolling 
arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length
    let clickCounter = 0
    console.log(itemNumber)
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


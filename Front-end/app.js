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



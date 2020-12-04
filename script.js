
const APIURLNOWPLAYING= "https://api.themoviedb.org/3/movie/now_playing?api_key="
// now playing movies
const SEARCHURL = "https://api.themoviedb.org/3/search/movie?api_key=";
// search

const imgPath = "https://image.tmdb.org/t/p/w500"

const APIKEY = config.API_KEY;


 
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



async function getMovies (URL) {
    console.log(APIURLNOWPLAYING+APIKEY+"&page=1");
    const response = await fetch(URL);
    const movieListJson = await response.json(); 
    
    showMovies(movieListJson);
    console.log(movieListJson);
}

getMovies(getNowPlayingAPI());

function getClassByRate(score) {
    if(score>=8){
        return "green"
    }else if (score>=5){
        return "yellow"
    }
    else return "red"
}

function getNowPlayingAPI() {
    return APIURLNOWPLAYING+APIKEY+"&page=1";
}

function getSeachQuary(query) {
    return SEARCHURL+APIKEY+"&query="+query+"&page=1";
}



form.addEventListener('submit',  (e)=>{
    e.preventDefault();

    const searchInput = search.value;

    if (searchInput){

    getMovies(getSeachQuary(searchInput) );
    }
    else getMovies(APIURL);

    search.value = '';
})

document.onclick = function (event) {
    const movieid = event.target.getAttribute('movieid');
    const {tagName} = event.target;
    if(tagName.toLowerCase()=== 'img') {
        window.location.href = "/movieDetails/movieDetails.html?id="+movieid;
    }
}



function showMovies(movies) {
    main.innerHTML= '';

    movies.results.forEach((movie) => {
        var {poster_path, title, vote_average, id
        } = movie;
        if(!vote_average) (vote_average="NO")
    
        const movieEl= document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.id = 'movie';
        if(poster_path){
       movieEl.innerHTML = `
       <img 
            src="${imgPath + poster_path}"
            alt="${title}"
            movieId= "${id}"
        />
       <div class="movieInfo">
           <h3>${title}</h3>
           <span class=${getClassByRate(vote_average)}>${vote_average}</span>
       </div>
       `;

       main.appendChild(movieEl);
        }
    });
}

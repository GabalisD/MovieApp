const DETAILSURL = "https://api.themoviedb.org/3/movie/"
const imgPath = "https://image.tmdb.org/t/p/w500"
const APIKEY = config.API_KEY;

const main = document.getElementById('main');
const body = document.querySelector('body')

function getUrl() {
    const url_string = document.URL;
    var url = new URL(url_string)
    const id = url.searchParams.get("id");
getMovie(id);
}
getUrl();

async function getMovie(id) {
    
    const response = await fetch(getDetailsURL(id));
    const movie= await response.json();
    console.log(movie);
    makeBackground(movie);
    appendMovie(movie);

}

function getDetailsURL(movieId){
    return DETAILSURL+movieId+'?api_key='+APIKEY+'&language=en-US';
}

function makeBackground(movie) {
    const IMGURL = imgPath+movie.backdrop_path;
    body.style.backgroundImage = 'url(' + IMGURL+')';
}

function getClassByRate(score) {
    if(score>=8){
        return "green"
    }else if (score>=5){
        return "yellow"
    }
    else return "red"
}


function appendMovie(movie) {
    main.innerHTML= '';

        var {poster_path, title, vote_average, id, overview,genres, spoken_languages, runtime
        } = movie;
        if(!vote_average) (vote_average="NO")
    
        const movieEl= document.createElement('div');
        movieEl.classList.add('movieDetail');
        if(poster_path){
       movieEl.innerHTML = `
       <img 
            src="${imgPath + poster_path}"
            alt="${title}"
            movieId= "${id}"
        />
        <div class='info'>
        <div class="movieName">
            <h1>${title}</h1>
            <span class=${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        <div class="movieInfo">
            <h4>Genres: ${getGenres(genres)}</h4>
            <h4>Language: ${spoken_languages[0].name}(${spoken_languages[0].iso_639_1})
            <h4>Runtime: ${Math.floor(runtime/60)}h ${runtime%60} mins <h4>
            </h4>
            <h5>${overview} </h5>
        </div>
    </div>
       `;
       main.appendChild(movieEl);
        }
   
}

function getGenres (genres){
    var gentresString = '';
    genres.forEach((genre) =>{
            var { name } = genre;
            gentresString += name+ ', ' ;
        });
    return gentresString.slice(0, -2); ;
}



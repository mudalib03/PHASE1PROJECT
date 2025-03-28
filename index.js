const API_KEY = '944d364ae11b0639bcd80d85111280ae';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
let watchHistory = [];
let watchlist = [];


async function searchMovies() {
    const query = document.getElementById('search').value;
    if (!query) return;
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    displayMovies(data.results);
    updateWatchHistory(data.results);
    getRecommendations();
}

function displayMovies(movies) {
    const moviesDiv = document.getElementById('movies');
    moviesDiv.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <button onclick="addToWatchlist(${movie.id}, '${movie.title}', '${movie.poster_path}', ${movie.vote_average})">Add to Watchlist</button>
        `;
        moviesDiv.appendChild(movieElement);
    });
}

"use strict";

const tmdb_ApiKey = '78b93597ae7fe6921e345ea20019e86d';

const utelly_Headers = {
    method: "GET",
	headers: {
        'x-rapidapi-host': "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        'x-rapidapi-key': "9e31b2a0d6msh399b4899e1128c5p1e5fcejsn4ee14e3adc6c"
    }
};

const discoverURL = "https://api.themoviedb.org/3/discover/movie";

const peopleURL = "https://api.themoviedb.org/3/search/person";

const streamURL = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup";

function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function fetchPageTotal(minReleaseYear,maxReleaseYear,famousPersonID){
    const params = {
        'primary_release_date.gte': minReleaseYear,
        'primary_release_date.lte': maxReleaseYear,
        with_people: famousPersonID,
        include_adult: false,
        include_video: false,
        api_key: tmdb_ApiKey
    };
    const queryString = formatQueryParams(params);
    const url = discoverURL + '?' + queryString;
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => {
            const pageTotal = responseJson.total_pages; 
            getMovie(minReleaseYear,maxReleaseYear,famousPersonID,pageTotal)  
        })
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
    });
}

function getPageNumber(pageTotal) { 
    const pageNumber = Math.floor(Math.random() * pageTotal);
    if (pageNumber !== 0) {
        return pageNumber;
    } else {
        return 1;
        }
}

function getMovie(minReleaseYear,maxReleaseYear,famousPersonID,pageTotal){
    const params = {
        'primary_release_date.gte': minReleaseYear,
        'primary_release_date.lte': maxReleaseYear,
        with_people: famousPersonID,
        page: getPageNumber(pageTotal),
        include_adult: false,
        include_video: false,
        api_key: tmdb_ApiKey
    };
    const queryString = formatQueryParams(params);
    const url = discoverURL + '?' + queryString;
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => displayMovie(responseJson))
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
    });
}


function displayMovie(responseJson) {
    console.log(responseJson);
    $('.js-results-area').removeClass('hidden');
    const randomMovie = Math.floor(Math.random() * responseJson.results.length);
        $('.js-results').append(
            `<li>
            <h3 class="movieTitle">${responseJson.results[randomMovie].title}</h3>
            <img class="moviePoster" src="http://image.tmdb.org/t/p/w185/${responseJson.results[randomMovie].poster_path}">
            <p class="js-overview">${responseJson.results[randomMovie].overview}</p>
            <button type="button" class="stream-button js-show-streams">Where's it streaming?</button>`
        );
        $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    const randomMovieID = responseJson.results[randomMovie].id;
    $('body').on("click", ".js-show-streams", event => {
        $('.js-streaming').empty();
        $('.js-overview').hide();
        $('.js-show-streams').hide();
        getStream(randomMovieID);
    });
}

function getStream(randomMovieID) {
    $('.js-streaming').empty();
    const params = {
        source_id: randomMovieID,
        source: "tmdb",
        country: "US",
        api_key: '9e31b2a0d6msh399b4899e1128c5p1e5fcejsn4ee14e3adc6c'
    };
    const queryString = formatQueryParams(params);
    const url = streamURL + '?' + queryString;
    console.log(url);
    fetch(url, utelly_Headers)
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayStreams(responseJson))
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
    });
}

function displayStreams(responseJson) {
    console.log(responseJson);
    $('.js-streaming').empty();
    $('.js-streaming-area').removeClass('hidden');
    if (responseJson.collection.locations.length === 0){
        $('.js-streaming').append(
            `<li>
            <p class="not-available">This title is not currently available for streaming.</p>
            </li>`
        ); 
    } else {
        for (let i = 0; i < responseJson.collection.locations.length; i++) {
            $('.js-streaming').append(
                `<li>
                <a target="_blank" href="${responseJson.collection.locations[i].url}"><img class="stream-service" src="${responseJson.collection.locations[i].icon}" alt="A link to ${responseJson.collection.locations[i].display_name}"></a>
                </li>`
            );
        }
    }
    $('js-streaming').append(`
    <button type="button" class="new-search-button js-new-search">New Search</button>`
    );
}

function fetchID(famousPerson, minReleaseYear,maxReleaseYear){
    //fetches id for name on movie database
    const params = {
        query: famousPerson,
        api_key: tmdb_ApiKey
    };
    const queryString = formatQueryParams(params);
    const url = peopleURL + '?' + queryString;
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => {
            const famousPersonID = responseJson.results[0].id;
            fetchPageTotal(minReleaseYear, maxReleaseYear,famousPersonID);
        })
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`)
        });
}

function showSearch(){
    $('.js-close-instructions').on("click", event => {
        $('.instructions-container').hide();
        $('.js-search').removeClass("hidden");
    });
}

function newSearch(){
    $('body').on("click",".js-new-search", event => {
        $('.js-results').empty();
        $('.js-streaming').empty();
        $('.js-streaming-area').hide();
        $('.js-results-area').hide();
        $('.js-new-search-container').empty();
        $('.js-error-message').val(''); 
        $('.js-search').show();
    });
}

function watchForm(){
$('.js-search').submit(event => {
    event.preventDefault();
    $('.js-results-area').addClass('hidden');
    $('.js-streaming-area').addClass('hidden');
    $('.js-results').empty();
    $('.js-streaming').empty();
    $('.js-streaming-area').show();
    $('.js-results-area').show();
    $('.js-search').hide();
    $('.js-error-message').text('');
    const minReleaseYear = $('.js-min-year').val() + '-01-01';
    const maxReleaseYear = $('.js-max-year').val() + '-12-31';
    const famousPerson = $('.js-name').val();
    fetchID(famousPerson,minReleaseYear,maxReleaseYear);
});
}

$(watchForm);
$(showSearch);
$(newSearch);
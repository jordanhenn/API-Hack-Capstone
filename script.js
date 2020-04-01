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

function fetchPageTotal(minReleaseYear,maxReleaseYear,famousPersonID,genre){
    const params = {
        'primary_release_date.gte': minReleaseYear,
        'primary_release_date.lte': maxReleaseYear,
        with_people: famousPersonID,
        with_genres: genre,
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
            getMovie(minReleaseYear,maxReleaseYear,famousPersonID,pageTotal,genre)  
        })
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    });
}

function fetchPageTotalNoName(minReleaseYear,maxReleaseYear,genre){
    const params = {
        'primary_release_date.gte': minReleaseYear,
        'primary_release_date.lte': maxReleaseYear,
        with_genres: genre,
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
            getMovieNoName(minReleaseYear,maxReleaseYear,pageTotal,genre)  
        })
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    });
}

function fetchPageTotalNoNameNoGenre(minReleaseYear,maxReleaseYear){
    const params = {
        'primary_release_date.gte': minReleaseYear,
        'primary_release_date.lte': maxReleaseYear,
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
            getMovieNoNameNoGenre(minReleaseYear,maxReleaseYear,pageTotal)  
        })
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    });
}

function fetchPageTotalNoGenre(minReleaseYear,maxReleaseYear,famousPersonID){
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
            getMovieNoGenre(minReleaseYear,maxReleaseYear,famousPersonID,pageTotal)  
        })
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
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

function getMovie(minReleaseYear,maxReleaseYear,famousPersonID,pageTotal,genre){
    const params = {
        'primary_release_date.gte': minReleaseYear,
        'primary_release_date.lte': maxReleaseYear,
        with_people: famousPersonID,
        page: getPageNumber(pageTotal),
        with_genres: genre,
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
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    });
}

function getMovieNoName(minReleaseYear,maxReleaseYear,pageTotal,genre){
    const params = {
        'primary_release_date.gte': minReleaseYear,
        'primary_release_date.lte': maxReleaseYear,
        page: getPageNumber(pageTotal),
        with_genres: genre,
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
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    });
}

function getMovieNoNameNoGenre(minReleaseYear,maxReleaseYear,pageTotal){
    const params = {
        'primary_release_date.gte': minReleaseYear,
        'primary_release_date.lte': maxReleaseYear,
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
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    });
}

function getMovieNoGenre(minReleaseYear,maxReleaseYear,famousPersonID,pageTotal){
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
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    });
}


function displayMovie(responseJson) {
    console.log(responseJson);
    if (responseJson.total_results == 0){
        $('.js-results').append(
            `<li>
            <p class="not-available">No movie found.</p>
            <p class="not-available">Please refine your search.</p>
            </li>`);
        $('.js-new-search-container').addClass("hidden");
        $('.js-new-search-container').append(`
            <button type="button" class="new-search-button js-new-search">New Search</button>`);
        $('.js-results-area').removeClass("hidden").hide().fadeIn("slow");
        $('.js-new-search-container').removeClass("hidden").hide().fadeIn("slow");
    } else {
        const randomMovie = Math.floor(Math.random() * responseJson.results.length);
            if(responseJson.results[randomMovie].poster_path == null) {
                const movieYear = responseJson.results[randomMovie].release_date.slice(0,4);
                $('.js-results').append(
                    `<li>
                    <h3 class="movieTitle">${responseJson.results[randomMovie].title} (${movieYear})</h3>
                    <p class="js-overview">${responseJson.results[randomMovie].overview}</p>
                    <button type="button" class="stream-button js-show-streams">Where's it streaming?</button>
                    </li>`
                );
                $('.js-new-search-container').addClass("hidden");
                $('.js-new-search-container').append(`
                <button type="button" class="new-search-button js-new-search">New Search</button>`);
                $('.js-results-area').removeClass("hidden").hide().fadeIn("slow");
                $('.js-new-search-container').removeClass("hidden").hide().fadeIn("slow");
                const randomMovieID = responseJson.results[randomMovie].id;
                $('body').on("click", ".js-show-streams", event => {
                    $('.js-streaming').empty();
                    $('.js-overview').hide();
                    $('.js-show-streams').hide();
                    getStream(randomMovieID);
                });
            } else {
                const movieYear = responseJson.results[randomMovie].release_date.slice(0,4);
                $('.js-results').append(
                    `<li>
                    <h3 class="movieTitle">${responseJson.results[randomMovie].title} (${movieYear})</h3>
                    <img class="moviePoster" src="https://image.tmdb.org/t/p/w185/${responseJson.results[randomMovie].poster_path}">
                    <p class="js-overview overview">${responseJson.results[randomMovie].overview}</p>
                    <button type="button" class="stream-button js-show-streams">Where's it streaming?</button>
                    </li>`
                );
                $('.js-new-search-container').addClass("hidden");
                $('.js-new-search-container').append(`
                <button type="button" class="new-search-button js-new-search">New Search</button>`);
                $('.js-results-area').removeClass("hidden").hide().fadeIn("slow");
                $('.js-new-search-container').removeClass("hidden").hide().fadeIn("slow");
                const randomMovieID = responseJson.results[randomMovie].id;
                $('body').on("click", ".js-show-streams", event => {
                    $('.js-streaming').empty();
                    $('.js-overview').hide();
                    $('.js-show-streams').hide();
                    getStream(randomMovieID);
                });
            }
    }
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
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
    });
}

function displayStreams(responseJson) {
    console.log(responseJson);
    if (responseJson.collection.locations.length === 0){
        $('.js-streaming').empty();
        $('.js-streaming').append(
            `<li>
            <p class="not-available">This title is not currently available for streaming.</p>
            </li>`
        ); 
    } else {
        for (let i = 0; i < responseJson.collection.locations.length; i++) {
            $('.js-streaming').empty();
            $('.js-streaming').append(
                `<li>
                <a target="_blank" href="${responseJson.collection.locations[i].url}"><img class="stream-service" src="${responseJson.collection.locations[i].icon}" alt="A link to ${responseJson.collection.locations[i].display_name}"></a>
                </li>`
            );
        }
    }
    $('.js-streaming-area').removeClass('hidden');
}

function fetchID(famousPerson,minReleaseYear,maxReleaseYear,genre){
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
            if(responseJson.total_results == 0) {
                $('.js-results-area').removeClass('hidden');
                $('.js-results').append(
                    `<li>
                    <p class="not-available">Couldn't find a movie person with that name.</p>
                    <p class="not-available">Please refine your search.</p>
                    </li>`);
                $('.js-new-search-container').append(`
                    <button type="button" class="new-search-button js-new-search">New Search</button>`);  
            } else {
                const famousPersonID = responseJson.results[0].id;
                fetchPageTotal(minReleaseYear, maxReleaseYear,famousPersonID, genre);
            }
        })
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`)
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
        });
}

function fetchIDNoGenre(famousPerson,minReleaseYear,maxReleaseYear){
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
            if(responseJson.total_results == 0) {
                $('.js-results-area').removeClass('hidden');
                $('.js-results').append(
                    `<li>
                    <p class="not-available">Couldn't find a movie person with that name.</p>
                    <p class="not-available">Please refine your search.</p>
                    </li>`);
                $('.js-new-search-container').append(`
                    <button type="button" class="new-search-button js-new-search">New Search</button>`);  
            } else {
                const famousPersonID = responseJson.results[0].id;
                fetchPageTotalNoGenre(minReleaseYear, maxReleaseYear,famousPersonID);
            }
        })
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`)
            $('.js-new-search-container').append(`
        <button type="button" class="new-search-button js-new-search">New Search</button>`);
        });
}

function showSearch(){
    $('.js-close-instructions').on("click", event => {
        $('.instructions-container').fadeOut({
            complete: function() {
              $('.js-search').removeClass("hidden").hide().fadeIn("slow");
            }}
          );
    });
}

function newSearch(){
    $('body').on("click",".js-new-search", event => {
        $('.js-results-area').hide()
        $('.js-streaming-area').hide()
        $('.js-new-search-container').hide()
        $('.js-error-message').hide()
        $('.js-results').empty();
        $('.js-streaming').empty();
        $('.js-max-year').val('');
        $('.js-min-year').val('');
        $('.js-name').val('');
        $('.js-genre').val('All-Genres')
        $('.js-new-search-container').empty();
        $('.js-error-message').text(''); 
        $('.js-search').fadeIn("slow");
    });
}

function watchForm(){
    $('.js-search').submit(event => {
        event.preventDefault();
        $('.js-results-area').addClass('hidden');
        $('.js-streaming-area').addClass('hidden');
        $('.js-results').empty();
        $('.js-streaming').empty();
        $('.js-search').fadeOut();
        $('.js-streaming-area').show();
        $('.js-results-area').show();
        $('.js-error-message').text('');
        const maxYear = $('.js-max-year').val();
        const minYear= $('.js-min-year').val();
        const maxReleaseYear = getMaxReleaseYear(maxYear);
        const minReleaseYear = getMinReleaseYear(minYear);
        const famousPerson = $('.js-name').val();
        const genre = $('.js-genre').val();
        if (famousPerson === '' && genre !== 'All-Genres') {
            fetchPageTotalNoName(minReleaseYear, maxReleaseYear,genre);
        } else if (famousPerson === '' && genre === 'All-Genres') {
            fetchPageTotalNoNameNoGenre(minReleaseYear,maxReleaseYear);
        } else if (famousPerson !== '' && genre === 'All-Genres') {
            fetchIDNoGenre(famousPerson,minReleaseYear,maxReleaseYear);
        } else {
            fetchID(famousPerson,minReleaseYear,maxReleaseYear,genre);
        }
    });
}

function getMaxReleaseYear(maxYear) {
    if (maxYear == '') {
        const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const maxReleaseYear =  '2020-' + mm + '-' + dd;
            return maxReleaseYear;
        return maxReleaseYear;
    } else {
        if (maxYear == 2020) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const maxReleaseYear = maxYear + '-' + mm + '-' + dd;
            return maxReleaseYear;
        } else {
            const maxReleaseYear = maxYear + '-12-31';
            return maxReleaseYear;
        }
    }
}

function getMinReleaseYear(minYear) {
    if (minYear == '') {
        const minReleaseYear = '1900-01-01';
        return minReleaseYear;
    } else {
        const minReleaseYear = minYear + '-01-01';
        return minReleaseYear;
    }
}

$(watchForm);
$(showSearch);
$(newSearch);
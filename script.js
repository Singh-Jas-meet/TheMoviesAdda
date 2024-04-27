const button = document.getElementById('searchBtn');

const inputBox = document.getElementById('searchBox');

const main = document.querySelector('main');


function getMovieData() {
  main.innerHTML = "";
  const movieName = inputBox.value;
  const url = "https://search.imdbot.workers.dev/?q=".concat(movieName);
  let movieList = [];

  // Make the API call using fetch
  fetch(url)
    .then(response => {
      if (!response.ok) {// for response errors like 404
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Extract the movie details from the JSON response
      data["description"].forEach(item => {
        const moviePoster = item["#IMG_POSTER"];
        const movieName_ = item["#TITLE"];
        const yearReleased = item["#YEAR"];
        const imdbUrl = item["#IMDB_URL"];
        const actors = item["#ACTORS"];

        movieList.push({
          "Poster": moviePoster,
          "Name": movieName_,
          "Year": yearReleased,
          "Url": imdbUrl,
          "Actors": actors
        });
      })
      movieList.forEach(item => { createMovieSection(item) });
      inputBox.value = ""; // clear the search box
    })
    .catch(error => {
      // Handle any errors that occurred during the API call
      console.error('Error fetching data:', error);
    });
}

function createMovieSection(movieDetailsArray) {

  const section = document.createElement("section");
  section.classList.add('movie');

  const sectionTopDiv = document.createElement('div');
  sectionTopDiv.classList.add("container-movie-poster");

  const sectionBottomDiv = document.createElement('div');
  sectionBottomDiv.classList.add("container-minor-movie-details");

  const keys = Object.keys(movieDetailsArray);

  keys.forEach(key => {
    if (key == 'Poster') {

      const poster = document.createElement('img');
      poster.alt = "Movie Poster";
      poster.src = movieDetailsArray[key];
      sectionTopDiv.append(poster);
    }
    if (key == 'Name') {
      const namePara = document.createElement('p');
      namePara.textContent = movieDetailsArray[key];
      namePara.style.color = "Red";
      sectionBottomDiv.append(namePara);
    }
    if (key == 'Year') {
      const year = document.createElement('p');
      year.textContent = movieDetailsArray[key];
      year.style.color = "Green";
      sectionBottomDiv.append(year);
    }

    if (key == 'Actors') {
      const actors = document.createElement('p');
      actors.textContent = movieDetailsArray[key].toString();
      actors.style.color = "Blue";
      sectionBottomDiv.append(actors);
    }
  })

  section.append(sectionTopDiv, sectionBottomDiv);

  main.append(section);
}


button.addEventListener('click', getMovieData);
inputBox.addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    getMovieData();
  }
});








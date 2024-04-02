import swapi from './swapi.js';

//Exemple d'inicialització de la llista de pel·lícules. Falten dades!
async function setMovieHeading(select, titleSelector, infoSelector, directorSelector) {
  // Obtenim els elements del DOM amb QuerySelector
  const title = document.querySelector(titleSelector);
  const info = document.querySelector(infoSelector);
  const director = document.querySelector(directorSelector);

  // Obtenim la informació de la pelicula
  const movieInfo = await swapi.getMovieInfo(select);
  // Injectem
  title.innerHTML = movieInfo.name;
  info.innerHTML = `Episode ${movieInfo.episodeID} - ${movieInfo.release}`;
  director.innerHTML = movieInfo.director;

}

async function initMovieSelect(selector) {
  // Obtenim el selector del DOM
  const select = document.querySelector(selector);
  const option = document.createElement('option');
  option.value = '';
  option.text = 'Selecciona una pel·lícula';
  select.appendChild(option);

  // Obtenim les pel·lícules
  const movies = await swapi.listMoviesSorted();
  // Creem les opcions del selector
  movies.forEach((movie) => {
    const option = document.createElement('option');
    option.value = _filmIdToEpisodeId(movie.episodeID);
    option.text = movie.name;
    select.appendChild(option);

    select.onchange = () => {
      setMovieSelectCallbacks();
    };
  });

}

function deleteAllCharacterTokens() {}

// EVENT HANDLERS //

function addChangeEventToSelectHomeworld() {}

async function _createCharacterTokens() {}

function _addDivChild(parent, className, html) {}

function setMovieSelectCallbacks() {
  const selectedMovie = document.querySelector('#select-movie');

  selectedMovie.addEventListener('change', _handleOnSelectMovieChanged);

}

async function _handleOnSelectMovieChanged(event) {
  const selectedMovie = event.target.value;

  if (selectedMovie) {
    await setMovieHeading(selectedMovie, '.movie__title', '.movie__info', '.movie__director');
  }
}

function _filmIdToEpisodeId(episodeID) {
  const mapping = episodeToMovieIDs.find((item) => item.e === episodeID);
  if (mapping) {
    return mapping.m;
  } else {
    return null;
  }
}

// "https://swapi.dev/api/films/1/" --> Episode_id = 4 (A New Hope)
// "https://swapi.dev/api/films/2/" --> Episode_id = 5 (The Empire Strikes Back)
// "https://swapi.dev/api/films/3/" --> Episode_id = 6 (Return of the Jedi)
// "https://swapi.dev/api/films/4/" --> Episode_id = 1 (The Phantom Menace)
// "https://swapi.dev/api/films/5/" --> Episode_id = 2 (Attack of the Clones)
// "https://swapi.dev/api/films/6/" --> Episode_id = 3 (Revenge of the Sith)

let episodeToMovieIDs = [
  { m: 1, e: 4 },
  { m: 2, e: 5 },
  { m: 3, e: 6 },
  { m: 4, e: 1 },
  { m: 5, e: 2 },
  { m: 6, e: 3 },
];

function _setMovieHeading({ name, episodeID, release, director }) {}

function _populateHomeWorldSelector(homeworlds) {}

/**
 * Funció auxiliar que podem reutilitzar: eliminar duplicats i ordenar alfabèticament un array.
 */
function _removeDuplicatesAndSort(elements) {
  // Al crear un Set eliminem els duplicats
  const set = new Set(elements);
  // tornem a convertir el Set en un array
  const array = Array.from(set);
  // i ordenem alfabèticament
  return array.sort(swapi._compareByName);
}

const act7 = {
  setMovieHeading,
  setMovieSelectCallbacks,
  initMovieSelect,
  deleteAllCharacterTokens,
  addChangeEventToSelectHomeworld,
};

export default act7;

import swapi from './swapi.js';

//Exemple d'inicialització de la llista de pel·lícules. Falten dades!
async function setMovieHeading(movieId, titleSelector, infoSelector, directorSelector) {
  // Obtenim els elements del DOM amb QuerySelector
  const title = document.querySelector(titleSelector);
  const info = document.querySelector(infoSelector);
  const director = document.querySelector(directorSelector);

  if (!movieId) {
    title.innerHTML = null;
    info.innerHTML = null;
    director.innerHTML = null;
    return;
  } else {
  // Obtenim la informació de la pelicula
  const movieInfo = await swapi.getMovieInfo(movieId);
  // Injectem
  title.innerHTML = movieInfo.name;
  info.innerHTML = `Episode ${movieInfo.episodeID} - ${movieInfo.release}`;
  director.innerHTML = movieInfo.director;

  }
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

function deleteAllCharacterTokens() {
}

// EVENT HANDLERS //

function addChangeEventToSelectHomeworld() {
  document.querySelector('.list__characters').innerHTML = '';
  
  const selectHomeworld = document.querySelector('#select-homeworld');
  selectHomeworld.addEventListener('change', _createCharacterTokens);

}

async function _createCharacterTokens(event) {
  const homeworld = document.querySelector('#select-homeworld').value;
  const movieId = document.querySelector('#select-movie').value;

  if (!homeworld) {
    throw Error('No homeworld selected.');
  }

  if (!movieId) {
    throw Error('No movie selected.');
  }

  const characters = await swapi.getMovieCharactersAndHomeworlds(movieId);

  const charactersFromHomeworld = characters.characters.filter((character) => character.homeworld === homeworld);

  const listCharacters = document.querySelector('.list__characters');
  listCharacters.innerHTML = '';

  charactersFromHomeworld.forEach((character) => {
    const li = document.createElement('li');
    li.classList.add('list__item', 'item' ,'character');
    listCharacters.appendChild(li);

    const img = document.createElement('img');
    const urlParts = character.url.split('/');
    const id = urlParts[urlParts.length - 1];

    img.src = `./assets/people/${id}.jpg`;
    img.classList.add('character__image');
    img.style.maxWidth='100%';
    li.appendChild(img);

    const h2 = document.createElement('h2');
    h2.classList.add('character__name');
    h2.innerHTML = character.name;
    li.appendChild(h2);

    _addDivChild(li, 'character__birth', `<strong>Birth Year:</strong> ${character.birth_year}`);
    _addDivChild(li, 'character__eye', `<strong>Eye Color:</strong> ${character.eye_color}`);
    _addDivChild(li, 'character__gender', `<strong>Gender:</strong> ${character.gender}`);
    _addDivChild(li, 'character__home', `<strong>Homeworld:</strong> ${character.homeworld}`);

  })

}

function _addDivChild(parent, className, html) {
  const div = document.createElement('div');
  div.classList.add(className);
  div.innerHTML = html;
  parent.appendChild(div);
}

function setMovieSelectCallbacks() {
  const selectedMovie = document.querySelector('#select-movie');

  selectedMovie.addEventListener('change', _handleOnSelectMovieChanged);

}

async function _handleOnSelectMovieChanged(event) {
  const movieId = event.target.value;

  await setMovieHeading(movieId, '.movie__title', '.movie__info', '.movie__director');

  const characters = await swapi.getMovieCharactersAndHomeworlds(movieId);

  const homeworlds = characters.characters.map((character) => character.homeworld);

  const uniqueHomeworlds = _removeDuplicatesAndSort(homeworlds);

  _populateHomeWorldSelector(uniqueHomeworlds);

  document.querySelector('.list__characters').innerHTML = '';
  
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

function _populateHomeWorldSelector(homeworlds) {

  const selector = document.querySelector('#select-homeworld');
  selector.innerHTML = '';

  const option = document.createElement('option');
  option.value = '';
  option.text = 'Selecciona un planeta';
  selector.appendChild(option);

  homeworlds.forEach((homeworld) => {
    const option = document.createElement('option');
    option.value = homeworld;
    option.text = homeworld;
    selector.appendChild(option);
  });

}

/**
 * Funció auxiliar que podem reutilitzar: eliminar duplicats i ordenar alfabèticament un array.
 */
function _removeDuplicatesAndSort(elements) {
  const array = [...new Set(elements)];
  array.sort();
  return array;
}

const act7 = {
  setMovieHeading,
  setMovieSelectCallbacks,
  initMovieSelect,
  deleteAllCharacterTokens,
  addChangeEventToSelectHomeworld,
};

export default act7;

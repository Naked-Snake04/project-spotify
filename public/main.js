const KEY = "a15921d44a0fcd14ba611ad341dbf3d6";
const MAIN_URL = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=edm&api_key=a15921d44a0fcd14ba611ad341dbf3d6&format=json`;
const ERR = "Данные по запросу не найдены"

/** GET-запрос к last.fm */
function getData(url) {
	return fetch(url)
		.then((res) => res.json())
		.catch((e) => console.log(e));
}

/** Обработка информации о топе */
function getTop() {
	getData(MAIN_URL).then((data) => {
		if (typeof data === 'undefined') {
			console.log(ERR);
		}
		else {
			data.albums.album.forEach((item) => {
				topArtists(item);
			})
		}
	}
	);
	return;
}

/** Вызов getTop */
getTop();

/** Поиск */
document.querySelector(".header__search").addEventListener("keydown", (e) => {
	const content = document.querySelector(".content-body");
	const heading = document.querySelector(".name");
	if (e.keyCode === 13) {
		if (e.target.value === "") {
			content.textContent = "";
			heading.textContent = "Популярные исполнители: ";
			getTop();
		} else {
			getData(
					`https://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${e.target.value}&api_key=${KEY}&format=json`
				)
				.then((result) => {
					content.textContent = "";
					heading.textContent = "Результаты поиска: ";
					if (typeof result === 'undefined') {
						console.log(ERR);
					}
					else {
						result.results.trackmatches.track.forEach((item) => {
							searchValues(item);
						});
					}
				})
			}
		}
	});
	
/** Создание результатов поиска */
function searchValues(item) {
	const container = document.querySelector(".content-body");
	
	const element = document.createElement("div");
	const artistData = document.createElement('div');
	
	element.className = "card";
	artistData.className = "artist_data";
	
	container.appendChild(element);
	element.appendChild(artistData);
	artistData.appendChild(addImage());
	artistData.appendChild(addInfo(item));
	artistData.appendChild(addContainerListener(item));
}
	
/** Создание карточек с информацией о популярных композициях */
function topArtists(item) {
	const container = document.querySelector(".content-body");

	const element = document.createElement("div");
	const artistData = document.createElement('div');

	element.className = "card";
	artistData.className = "artist_data";

	container.appendChild(element);
	element.appendChild(artistData);
	artistData.appendChild(addImage());
	artistData.appendChild(addTrackName(item));
	artistData.appendChild(addContainer(item));
}

/** Добавление названия трека */
function addTrackName(item) {
	const name = document.createElement('p');
	name.className = "artist_name";
	name.appendChild(document.createTextNode(item.name));
	return name;
}
/** Создание столбца с информацией о треке */
function addContainer(item) {
	const dataContainer = document.createElement('div');

	dataContainer.className = "data_container";

	dataContainer.appendChild(addArtist(item));
	dataContainer.appendChild(document.createElement('hr'));
	dataContainer.appendChild(addPlace(item));
	
	return dataContainer;
}

/** Создание столбца с информацией о прослушиваниях */
function addContainerListener(item) {
	const dataContainer = document.createElement('div');
	const dataAlbum = document.createElement('div');
	
	dataContainer.className = "data_container";
	dataAlbum.className = "data";
	
	dataContainer.appendChild(dataAlbum);
	dataAlbum.appendChild(addListenerLabel());
	dataAlbum.appendChild(addValue(item, 'listener'));
	
	return dataContainer;
}

/** Создание информации об исполнителе */
function addArtist(item) {
	const dataAlbum = document.createElement('div');
	
	dataAlbum.className = "data";
	
	dataAlbum.appendChild(addArtistLabel());
	dataAlbum.appendChild(addValue(item, 'artist'));
	
	return dataAlbum;
}

/** Создание поля исполнителя */
function addArtistLabel() {
	const album = document.createElement('p');
	album.className = "playlist-name";
	album.appendChild(document.createTextNode("Исполнитель альбома: "));
	return album;
}

/** Создание информации о позиции трека */
function addPlace(item) {
	const dataPlace = document.createElement('div');

	dataPlace.className = "data";

	dataPlace.appendChild(addPlaceLabel());
	dataPlace.appendChild(addPlaceValue(item));

	return dataPlace;
}

/** Создание поля позиции трека */
function addPlaceLabel() {
	const place = document.createElement('p');
	place.className = "playlist-name";
	place.appendChild(document.createTextNode("Место: "));
	return place;
}

/** Создание значения-ссылки об исполнителе */
function addValue(item, choice) {
	const value = document.createElement('p');
	const aElement = document.createElement("a");

	value.className = "playlist-name number";

	aElement.href = item.url;
	aElement.className = "value";

	value.appendChild(aElement);
	if (choice == 'artist')
		aElement.appendChild(document.createTextNode(item.artist.name));
	if (choice == 'listener')
		aElement.appendChild(document.createTextNode(item.listeners));
	return value;
}

/** Создание значения позиции трека */
function addPlaceValue(item) {
	const placeNumber = document.createElement('p');
	placeNumber.className = "playlist-name number";
	placeNumber.appendChild(document.createTextNode(item["@attr"].rank));
	return placeNumber;
}

/** Создание информации о треке */
function addInfo(item) {
	const data = document.createElement('div');

	data.appendChild(addInfoTrack(item));
	data.appendChild(addInfoArtist(item));

	return data;
}

/** Создание информации о названии трека */
function addInfoTrack(item) {
	const name = document.createElement('p');
	name.className = "artist_name";
	name.appendChild(document.createTextNode(item.name));
	return name;
}

/** Создание информации об исполнителе трека */
function addInfoArtist(item) {
	const artist = document.createElement('p');
	artist.className = "song_artist_name";
	artist.appendChild(document.createTextNode(item.artist));
	return artist;
}

/** Создание поля прослушиваний трека */
function addListenerLabel() {
	const album = document.createElement('p');
	album.className = "playlist-name";
	album.appendChild(document.createTextNode("Слушателей: "));
	return album;
}

/** Создание иконки трека */
function addImage() {
	const buttonData = document.createElement("button");
	const img = document.createElement('img');

	buttonData.className = "picture";

	buttonData.appendChild(img);

	img.src = "album.png";
	img.alt = "Изображение альбома";
	img.width = 58;
	img.height = 58;

	return buttonData;
}

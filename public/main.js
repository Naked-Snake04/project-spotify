const KEY = "a15921d44a0fcd14ba611ad341dbf3d6";
const MAIN_URL = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=edm&api_key=a15921d44a0fcd14ba611ad341dbf3d6&format=json`;
const ERR = 'Произошла ошибка. Тип ошибки выше'

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
}

/** Вызов getTop */
getTop();

/** Поиск */
document.querySelector(".header__search").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		if (e.target.value === "") {
			const content = document.querySelector(".content-body");
			content.textContent = "";
			const heading = document.querySelector(".name");
			heading.textContent = "Популярные исполнители: ";
			getTop();
		} else {
			getData(
					`https://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${e.target.value}&api_key=${KEY}&format=json`
				)
				.then((result) => {
					const content = document.querySelector(".content-body");
					content.textContent = "";
					const heading = document.querySelector(".name");
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
	
/** Результаты поиска */
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
	
/** Карточки о популярных артистах */
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
/** Создание контейнера-столбца с информацией о треке */
function addContainer(item) {
	const dataContainer = document.createElement('div');

	dataContainer.className = "data_container";

	dataContainer.appendChild(addArtist(item));
	dataContainer.appendChild(document.createElement('hr'));
	dataContainer.appendChild(addPlace(item));
	
	return dataContainer;
}

/** Столбец для слушателей */
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

/** Информация об артисте */
function addArtist(item) {
	const dataAlbum = document.createElement('div');
	
	dataAlbum.className = "data";
	
	dataAlbum.appendChild(addArtistLabel());
	dataAlbum.appendChild(addValue(item, 'artist'));
	
	return dataAlbum;
}

/** Метка для артиста */
function addArtistLabel() {
	const album = document.createElement('p');
	album.className = "playlist-name";
	album.appendChild(document.createTextNode("Исполнитель альбома: "));
	return album;
}

/** Позиция трека */
function addPlace(item) {
	const dataPlace = document.createElement('div');

	dataPlace.className = "data";

	dataPlace.appendChild(addPlaceLabel());
	dataPlace.appendChild(addPlaceValue(item));

	return dataPlace;
}

/** Метка позиции трека */
function addPlaceLabel() {
	const place = document.createElement('p');
	place.className = "playlist-name";
	place.appendChild(document.createTextNode("Место: "));
	return place;
}

/** Значение-ссылка артиста */
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

/** Значение позиции трека */
function addPlaceValue(item) {
	const placeNumber = document.createElement('p');
	placeNumber.className = "playlist-name number";
	placeNumber.appendChild(document.createTextNode(item["@attr"].rank));
	return placeNumber;
}

/** Информация о треке */
function addInfo(item) {
	const data = document.createElement('div');

	data.appendChild(addInfoTrack(item));
	data.appendChild(addInfoArtist(item));

	return data;
}

/** Информация о названии трека */
function addInfoTrack(item) {
	const name = document.createElement('p');
	name.className = "artist_name";
	name.appendChild(document.createTextNode(item.name));
	return name;
}

/** Информация об артисте */
function addInfoArtist(item) {
	const artist = document.createElement('p');
	artist.className = "song_artist_name";
	artist.appendChild(document.createTextNode(item.artist));
	return artist;
}

/** Метка слушателей */
function addListenerLabel() {
	const album = document.createElement('p');
	album.className = "playlist-name";
	album.appendChild(document.createTextNode("Слушателей: "));
	return album;
}

/** Изображение для треков */
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

const KEY = "a15921d44a0fcd14ba611ad341dbf3d6";
const MAIN_URL = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=edm&api_key=a15921d44a0fcd14ba611ad341dbf3d6&format=json`;
const ERR = 'Ошибка'

function getData(url) {
	return fetch(url)
		.then((res) => res.json())
		.catch((e) => console.log(e));
}

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
getTop();

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
	
	function searchValues(item) {
		const container = document.querySelector(".content-body");
	
		let element = document.createElement("div");
		let artistData = document.createElement('div');
	
		element.className = "card";
		artistData.className = "artist_data";
	
		container.appendChild(element);
		element.appendChild(artistData);
		artistData.appendChild(addImage());
		artistData.appendChild(addInfo(item));
		artistData.appendChild(addContainerListener(item));
	}
	
function topArtists(item) {
	const container = document.querySelector(".content-body");

	let element = document.createElement("div");
	let artistData = document.createElement('div');

	element.className = "card";
	artistData.className = "artist_data";

	container.appendChild(element);
	element.appendChild(artistData);
	artistData.appendChild(addImage());
	artistData.appendChild(addTrackName(item));
	artistData.appendChild(addContainer(item));
}

function addTrackName(item) {
	let name = document.createElement('p');
	name.className = "artist_name";
	name.appendChild(document.createTextNode(item.name));
	return name;
}

function addContainer(item) {
	let dataContainer = document.createElement('div');

	dataContainer.className = "data_container";

	dataContainer.appendChild(addArtist(item));
	dataContainer.appendChild(document.createElement('hr'));
	dataContainer.appendChild(addPlace(item));
	
	return dataContainer;
}

function addContainerListener(item) {
	let dataContainer = document.createElement('div');
	let dataAlbum = document.createElement('div');
	
	dataContainer.className = "data_container";
	dataAlbum.className = "data";
	
	dataContainer.appendChild(dataAlbum);
	dataAlbum.appendChild(addListenerLabel());
	dataAlbum.appendChild(addValue(item, 'listener'));
	
	return dataContainer;
}

function addArtist(item) {
	let dataAlbum = document.createElement('div');
	
	dataAlbum.className = "data";
	
	dataAlbum.appendChild(addArtistLabel());
	dataAlbum.appendChild(addValue(item, 'artist'));
	
	return dataAlbum;
}

function addArtistLabel() {
	let album = document.createElement('p');
	album.className = "playlist-name";
	album.appendChild(document.createTextNode("Исполнитель альбома: "));
	return album;
}

function addPlace(item) {
	let dataPlace = document.createElement('div');

	dataPlace.className = "data";

	dataPlace.appendChild(addPlaceLabel());
	dataPlace.appendChild(addPlaceValue(item));

	return dataPlace;
}

function addPlaceLabel() {
	let place = document.createElement('p');
	place.className = "playlist-name";
	place.appendChild(document.createTextNode("Место: "));
	return place;
}

function addValue(item, choice) {
	let value = document.createElement('p');
	let aElement = document.createElement("a");

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

function addPlaceValue(item) {
	let placeNumber = document.createElement('p');
	placeNumber.className = "playlist-name number";
	placeNumber.appendChild(document.createTextNode(item["@attr"].rank));
	return placeNumber;
}

function addInfo(item) {
	let data = document.createElement('div');

	data.appendChild(addInfoTrack(item));
	data.appendChild(addInfoArtist(item));

	return data;
}

function addInfoTrack(item) {
	let name = document.createElement('p');
	name.className = "artist_name";
	name.appendChild(document.createTextNode(item.name));
	return name;
}

function addInfoArtist(item) {
	let artist = document.createElement('p');
	artist.className = "song_artist_name";
	artist.appendChild(document.createTextNode(item.artist));
	return artist;
}


function addListenerLabel() {
	let album = document.createElement('p');
	album.className = "playlist-name";
	album.appendChild(document.createTextNode("Слушателей: "));
	return album;
}


function addImage() {
	let buttonData = document.createElement("button");
	let img = document.createElement('img');

	buttonData.className = "picture";

	buttonData.appendChild(img);

	img.src = "album.png";
	img.alt = "Изображение альбома";
	img.width = 58;
	img.height = 58;

	return buttonData;
}

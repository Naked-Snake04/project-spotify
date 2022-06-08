import React from "react";
import { HeaderContext } from "../context";
import { useContext } from "react";

function Header() {
  const { setSearchData } = useContext(HeaderContext);
  const ERR = 'Данные по запросу не найдены';


  function getApiData(url) {
    return fetch(url)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }

  function getResult(value) {
    if (value !== "") {
      getApiData(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${value}&api_key=a15921d44a0fcd14ba611ad341dbf3d6&format=json`
      ).then((data) => {
        if (typeof data === 'undefined') {
          console.log(ERR);
        }
        else {
          return setSearchData(data.results.trackmatches.track);
        }
      });
    } else setSearchData([]);
  }
  return (
    <header className="header">
      <a href="/" className="header__logo link">
        <img src="./logo.png" alt="Логотип" width="30%" height="40" max-width="5" />
        <h1 className="header__title">Spotify Clone</h1>
      </a>
      <input
        type="search"
        className="header__search"
        placeholder="Исполнитель, трек или подкаст"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getResult(e.target.value);
          }
        }}
        />
    </header>
    );
}

export default Header; 

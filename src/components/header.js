import React from "react";
import { HeaderContext } from "../context";
import { useContext } from "react";
import Request from "./request";

function Header() {
  const { setSearchData } = useContext(HeaderContext);
  const ERR = 'Данные по запросу не найдены';
  
  function getResult(value) {
    if (value !== "") {
      Request.getApiData(
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
      <a href="/" class="header__logo">
        <img src="./logo.png" alt="logo" width="32" height="32" />
        <h1 class="header__title">Spotify Clone</h1>
      </a>
      <input
        type="search"
        className="header__search"
        placeholder="Найти песню"
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

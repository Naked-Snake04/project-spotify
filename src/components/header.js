import React from "react";
import Input from "./Input";

function Header() {
  // const { setSearchData } = useContext(Context);
  // const ERR = 'Данные по запросу не найдены';
  
  // function getResult(value) {
  //   if (value !== "") {
  //     Request.getApiData(
  //       `https://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${value}&api_key=a15921d44a0fcd14ba611ad341dbf3d6&format=json`
  //     ).then((data) => {
  //       if (typeof data === 'undefined') {
  //         console.log(ERR);
  //       }
  //       else {
  //         return setSearchData(data.results.trackmatches.track);
  //       }
  //     });
  //   } else setSearchData([]);
  // }
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <img src="./logo.png" alt="logo" width="32" height="32" />
        <h1 className="header__title">Spotify Clone</h1>
      </a>
        <Input></Input>
    </header>
    );
}

export default Header; 

import { useState, useContext, useEffect } from "react";
import TopCard from "./topCard";
import Card from "./card";
import { MainContext } from "../context";
import { getApiData } from "./getApiData";
function Main() {
  const [topArtists, setTopArtists] = useState([]);
  const { searchData } = useContext(MainContext);
  const getTopUrl = "https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=metal&api_key=a15921d44a0fcd14ba611ad341dbf3d6&format=json";
  const ERR = 'Данные по запросу не найдены';

  useEffect(() => {
    function getTop() {
      getApiData(getTopUrl).then((data) => {
        if (typeof data === 'undefined') {
          console.log(ERR);
        }
        else {
          setTopArtists(data.albums.album);
        }
      });
    };
    getTop();
  }, []);

  if (searchData.length === 0) {
    return (
      <main className="content">
        <h2 className="name">Топ исполнителей: </h2>
        <div className="artist_content">
          {topArtists.map((item) => {
            return <TopCard key={item.name} data={item}></TopCard>;
          })}
        </div>
      </main>
    );
  } else {
    return (
      <main className="content">
        <h2 className="name">Результаты поиска: </h2>
        <div className="artist_content">
          {searchData.map((item) => {
            return <Card key={item.url} data={item}></Card>;
          })}
        </div>
      </main>
    );
  }
}

export default Main;

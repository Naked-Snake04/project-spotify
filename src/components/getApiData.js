const ERR = 'Данные по запросу не найдены';

export function getApiData(url) {
    return fetch(url)
      .then((res) => res.json())
      .catch((e) => console.log(e, ERR));
  }

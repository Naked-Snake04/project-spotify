import React from 'react';
class Request extends React.Component {
    getApiData(url) {
        const ERR = 'Данные по запросу не найдены';
        return fetch(url)
          .then((res) => res.json())
          .catch(console.log(ERR));
      }
}

export default Request;
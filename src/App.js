import React, { useState } from 'react';
import Aside from './components/aside';
import { MainContext, HeaderContext } from './context';
import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  const [searchData, setSearchData]=useState([])
  return (
    <div className="app">
      <HeaderContext.Provider value={{ setSearchData }}>
        <Header />
      </HeaderContext.Provider>
      <Aside />
      <MainContext.Provider value={{ searchData }}>
        <Main />
      </MainContext.Provider>
      <Footer/>
    </div>
  );
}
export default App;

import React, { useState } from 'react';
import Aside from './components/aside';
import { MainContext, Context } from './context';
import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  const [searchData, setSearchData]=useState([])
  return (
    <Context.Provider value={{searchData,setSearchData}}>
    <div className="app">
      <Header />
      <Aside />
      <MainContext.Provider value={{ searchData }}>
        <Main />
      </MainContext.Provider>
      <Footer/>
    </div>
    </Context.Provider>
  );
}
export default App;

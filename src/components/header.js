import React from "react";
import Input from "./Input";

function Header() {
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

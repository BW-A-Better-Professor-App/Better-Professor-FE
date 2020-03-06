import React from "react";



const Header = props => {

  const welcome = window.localStorage.getItem('welcome');
  console.log("welcome Message", welcome)
  return (
    <div>
      <h1>Better Professor</h1>
      <h2>{welcome}</h2>
    </div>
  );
};

export default Header;
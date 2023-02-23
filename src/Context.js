import React from "react";

export const Context = React.createContext({
  language: "en",
  changeLanguage: () => {},
  tour: "castle",
  changeTour: () => {},
  room: "1",
  changeRoom: () => {},
  house: "rederns",
  changeHouse: () => {},
  owner:"1",
  changeOwner: () => {},
  "font-size":"d",
  changeFontSize: () => {},
  "gallery_tour":"castle",
  changeGalleryTour:() => {},
});


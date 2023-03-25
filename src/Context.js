import React from "react";

export const Context = React.createContext({
  language: "en",
  setLanguage: () => {},
  tour: "castle",
  setTour: () => {},
  room: "1",
  setRoom: () => {},
  house: "rederns",
  setHouse: () => {},
  owner:"1",
  setOwner: () => {},
  "font-size":"d",
  setFontSize: () => {},
  "gallery_tour":"castle",
  setGalleryTour:() => {},
  "image_recognition_name":"",
  setImageRecognitionName:()=>{},
  "image_recognition_img":"",
  setImageRecognitionImg:()=>{},
});


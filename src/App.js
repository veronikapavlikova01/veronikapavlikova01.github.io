import React from 'react';
import DataAPI from './DataAPI';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/Home';
import Tours from './components/Tours'
import Rooms from './components/Rooms'
import Contact from './components/Contact'
import RoomsOverview from './components/RoomsOverview'
import Room from './components/Room'
import History from './components/History'
import HistoryOverview from './components/HistoryOverview';
import Houses from './components/Houses'
import Owners from './components/Owners'
import Owner from './components/Owner';
import Settings from './components/Settings';
import Other from './components/Other';
import AboutApp from './components/AboutApp';
import WhereToNext from './components/WhereToNext';
import Gallery from './components/Gallery';
import GalleryRooms from './components/GalleryRooms';
import ScrollToTop from './components/ScrollToTop';
import QRScanner from './components/QRScanner';
import { Context } from './Context'
import FaceRecognition from './components/FaceRecognition';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.setLanguage = (e) => {
      this.setState({ language: e });
      localStorage.setItem("language", JSON.stringify(e));
    }

    this.setHouse = (e) => {
      this.setState({ house: e });
      localStorage.setItem("house", JSON.stringify(e));
    }

    this.setTour = (e) => {
      this.setState({ tour: e });
      localStorage.setItem("tour", JSON.stringify(e));
    }

    this.setRoom = (e) => {
      this.setState({ room: e });
      localStorage.setItem("room", JSON.stringify(e));
    }

    this.setOwner = (e) => {
      this.setState({ owner: e });
      localStorage.setItem("owner", JSON.stringify(e));
    }

    this.setGalleryTour = (e) => {
      this.setState({ gallery_tour: e });
      localStorage.setItem("gallery_tour", JSON.stringify(e));
    }

    this.setImageRecognitionName = (e) => {
      this.setState({ image_name: e });
      localStorage.setItem("image_name", JSON.stringify(e));
    }

    this.setImageRecognitionImg = (e) => {
      this.setState({ image_img: e });
      localStorage.setItem("image_img", JSON.stringify(e));
    }


    this.setFontSize = (e) => {
      var body = document.getElementById('body');
      if (e === "d") {
        body.classList.value = '';
        body.classList.add("font-size-default");
        localStorage.setItem("fontSize", JSON.stringify(e));
      } else if (e === "m") {
        body.classList.value = '';
        body.classList.add("font-size-medium");
        localStorage.setItem("fontSize", JSON.stringify(e));
      } else if (e === "l") {
        body.classList.value = '';
        body.classList.add("font-size-large");
        localStorage.setItem("fontSize", JSON.stringify(e));
      } else {
        console.log("Wrong value of font size.")
      }
    }

    this.state = {
      language: localStorage.getItem("language") !== null ? JSON.parse(localStorage.getItem("language")) : "en",
      setLanguage: this.setLanguage,
      tour: localStorage.getItem("tour") !== null ? JSON.parse(localStorage.getItem("tour")) : "castle",
      setTour: this.setTour,
      room: localStorage.getItem("room") !== null ? JSON.parse(localStorage.getItem("room")) : "1",
      setRoom: this.setRoom,
      house: localStorage.getItem("house") !== null ? JSON.parse(localStorage.getItem("house")) : "Redernové",
      setHouse: this.setHouse,
      owner: localStorage.getItem("owner") !== null ? JSON.parse(localStorage.getItem("owner")) : "1",
      setOwner: this.setOwner,
      fontSize: localStorage.getItem("fontSize") !== null ? JSON.parse(localStorage.getItem("fontSize")) : "d",
      setFontSize: this.setFontSize,
      gallery_tour: localStorage.getItem("gallery_tour") !== null ? JSON.parse(localStorage.getItem("gallery_tour")) : "",
      setGalleryTour: this.setGalleryTour,
      image_name: localStorage.getItem("image_name") !== null ? JSON.parse(localStorage.getItem("image_name")) : "",
      setImageRecognitionName: this.setImageRecognitionName,
      image_img: localStorage.getItem("image_img") !== null ? JSON.parse(localStorage.getItem("image_img")) : "",
      setImageRecognitionImg: this.setImageRecognitionImg
    };
  }

  componentDidMount() {
    var fontSize = localStorage.getItem("fontSize") !== null ? JSON.parse(localStorage.getItem("fontSize")) : "d";
    this.setFontSize(fontSize);
    fetch("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80611.4856216651!2d14.978767699106092!3d50.84766716300532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47092e5555ec4efb%3A0xb81e27103a735e5c!2zWsOhbWVrIEZyw71kbGFudA!5e0!3m2!1scs!2scz!4v1659987294190!5m2!1scs!2scz")
    .then(console.log("fetched"));
  }


  render() {
    const rotate = new DataAPI().getRotateLabel(this.state.language);
    return (
      <>
        <span id="rotate_message" className="font-weight-primary text-medium">{rotate.rotate}</span>
        <div id="content">
          <BrowserRouter onUpdate={() => console.log("updated")}>
            <Context.Provider value={this.state}>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/room" element={<Room />} />
                <Route path="/history" element={<History />} />
                <Route path="/history_overview" element={<HistoryOverview />} />
                <Route path="/houses" element={<Houses />} />
                <Route path="/owners" element={<Owners />} />
                <Route path="/owner" element={<Owner />} />
                <Route path="/rooms_overview" element={<RoomsOverview />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/other" element={<Other />} />
                <Route path="/about_app" element={<AboutApp />} />
                <Route path="/where_to_next" element={<WhereToNext />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery_rooms" element={<GalleryRooms />} />
                <Route path="/scan_room" element={<QRScanner />} />
                <Route path="/image_recognition" element={<FaceRecognition/>}/>
              </Routes>
            </Context.Provider>
          </BrowserRouter>
        </div>
      </>
    )
  }

}

export default App;
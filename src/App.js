import React from 'react';
import * as faceapi from 'face-api.js';
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
import ScanRoom from './components/ScanRoom';
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
      this.setState({room: 0});
      localStorage.setItem("room", JSON.stringify(0));
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
      room: localStorage.getItem("room") !== null ? JSON.parse(localStorage.getItem("room")) : "0",
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

    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    Promise.all([
        faceapi.loadSsdMobilenetv1Model(MODEL_URL),
        faceapi.loadFaceLandmarkModel(MODEL_URL),
        faceapi.loadFaceRecognitionModel(MODEL_URL)
    ]).then(
        window.isModelsLoaded = true
    );
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
                <Route path="/scan_room" element={<ScanRoom />} />
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
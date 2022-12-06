import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom'
import './App.css';
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
import { Context } from './Context'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeLanguage = (e) => {
      this.setState({ language: e.target.value });
      localStorage.setItem("language", JSON.stringify(e.target.value));
    }

    this.changeHouse = (e) => {
      this.setState({ house: e });
      localStorage.setItem("house", JSON.stringify(e));
    }

    this.changeTour = (e) => {
      this.setState({ tour: e });
      localStorage.setItem("tour", JSON.stringify(e));
    }

    this.changeRoom = (e) => {
      this.setState({ room: e });
      localStorage.setItem("room", JSON.stringify(e));
    }

    this.changeOwner = (e) => {
      this.setState({ owner: e });
      localStorage.setItem("owner", JSON.stringify(e));
    }

    this.state = {
      language: localStorage.getItem("language") !== null ? JSON.parse(localStorage.getItem("language")) : "en",
      changeLanguage: this.changeLanguage,
      tour: localStorage.getItem("tour") !== null ? JSON.parse(localStorage.getItem("tour")) : "castle",
      changeTour: this.changeTour,
      room: localStorage.getItem("room") !== null ? JSON.parse(localStorage.getItem("room")) : "1",
      changeRoom: this.changeRoom,
      house: localStorage.getItem("house") !== null ? JSON.parse(localStorage.getItem("house")) : "Redernové",
      changeHouse: this.changeHouse,
      owner: localStorage.getItem("language") !== null ? JSON.parse(localStorage.getItem("owner")) : "1",
      changeOwner: this.changeOwner,
    };
  }

  render() {
    return (
      <HashRouter>
        <Context.Provider value={this.state}>
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
            <Route path="/rooms_overview" element={<RoomsOverview/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/other" element={<Other/>}/>
            <Route path="/about_app" element={<AboutApp/>}/>
          </Routes>
        </Context.Provider>
      </HashRouter>
    )
  }

}

export default App;

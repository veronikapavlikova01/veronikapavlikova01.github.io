import Info from './Info.json'

//trida slouzici pro tahani dat z jsonu
//jeji fce jsou volany z jednotlivych komponent, ona jim preda data

class DataAPI {

    //labels
    getLabels(language){
        const labels = Info.labels;
        for (let i=0; i<labels.length;i++){
            if(labels[i].language===language){
                return labels[i];
            }
        }
        return null;
    }

    //home
    getHome(language) {
        const homeLabel = Info.home;
        for (let i = 0; i < homeLabel.length; i++) {
            if (homeLabel[i].language === language) {
                return homeLabel[i];
            }
        }
        return null;
    }

    //tours
    getTours(language) {
        const tours = Info.tours;
        const resultTours = [];
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].language === language) {
                resultTours.push(tours[i]);
            }
        }
        return resultTours;
    }

    getTour(language, tour){
        const tours=Info.tours;
        for(let i=0;i<tours.length;i++){
            if(tours[i].language===language && tours[i].tour_id===tour){
                return tours[i];
            }
        }
        return null;
    }

    //rooms
    getRooms(language, tour) {
        const tours = Info.tours;
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].language === language && tours[i].tour_id === tour) {
                return tours[i].rooms;
            }
        }
        return null;
    }

    getRoom(language, tour, number) {
        let rooms = this.getRooms(language, tour);
        for(let i=0;i<rooms.length;i++){
            if(rooms[i].number===number){
                return rooms[i];
            }
        }
        return null;
    }

    //contact
    getContact(language) {
        const contact = Info.contact;
        for (let i = 0; i < contact.length; i++) {
            if (contact[i].language === language) {
                return contact[i];
            }
        }
        return null;
    }

    //navbar
    getNavbar(language) {
        const navbar = Info.navbar;
        for (let i = 0; i < navbar.length; i++) {
            if (navbar[i].language === language) {
                return navbar[i];
            }
        }
        return null;
    }

    //history
    //several methods for woring with history objects. Each objec has different requirements
    getHistory(language) {
        const history = Info.history;
        const historyCards = [];
        for (let i = 0; i < history.length; i++) {
            if (history[i].language === language) {
                historyCards.push(history[i]);
            }
        }
        return historyCards;
    }

    //history_overview
    getHistoryOverview(language) {
        const history = this.getHistory(language);
        for(let i=0;i<history.length;i++){
            if(history[i].path==="/history_overview"){
                return history[i];
            }
        }
        return null;
    }

    //houses
    getHouses(language) {
        const history = this.getHistory(language);
        const houses = [];
        for(let i=0;i<history.length;i++){
            if(history[i].path==="/houses"){
                return history[i].houses;
            }
        }
        return houses;
    }

    getHouse(language, house){
        const houses = this.getHouses(language);
        for(let i=0;i<houses.length;i++){
            if(houses[i].title===house){
                return houses[i];
            }
        }
        return null;
    }

    //owners
    getOwners(language, house) {
        let houses = this.getHouses(language);
        for(let i=0;i<houses.length;i++){
            if(houses[i].title===house){
                return houses[i].owners;
            }
        }
        return null;
    }

    //owner
    getOwner(language, house, number) {
        let owners = this.getOwners(language, house);
        for(let i=0;i<owners.length;i++){
            if(owners[i].number===number){
                return owners[i];
            }
        }
        return null;
    }

    //other
    getOther(language){
        const other = Info.other;
        for(let i=0;i<other.length;i++){
            if(other[i].language===language){
                return other[i];
            }
        }
        return null;
    }

    //about_app
    getAboutApp(language){
        const about=Info.about_app;
        for(let i=0;i<about.length;i++){
            if(about[i].language===language){
                return about[i];
            }
        }
        return null;
    }

    //rooms
    getRoomsOverview(language){
        const rooms = Info.rooms_overview;
        for(let i=0;i<rooms.length;i++){
            if(rooms[i].language===language){
                return rooms[i];
            }
        }
    }

    getVisitedRooms(language, tour, room){
        let rooms = this.getRooms(language,tour);
        const visited = [];
        for(let i=0;i<rooms.length;i++){
            if(rooms[i].number<=room){
                visited.push(rooms[i]);
            }
        }
        return visited;
    }

    getUnvisitedRooms(language, tour, room){
        let rooms = this.getRooms(language,tour);
        const unvisited = [];
        for(let i=0;i<rooms.length;i++){
            if(rooms[i].number>room){
                unvisited.push(rooms[i]);
            }
        }
        return unvisited;
    }
}

export default DataAPI;

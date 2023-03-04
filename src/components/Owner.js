import {React, useEffect} from "react"
import { Link } from "react-router-dom"
import { Context } from "../Context"
import { useContext} from "react"
import Header from "./Header"
import DataAPI from '../DataAPI'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrCode2Icon from '@mui/icons-material/QrCode2';


function prevOwnerExists(number){
    if((number-1)>=1){
        return true;
    }
    return false;
}
function nextOwnerExists(number, length){
    if((number+1)<=length){
        return true;
    }
    return false;
}

function previous(number, length, context){
    let newNumber = number-1;
    if(prevOwnerExists(number)){
        context.setOwner(newNumber);
    }
}

function next(number, length, context){
    let newNumber=number+1;
    if(nextOwnerExists(number,length)){
        context.setOwner(newNumber);
    }
}

function slide(x1, x2, y1, y2, number, length, context){
    if(x1>x2){
        next(number, length, context);
    } else if(x1<x2){
        previous(number, length, context);
    }
}

function Owner() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const owner = dataAPI.getOwner(context.language, context.house, context.owner);
    const house = dataAPI.getHouse(context.language, context.house);
    const isPrev = prevOwnerExists(owner.number);
    const isNext = nextOwnerExists(owner.number, house.owners.length);
    var x1 = 0;
    var y1 = 0;

    useEffect(()=>{
        window.scrollTo(0,0);
    })
    
    return (
        <>
            <Header header={context.house}/>
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary" onTouchStart={touchStartEvent => {x1 = touchStartEvent.setdTouches[0].clientX; y1=touchStartEvent.setdTouches[0].clientY}} onTouchEnd={touchEndEvent => {slide(x1, touchEndEvent.setdTouches[0].clientX, y1, touchEndEvent.setdTouches[0].clientY, owner.number, house.owners.length, context)}}>
                <article className="font-size-third medieval-first-letter">
                    <div className="flex-secondary">
                        <div className="margin-right-primary margin-left-primary">
                            <span className="font-style-primary margin-primary">{house.title}</span>
                            <h2>{owner.name}</h2>
                            <span className="font-style-primary margin-primary">{owner.years}</span>
                        </div>
                    </div>
                    <div className="margin-top-secondary">
                        <img src={require(`../img${owner.img}`)} alt="castle" className="page-image" />
                    </div>
                    <p className="start-text margin-top-secondary medieval-first-letter">{owner.text}</p>
                </article>
                <div className="flex-secondary stick-bottom padding-bottom-primary padding-top-primary background-gradient">
                    <div className={`flex round-item background-fourth margin-right-primary ${isPrev ? '' : ' visibility-hidden'}`}>
                        <ArrowBackIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { previous(owner.number, house.owners.length, context) }} />
                    </div>
                    <Link to="/scan" className="flex round-item background-fourth">
                        <QrCode2Icon className="round-item-content color-primary margin-top-third cursor-primary" />
                    </Link>
                    <div className={`flex round-item background-fourth margin-left-primary ${isNext ? '' : ' visibility-hidden'}`}>
                        <ArrowForwardIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { next(owner.number, house.owners.length, context) }} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Owner;




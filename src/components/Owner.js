import React from "react"
import { Context } from "../Context"
import { useContext} from "react"
import { Link } from 'react-router-dom'
import NavBar from "./NavBar"
import DataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'


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
        context.changeOwner(newNumber);
    }
}

function next(number, length, context){
    let newNumber=number+1;
    if(nextOwnerExists(number,length)){
        context.changeOwner(newNumber);
    }
}

function slide(x1, x2, number, length, context){
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

    return (
        <>
            <NavBar />
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary" onTouchStart={touchStartEvent => {x1 = touchStartEvent.changedTouches[0].clientX}} onTouchEnd={touchEndEvent => {slide(x1, touchEndEvent.changedTouches[0].clientX, owner.number, house.owners.length, context)}}>
                <article className="font-size-third medieval-first-letter">
                    <div className="flex-secondary">
                        <Link to="/owners">
                            <AiOutlineArrowLeft className="icon" />
                        </Link>
                        <div className="margin-right-primary margin-left-primary">
                            <span className="font-style-primary margin-primary">{house.title}</span>
                            <h2>{owner.name}</h2>
                            <span className="font-style-primary margin-primary">xxx-xxx</span>
                        </div>
                        <AiOutlineArrowRight className="icon visibility-hidden" />
                    </div>
                    <img src={castle} alt="castle margin-top-secondary" className="page-image" />
                    <p className="start-text margin-top-secondary">{owner.text}</p>
                    <div className="flex-secondary">
                        <BsFillArrowLeftCircleFill className={`icon margin-right-primary margin-top-third cursor-primary () ${isPrev? '' : ' visibility-hidden'}`} onClick={() => {previous(owner.number, house.owners.length, context)}}></BsFillArrowLeftCircleFill>
                        <BsFillArrowRightCircleFill className={`icon margin-left-primary margin-top-third cursor-primary () ${isNext? '' : ' visibility-hidden'}`} onClick={() => {next(owner.number, house.owners.length, context)}}></BsFillArrowRightCircleFill>
                    </div>
                </article>
            </div>
        </>
    )

}

export default Owner;




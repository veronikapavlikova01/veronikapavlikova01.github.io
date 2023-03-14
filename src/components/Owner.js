import {React, useEffect} from "react"
import { Link } from "react-router-dom"
import { Context } from "../Context"
import { useContext} from "react"
import Header from "./Header"
import DataAPI from '../DataAPI'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleContent from "./content_components/ArticleContent"

function Owner() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const owner = dataAPI.getOwner(context.language, context.house, context.owner);
    const house = dataAPI.getHouse(context.language, context.house);
    const isPrev = (owner.number-1)>=1? true : false;
    const isNext = (owner.number+1)<=house.owners.length? true: false;
    var x1 = 0;
    var y1 = 0;
    
    const previous = () => {
        if((owner.number-1)>=1){
            context.setOwner(owner.number-1);
        }
    }
    
    const next = () => {
        if((owner.number+1)<=house.owners.length){
            context.setOwner(owner.number+1);
        }
    }
    
    const slide = (x1, x2, y1, y2) => {
        let distance = 100;
        if (Math.abs(y1 - y2) < 50) {
            if (x1 > (x2 + distance)) {
                next();
            } else if ((x1 + distance) < x2) {
                previous();
            }
        }
    }

    useEffect(()=>{
        window.scrollTo(0,0);
    })
    
    return (
        <>
            <Header header={context.house}/>
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary" onTouchStart={touchStartEvent => { x1 = touchStartEvent.setdTouches[0].clientX; y1 = touchStartEvent.setdTouches[0].clientY }} onTouchEnd={touchEndEvent => { slide(x1, touchEndEvent.setdTouches[0].clientX, y1, touchEndEvent.setdTouches[0].clientY) }}>
                <ArticleContent first_label={house.title} title={owner.name} second_label={owner.years} img={owner.img} description={owner.text}/>
                <div className="flex-secondary stick-bottom padding-bottom-primary padding-top-primary background-gradient">
                    <div className={`flex round-item background-fourth margin-right-primary ${isPrev ? '' : ' visibility-hidden'}`}>
                        <ArrowBackIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { previous() }} />
                    </div>
                    <div className={`flex round-item background-fourth margin-left-primary ${isNext ? '' : ' visibility-hidden'}`}>
                        <ArrowForwardIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { next() }} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Owner;
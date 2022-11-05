import React from "react"
import { Context } from "../Context"
import { useContext, useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import NavBar from "./NavBar"
import DataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'




function Owner() {
    const context = useContext(Context);
    const [owner, setOwner] = useState([]);

    useEffect(() => {
        const owner = new DataAPI().getOwner(context.language, context.house, context.owner);
        setOwner(owner);
        console.log(owner);
    }, [context.language, context.house, context.owner]);


    return (
        <>
            <NavBar />
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary">
                <article className="font-size-third medieval-first-letter">
                    <Link to="/owners">
                        <AiOutlineArrowLeft className="icon" />
                    </Link>
                    <span className="font-style-primary margin-primary">{context.house}</span>
                    <h2>{owner.name}</h2>
                    <span className="font-style-primary margin-primary">xxxx-xxxx</span>
                    <img src={castle} alt="castle margin-top-secondary" className="page-image" />
                    <p className="start-text margin-top-secondary">{owner.text}</p>
                    <div className="flex-secondary">
                        <BsFillArrowLeftCircleFill className="icon margin-right-primary  margin-top-third"></BsFillArrowLeftCircleFill>
                        <BsFillArrowRightCircleFill className="icon margin-left-primary  margin-top-third"></BsFillArrowRightCircleFill>
                    </div>
                </article>
            </div>
        </>
    )

}

export default Owner;




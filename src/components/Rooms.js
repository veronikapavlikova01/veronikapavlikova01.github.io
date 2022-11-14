import React from "react";
import { Context } from "../Context";
import { Link } from 'react-router-dom';
import { useContext} from "react";
import Header from "./Header";
import DataAPI from '../DataAPI'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'


function Rooms() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const rooms = dataAPI.getRooms(context.language, context.tour);
    const labels = dataAPI.getLabels(context.language);

    return (
        <>
            <Header />
            <div className="margin-primary content-container">
                <div className="flex-secondary margin-bottom-primary align-items-primary">
                    <Link to="/tours" className="flex-secondary align-items-primary">
                        <AiOutlineArrowLeft className="icon" />
                    </Link>
                    <h2 className="margin-right-primary margin-left-primary">{labels.rooms}</h2>
                    <AiOutlineArrowRight className="icon visibility-hidden" />
                </div>
                <div className="grid">
                    {
                        rooms.map((item) => (
                            <Link to="/room" className="card box-shadow" key={item.number}>
                                <article className="flex text-medium" onClick={() => context.changeRoom(item.number)}>
                                    <img src={require(`../img${item.img}`)} alt="castle" className="card-image" />
                                    <h3 className="padding-primary card-title flex-secondary"><span className="card-title-number">{item.number}.</span><span className="align-self-primary">{item.title}</span></h3>
                                    <p className="margin-bottom padding-primary medieval-first-letter">Malé hradní nádvoří seznámí návštěvníka s architekturou starého hradu.</p>
                                    <div className="center-text">
                                        <button className="button align-self-primary margin-primary text-medium background-primary font-weight-primary color-primary">Navštívit</button>
                                    </div>
                                </article>
                            </Link>
                        )
                        )
                    }
                </div>
            </div>
        </>
    )

}

export default Rooms;




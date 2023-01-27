import React from "react";
import { Context } from "../Context";
import { Link } from 'react-router-dom';
import { useContext} from "react";
import Header from "./Header";
import DataAPI from '../DataAPI'
import InfoIcon from '@mui/icons-material/Info';


function Rooms() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const rooms = dataAPI.getRooms(context.language, context.tour);
    const labels = dataAPI.getLabels(context.language);
    const tour = dataAPI.getTour(context.language, context.tour);

    return (
        <>
            <Header header={tour.title} />
            <div className="content-container">
            <div className="card box-shadow transition-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <InfoIcon className="icon margin-right-secondary" />
                        <span>{labels.rooms_label}</span>
                    </div>
                </div>
                <div className="grid">
                    {
                        rooms.map((item) => (
                            <Link to="/room" className="card box-shadow transition-primary hover-primary" key={item.number} onClick={() => context.changeRoom(item.number)}>
                                <article className="flex">
                                    <div className="padding-bottom-primary position-relative">
                                        <img src={require(`../img${item.img}`)} alt="castle" className="card-image border-radius-secondary" />
                                        <div className="card-number flex round-item">
                                            <span className="round-item-content">{item.number}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-medium padding-primary card-title flex-secondary">{item.title}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter">Malé hradní nádvoří seznámí návštěvníka s architekturou starého hradu.</p>
                                    <div className="center-text margin-primary ">
                                        <button className="text-medium button align-self-primary background-primary font-weight-primary color-primary">{item.button}</button>
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




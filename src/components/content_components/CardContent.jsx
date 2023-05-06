import React from 'react';

function CardContent(props) {
    return (
        <>
            <div className="padding-bottom-primary position-relative flex">
                <img src={require(`../../img${props.img}`)} alt="castle" className="card-image border-radius-secondary" />
                {props.children}
            </div>
            <h2 className="text-medium padding-primary padding-bottom-primary">{props.title}</h2>
            <p className="margin-bottom padding-primary medieval-first-letter padding-bottom-primary">{props.description}</p>
        </>
    )
}

export default CardContent;
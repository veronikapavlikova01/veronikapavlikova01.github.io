import { React } from 'react';

function ArticleContent(props) {
    return (
        <article className="font-size-third ">
            <div className="flex-secondary">
                <div className="margin-right-primary margin-left-primary">
                    <span className="font-style-primary margin-primary">{props.first_label}</span>
                    <h2>{props.title}</h2>
                    <span className="font-style-primary margin-primary">{props.second_label}</span>
                </div>
            </div>
            <div className="margin-top-secondary">
                <img src={require(`../../img${props.img}`)} alt="castle" className="page-image" />
                <audio controls src="/src/mp3/nachod.mp3" className={props.audio? "page-audio" : "display-none"}> Your browser does not support the audio element.</audio>
            </div>
            <p className="start-text margin-top-secondary medieval-first-letter">{props.description}</p>
        </article>
    )
}

export default ArticleContent;
import React from "react"
import { useEffect, useState } from "react"
import { Context } from "../Context"
import { useContext } from "react"
import { Link } from "react-router-dom"
import Header from "./Header"
import DataAPI from '../DataAPI'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import icon64 from '../img/icons/icon-64.png'
import icon128 from '../img/icons/icon-128.png'


function Room() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const room = dataAPI.getRoom(context.language, context.tour, context.room);
    const tour = dataAPI.getTour(context.language, context.tour);
    const isPrev = (room.number - 1) >= 1 ? true : false;
    const isNext = (room.number + 1) <= tour.rooms.length ? true : false
    const [isPlaying, setIsPlaying] = useState(false);
    var x1 = 0;
    var y1 = 0;

    const previous = () => {
        if (isPrev) {
            context.setRoom(room.number - 1);
        }
    }

    const next = () => {
        if (isNext) {
            context.setRoom(room.number + 1);
        }
    }

    const slide = (x1, x2, y1, y2) => {
        console.log("sliding");
        let distance = 100;
        if (Math.abs(y1 - y2) < 50) {
            if (x1 > (x2 + distance)) {
                next();
            } else if ((x1 + distance) < x2) {
                previous();
            }
        }
    }


    //https://developer.mozilla.org/en-US/docs/Web/API/MediaSession
    function updatePositionState() {
        let audio = document.getElementById('audio');
        navigator.mediaSession.setPositionState({
          duration: audio.duration,
          playbackRate: audio.playbackRate,
          position: audio.currentTime,
        });
      }


    useEffect(() => {
        window.scrollTo(0, 0);
        let title = dataAPI.getRoom(context.language, context.tour, context.room).title.toString();
        let tour = dataAPI.getTour(context.language, context.tour).title.toString();

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title,
                artist: "Audio guide Frýdlant",
                album: tour,
                artwork: [
                    {
                        src: icon64,
                        sizes: "64x64",
                        type: "image/png",
                    },
                    {
                        src: icon128,
                        sizes: "128x128",
                        type: "image/png",
                    },
                ],
            });

            const actionsAndHandlers = [
                ['play', () => { audio.play() }],
                ['pause', () => { audio.pause() }],
                ['previoustrack', () => { setIsPlaying(true); previous() }],
                ['nexttrack', () => { setIsPlaying(true); next() }],
                ['seekto', (evt) => {

                    if (evt.fastSeek && 'fastSeek' in audio) {
                        audio.fastSeek(evt.seekTime);
                        return;
                    }
                    audio.currentTime = evt.seekTime;

                    console.log(evt);
                }],
            ]

            for (const [action, handler] of actionsAndHandlers) {
                try {
                    navigator.mediaSession.setActionHandler(action, handler);
                } catch (error) {
                    console.log(`The media session action, ${action}, is not supported`);
                }
            }

            let audio = document.getElementById('audio');

            audio.onloadedmetadata = () => {
                updatePositionState()
            }

            audio.onseeked = () => {
                updatePositionState()
            }
    
            if (isPlaying) {
                audio.play();
            }

            setIsPlaying(false);
        }

    }, [context.room]);

    return (
        <>
            <Header header={tour.title} />
            <div className="flex content-container background-secondary center-text padding-secondary border-radius-primary box-shadow" onTouchStart={touchStartEvent => { x1 = touchStartEvent.changedTouches[0].clientX; y1 = touchStartEvent.changedTouches[0].clientY }} onTouchEnd={touchEndEvent => { slide(x1, touchEndEvent.changedTouches[0].clientX, y1, touchEndEvent.changedTouches[0].clientY) }}>
                <article>
                    <div className="flex-secondary">
                        <div className="margin-right-primary margin-left-primary">
                            <span className="font-style-primary margin-primary">{room.number}</span>
                            <h2 className="text-medium">{room.title}</h2>
                            <span className="font-style-primary margin-primary">{tour.title}</span>
                        </div>
                    </div>
                    <div className="margin-top-secondary">
                        <img src={require(`../img${room.img}`)} alt="castle" className="page-image" />
                        <audio preload="metadata" id="audio" controls src={require(`../audio${room.audio}`)} className="page-audio"> Your browser does not support the audio element.</audio>
                    </div>
                    <p className="start-text margin-top-secondary medieval-first-letter">{room.text}</p>
                </article>
                <div className="flex-secondary stick-bottom padding-bottom-primary padding-top-primary background-gradient">
                    <div className={`flex round-item background-fourth margin-right-primary ${isPrev ? '' : ' visibility-hidden'}`}>
                        <ArrowBackIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { previous() }} />
                    </div>
                    <Link to="/scan_room" className="flex round-item background-fourth">
                        <QrCode2Icon className="round-item-content color-primary margin-top-third cursor-primary" />
                    </Link>
                    <div className={`flex round-item background-fourth margin-left-primary ${isNext ? '' : ' visibility-hidden'}`}>
                        <ArrowForwardIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { next() }} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Room;
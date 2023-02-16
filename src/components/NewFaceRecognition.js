import castle from '../img/uvod.jpg'
import { useEffect } from 'react';
import {tracking, dat} from 'tracking';


function NewFaceRecognition() {

    useEffect(()=>{
        window.scrollTo(0,0);

        window.onload = () =>{
            var width = 393;
            var height = 295;
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
    
            var image1 = document.getElementById('image1');
            var image2 = document.getElementById('image2');
    
            context.drawImage(image1, 0, 0, width, height);
            context.drawImage(image2, width, 0, width, height);
        }

        console.log("useeffect")
    })

    return (
        <>
        
            <h1>Testing Feature Description</h1>
            <div class="demo-title">
                <p><a href="http://trackingjs.com" target="_parent">tracking.js</a> － match similar feature points in two images</p>
            </div>

            <div class="demo-frame">
                <div class="demo-container">
                    <img id="image1" src={castle} />
                    <img id="image2" src={castle} />
                    <canvas id="canvas" width="786" height="295"></canvas>
                </div>
            </div>
        </>
    )
}
export default NewFaceRecognition;
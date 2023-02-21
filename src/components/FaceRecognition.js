import * as faceapi from 'face-api.js';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {
    const [loaded, setLoaded] = useState(false);
    const videoRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const videoHeight = 480;
    const videoWidth = 640;

    useEffect(() => {
        //playVideo();

        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        let img = null;
        let fullFaceDescriptions = null;
        let canvas = null;

        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]).then(
            setLoaded(true)
        );

    }, []);

    const playVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(str => {
                let video = videoRef.current;
                video.srcObject = str;
                video.play();
            })
            .catch(err => {
                console.log("Cannot get video");
            });
    }


    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (true) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight
                }

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();

                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

                const labels = ['verunka', 'misanek']

                const labeledFaceDescriptors = await Promise.all(
                    labels.map(async label => {
                        const img = document.createElement('img');
                        img.src = require(`../img/owners/${label}.jpg`);

                        const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

                        if (!fullFaceDescription) {
                        }

                        const faceDescriptors = [fullFaceDescription.descriptor];
                        return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
                    })
                );


                const maxDescriptorDistance = 0.6
                const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)


                const results = detections.map(fd => faceMatcher.findBestMatch(fd.descriptor))

                results.forEach((bestMatch, i) => {
                    const box = detections[i].detection.box
                    const text = bestMatch.toString()
                    const drawBox = new faceapi.draw.DrawBox(box, { label: text })
                    drawBox.draw(canvasRef.current)
                })

            }
        }, 100)
    }

    const handleImg = async () => {
        if (loaded) {
            console.log("handling image");
            const img = document.getElementById('test')

            canvasRef.current.innerHTML = faceapi.createCanvas(img);

            let fullFaceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
            //const canvas = document.getElementById('canvas')
            faceapi.matchDimensions(canvasRef.current, img)

            fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions, img)

            faceapi.draw.drawDetections(canvasRef.current, fullFaceDescriptions)
            faceapi.draw.drawFaceLandmarks(canvasRef.current, fullFaceDescriptions)

            const labels = ['albrecht_valdstejn', 'antonin_pankrac_gallas', 'eduard_clamgallas', 'filip_josef_gallas', 'frantisek_ferdinand_gallas', 'jan_vaclav_gallas', 'katerina_redern', 'kristian_filip_clamgallas', 'kristian_krystof_clamgallas', 'matyas_gallas', 'melchior_redern', 'vilem_clamgallas']

            const labeledFaceDescriptors = await Promise.all(
                labels.map(async label => {
                    // fetch image data from urls and convert blob to HTMLImage element
                    const imgUrl = require(`../img/owners/${label}.jpg`);
                    const img = document.createElement('img');
                    img.src = imgUrl;
    
                    // detect the face with the highest score in the image and compute it's landmarks and face descriptor
                    const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    
                    if (!fullFaceDescription) {
                        throw new Error(`no faces detected for ${label}`)
                    }
    
                    const faceDescriptors = [fullFaceDescription.descriptor]
                    return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
                })
            ).catch(err => {
                console.log("Not able to recognize any faces!");
            });
    
    
            const maxDescriptorDistance = 0.6
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)
    
            const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))
    
            results.forEach((bestMatch, i) => {
                const box = fullFaceDescriptions[i].detection.box
                const text = bestMatch.toString()
                const drawBox = new faceapi.draw.DrawBox(box, { label: text })
                drawBox.draw(canvasRef.current)
            })
            

            console.log("done testing!");
        }
    }



    return (
        <div>
            <img id="test" src={require(`../img/owners/filip_josef_gallas.jpg`)} className="full-screen-image" />
            <button className="button" onClick={() => handleImg()}>Click me!!</button>
            <canvas id="canvas" ref={canvasRef} height="800" width="600" />
        </div>
    );
}

export default App;
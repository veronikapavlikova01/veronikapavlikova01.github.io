import React from 'react'
import katharina from '../img/people/small/katharina_redern.jpg'

require('tracking')
require('tracking/build/data/face')

export default class Camera extends React.Component {
    state = {}

    tracker = null

    componentDidMount() {
        window.onload = function() {
            var width = 393;
            var height = 295;
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
        
            var image1 = document.getElementById('image1');
            var image2 = document.getElementById('image2');
        
            window.descriptorLength = 256;
            window.matchesShown = 30;
            window.blurRadius = 3;
        
            var doMatch = function() {
              window.tracking.Brief.N = window.descriptorLength;
        
              context.drawImage(image1, 0, 0, width, height);
              context.drawImage(image2, width, 0, width, height);
          
              var imageData1 = context.getImageData(0, 0, width, height);
              var imageData2 = context.getImageData(width, 0, width, height);
          
              var gray1 = window.tracking.Image.grayscale(window.tracking.Image.blur(imageData1.data, width, height, window.blurRadius), width, height);
              var gray2 = window.tracking.Image.grayscale(window.tracking.Image.blur(imageData2.data, width, height, window.blurRadius), width, height);
          
              var corners1 = window.tracking.Fast.findCorners(gray1, width, height);
              var corners2 = window.tracking.Fast.findCorners(gray2, width, height);
          
              var descriptors1 = window.tracking.Brief.getDescriptors(gray1, width, corners1);
              var descriptors2 = window.tracking.Brief.getDescriptors(gray2, width, corners2);
          
              var matches = window.tracking.Brief.reciprocalMatch(corners1, descriptors1, corners2, descriptors2);
        
              matches.sort(function(a, b) {
                return b.confidence - a.confidence;
              });
          
              for (var i = 0; i < Math.min(window.matchesShown, matches.length); i++) {
                var color = '#' + Math.floor(Math.random()*16777215).toString(16);
                context.fillStyle = color;
                context.strokeStyle = color;
                context.fillRect(matches[i].keypoint1[0], matches[i].keypoint1[1], 4, 4);
                context.fillRect(matches[i].keypoint2[0] + width, matches[i].keypoint2[1], 4, 4);
        
                context.beginPath();
                context.moveTo(matches[i].keypoint1[0], matches[i].keypoint1[1]);
                context.lineTo(matches[i].keypoint2[0] + width, matches[i].keypoint2[1]);
                context.stroke();
        
              }
            };
        
            doMatch();
        
            var gui = new window.tracking.dat.GUI();
            gui.add(window, 'descriptorLength', 128, 512).step(32).onChange(doMatch);
            gui.add(window, 'matchesShown', 1, 100).onChange(doMatch);
            gui.add(window, 'blurRadius', 1.1, 5).onChange(doMatch);
          }
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <>
                <h1>Playing with window.tracking.js</h1>

                <div className="demo-frame">
                    <div className="demo-container">
                        <img id="image1" src={katharina} className="image"/>
                        <img id="image2" src={katharina} className="image"/>
                        <canvas id="canvas" width="786" height="295" className="canvas"></canvas>
                    </div>
                </div>
            </>
        )
    }
}
import { useState, useContext } from "react";
import {useNavigate} from "react-router-dom";
import { useZxing } from "react-zxing";
import { Context } from "../Context"

function QRScanner() {
  const [result, setResult] = useState("");
  const context = useContext(Context);
  const navigate = useNavigate();
  const { ref } = useZxing({
    onResult(rslt) {
      setResult(rslt.getText());
      console.log(result);
      splitScannedText();
    },
  });

  function splitScannedText(){
    var tourAndRoom = result.split("\n");
    var tour = tourAndRoom[0].split(":");
    var tourId = tour[1];
    console.log(tourId);

    var room = tourAndRoom[1].split(":");
    var roomId = room[1];
    console.log(roomId);

    redirectToRoom(tourId,roomId);
  }

  function redirectToRoom(tour, room){
    if(tour && room){
        var roomNumber = parseInt(room);
        context.changeTour(tour);
        context.changeRoom(roomNumber);
        navigate("/room");
    }
  }

  return (
    <>
      <video ref={ref} className="full-screen"/>
    </>
  );
}

export default QRScanner;
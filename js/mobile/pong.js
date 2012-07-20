/* Partie phonegap*/

// Wait for PhoneGap to connect with the device
//
var DocReady = false;
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.CAMERA;
    destinationType=navigator.camera.DestinationType;
}


function vibrer(){
  if(DocReady){
    navigator.notification.vibrate(500);
  }
}


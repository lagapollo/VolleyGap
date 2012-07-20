/* Partie phonegap*/

// Wait for PhoneGap to connect with the device
//
var DocReady = false;
var depla;
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
        lancerAccelerometre();
        depla = new deplacement();
}

function vibrer(){
  if(DocReady){
    navigator.notification.vibrate(500);
  }
}


function lancerAccelerometre(){
    var watchID = navigator.accelerometer.watchAcceleration(
        function(acceleration){
            console.log("votre acceleration en y : " + acceleration.y)
            if (acceleration.y < 0.3){
                
                depla.keycode = 37;
                // Envoi à gauche
                checkDepla(depla);
            }
            else{
                if (acceleration.y > 0.7){
                    depla.keycode = 39
                    checkDepla(depla);
                }
            }'
        }), 
        onError, options);
}


var deplacement = function(){
    keycode = 0;
}
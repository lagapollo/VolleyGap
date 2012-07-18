window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

	
    var ASSET_MANAGER = new AssetManager();
	var game;
function chargerCanvas(){ 
		var canvas = document.getElementById("surface");
	if (!canvas.getContext) {
        alert('Error: no canvas.getContext!');
        return;
    }


	var ctx = canvas.getContext('2d');
	 if (!ctx) {
        alert('Error: failed to getContext!');
        return;
    }


    ASSET_MANAGER.queueDownload('images/chromium-logo.png');
	//ASSET_MANAGER.queueDownload('images/earth.png');
	//ASSET_MANAGER.queueDownload('images/Barre.png');

	ASSET_MANAGER.downloadAll(function(){
		var x = 0, y=0;
		// Creation de la game
		game = new EvilAliens();
		game.init(ctx);
		game.start();
	});


}

function rejouer(){
	var canvas = document.getElementById("surface");
	var ctx = canvas.getContext('2d');
	game = new EvilAliens();
	game.init(ctx);
	game.start();
}

function Alien(game, radial_distance, angle) {
    Entity.call(this, game);
    this.radial_distance = radial_distance;
    this.angle = angle;
    this.speed = 3;
    this.sprite = ASSET_MANAGER.getAsset('images/chromium-logo.png');
    this.radius = this.sprite.height/2;
    this.setCoordsInit();
    //console.log("radial_distance : " + radial_distance + " \nangle : " + angle);
    //console.log("je suis un nouvel alien  a: x=" + this.x + " ,y=" +  this.y);

}

Alien.prototype = new Entity();
Alien.prototype.constructor = Alien;

Alien.prototype.setCoordsInit = function() {
	this.x=0;
	this.y=0;
}

 remove=function(){
   if(arguments[1]>0){
     var _temp=arguments[0].splice(0,arguments[1]);
     arguments[0].shift();
     arguments[0].unshift(_temp);
   }
   else{
     arguments[0].shift();
   }
 };

Alien.prototype.setCoords = function() {

	//console.log("descend angle : " + this.angle);
	this.x += this.speed * (Math.cos(this.angle));
	this.y += this.speed * (Math.sin(this.angle));
	if(this.y <  (-(document.getElementById("surface").height/2) + 24)) {
		//console.log("top");
		this.x += this.speed * (Math.cos(this.angle));
		this.y += this.speed * (Math.sin(this.angle));
		this.angle = (2*Math.PI - this.angle) % (2*Math.PI);
		this.x += this.speed * (Math.cos(this.angle));
		this.y += this.speed * (Math.sin(this.angle));
		this.monter = false;
		
	}
	else if(this.y > ((document.getElementById("surface").height/2)-24)) {
		//console.log("bottom");
		this.x += this.speed * (Math.cos(this.angle));
		this.y += this.speed * (Math.sin(this.angle));
		this.angle = (2*Math.PI - this.angle) % (2*Math.PI);
		this.x += this.speed * (Math.cos(this.angle));
		this.y += this.speed * (Math.sin(this.angle));
		this.monter = true;
	}
	
	//console.log("y = " + this.y);
	/*if((this.x <= (game.barreLeft.x + 20 + 24)) && (this.x >= (game.barreLeft.x + 20 + 24 - 20)) && ((this.y + 48 - 24) >= game.barreLeft.y) && ((this.y - 24) <= (game.barreLeft.y + 100))){
		this.angle = Math.PI - this.angle;
		//this.x += this.speed * (Math.cos(this.angle));
		//this.y += this.speed * (Math.sin(this.angle));
	}
	else if((this.x >= (game.barreRight.x - 24)) && (this.x <= (game.barreRight.x - 24 + 20)) && ((this.y + 48 - 24) >= game.barreRight.y) && ((this.y - 24) <= (game.barreRight.y + 100))){
		this.angle = Math.PI - this.angle;
		//this.x += this.speed * (Math.cos(this.angle));
		//this.y += this.speed * (Math.sin(this.angle));
	}
	else if(this.x < game.barreLeft.x + 24) {
		game.vainqueur = 2;
		drawFinPartie(2);
		//alert("Le joueur 2 a gagne");
		//console.log(game.entities.length);
		this.removeFromWorld = true;

	}
	else if(this.x > game.barreRight.x - 24 + 20) {
		game.vainqueur = 1;
		drawFinPartie(1);
		//alert("Le joueur 1 a gagne");
		//console.log(game.entities.length);
		this.removeFromWorld = true;
		
	
	}*/

}

function drawFinPartie(number)
{
	game.looping = false;
	game.ctx.strokeStyle = "rgb(255,255,255)";
	game.ctx.strokeRect (document.getElementById("surface").width/3, document.getElementById("surface").height/3, document.getElementById("surface").width/3, document.getElementById("surface").height/3);
	game.ctx.font = "bold 35px sans-serif";
	game.ctx.fillStyle = "rgb(255,255,255)";
	game.ctx.fillText("Le joueur " + number + " a gagné", (document.getElementById("surface").width/3) + 10, (document.getElementById("surface").height/3) + 120);
	
}


Alien.prototype.update = function(){

	  this.setCoords();

	Entity.prototype.update.call(this);
}

Alien.prototype.draw = function(ctx){
	this.drawSpriteCentered(ctx);
	Entity.prototype.draw.call(this, ctx);
}



function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function() {
}

Entity.prototype.draw = function(ctx) {
    if (this.game.showOutlines && this.radius) {        
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
    }
}

Entity.prototype.drawSpriteCentered = function(ctx) {
    if (this.sprite && this.x && this.y) {
        var x = this.x - this.sprite.width/2;
        var y = this.y - this.sprite.height/2;
        ctx.drawImage(this.sprite, x, y);
    }
}

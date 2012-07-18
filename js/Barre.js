/*function Barre(game, joueur) {
	console.log("Je suis dans le constructeur de barre");
    this.setCoordsBarreInit(joueur);
	Entity.call(this, game,this.x , this.y);
    this.sprite = ASSET_MANAGER.getAsset('images/Barre.png');
	
}
Barre.prototype = new Entity();
Barre.prototype.constructor = Barre;

Barre.prototype.setCoordsBarre = function(){
	
}

Barre.prototype.update = function(){

	  this.setCoordsBarre();

	Entity.prototype.update.call(this);
}

Barre.prototype.draw = function(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
}

Barre.prototype.setCoordsBarreInit = function(joueur) {
	console.log("je suis avant le if");
	console.log("joueur=" + joueur);
	if(joueur == 1){	
		this.x=-(document.getElementById("surface").width/2);
		this.y=-50;
		console.log("x=" + this.x + " ,y=" + this.y);
	}
	else if(joueur == 2){
		this.x=(document.getElementById("surface").width/2) - 20;
		this.y=-50;
		console.log("x=" + this.x + " ,y=" + this.y);
	}
		
}

Barre.prototype.monter = function(){
	if(this.y <= (-(document.getElementById("surface").height/2))){
		this.y = -(document.getElementById("surface").height/2);
	}
	else{
		this.y = this.y - 25;
	}
	
}

Barre.prototype.descendre = function(){
	if((this.y + 100) >= ((document.getElementById("surface").height/2))){
		this.y = (document.getElementById("surface").height/2) - 100;
	}
	else{
		this.y = this.y + 25;
	}
}*/
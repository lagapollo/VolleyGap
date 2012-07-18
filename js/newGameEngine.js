function GameEngine(){
	this.entities = [];
	this.ctx = null;
	this.lastUpdateTimestamp = null;
	this.deltaTime = null;
	this.firstBall=true;
	// Code source correction
	this.surfaceWidth=null;
	this.surfaceHeight=null;
	this.halfSurfaceWidth = null;
	this.halfSurfaceHeight = null;
	this.vainqueur = -1;
	this.looping = true;
	console.log("function gameEngine()");
}


GameEngine.prototype.init = function(ctx) {
	vainqueur = -1;
    console.log('game initialized');
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.halfSurfaceWidth = this.surfaceWidth/2;
    this.halfSurfaceHeight = this.surfaceHeight/2;
}
GameEngine.prototype.draw = function(callback){
	// loop through all entities, call draw()
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.ctx.canvas.width/2, this.ctx.canvas.height/2);
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    if (callback) {
        callback(this);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function(){
	 var entitiesCount = this.entities.length;
    
    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];
        
        if (!entity.removeFromWorld) {
            entity.update();
        }
    }
    
    for (var i = this.entities.length-1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
	// loop through all entities, call update();
}

GameEngine.prototype.loop = function(){  
	//console.log("je suis dans le loop");
	var now = Date.now();
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.update();
	this.draw();
	this.lastUpdateTimestamp = now;
}

GameEngine.prototype.start = function(){

	console.log("starting game");
	this.lastUpdateTimetamp = Date.now();
	var that = this;
	(function gameLoop(){ 
		if(that.looping == true){
			that.loop();
			requestAnimFrame(gameLoop, that.ctx.canvas);
		}
		else{
			drawFinPartie(that.vainqueur);
		}
	})();
}

gameEngine.prototype.addEntity = function(entity) {
    this.entities.push(entity);
}



function EvilAliens() {
	console.log("function EvilAliens");
    GameEngine.call(this);

}
EvilAliens.prototype = new GameEngine();
EvilAliens.prototype.constructor = EvilAliens;
EvilAliens.prototype.start = function() {
	console.log("EvilAliens.start() : debut");
  	this.earth = new Earth(this);	
    this.addEntity(this.earth);
	/*this.barreLeft=new Barre(this, 1);
	this.addEntity(this.barreLeft);
	this.barreRight=new Barre(this, 2);
	this.addEntity(this.barreRight);*/
    GameEngine.prototype.start.call(this);
}

EvilAliens.prototype.update = function() {    
    if (this.lastAlienAddedAt == null || (this.lastUpdateTimestamp - this.lastAlienAddedAt) > 1000) {
        console.log("coucou 3 !");
		if(this.firstBall == true){
			// SLE : A remettre !
			this.addEntity(new Alien(this, this.ctx.canvas.width/4, Math.random() * Math.PI * 180));
			
			this.firstBall = false;
		}
        this.lastAlienAddedAt = this.lastUpdateTimestamp;
    }
    
    GameEngine.prototype.update.call(this);
}

EvilAliens.prototype.draw = function() {
    GameEngine.prototype.draw.call(this);
}


function Earth(game) {
	console.log("Eath  : debut , game : " + game);
    Entity.call(this, game, 0, 0);
    this.sprite = ASSET_MANAGER.getAsset('images/earth.png');
}
Earth.prototype = new Entity();
Earth.prototype.constructor = Earth;

Earth.RADIUS = 67;

Earth.prototype.draw = function(ctx) {
	console.log("Draw EArth()");
    ctx.drawImage(this.sprite, this.x - this.sprite.width/2, this.y - this.sprite.height/2);
}

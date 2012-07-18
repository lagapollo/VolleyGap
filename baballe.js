var html = require('fs', true).readFileSync(__dirname+'/pong.html');
var htmlMob = require('fs', true).readFileSync(__dirname+'/mobile.html');

var express = require('express', true );  
  
// Création du serveur, page par defait, port
var app = express.createServer();  
app.configure(function(){  
  app.use(express.static(__dirname + '/'));  
});  
app.get('/', function(req, res, next){   
    res.end(html);
});  
app.get('/mobile', function(req, res, next){  
  res.end(htmlMob);
});
app.listen(8080);  



var nowjs = require("now");
var everyone = nowjs.initialize(app);

var salleDeJeu;
var joueurGauche, joueurDroite;
everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};

everyone.now.setSalle = function(toto){
  console.log("Nouvelle salle : " + this);
	salleDeJeu = this;
};

everyone.now.direction = function(dir, joueur){
  console.log("direction : " + dir + "pour le joueur : " + joueur);
  salleDeJeu.now.changerDirection(dir, joueur);
};

everyone.now.setJoueur=function(){
  console.log("SetJOueur: debut");
  if (!joueurGauche){
      joueurGauche = this;
      //this.now.setPosition("Gauche");
      console.log("joueur gauche OK : " + joueurGauche);
  }
  else{
    if (!joueurDroite){
      joueurDroite = this;
      //this.now.setPosition("Droite");
      console.log("joueur Droite ok : " + joueurDroite);
      joueurGauche.now.afficherLancer();
    }
  }
};

everyone.now.envoiBalle = function(x,y){
      if (this == joueurGauche)
        joueurGauche.now.recevoirBalle(x,y);
      else
         joueurDroite.now.recevoirBalle(x,y);
}
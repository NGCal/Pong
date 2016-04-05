
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,
    size: null,
    puntuacion1:null,
    puntuacion2:null,
    px:5,
    py:5,
    anoto:0,//ultimo jugador en anotar un punto
    puntos1:0,
    puntos2:0,
    random:function(min,max){
        var random = Math.floor( Math.random()*max);
        return random;
    },
     mover: function(keyCode, event){
        //moviento de las barras
        var juego = event.getCurrentTarget();
        var barra1 = juego.jugador1.getPositionY();
        var barra2 = juego.jugador2.getPositionY();
        var pantalla= juego.size.height - (juego.size.height*0.20);
        var moves = 15;
                switch(keyCode){
		    case 87:
		      cc.log("P1 up");
              if((barra1+moves)<pantalla)
		      juego.jugador1.setPositionY(barra1+moves);
		      break;
		    case 83:
		      cc.log("P1 down");
		     if((barra1-moves)>0)
		      juego.jugador1.setPositionY(barra1-moves);
		      break;
		    case 38:
		      cc.log("P2 up");
		      if((barra2+moves)<pantalla)
		      juego.jugador2.setPositionY(barra2+moves);
		      break;
		    case 40:
		      cc.log("P2 down");
		      if((barra2-moves)>0)
		      juego.jugador2.setPositionY(barra2-moves);
		      break;
		  }
         
	    },
    reiniciar: function(){
        var  x = this.pelota.getPositionX();
        var  y = this.pelota.getPositionY();
        var direccion = [1,-1];
        this.jugador1.setPosition(this.size.width * 0.1,this.size.height / 2);
        this.jugador2.setPosition(this.size.width -(this.size.width * 0.1),this.size.height / 2);
        this.pelota.setPosition(this.size.width / 2,this.size.height / 2);
        
        if(this.puntos1===0 && this.puntos2===0)
            {
            this.px = this.px * direccion[this.random(0,2)];
            this.py = this.py * direccion[this.random(0,2)];
                
            }
        if(this.anoto === 1){
            this.px = this.px * -1;
            this.py = this.py * direccion[this.random(0,2)];
        } else if (this.anoto === 2){
            this.px = this.px * -1;
            this.py = this.py * direccion[this.random(0,2)];
            
        }
        
        
    },
    orientacion:function(x,y){
         if(x <= 0 || x>= this.size.width){
          this.px =  this.px*-1;}
        if(y<= 0 || y >= this.size.height)
           this.py =
               this.py*-1;   
    },
    wallCollision: function(){
    var  x = this.pelota.getPositionX();
    var  y = this.pelota.getPositionY();
        
       this.orientacion(x,y);
    },
    hit:function(){
        if(this.colision(this.jugador1) || this.colision(this.jugador2)){
            this.orientacion(0,this.pelota.getPositionY());
        }
    },
    colision:function(barra){
        var cuadroP = this.pelota.getBoundingBox();
         var cuadroB= barra.getBoundingBox();
       
        if(cc.rectIntersectsRect(cuadroB,cuadroP))
		{
			
            this.px += 2;
            this.py += 2;
			return(true);
		}
	return(false);	  
    },
    movimientoPelota:function(x){
        this.wallCollision();
       var x = this.pelota.getPositionX();
       var y = this.pelota.getPositionY();
        
        this.actPuntuacion();
       x = x +  this.px;
       y = y + this.py;
        if(this.anoto !==0)
            {this.reiniciar();
             this.anoto = 0;
            }
        else
        this.pelota.setPosition(x,y);
    
        
    },
     actPuntuacion:function(){
        var x = this.pelota.getPositionX();
        
        if(x >= this.size.width){
            this.puntos1+=1;
            this.puntuacion1.setString(this.puntos1.toString());
            this.anoto = 1;
          
              
        }
        if (x <= 0){
             this.puntos2+=1;
            this.puntuacion2.setString(this.puntos2.toString());
            this.anoto = 2;
           
           
        }
         
         this.ganador();
    },
    ganador:function(){
        cc.log("Puntos: " + this.puntos1);
        if(this.puntos1 === 10 || this.puntos2 === 10)
            {
                        
                    this.unschedule(this.movimientoPelota);
                    this.pelota.setVsible(false);
                        this.addChild(new winnerLayer(this.anoto));
                
                
                    
                
            }
    },
    inicializar:function(){
        var size = cc.winSize;
        this.size = size;
        var color = cc.color(100,100,100);
        var fondo = new cc.Sprite(res.fondo_png);
        fondo.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(fondo);

        this.jugador1 =  new cc.Sprite(res.barra2_png);
        
        
        this.addChild(this.jugador1, 1);

        this.jugador2 =  new cc.Sprite(res.barra_png);
        
        this.addChild(this.jugador2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.pelota =  new cc.Sprite(res.pelota_png);
    
        this.pelota.setScale(0.4,0.4);
        
        this.addChild(this.pelota, 1);

        this.puntuacion1 = new cc.LabelTTF(this.puntos2.toString(),"Arial",24);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new cc.LabelTTF(this.puntos2.toString(),"Arial",24);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
        
        this.reiniciar();
        //eventos
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:this.mover
                
            }, this);
        //Calendarios
        this.schedule(this.movimientoPelota,1/600);
        this.schedule(this.hit,0.1);
    },
    ctor:function () {
        this._super();
        this.inicializar();


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


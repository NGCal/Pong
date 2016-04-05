var winnerLayer = cc.Layer.extend({
    
    inicializar:function(){
        
    },
    ctor:function (ganador) {
        this._super();
        var size = cc.winSize;
        this.size = size;
        var color = cc.color(100,100,100);
        var fondo = new cc.Sprite(res.fondo_png);
        fondo.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(fondo);

        this.puntuacion1 = new cc.LabelTTF("El jugador "+ganador.toString()+" es el ganador","Arial",24);
        this.puntuacion1.setPosition(size.width/2, size.height/2);
        this.addChild(this.puntuacion1,0);
        
       

        return true;
    }
});
(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = new parent;
        child.prototype.constructor = child;
    }
    function len(obj) {
        if (obj instanceof Array || typeof obj === "string") return obj.length;
        else {
            var count = 0;
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) count++;
            }
            return count;
        }
    }
    function range(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var length = Math.max (Math.ceil ((stop - start) / step) , 0);
        var idx = 0;
        var range = new Array(length);
        while (idx < length) {
            range[idx++] = start;
            start += step;
        }
        return range;
    }
    function Interpolaciones(){
        var self = this;
    };


    Interpolaciones.prototype.interpolar = function interpolar(objeto, atributo, valor_o_valores, tiempo){
        var self = this;
        var step, attr, diccionario, tween, i;
        tiempo = tiempo * 1e3;
        step = tiempo / len(valor_o_valores);
        tween = createjs.Tween.get(objeto);
        for (i = 0; i < len(valor_o_valores); i++) {
            attr = atributo;
            diccionario = {};
            diccionario[attr] = valor_o_valores[i];
            tween = tween.to(diccionario, step, createjs.Ease.elasticIn);
        }
    };

    function Imagen(imagen){
        var self = this;
        self.ruta = imagen;
        self.imagen = imagen;
    };


    Imagen.prototype.instanciar = function instanciar(){
        var self = this;
        return new createjs.Bitmap(self.imagen);
    };

    function Imagenes(){
        var self = this;
        self.recursos = {};
        self.loader = new PxLoader();
        self.imagenes_solicitadas = 0;
        self.cargar_recursos();
        self.loader.start();
    };


    Imagenes.prototype.cargar_recursos = function cargar_recursos(){
        var self = this;
        self.cargar_recurso("aceituna.png");
    };

    Imagenes.prototype.cargar_recurso = function cargar_recurso(nombre){
        var self = this;
        self.recursos[nombre] = self.loader.addImage(nombre);
        self.imagenes_solicitadas += 1;
    };

    Imagenes.prototype.cargar = function cargar(nombre){
        var self = this;
        return new Imagen(self.recursos[nombre]);
    };

    function Actor(imagen, x, y){
        var self = this;
        if (typeof x === "undefined") x = 0;
        if (typeof y === "undefined") y = 0;
        var imagenes;
        imagenes = new Imagenes();
        self.imagen = imagenes.cargar(imagen);
        self.crear_sprite();
        self.x = x;
        self.y = y;
        self.__defineGetter__("x", self.get_x);
        self.__defineSetter__("x", self.set_x);
        self.__defineGetter__("y", self.get_y);
        self.__defineSetter__("y", self.set_y);
        self.__defineGetter__("escala", self.get_escala);
        self.__defineSetter__("escala", self.set_escala);
    };


    Actor.prototype.crear_sprite = function crear_sprite(){
        var self = this;
        self.sprite = self.imagen.instanciar();
    };

    Actor.prototype.get_x = function get_x(){
        var self = this;
        return self.sprite.x;
    };

    Actor.prototype.set_x = function set_x(_x){
        var self = this;
        self.sprite.x = _x;
    };

    Actor.prototype.get_y = function get_y(){
        var self = this;
        return self.sprite.y;
    };

    Actor.prototype.set_y = function set_y(_y){
        var self = this;
        self.sprite.y = _y;
    };

    Actor.prototype.get_escala = function get_escala(){
        var self = this;
        return self.sprite.scaleX;
    };

    Actor.prototype.set_escala = function set_escala(_escala){
        var self = this;
        self.sprite.scaleX = _escala;
        self.sprite.scaleY = _escala;
    };

    function Aceituna(){
        var self = this;
        Actor.prototype.constructor.call(self, imagen = "aceituna.png");
    };

    _$rapyd$_extends(Aceituna, Actor);

    function View(canvas){
        var self = this;
        var my_tick;
        self.stage = new createjs.Stage(canvas);
        self.interpolaciones = new Interpolaciones();
        createjs.Ticker.setFPS(60);
        my_tick = function(event) {
            self.update();
        };
        createjs.Ticker.addEventListener("tick", my_tick);
        self.aceituna = new Aceituna();
        self.aceituna.escala = 2;
        self.interpolaciones.interpolar(self.aceituna, "escala", [ 6 ], 2);
    };


    View.prototype.update = function update(){
        var self = this;
        var text;
        text = new createjs.Text("Hello World!", "36px Arial", "#777");
        self.stage.addChild(self.aceituna.sprite);
        self.stage.addChild(text);
        self.aceituna.x = 200;
        self.aceituna.y = 250;
        text.x = 360;
        text.y = 200;
        self.stage.update();
    };

    window.init = function() {
        var canvas, game;
        canvas = document.getElementById("acanvas");
        game = new View(canvas);
        game.update();
    };
})();
(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = new parent;
        child.prototype.constructor = child;
    }
    function _$rapyd$_print() {
        var args, output;
        args = [].slice.call(arguments, 0);
        output = JSON.stringify(args);
        if ("console" in window) console.log(output.substr(1, output.length-2));
    }
    function _$rapyd$_in(val, arr) {
        if (arr instanceof Array || typeof arr === "string") return arr.indexOf(val) != -1;
        else return val in arr;
    }
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
        self.cargar_recursos();
        self.imagenes_solicitadas = 0;
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
        _$rapyd$_print(self.recursos);
        if (_$rapyd$_in(nombre, self.recursos)) {
            return new Imagen(self.recursos[nombre]);
        } else {
            _$rapyd$_print("no se encontrar la imagen");
        }
    };

    function Actor(imagen, x, y){
        var self = this;
        if (typeof x === "undefined") x = 0;
        if (typeof y === "undefined") y = 0;
        var imagenes;
        imagenes = new Imagenes();
        self.imagen = imagenes.cargar(imagen);
        self.x = x;
        self.y = y;
        _$rapyd$_print(self.imagen);
        self.crear_sprite();
    };


    Actor.prototype.crear_sprite = function crear_sprite(){
        var self = this;
        self.sprite = self.imagen.instanciar();
    };

    function Aceituna(){
        var self = this;
        Actor.prototype.constructor.call(self, imagen = "aceituna.png");
    };

    _$rapyd$_extends(Aceituna, Actor);

    function View(canvas){
        var self = this;
        self.stage = new createjs.Stage(canvas);
    };


    View.prototype.update = function update(){
        var self = this;
        var text;
        text = new createjs.Text("Hello World!", "36px Arial", "#777");
        self.stage.addChild(text);
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
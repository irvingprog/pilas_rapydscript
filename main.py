class Interpolaciones:
    def __init__(self):
        pass

    def interpolar(self, objeto, atributo, valor_o_valores, tiempo):
        tiempo = tiempo*1000
        step = tiempo / len(valor_o_valores)
        tween = createjs.Tween.get(objeto);

        for i in range(0, len(valor_o_valores)):
            attr = atributo
            diccionario = {}
            diccionario[attr] = valor_o_valores[i]
            tween = tween.to(diccionario, step, createjs.Ease.elasticIn)

class Imagen:
    def __init__(self, imagen):
        self.ruta = imagen
        self.imagen = imagen
        
    def instanciar(self):
        return new createjs.Bitmap(self.imagen)

class Imagenes:
    def __init__(self):
        self.recursos = {}
        self.loader = new PxLoader()
        self.imagenes_solicitadas = 0

        self.cargar_recursos()

        self.loader.start()

    def cargar_recursos(self):
        self.cargar_recurso("aceituna.png")

    def cargar_recurso(self,nombre):
        self.recursos[nombre] = self.loader.addImage(nombre)
        self.imagenes_solicitadas +=1

    def cargar(self, nombre):
        return Imagen(self.recursos[nombre])


class Actor:
    def __init__(self, imagen, x=0, y=0):
        imagenes = Imagenes()
        self.imagen = imagenes.cargar(imagen)
        self.crear_sprite()
        self.x = x;
        self.y = y;

        self.__defineGetter__('x', self.get_x)
        self.__defineSetter__('x', self.set_x)

        self.__defineGetter__('y', self.get_y)
        self.__defineSetter__('y', self.set_y)

        self.__defineGetter__('escala', self.get_escala)
        self.__defineSetter__('escala', self.set_escala)
        
    def crear_sprite(self):
        self.sprite = self.imagen.instanciar()

    def get_x(self):
        return self.sprite.x

    def set_x(self, _x):
        self.sprite.x = _x

    def get_y(self):
        return self.sprite.y

    def set_y(self, _y):
        self.sprite.y = _y

    def get_escala(self):
        return self.sprite.scaleX;

    def set_escala(self, _escala):
        self.sprite.scaleX = _escala
        self.sprite.scaleY = _escala

class Aceituna(Actor):
    def __init__(self):
        Actor.__init__(self, imagen="aceituna.png")
        

class View:
    def __init__(self, canvas):
        self.stage = new createjs.Stage(canvas)
        self.interpolaciones = Interpolaciones()

        createjs.Ticker.setFPS(60);
        my_tick = def(event): self.update()
        createjs.Ticker.addEventListener('tick', my_tick);

        self.aceituna = Aceituna()
        self.aceituna.escala = 2
        self.interpolaciones.interpolar(self.aceituna, "escala", [6], 2)

    def update(self):
        text = new createjs.Text("Hello World!", "36px Arial", "#777")

        
        self.stage.addChild(self.aceituna.sprite)
        self.stage.addChild(text)
    
        self.aceituna.x = 200
        self.aceituna.y = 250

        text.x = 360
        text.y = 200

        self.stage.update()

window.init = def():
    canvas = document.getElementById('acanvas')
    game = View(canvas)

    game.update()





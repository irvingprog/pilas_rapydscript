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
        #self.x = x;
        self.y = y;

        self.__defineGetter__('x', self.get_x)
        self.__defineSetter__('x', self.set_x)
        
    def crear_sprite(self):
        self.sprite = self.imagen.instanciar()

    def get_x(self):
        return self.sprite.x

    def set_x(self, value):
        self.sprite.x = value

class Aceituna(Actor):
    def __init__(self):
        Actor.__init__(self, imagen="aceituna.png")
        

class View:
    def __init__(self, canvas):
        self.stage = new createjs.Stage(canvas)

    def update(self):
        text = new createjs.Text("Hello World!", "36px Arial", "#777")

        aceituna = Aceituna()
        self.stage.addChild(aceituna.sprite)
        self.stage.addChild(text)

        console.log(aceituna.x)
        aceituna.x = 100;
        text.x = 360
        text.y = 200

        self.stage.update()

window.init = def():
    canvas = document.getElementById('acanvas')
    game = View(canvas)

    game.update()





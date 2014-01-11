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
        self.cargar_recursos()
        self.imagenes_solicitadas = 0

        self.loader.start()

    def cargar_recursos(self):
        self.cargar_recurso("aceituna.png")

    def cargar_recurso(self,nombre):
        self.recursos[nombre] = self.loader.addImage(nombre)
        self.imagenes_solicitadas +=1

    def cargar(self, nombre):
        if nombre in self.recursos:
            return Imagen(self.recursos[nombre])
        else:
            print("no se encontrar la imagen")

class Actor:
    def __init__(self, imagen, x=0, y=0):
        imagenes  =Imagenes()
        self.imagen = imagenes.cargar(imagen)
        self.x = x;
        self.y = y;
        print(self.imagen)
        self.crear_sprite()

    def crear_sprite(self):
        self.sprite = self.imagen.instanciar()

class Aceituna(Actor):
    def __init__(self):
        Actor.__init__(self, imagen="aceituna.png")
        

class View:
    def __init__(self, canvas):
        self.stage = new createjs.Stage(canvas)

    def update(self):
        text = new createjs.Text("Hello World!", "36px Arial", "#777")

        self.stage.addChild(text)

        text.x = 360
        text.y = 200

        self.stage.update()

window.init = def():
    canvas = document.getElementById('acanvas')
    game = new View(canvas)
    game.update()





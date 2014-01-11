pilas_rapydscript
=================

Un vistazo rápido de cómo podríamos usar Rapydscript en lugar de Typescript


### Instalacion:

Es necesario instalar npm para instalar rapydscript:

    npm install rapydscript
    
En mi caso se creo una carpeta con el nombre de /node_modules, dentro del directorio donde ejecuté el comando.

### Compilacion

Para compilar el 'main.py' es necesario escribir la siguiente linea:

      ./node_modules/rapydscript/bin/rapydscript main.py -o main.js -p

Tendremos que repetir este comando cada vez que hagamos un cambios, si nos va bien con este compilador podríamos añadir después GRUNT para automatizar el proceso.

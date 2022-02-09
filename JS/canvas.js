var pantalla = document.querySelector("#ahorcado");
var pincel = pantalla.getContext("2d");

/*Posición donde comienzan las lineas para las letras */
var posicionLineasX = 300;
var posicionLineasY = 700;
var largoLinea = 70;

/*Dibuja el ahorcado a medida que erran las letras*/
function dibujarAhorcado(error){
    
    if(error == 0){
        //Color de fondo
        pincel.beginPath();
        pincel.fillStyle = "NavajoWhite";
        pincel.fillRect(0,0,1200,800);

        //Base del ahorcado
        pincel.lineWidth = 7;
        pincel.strokeStyle = "darkred";
        pincel.beginPath();
        pincel.moveTo(70,700);
        pincel.lineTo(150,650);
        pincel.lineTo(230,700);
        pincel.lineTo(68,700);
        pincel.stroke();
    }

    if(error == 1){
        /*Mastil*/
        dibujarRecta(150,650,150,250);   
    }
    if(error == 2){
        /*Barra horizontal*/
        dibujarRecta(147,248,353,250);
    }
    if(error == 3){
        /*Barra vertical*/
        dibujarRecta(350,250,350,300);
    }
    if(error == 4){
        /*Cabeza*/
        pincel.beginPath();
        pincel.arc(350,335,35,0,2*Math.PI);
        pincel.stroke();
    }
    if(error == 5){
        /*Cuerpo*/
        dibujarRecta(350,370,350,510);
    }
    if(error == 6){
        /*Pierna izquierda*/
        dibujarRecta(350,507,280,570);
    }
    if(error == 7){
        /*Pierna derecha*/
        dibujarRecta(350,507,420,570);
    }
    if(error == 8){
        /*Brazo izquierdo*/
        dibujarRecta(350,407,420,340);
    }
    if(error == 9){
        /*Brazo Derecho*/
          dibujarRecta(350,407,280,340);
    }
}

/*Dibuja las lineas donde aparece las letras correctas */
function dibujarLineas(palabra){
    pincel.beginPath()
    for(let i=0;i<palabra.length;i++){
        var posicion = posicionLineasX + (largoLinea*i);
        pincel.moveTo(posicion,posicionLineasY);
        pincel.lineTo(posicion + 50,posicionLineasY);
        pincel.stroke();
    }   
}

/*Funcion para dibujar todas las lineas del dibujo del ahorcado */
function dibujarRecta(inicioX,inicioY,finX,finY){
    pincel.beginPath();
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 7;
    pincel.moveTo(inicioX,inicioY);
    pincel.lineTo(finX,finY);
    pincel.stroke();
}

/*Escribe la letra arriba de su respectiva linea */
function escribirLetra(letra,linea,color){
    let posicion = posicionLineasX + (largoLinea*linea);
    pincel.beginPath()
    pincel.font = "30pt times new roman";
    pincel.fillStyle =color;
    pincel.fillText(letra,posicion+6,690);
}

/*Escribe las letras que no figuran en la palabra */
function escribirLetraError(letra,error){
    let posicion = 600 + (50*error);
    pincel.beginPath();
    pincel.font = "30pt times new roman";
    pincel.fillStyle ="red";
    pincel.fillText(letra,posicion,500);

}

/*Escribe una palabra en un posicion determinada*/
function escribirPalabra(palabra,posicionX,posicionY,color){
    pincel.beginPath();
    pincel.font = "30pt times new roman";
    pincel.fillStyle =color;
    pincel.fillText(palabra,posicionX,posicionY);
}

function escribirInstrucciones(palabra,posicionX,posicionY,color){
    pincel.beginPath();
    pincel.font = "20pt times new roman";
    pincel.fillStyle =color;
    pincel.fillText(palabra,posicionX,posicionY);
}

/*Crea el Botón "INICIO" para volver al comienzo de la página */
function crearBotonVolver(){
    pincel.beginPath();
    pincel.fillStyle = "darkgrey"
    pincel.fillRect(480,725,150,45);
    pincel.beginPath();
    pincel.font = "30pt times new roman";
    pincel.fillStyle = "darkred";
    pincel.fillText("Volver",500,760);
}
    pincel.arc(x, y, 30, 0, 2*3.14);
    pincel.stroke();


var letrasOprimidas = [];
var IntentoUsado = 0;
var letraApretada;

document.addEventListener("keydown",function(evento){
    tecla = evento.key;
    LetraEnMayuscula = tecla.toUpperCase();
    
    codigo = evento.keyCode;

    //Permite solo las letras permitidas
    if (codigo >= 65 && codigo <= 90 || codigo == 192){

        contadorErradas = 0;
        var largoTexto = palabraSecreta.length;
        var letraApretada = letrasOprimidas.includes(LetraEnMayuscula);
        console.log(letraApretada);
        //Recorremos el texto guardado dentro del array
        for(var indiceArray = 0; indiceArray < largoTexto; indiceArray++){
            //Validamos si la tecla presionada hacer parte del texto y no esta en teclas oprimidas anteriormente, para dibujarla en el canvas
            if(arrayTexto[indiceArray] == LetraEnMayuscula && letraApretada == false){
                dibujarLetras(LetraEnMayuscula, indiceArray,largoTexto);
            }else{
                contadorErradas += 1;
                //Contador para acumular cuando la letra no este en ninguna posicion de la palabra
            }

            //Si la letra no esta en el texto dibujamos la letra en erradas
            if(contadorErradas == largoTexto){

                //Sabemos que si la letra errada ya fue primida antes, entonces no pierde un intento
                if(letraApretada == false){
                    IntentoUsado += 1;
                }
                dibujarLetrasErradas(LetraEnMayuscula, IntentoUsado);
            }
        }
    }
    letrasOprimidas.push(LetraEnMayuscula);
});

document.addEventListener("DOMContentLoaded",function(){
    let palabraIngresada = localStorage.getItem('NuevaPalabra');
    palabraSecreta.push(palabraIngresada);
    dibujarGuiones();

    //Guardamos la palabra secreta dentro de un array
    arrayTexto = [];
    var largoTexto = palabraSecreta.length;  
    for(var indiceTexto = 0; indiceTexto < largoTexto; indiceTexto++){
        arrayTexto.push(palabraSecreta.charAt(indiceTexto));
    }
});
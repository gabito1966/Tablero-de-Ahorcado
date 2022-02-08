var jugar = document.querySelector("#iniciar-juego");
var agregarPalabra = document.querySelector("#nueva-palabra");
var palabraNueva = document.querySelector("#input-nueva-palabra");
var error = document.querySelector("#error");
var repetida = document.querySelector("#repetida");
var pantalla = document.querySelector("#ahorcado");

// LISTADO DE PALABRAS
var listaPalabras = ['ESTUDIO', 'EMPATIA', 'TRIUNFAR', 'DESARROLLO', 'CRECIMIENTO', 'MILAGRO', 'CONFIANZA', 'FUTURO', 'ALEGRIA', 'FRUTA', 'MANZANA', 'NARANJA', 'MANDARINA', 'PROBLEMA','VERDURA', 'EUROPA', 'AMERICA', 'AFRICA', 'OCEANIA', 'ASIA', 'ESCRITORIO', 'COMEDOR', 'COCINA', 'DORMITORIO', 'ALURA', 'ORACLE', 'SILLON', 'ESTUDIAR'];

document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});

var letrasErradas = []; //Array donde se van guardando las letras equivocadas
var letrasEncontradas = []; //Array donde se guardan las letras que van adivinando
var palabra = "";

/*Escucha el boton de inicio y llama a la funcion comenzar con un click */
jugar.addEventListener("click",comenzar);

/*Inicia el juego */
function comenzar(event){
    palabraNueva.value="";
    jugar.blur(); //Saca el foco del botón. Para que no se acciones con la barra espaciadora.
    palabra = listaPalabras[Math.floor(Math.random()*listaPalabras.length)]
    /*Inicia las variables en cero para cuando volves a empezar a jugar*/ 
    letrasErradas = [];
    letrasEncontradas = [];
    event.preventDefault();

    pantalla.scrollIntoView({block: "end", behavior: "smooth"}); //Se mueve la pantalla hasta el canvas
    dibujarAhorcado(letrasErradas.length);
    dibujarLineas(palabra);
    escribirInstrucciones("INGRESE LAS LETRAS CON EL TECLADO",320,220,"darkblue");

    /*Captura la letra del teclado y se la pasa a la funcion teclado*/
    document.addEventListener("keypress",teclado);
};

/*Verifica la letra del teclado presionada. Si esta en la palabra la imprime y la ingresa
en el array de letras correctas; si no esta, la imprime con los errores y la ingresa
en el array de errores.*/
function teclado(event){
    var letraNoEncontrada = true; //Variable para saber si la letra esta NO está en la palabra
    var letraIngresada = event.key.toLocaleUpperCase()
    if ((letrasEncontradas.length<palabra.length)&&(letrasErradas.length<9)){
        if(validacionLetraIngresada(letraIngresada)){
            for(var z=0;z<palabra.length;z++){
                if (letraIngresada == palabra[z]){
                    letraNoEncontrada = false;
                    escribirLetra(palabra[z],z,"darkblue");
                    letrasEncontradas.push(letraIngresada);

                };
            };
            if ((letraNoEncontrada) && (!validacionLetraError(letraIngresada))){
                letrasErradas.push(letraIngresada);
                dibujarAhorcado(letrasErradas.length);
                escribirLetraError(letraIngresada,letrasErradas.length);
            }
        }
    }

    finDelJuego();
    
}


function finDelJuego(){
    if(letrasEncontradas.length==palabra.length){
        escribirPalabra("¡Felicitaciones ganaste!",600,400,"green");
        crearBotonVolver();
        document.removeEventListener("keypress",teclado);
    }else{
        if (letrasErradas.length==9){
            escribirPalabra("¡Uh, Perdiste!",600,400,"red");
            crearBotonVolver();
            document.removeEventListener("keypress",teclado);
            for(var t in palabra){
                escribirLetra(palabra[t],t,"darkMagenta");
            }
        }
    }

    /*Chequea si el click en canvas se hizo sobre el botón */
    pantalla.onclick = inicio;
    function inicio(evento){
        var x = evento.pageX - pantalla.offsetLeft;
        var y = evento.pageY - pantalla.offsetTop;
        if ((x<630)&&(x>480)&&(y<770)&&(y>725)){
            document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});
        }
    }
}

agregarPalabra.addEventListener("click",function(event){
    let palabraIngresada = palabraNueva.value.toLocaleUpperCase();

    if (!validarPalabraNueva(palabraIngresada)){
        error.classList.remove("invisible");
        palabraNueva.focus();
        setTimeout(function(){
            error.classList.add("invisible");
        },2000);
        
    }else{
        if(validarPalabraRepetida(palabraIngresada)){
            repetida.classList.remove("invisible");
            palabraNueva.focus();
            setTimeout(function(){
            repetida.classList.add("invisible");
            },2000);
        }else{
            listaPalabras.push(palabraIngresada);
                agregada.classList.remove("invisible");
            setTimeout(function(){
                agregada.classList.add("invisible");
            },2000);
            palabraNueva.value="";
        }
    }
});
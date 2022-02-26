var jugar = document.querySelector("#iniciar-juego");
var agregarPalabra = document.querySelector("#nueva-palabra");
var palabraNueva = document.querySelector("#input-nueva-palabra");
var error = document.querySelector("#error");
var repetida = document.querySelector("#repetida");
var pantalla = document.querySelector("#ahorcado");

// LISTADO DE PALABRAS
var listaPalabras = ['ESTUDIO', 'EMPATIA', 'TRIUNFAR', 'DESARROLLO', 'CRECIMIENTO', 'MILAGRO', 'CONFIANZA', 'FUTURO', 'ALEGRIA', 'FRUTA', 'MANZANA', 'NARANJA', 'MANDARINA', 'PROBLEMA','VERDURA', 'EUROPA', 'AMERICA', 'AFRICA', 'OCEANIA', 'ASIA', 'ESCRITORIO', 'COMEDOR', 'COCINA', 'DORMITORIO', 'ALURA', 'ORACLE', 'SILLON', 'ESTUDIAR', 'SACRIFICIO', 'PROGRAMAR'];

document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});

var letrasErradas = []; //Array para guardar letras erradas
var letrasHalladas = []; //Array para guarda letras halladas en la palabra
var palabra = "";

/*Escucha el boton de inicio y llama a la funcion comenzar*/
jugar.addEventListener("click",comenzar);

/*Inicia el juego */
function comenzar(event){
    palabraNueva.value="";
    jugar.blur(); //Saca el foco del botón. Para que no se acciones con la barra espaciadora.
    palabra = listaPalabras[Math.floor(Math.random()*listaPalabras.length)]
    /*Reinicia variables a cero para volver a jugar*/ 
    letrasErradas = [];
    letrasHalladas = [];
    event.preventDefault();

    pantalla.scrollIntoView({block: "end", behavior: "smooth"}); //Se mueve la pantalla hasta el canvas
    dibujarAhorcado(letrasErradas.length);
    dibujarLineas(palabra);
    escribirInstrucciones("INGRESE LAS LETRAS CON EL TECLADO",320,170,"darkblue");
    /*Captura letra del teclado y la pasa a la funcion teclado*/
    document.addEventListener("keypress",teclado);
};

/*Verifica la letra del teclado presionada.*/
function teclado(event){
    var letraNoEncontrada = true; 
    var letraIngresada = event.key.toLocaleUpperCase()
    if ((letrasHalladas.length<palabra.length)&&(letrasErradas.length<9)){
        if(validacionLetraIngresada(letraIngresada)){
            for(var z=0;z<palabra.length;z++){
                if (letraIngresada == palabra[z]){
                    letraNoEncontrada = false;
                    escribirLetra(palabra[z],z,"darkblue");
                    letrasHalladas.push(letraIngresada);

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
    if(letrasHalladas.length==palabra.length){
        escribirPalabra("¡Felicitaciones ganaste!",600,400,"green");
        crearBotonVolver();
        document.removeEventListener("keypress",teclado);
    }else{
        if (letrasErradas.length==9){
            escribirPalabra("¡Fin del juego, Perdiste!",600,400,"red");
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

var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

/*Valida que la letra ingresada sea la correcta*/
function validacionLetraIngresada(letra){
    var letraCorrecta = false;
    var letraRepetida = false
    letraCorrecta = abecedario.includes(letra);
    letraRepetida = letrasHalladas.includes(letra);
    if(letraCorrecta && !letraRepetida){
        return true;
    }else{
        return false
    }
}

/*Valida que la letra errada ya no este en el array de errores */
function validacionLetraError(letraError){
    var error = false;
    error = letrasErradas.includes(letraError)
    return error;
}

/*Valida que la palabra ingresada no tenga caracteres especiales ni numeros */
function validarPalabraNueva(palabra){

    for(i=0;i<palabra.length;i++){
        if (!letraAbecedario(palabra[i])){
            return false;
        }
    }
    return true;
}

/*Valida que la letra este en el abecedario */
function letraAbecedario(letra){
    return abecedario.includes(letra);
}

/*Valida que la palabra ingresada no este en la lista de palabras */
function validarPalabraRepetida(palabra){
    return listaPalabras.includes(palabra);
}
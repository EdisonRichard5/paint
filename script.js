var herramienta = "lapiz";
var tamano = 18;
var color_princ = "#E9967A";
function cambiarFondo(x) {
    var ti = document.getElementById("miCanvas");
    ti.style.background = x.value;
};
window.onload = function() {
    'use strict';

    document.getElementsByTagName("input")[0].value = tamano;
	document.getElementsByTagName("input")[5].value = color_princ;
	var c = document.getElementById("miCanvas");
    var ctx = c.getContext("2d");//obtener el contexto a renderizar y sus funciones 
	var dibujar = Boolean(false);
    
	c.onmouseup = function(e) {
		if (dibujar) {
			switch ( herramienta ) {

				case "lapiz":
				    ctx.beginPath();//traza una nueva ruta
				    break;

				case "linea":
				    ctx.lineTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);//crea linea
				    ctx.strokeStyle = color_princ;//color
				    ctx.lineWidth = tamano;
				    ctx.stroke();
				    ctx.beginPath();
				    break;
			}
		}
		dibujar = false;
	}

	c.onmousedown = function(e) {
        dibujar = true;
		if ( e.button == 2 ){
			dibujar = false;
		}

		switch (herramienta) {

			case "lapiz":
			    ctx.beginPath();
			    ctx.moveTo( e.pageX - c.offsetLeft, e.pageY - c.offsetTop );//mueve el camino al punto especificado
			    ctx.beginPath();
			    ctx.lineJoin ="round";//estilos de acado de la linea
			    ctx.lineCap = 'round';
			    break;

			case "linea":
			    ctx.beginPath();
                ctx.moveTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);//mueve el camin al punto especificado
                ctx.lineJoin = "round";//estilos de acado de la linea
			    ctx.lineCap = 'round';
			    break;

			case "borrador":
			    ctx.beginPath();
			    ctx.clearRect( e.pageX - c.offsetLeft, e.pageY - c.offsetTop, tamano, tamano );
                break; 
		}
	}

	c.onmousemove = function(e) {

		if (dibujar) {
			switch (herramienta){
				case "lapiz":
				    ctx.lineTo( e.pageX - c.offsetLeft, e.pageY - c.offsetTop );
				    ctx.strokeStyle = color_princ;//color
				    ctx.lineWidth = tamano;
				    ctx.stroke();
				    break;

				case "borrador":
				    ctx.clearRect( e.pageX - c.offsetLeft, e.pageY - c.offsetTop, tamano, tamano );
                    break;
                
			}
		}
	}
	c.onmouseover = function (e) {//cursor en el canvas
		switch (herramienta){

			case "lapiz":
			    c.style.cursor = "url('cursor/pencil.cur')0 32,default";
			    break;

			case "borrador":
			    c.style.cursor = "url('cursor/borrador.cur')"+ (-tamano)/2 +' '+ (-tamano)/2 +",default";
                break;
            
			case "linea":
			    c.style.cursor = "crosshair";
			    break;
		}
	}
	
	c.onmouseleave = function() {//fuera del canvas
        var dibujar = false;
	}

	c.oncontextmenu = function(e) {//menu del canvas
		return true;
    }
    document.getElementById('lienzo').onclick = function () {
        ctx.fillStyle = color_princ;
        ctx.fillRect(0, 0, c.width, c.height);
        
    };
    document.getElementById('borradorT').onclick = function () {
        ctx.clearRect(0, 0, c.width, c.height);
    };

	document.getElementById('descargar').onclick = function(){
        var imagen = c.toDataURL("image/jpeg");
		var filename = prompt("Guardar como","");

		if (filename == null){//si el usuario presiono cancelar
			return false;
		}
		else if (filename == ""){//si el usuario preciono aceptar y no puso nombre al archivo
			this.download = "Sin título.jpeg";
			this.href = imagen;//Usa la imagen del canvas
		}
		else{//Si el usuario presiono aceptar y puso un nombre al archivo
			this.download = filename+".png";
			this.href = imagen;
        }
    }; 
};
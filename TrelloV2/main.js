
var addButton = document.createElement("button");
addButton.setAttribute("id", "addbutton");
addButton.setAttribute("class", "text-center btn btn-default inline");
addButton.setAttribute("onclick", "agrega()");
addButton.innerHTML = "Añadir una lista..."
var div1 = document.getElementById("div1")
div1.appendChild(addButton);
addButton.focus();


function allowDrop(ev) {
      if (ev.target.className === "pull-left inline tarjeta"){// Permitir el drop solo en el div adecuado
        event.preventDefault();
      }
      else{
      	return;
      }
}
function dragStart(ev) {
	console.log("aca");
	console.log(ev.target.id);
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.dropEffect = "move";
    
}

function drop(ev) { 
	ev.preventDefault();
	console.log("acuya")
    var data = ev.dataTransfer.getData("Text");
    console.log(data);
    var ultimoChild = ev.target.childNodes.length - 1;
    ev.target.insertBefore(document.getElementById(data), ev.target.childNodes[ultimoChild]);
      /*event.target.appendChild(document.getElementById(data));*/  
}
			
function agrega(){
	var botonx = document.createElement("button");
	botonx.setAttribute("class", "btn btn-default inline");
	botonx.innerHTML = "X";
	var creaNombre = document.createElement("input");
	creaNombre.setAttribute("placeholder", "Añadir una lista...");
	creaNombre.setAttribute("class", "inline");
	creaNombre.setAttribute("id", "titulo");
	creaNombre.setAttribute("ondragover", "return false"); //para evitar que acepte Drops el input
	var quitaBoton = document.getElementById("addbutton");
	var papa = document.getElementById("div1");
	papa.replaceChild(creaNombre, quitaBoton); //Reemplazo el boton con el input para añadir lista
	var boton1 = document.createElement("button");
	botonx.addEventListener("click", function(){papa.replaceChild(quitaBoton, creaNombre); 
												papa.removeChild(boton1);
												papa.removeChild(botonx);}) 
	boton1.setAttribute("class", "btn btn-primary boton1 inline");
	boton1.setAttribute("onclick", "guarda()");
	boton1.innerHTML = "guardar"
	document.getElementById("div1").appendChild(creaNombre);
	document.getElementById("div1").appendChild(boton1);
	document.getElementById("div1").appendChild(botonx);
}

function guarda(){
	if (/\S/.test(document.getElementById("titulo").value )){ //testear si el campo contiene al menos un caracter que no sea espacio
		var titulo = document.createElement("h3");
		titulo.innerHTML = document.getElementById('titulo').value;
		var boton2 = document.createElement("button");
		boton2.setAttribute("class", "block btn btn-primary")
		boton2.setAttribute("id", "boton2")
		boton2.setAttribute("onclick", "contenidoTarjeta(this)")
		boton2.innerHTML = "Añadir tarjeta";
		var tarjeta = document.createElement("div");
		/*tarjeta.setAttribute("draggable", "true");
		tarjeta.setAttribute("ondragstart", "arrastraTarjeta(event)")*/
		tarjeta.setAttribute("ondrop", "drop(event)");
		tarjeta.setAttribute("ondragover", "allowDrop(event)");
		tarjeta.setAttribute("class" , "pull-left inline tarjeta");
		tarjeta.appendChild(titulo);
		tarjeta.appendChild(boton2);
		var final = div1.childNodes.length;
		div1.insertBefore(tarjeta, div1.childNodes[final]);
		document.getElementById("titulo").value = ""; //Borra el contenido previo del input de titulo
	}	
	else{
		return;
	}
} 

function contenidoTarjeta(esta){
	var botonx = document.createElement("button");
	botonx.setAttribute("class", "btn btn-default inline");
	botonx.innerHTML = "X";
	var papa = esta.parentNode;
	var guardaTarjeta = document.createElement("button");
		guardaTarjeta.innerHTML = "Guardar";
		guardaTarjeta.setAttribute("class", "btn btn-primary inline");
	var fillmeup = document.createElement("textarea");
		fillmeup.setAttribute("class","block");	
	var parrafo = document.createElement("p");
	parrafo.setAttribute("draggable" , "true"); 
	parrafo.setAttribute("ondragstart", "dragStart(event)");
	parrafo.setAttribute("id", "arrastra")
	var ultimoChild = papa.childNodes.length - 1;
	papa.replaceChild(guardaTarjeta, esta);
	papa.appendChild(botonx);
	botonx.addEventListener("click", function(){papa.replaceChild(esta, guardaTarjeta); 
												papa.removeChild(botonx);
												papa.removeChild(fillmeup);})
	papa.insertBefore(fillmeup, papa.childNodes[ultimoChild]);
	fillmeup.focus(); //Darle el foco al textarea
	guardaTarjeta.addEventListener("click",function(){if(/\S/.test(fillmeup.value)){
		parrafo.innerHTML = fillmeup.value;
		papa.replaceChild(parrafo, fillmeup);
		papa.replaceChild(esta, guardaTarjeta)
		papa.removeChild(botonx)
		}
	})
}




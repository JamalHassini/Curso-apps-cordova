var app = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        inicio();
    }
};

app.initialize();

lista_compra=[];
        
        function inicio(){ 
        	// Creo los eventos
        	$("#boton1").click(validar);
        	$("#boton2").click(limpiar);
			$("#boton3").click(comparte);
        	$("#producto").keypress(teclado);
			
        	leer_guardado();
        }
        function leer_guardado(){
        	// Leo el localstorage (datos locales)
        	leido=localStorage.lista;                    	
        	if (leido!=undefined && leido.length>0 && leido!=null){
        		// Si hay datos guardados
        		lista_compra=leido.split("**");
        		rellenar_lista();
        	}
        }
        function rellenar_lista(){
        	$("#lista").empty();
        	for (k=0; k<lista_compra.length;k++){
        		$("#lista").append("<div class='linea'>"+lista_compra[k]+"<img onclick='borrar(this)'src='img/eliminar.gif'></div>");
        	}

        }
        function guardar_datos(){
        	// Guardo datos locales, pero antes los convierto a texto
        	conversion=lista_compra.join("**");
        	localStorage.lista=conversion;
        }
        function teclado(e){
        	// Detecto la pulsación del enter (código ASCII: 13)
        	if (e.keyCode==13){
        		validar();
        	}                    	
        }
        function validar(){
        	cosa=$("#producto").val();
        	if (lista_compra.indexOf(cosa.toLowerCase())<0 && cosa.length>0){
        		lista_compra.push(cosa);
        		$("#lista").append("<div class='linea'>"+cosa+"<img onclick='borrar(this)'src='img/eliminar.gif'></div>");
        		guardar_datos();
        	}
        	$("#producto").val("").focus();
        }
        function borrar(e){
        	// Borro el dato del array (con splice) y del html (con remove)
        	buscar=$(e).parent().index();
        	lista_compra.splice(buscar,1);
        	$(e).parent().remove();
        	guardar_datos();
        }
		function limpiar(){

		    $("#lista").empty();
		    localStorage.clear();
			leer_guardado();
			
		}
	 function comparte(){

            var valor = lista_compra.join("-");

                if(valor != ''){
					                
				window.plugins.socialsharing.shareViaWhatsApp(valor, null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
				
                }else{
                alert("la lista esta vacia!");
                }
            evt.preventDefault();
        }

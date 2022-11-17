let total = 0;
let porcentajeEnvio = 0.15;
let numeroTarjeta = document.getElementById("numeroTarjeta");
let codigoSeguridad = document.getElementById("codigoSeguridad");
let vencimiento = document.getElementById("vencimiento");
let numeroCuenta = document.getElementById("numeroCuenta");
let carroPreCargado = [];
let carro = [];
carro = JSON.parse(localStorage.getItem('carritoID'))



function eliminar(direccion){
    let borrar = carro.indexOf(carro.find(element => element.id == direccion))
    carro.splice(borrar, 1);
    total = 0;
    localStorage.setItem('carritoID', JSON.stringify(carro))
    listaNormal();
}

function listaNormal(){
    let filas = '';
    total = 0;
    for (let producto of carro){
        filas+=`<tr><td> <img src="${producto.images[0]}" alt="product image" width="100" height="100" class="img-thumbnail"></td><td>${producto.name}</td><td>${producto.currency} ${producto.cost}</td><td><input type="number" min="1" class="carro-actualizar-valor" value="${producto.cantidad}"></td><td>${producto.currency} ${producto.cost * producto.cantidad}</td><td><button type='button' onclick="eliminar(${producto.id})" class="btn btn-danger">Borrar</button></td></tr>`;
        total += (producto.cost * producto.cantidad) 
    }
    document.getElementById("lista").innerHTML = filas;
   actualizarCostos();

    let numeroRegistrado = document.querySelectorAll('.carro-actualizar-valor');
    numeroRegistrado = [...numeroRegistrado];
    numeroRegistrado.forEach(item =>{
        item.addEventListener('click', event =>{
            let productoActual = event.target.parentElement.parentElement.childNodes[1].innerText;
            let cantidadActual = parseInt(event.target.value);
            if(cantidadActual < 1 || cantidadActual == undefined || cantidadActual =='' || cantidadActual == null || isNaN(cantidadActual) ){
                cantidadActual = 1;
            }
            let lugarActual = carro.indexOf(carro.find(item => item.name == productoActual));
            carro[lugarActual].cantidad = cantidadActual;
            localStorage.setItem('carritoID', JSON.stringify(carro))
            listaNormal();
        })
    })
}

function listaPreCargada(){
    let filas = '';
    total = 0;
    for (let producto of carroPreCargado){
        filas+=`<tr><td> <img src="${producto.image}" alt="product image" width="100" height="100" class="img-thumbnail"></td><td>${producto.name}</td><td>${producto.currency} ${producto.unitCost}</td><td><input type="number" min="1" id="preCargado" class="carro-actualizar-valor" value="${producto.count}"></td><td>${producto.currency} ${producto.unitCost * producto.count}</td></tr>`;
        total = (producto.unitCost * producto.count) 
    }
    document.getElementById("lista").innerHTML = filas;
   actualizarCostos();

    document.getElementById("preCargado").addEventListener("change", function(){
        let cuantia = parseInt(document.getElementById("preCargado").value);
        if(cuantia < 1 || cuantia == undefined || cuantia =='' || cuantia == null || isNaN(cuantia) ){
            cuantia = 1;
        }
        carroPreCargado[0].count = cuantia;
        listaPreCargada(carroPreCargado);
    });
    
}

function actualizarCostos(){
    let costoEnvio = total*porcentajeEnvio;
    document.getElementById("subtotalFinal").innerHTML=" $USD " +total;
    document.getElementById("costoEnvio").innerHTML=" $USD " + costoEnvio.toFixed();
    document.getElementById("totalCompra").innerHTML=" $USD " + (total+costoEnvio);
}

function estaSeleccionado(){
    let texto = document.getElementById("metodoEstado").textContent;
    let textoError = document.getElementById("seleccionar");
    if(texto == "No ha seleccionado nada"){
        textoError.className = "invalid-feedback d-block";
        return false;
    } else {
        textoError.className = "invalid-feedback";
        return true;
    }
}

function estanVacios(){
    let calle = document.getElementById("calle");
    let numeroCalle = document.getElementById("numeroCalle");
    let esquina = document.getElementById("esquina");
    if(calle !== "" && numeroCalle !== "" && esquina !== ""){
        return false;
    } else {
        return true;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CART_INFO_URL +"25801.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carroPreCargado = resultObj.data.articles;
            if (carro == undefined || carro =='' || carro == null){
              listaPreCargada(carroPreCargado);  
            } else {
                listaNormal();
            }  
        }
    })
    document.getElementById("premium").addEventListener("change", function(){
        porcentajeEnvio = 0.15;
       actualizarCostos();
    });
    
    document.getElementById("express").addEventListener("change", function(){
        porcentajeEnvio = 0.07;
       actualizarCostos();
    });

    document.getElementById("standart").addEventListener("change", function(){
        porcentajeEnvio = 0.05;
       actualizarCostos();
    });
    document.getElementById("tarjeta").addEventListener("change", function(){
        numeroTarjeta.disabled = false;
        codigoSeguridad.disabled = false;
        vencimiento.disabled = false;
        numeroCuenta.disabled = true;
        document.getElementById("metodoEstado").innerHTML = "Tarjeta de Credito"
    });
    document.getElementById("banco").addEventListener("change", function(){
        numeroTarjeta.disabled = true;
        codigoSeguridad.disabled = true;
        vencimiento.disabled = true;
        numeroCuenta.disabled = false;
        document.getElementById("metodoEstado").innerHTML = "Transferencia bancaria"
    });
    document.getElementById("pagar").addEventListener("click", function(){
       let formulario = document.getElementById("datosFormulario");
       formulario.classList.add("was-validated")
       estaSeleccionado();
       if(estaSeleccionado() == true && estanVacios() == false){
        let htmlContent = "";
        htmlContent += `<div class="alert alert-success" role="alert">
                            ¡Has comprado con exito!
                         </div>`
        document.getElementById("alertaCompra").innerHTML=htmlContent;
       }
    });
});
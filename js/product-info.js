let producto = [];
let comentarios = [];
let carrito = [];
let comentarioNuevo = {};

function setProductID(id) {
    localStorage.setItem('productID', id);
    window.location = "product-info.html";
}

function setCarritoID(array) {
    localStorage.setItem('carritoID', JSON.stringify(array));
    window.location = "cart.html";
}

function getCatID(){
    window.location = "products.html";
}

function getCarrito(){
    let listaCompra = localStorage.getItem('carritoID');
    if(listaCompra == null){
        // si no hay nada en el localstorage dejo vacio el array carrito
        // si no le ingreso la informacion guardada anteriormente
        carrito = [];
    } else {
        carrito = JSON.parse(listaCompra);
    }
}

function agregarCarrito(array, f){//funcion para agregar un producto al carrito
    getCarrito();
    if ((carrito.find(element => element.id == array.id)) != undefined){ //busco en el carrito si hay un producto con
        // el mismo id del poducto que quiero agregar
        // si es asi sumo la cantidad selecionada con anterioridad
        // a la que ya habia y vuelvo a setear al local storage el carrito con los cambios
        carrito[carrito.indexOf(carrito.find(element => element.id == array.id))].cantidad+=f;
        setCarritoID(carrito);
    } else {
        // sino hay un producto que coincida con el requisito anterior
        //sumo el producto al carrito y lo seteo al local storage
        array.cantidad=f;
        carrito.push(array);
        setCarritoID(carrito);
    }
}

function imprimirImagenes(array2){
    let probando = array2.images;
    let vacio="";
    for(let i = 0; i < probando.length; i++){ 
        vacio +=`
                    <div class="small-img-col">
                        <img src="${probando[i]}" onclick="mostrarProducto(producto, ${i});" alt="image" class="small-img" width="100%">
                     </div>
        `
    }
    return vacio;
}

function mostrarProducto(array, i){
    let htmlContentToAppend = "";
       
    htmlContentToAppend += `
            <div class="row mt-5">
                <div class="col-lg-5 col-md-12 col-12">
                    <img src="${array.images[i]}" alt="principal" id="imagenPrincipal" class="img-fluid w-100 pb-1">
                    <div class="small-img-group">
                        ${imprimirImagenes(array)}
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-12">
                <p onclick="getCatID()" style="cursor: pointer;"><strong>Categoria: ${array.category}</strong></p>
                <h3 class="py-4"><strong>${array.name}</strong></h3>
                    <h2><strong>${array.cost} ${array.currency}</strong></h2>
                    <p>Vendidos hasta el momento: ${array.soldCount}</p> 
                    <h4 class="mt-4 mb-3"><strong>Sobre este producto:</strong></h4> 
                        <p>${array.description}</p>
                    <div>
                    <input type="number" min="1" id="cantidadSumar" value="1">
                    <button class="btn btn-primary" type="button" id="btnCarrito" style="width="20px"">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
            <br>
        `  
        document.getElementById("contenedor").innerHTML=htmlContentToAppend;
}

function estrellas(numero){
    let estrellasBuenas = numero;
    let estrellasMalas = 5 - estrellasBuenas;
    let total ="";
    for(let i = 0; i < estrellasBuenas; i++){ 
        total += `<span class="fa fa-star checked"></span>`
    }
    for(let i = 0; i < estrellasMalas; i++){ 
        total += `<span class="fa fa-star"></span>`
    }
    return total;
}

function mostrarComentarios(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let nota = array[i];

        htmlContentToAppend += `
        <li class="list-group-item">
            <p><strong>`+ nota.user +`</strong> - `+ nota.dateTime +` - `+ nota.score +`${estrellas(nota.score)}</p> 
            <p> `+ nota.description +`</p> 
        </li>
        `
        document.getElementById("valoracion").innerHTML=htmlContentToAppend;
    }
}



function mostrarProductosRecomendados(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.relatedProducts.length; i++){ 
        let recomendados = array.relatedProducts[i];

        htmlContentToAppend += `
        <div onclick="setProductID(${recomendados.id})">
            <img src="${recomendados.image}" alt="product image" width="225" height="225" class="img-thumbnail"><br>
            <p>${recomendados.name}</p>
        </div>
        `
        document.getElementById("relacionados").innerHTML=htmlContentToAppend;
    }
}

function agregarComentario(){
    // creo un nuevo objeto y le agrego las propiedades que necesita todo comentario
    comentarioNuevo = {};
    comentarioNuevo.user = localStorage.getItem('user');
    comentarioNuevo.dateTime = new Date;
    comentarioNuevo.description = document.getElementById("nuevoComentario").value;
    comentarioNuevo.score = document.getElementById("estrellas").value;
    comentarios.push(comentarioNuevo); //pusheo este objeto en el array de comentarios
    mostrarComentarios(comentarios);
}

document.addEventListener("DOMContentLoaded", function(){
    let articulo = localStorage.getItem('productID');
    getJSONData(PRODUCT_INFO_URL + articulo + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            producto = resultObj.data;
            producto.cantidad = 1;
            mostrarProducto(producto, 0);
            mostrarProductosRecomendados(producto);

            document.getElementById("btnCarrito").addEventListener("click", function(){
                let cuantia = parseInt(document.getElementById("cantidadSumar").value);
                agregarCarrito(producto, cuantia);
            });
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + articulo + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentarios = resultObj.data;
            mostrarComentarios(comentarios);
        }
    });
    document.getElementById("botonComentario").addEventListener("click", function(){
        agregarComentario();
    })
})
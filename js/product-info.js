let producto = [];
let comentarios = [];
let carrito = [];

function setProductID(id) {
    localStorage.setItem('productID', id);
    window.location = "product-info.html"
}

function setCarritoID(array) {
    localStorage.setItem('carritoID', JSON.stringify(array));
    //window.location = "product-info.html"
}

function getCatID(){
    window.location = "products.html";
}

function getCarrito(){
    let listaCompra = localStorage.getItem('carritoID');
    if(listaCompra == null){
        carrito = [];
    } else {
        carrito = JSON.parse(listaCompra);
    }
}

function agregarCarrito(array){
    getCarrito();
    if ((carrito.find(element => element.id == array.id)) != undefined){
        carrito[carrito.indexOf(carrito.find(element => element.id == array.id))].cantidad++
        setCarritoID(carrito)
    } else {
        carrito.push(array)
        setCarritoID(carrito)
    }
}


function mostrarProducto(array, i){
    let htmlContentToAppend = "";
       
    htmlContentToAppend += `
            <div class="row mt-5">
                <div class="col-lg-5 col-md-12 col-12">
                    <img src="${array.images[i]}" alt="principal" id="imagenPrincipal" class="img-fluid w-100 pb-1">
                    <div class="small-img-group">
                        <div class="small-img-col">
                            <img src="${array.images[0]}" onclick="mostrarProducto(producto, 0);" alt="image" class="small-img" width="100%">
                        </div>
                        <div class="small-img-col">
                            <img src="${array.images[1]}" onclick="mostrarProducto(producto, 1);" alt="image" class="small-img" width="100%">
                        </div>
                        <div class="small-img-col">
                            <img src="${array.images[2]}" onclick="mostrarProducto(producto, 2);" alt="image" class="small-img" width="100%">
                        </div>
                        <div class="small-img-col">
                            <img src="${array.images[3]}" onclick="mostrarProducto(producto, 3);" alt="image" class="small-img" width="100%">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-12">
                <p onclick="getCatID()" style="cursor: pointer;"><strong>Categoria: ${array.category}</strong></p>
                <h3 class="py-4"><strong>${array.name}</strong></h3>
                    <h2><strong>${array.cost} ${array.currency}</strong></h2>
                    <p>Vendidos hasta el momento: ${array.soldCount}</p> 
                    <h4 class="mt-4 mb-3"><strong>Sobre este producto:</strong></h4> 
                        <p>${array.description}</p>
                    <button class="btn btn-primary" type="button" id="btnCarrito" style="width="20px"">Agregar al Carrito</button>
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
                agregarCarrito(producto)
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
})
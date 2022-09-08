let producto = []
let comentarios = []

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function mostrarProducto(array){
    let htmlContentToAppend = "";
       
    htmlContentToAppend += `
            <div class="row">
                <div class="list-group">
                    <br>
                <h2>${array.name}</h2><hr><br>
                    <h4><strong>Precio</strong></h4> 
                        <p>${array.cost} ${array.currency}</p><br>
                    <h4><strong>Descripción</strong></h4> 
                        <p>${array.description}</p><br>
                    <h4><strong>Categoría</strong></h4> 
                        <p>${array.category}</p><br>
                    <h4><strong>Cantidad de Vendidos</strong></h4> 
                        <p>${array.soldCount}</p><br>
                    <h4><strong>Imágenes ilustrativas</strong></h4>
                    <div> 
                    <img src="${array.images[0]}" alt="product image" width="225" height="225" class="img-thumbnail">
                    <img src="${array.images[1]}" alt="product image" width="225" height="225" class="img-thumbnail">
                    <img src="${array.images[2]}" alt="product image" width="225" height="225" class="img-thumbnail">
                    <img src="${array.images[3]}" alt="product image" width="225" height="225" class="img-thumbnail">
                    </div>
                </div>
            </div>
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
        <li>
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
            mostrarProducto(producto);
            console.log(producto.relatedProducts[0].image)
            mostrarProductosRecomendados(producto);
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
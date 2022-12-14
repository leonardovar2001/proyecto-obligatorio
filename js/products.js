const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let productosFiltrados = [];

function filtrarLista(){
    let filtro = document.getElementById("productSearch").value;
    productosFiltrados = currentCategoriesArray.filter(elProducto =>{ // uso la funcion filter para crear un nuevo array donde esten
        //todos los productos que cumplieron una de las 2 condiciones que mande
            return elProducto.name.toLowerCase().indexOf(filtro.toLowerCase()) > -1  || elProducto.description.toLowerCase().indexOf(filtro.toLowerCase()) > -1;
    })
    showCategoriesList(productosFiltrados);
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let car = array[i];

        htmlContentToAppend += `
        <div onclick="setProductID(${car.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="`+ car.image +`" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ car.name +` - `+ car.cost +` `+ car.currency +`</h4> 
                        <p> `+ car.description +`</p> 
                        </div>
                        <small class="text-muted">` + car.soldCount  + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML=htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let categoria = localStorage.getItem('catID');
    getJSONData(PRODUCTS_URL + categoria + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentCategoriesArray = resultObj.data.products;
            showCategoriesList(currentCategoriesArray);
            document.getElementById("descripcion").innerHTML="Veras aqui todos los productos de la categoria "+resultObj.data.catName;
        }
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        document.getElementById("productSearch").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList(currentCategoriesArray);
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        let result = [];
        result = currentCategoriesArray.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        showCategoriesList(result);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        let result = [];
        result = currentCategoriesArray.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
        showCategoriesList(result);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        let result = [];
        result = currentCategoriesArray.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
        showCategoriesList(result);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //tomo los 2 valores, el minimo y el maximo
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
        // creo un nuevo array en base a las condiciones de que el precio del producto no supere el maximo
        // ni sea menor al minimo. Ambas deben cumplirse
        let listaFiltrada = currentCategoriesArray.filter(categoria => categoria.cost >= minCount && categoria.cost <= maxCount);
        listaFiltrada.sort((ant,sig)=>ant.cost-sig.cost); // las ordeno y envio
        showCategoriesList(listaFiltrada);

    });
    document.getElementById("productSearch").addEventListener("input", function(){
        filtrarLista();
    })
});
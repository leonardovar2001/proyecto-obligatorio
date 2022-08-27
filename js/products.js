let categoriesArray = [];
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let car = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(car.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(car.cost) <= maxCount))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
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
            }
        document.getElementById("cat-list-container").innerHTML=htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let categoria = localStorage.getItem('catID');
    getJSONData(PRODUCTS_URL + categoria + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            currentCategoriesArray = resultObj.data
            showCategoriesList(categoriesArray.products);
            document.getElementById("tituloProducts").innerHTML=categoriesArray.catName;
        }
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList(categoriesArray.products);
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        let result = [];
        result = currentCategoriesArray.products.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
        showCategoriesList(result);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        let result = [];
        result = currentCategoriesArray.products.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
        showCategoriesList(result);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        let result = [];
        result = currentCategoriesArray.products.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
        showCategoriesList(result);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
        const prueba= currentCategoriesArray.products;
        let listaFiltrada = prueba.filter(categoria => categoria.cost >= minCount && categoria.cost <= maxCount);
        listaFiltrada.sort((ant,sig)=>ant.cost-sig.cost);
         console.log(listaFiltrada);
        showCategoriesList(listaFiltrada);

    });
    let usuario = localStorage.getItem('user');
    if(usuario == null){
        alert("No hay usuario loggeado")
        location.href = "login.html";
    } else {
        document.getElementById("usuario").innerHTML = usuario;
    }
});
let categoriesArray = [];


function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.products.length; i++){ 
        let car = array.products[i];
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
        document.getElementById("cat-list-container").innerHTML=htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let categoria = localStorage.getItem('catID');
    getJSONData(PRODUCTS_URL + categoria + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
            document.getElementById("tituloProducts").innerHTML=categoriesArray.catName;
        }
    });
    let usuario = localStorage.getItem('user');
    if(usuario == null){
        alert("No hay usuario loggeado")
        location.href = "login.html";
    } else {
        document.getElementById("usuario").innerHTML = usuario;
    }
});
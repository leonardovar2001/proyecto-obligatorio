let carro = [];
carro = JSON.parse(localStorage.getItem('carritoID'))
let total = 0;

function eliminar(direccion){
    let borrar = carro.indexOf(carro.find(element => element.id == direccion))
    carro.splice(borrar, 1);
    total = 0;
    localStorage.setItem('carritoID', JSON.stringify(carro))
    lista();
}

function lista(){
    let filas = '';
    for (let producto of carro){
        filas+=`<tr><td> <img src="${producto.images[0]}" alt="product image" width="100" height="100" class="img-thumbnail"></td><td>${producto.name}</td><td>${producto.currency} ${producto.cost}</td><td>${producto.cantidad}</td><td><button type='button' onclick="eliminar(${producto.id})" class="btn btn-danger">Borrar</button></td></tr>`;
        total += producto.cost
    }
    document.getElementById("lista").innerHTML = filas;
    document.getElementById("totalCompra").innerHTML=" $" +total
}


document.addEventListener("DOMContentLoaded", function(){
    lista()
});
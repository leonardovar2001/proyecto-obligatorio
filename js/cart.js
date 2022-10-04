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
    total = 0;
    for (let producto of carro){
        filas+=`<tr><td> <img src="${producto.images[0]}" alt="product image" width="100" height="100" class="img-thumbnail"></td><td>${producto.name}</td><td>${producto.currency} ${producto.cost}</td><td><input type="number" min="1" class="carro-actualizar-valor" value="${producto.cantidad}"></td><td>${producto.currency} ${producto.cost * producto.cantidad}</td><td><button type='button' onclick="eliminar(${producto.id})" class="btn btn-danger">Borrar</button></td></tr>`;
        total += (producto.cost * producto.cantidad) 
    }
    document.getElementById("lista").innerHTML = filas;
    document.getElementById("totalCompra").innerHTML=" $" +total

    let numeroRegistrado = document.querySelectorAll('.carro-actualizar-valor');
    numeroRegistrado = [...numeroRegistrado];
    numeroRegistrado.forEach(item =>{
        item.addEventListener('click', event =>{
            let productoActual = event.target.parentElement.parentElement.childNodes[1].innerText;
            let cantidadActual = parseInt(event.target.value);
            let lugarActual = carro.indexOf(carro.find(item => item.name == productoActual));
            carro[lugarActual].cantidad = cantidadActual;
            localStorage.setItem('carritoID', JSON.stringify(carro))
            lista();
        })
    })
}


document.addEventListener("DOMContentLoaded", function(){
    lista()
});
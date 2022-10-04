function login(){
    let usuario= document.getElementById('nombre').value;
    let contrasena= document.getElementById('contrasena').value;

    if(usuario!="" && contrasena!=""){
        localStorage.setItem('user', usuario);
        location.href='products.html';
    } else {
        alert("Usuario y contraseña son requeridos")
    }
}

function deslogear(){
    localStorage.removeItem("user");
}

document.addEventListener('DOMContentLoaded', ()=>{
    deslogear();
    document.getElementById('inicio').addEventListener('click', ()=>{
        login();
    })
})
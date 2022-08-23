function login(){
    let usuario= document.getElementById('nombre').value;
    let contrasena= document.getElementById('contrasena').value;

    if(usuario!="" && contrasena!=""){
        sessionStorage.setItem('user', usuario);
        location.href='products.html';
    } else {
        alert("Usuario y contraseña son requeridos")
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click', ()=>{
        login();
    })
})
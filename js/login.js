function login(){
    let usuario= document.getElementById('nombre').value;
    let clave= document.getElementById('contrasena').value;

    if(usuario!="" && contrasena!=""){
        location.href='index.html';
    } else {
        alert("Usuario y contraseña son requeridos")
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click', ()=>{
        login();
    })
})
import {auth} from './firebase.js';
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// function del login estandar
function login(){
    let usuario= document.getElementById('nombre').value;
    let contrasena= document.getElementById('contrasena').value;

    if(usuario!="" && contrasena!=""){ //verifico si los usuarios ingresaron valores o no 
        // si lo hacen guardo en el localstorage el usuario y redirijo al home
        localStorage.setItem('user', usuario);
        location.href='index.html';
    } else {
        alert("Usuario y contraseña son requeridos");
    }
}

function deslogear(){
    localStorage.removeItem("user");
}

document.addEventListener('DOMContentLoaded', ()=>{
    deslogear();
    document.getElementById('inicio').addEventListener('click', () => {
        login();
    })
    document.getElementById('google').addEventListener("click", async() => {
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
        localStorage.setItem('user', credentials.user.email);
        location.href='index.html';
    })
})
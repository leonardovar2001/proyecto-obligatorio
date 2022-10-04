let datos = [];
let datosHackeados = {};
let nombreUsuario = localStorage.getItem('user');

function estaVacio(info){
    let mos ="";
    if(info == undefined || info == ''){
        mos ="No hay informacion sobre esto"
    } else{
        mos = info
    }
    return mos
}

function setInfo(array){
    localStorage.setItem('userInfo', JSON.stringify(array));
    window.location = "my-profile.html"
}

function getInfo(){
    let informacionUsuario = localStorage.getItem('userInfo');
    if(informacionUsuario == undefined || informacionUsuario =='' || informacionUsuario == null){
        datos = [];
    } else {
        datos = JSON.parse(informacionUsuario);
    }
}


function mostrarInformacion(array){
    htmlContentToAppend = "";
    if(array == undefined || array =='' || array == null){
        htmlContentToAppend += `
        <h2 class="py-4">Tus datos de Perfil:</h2>
        <div class="miPerfilForm">
            <div>
                <label for="">Nombre de Usuario: ${nombreUsuario} </label>
            </div><br>
            <div>
                <label for="">Nombre: No hay informacion sobre esto</label> 
                
            </div><br>
            <div>
                <label for="">Apellido: No hay informacion sobre esto</label>
                
            </div><br>
            <div>
                <label for="">Fecha de Nacimiento: No hay informacion sobre esto</label>
               
            </div><br>
            <div>
                <label for="">Email: No hay informacion sobre esto</label>
                
            </div><br>
            <div>
                <label for="">Direccion:No hay informacion sobre esto</label>
                
            </div><br>
            <button class="btnConfirmar" id="btnModificar">Modificar mis datos</button>
        </div>
        `
        document.getElementById('contenedor').innerHTML = htmlContentToAppend;
    } else {
       htmlContentToAppend += `
    <h2 class="py-4">Tus datos de Perfil:</h2>
    <div class="miPerfilForm">
        <div>
            <label for="">Nombre de Usuario: ${nombreUsuario} </label>
        </div><br>
        <div>
            <label for="">Nombre: ${estaVacio(array[0].name)}</label> 
            
        </div><br>
        <div>
            <label for="">Apellido: ${estaVacio(array[0].apellido)}</label>
            
        </div><br>
        <div>
            <label for="">Fecha de Nacimiento: ${estaVacio(array[0].nacimiento)}</label>
           
        </div><br>
        <div>
            <label for="">Email: ${estaVacio(array[0].email)}</label>
            
        </div><br>
        <div>
            <label for="">Direccion: ${estaVacio(array[0].direccion)}</label>
            
        </div><br>
        <button class="btnConfirmar" id="btnModificar">Modificar mis datos</button>
    </div>
    `
    document.getElementById('contenedor').innerHTML = htmlContentToAppend; 
    }
   
       
    
}

function cambiarInformacion(){
    htmlContentToAppend = "";
       
    htmlContentToAppend += `
    <h2 class="py-4">Modificar datos de Perfil:</h2>
    <div class="miPerfilForm">
        <div class="form-floating">
          <input class="form-control" name="nombre" id="nombre" type="text" placeholder="leonardo">
          <label for="floatingInput">Nombre </label> 
        </div><br>
        <div class="form-floating">
          <input class="form-control" name="apellido" id="apellido" type="text" placeholder="vargas">
          <label for="floatingInput">Apellido </label>
        </div><br>
        <div class="form-floating">
          <input class="form-control" name="nacimiento" id="nacimiento" type="text" placeholder="2001">
          <label for="floatingInput">Fecha de Nacimiento </label>
        </div><br>
        <div class="form-floating">
          <input class="form-control" name="email" id="email" type="email" placeholder="algoEmail">
          <label for="floatingInput">Email </label>
        </div><br>
        <div class="form-floating">
          <input class="form-control" name="direccion" id="direccion" type="text" placeholder="tuCasa">
          <label for="floatingInput">Direccion </label>
        </div><br>
        <button class="btnConfirmar" id="btnConfirmar">Confirmar</button>
    </div>
    `
    document.getElementById('contenedor').innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(){
    getInfo()
    console.log(datos)
    mostrarInformacion(datos)
    document.getElementById("btnModificar").addEventListener('click', function(){
        cambiarInformacion()
        document.getElementById("btnConfirmar").addEventListener('click', function(){
            datos = [];
            datosHackeados.name = document.getElementById("nombre").value;
            datosHackeados.apellido = document.getElementById("apellido").value;
            datosHackeados.nacimiento = document.getElementById("nacimiento").value;
            datosHackeados.email = document.getElementById("email").value;
            datosHackeados.direccion = document.getElementById("direccion").value;
            datos.push(datosHackeados)
            console.log(datos)
            setInfo(datos)
        })
    })
})
let datos = [];
let datosNuevos = {};
let lectura = new FileReader();
let validacionFoto = false;
let emailUsuario = localStorage.getItem('user');

function estaVacio(info){
    let mos ="";
    if(info == undefined || info == ''){
        mos =""
    } else{
        mos = info
    }
    return mos
}

function setInfo(array){
    let nuevoNombre = array[0].email;
    localStorage.setItem('userInfo', JSON.stringify(array));
    localStorage.setItem('user', nuevoNombre);
    window.location = "my-profile.html"
}

function getInfo(){
    let informacionUsuario = localStorage.getItem('userInfo');
    if(informacionUsuario == undefined || informacionUsuario =='' || informacionUsuario == null){
        datos = [];
        datosNuevos.foto = "img/foto-perfil.png";
        datosNuevos.name = "";
        datosNuevos.segundoNombre = "";
        datosNuevos.apellido = "";
        datosNuevos.segundoApellido = "";
        datosNuevos.telefono = "";
        datos.push(datosNuevos);
    } else {
        datos = JSON.parse(informacionUsuario);
    }
}

function mostrarInformacion(array){
    htmlContentToAppend = "";
       
    htmlContentToAppend += `
    <h2 class="py-4">Datos de Perfil:</h2>
    <div class="miPerfilForm">
        <h6>Foto de perfil</h6>
        <input type="file" class="form-control" id="foto" name="foto" accept="image/png, image/jpeg"><br>
        <img src="${estaVacio(array[0].foto)}" alt="imagen-perfil" width="125" height="100" id="fotoAhora"><br>
        <div>
        <label for="">Nombre: </label>
        <input class="form-control" name="nombre" id="nombre" type="text" value="${estaVacio(array[0].name)}">
        </div><br>
        <div>
          <label for="">Segundo nombre </label> 
          <input class="form-control" name="segundoNombre" id="segundoNombre" type="text" value="${estaVacio(array[0].segundoNombre)}">
        </div><br>
        <div>
          <label for="">Apellido </label>
          <input class="form-control" name="apellido" id="apellido" type="text" value="${estaVacio(array[0].apellido)}">
        </div><br>
        <div>
          <label for="">Segundo apellido </label>
          <input class="form-control" name="segundoApellido" id="segundoApellido" type="text" value="${estaVacio(array[0].segundoApellido)}">
        </div><br>
        <div>
          <label for="">Email </label>
          <input class="form-control" name="email" id="email" type="email" value="${emailUsuario}">
        </div><br>
        <div>
          <label for="">Telefono </label>
          <input class="form-control" name="telefono" id="telefono" type="text" value="${estaVacio(array[0].telefono)}">
        </div><br>
        <button class="btnConfirmar" id="btnModificar">Modificar</button>
    </div>
    `
    document.getElementById('contenedor').innerHTML = htmlContentToAppend;
}

function procesarFoto(event){
    let imagen = event.target.files[0];
    lectura.readAsDataURL(imagen);
    validacionFoto = true;
    lectura.addEventListener("load", function(event){
        let direccionImagen = event.target.result;
        let fotito = document.getElementById("fotoAhora");
        fotito.src = direccionImagen;
    })
}

function nuevoPerfil(){
    datos = [];
    datosNuevos = {};
    datosNuevos.foto = lectura.result;
    datosNuevos.name = document.getElementById("nombre").value;
    datosNuevos.segundoNombre = document.getElementById("segundoNombre").value;
    datosNuevos.apellido = document.getElementById("apellido").value;
    datosNuevos.segundoApellido = document.getElementById("segundoApellido").value;
    datosNuevos.email = document.getElementById("email").value;
    datosNuevos.telefono = document.getElementById("telefono").value;
    datos.push(datosNuevos)
}

document.addEventListener("DOMContentLoaded", function(){
    getInfo()
    mostrarInformacion(datos)
    document.getElementById("foto").addEventListener('change',procesarFoto);
    document.getElementById("btnModificar").addEventListener('click', function(){
        nuevoPerfil();
        if (datos.nombre !== "" && datos.apellido !== "" && datos.email !== "" && validacionFoto){
            setInfo(datos)
        }else{
            alert ("Debe rellenar todos los campos obligatorios")
        }
    })
})
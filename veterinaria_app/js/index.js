const listaMascotas = document.querySelector('#lista-mascotas')
const tipoMascota = document.querySelector('#tipo')
const nombreMascotas = document.querySelector('#nombre')
const duenoMascotas = document.querySelector('#dueno')
const indexMascota = document.querySelector('#index')
const form = document.querySelector('#form')
const btnSave = document.querySelector('#form-save')
const btnAdd = document.querySelector('#btnAdd')

let mascotas = [{
    tipo: 'Gato',
    nombre: 'Fonzi',
    dueno: 'Daniel'
},
{
    tipo: 'Perro',
    nombre: 'Tuli',
    dueno: 'Angelica'
}]

btnAdd.addEventListener('click', () => {
    btnSave.innerText = 'Agregar'
    tipoMascota.value = 'Tipo de Mascota'
    nombreMascotas.value = ''
    duenoMascotas.value = ''
    indexMascota.value = ''
})

function listarMascotas() {
    const htmlMascota = mascotas.map((mascota, idx) => `
    <tr>
        <th scope="row">${idx}</th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.dueno}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info edit" data-index="${idx}" data-toggle="modal"
                data-target="#staticBackdrop"><i class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-danger delete"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>
`).join('')

listaMascotas.innerHTML = htmlMascota
const btnEdit = document.querySelectorAll('.edit').forEach((btn, idx) => btn.onclick = editarDatos(idx))
const btnDelete = document.querySelectorAll('.delete').forEach((btn, idx) => btn.onclick = eliminarDatos(idx))
}

function enviarDatos(e) {
    e.preventDefault()
    const datos = {
        tipo: tipoMascota.value,
        nombre: nombreMascotas.value,
        dueno: duenoMascotas.value
    }
    if (btnSave.innerText === 'Agregar') {
        mascotas.push(datos)
    } else {
        mascotas[indexMascota.value] = datos
    }
    listarMascotas()
}

function editarDatos(index) {  
    return function handler() {
        btnSave.innerText = 'Actualizar'
        tipoMascota.value = mascotas[index].tipo
        nombreMascotas.value = mascotas[index].nombre
        duenoMascotas.value = mascotas[index].dueno
        indexMascota.value = index
    }
}

function eliminarDatos(index) {
    return function handler () {
        mascotas.splice(index, 1); 
        listarMascotas()
    }
}


listarMascotas()
btnSave.onclick = enviarDatos

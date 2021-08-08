const doctorsList = document.querySelector('#doctors-list')
const firtsName = document.querySelector('#firstname')
const lastName = document.querySelector('#lastname')
const idDoctor = document.querySelector('#id')
const specialty = document.querySelector('#specialty')
const indexDoctors = document.querySelector('#index')
const form = document.querySelector('#form')
const btnSave = document.querySelector('#form-save')
const btnAdd = document.querySelector('#btnAdd')

let doctors = [{
    firtsname: 'Don',
    lastname: 'Fonzi',
    id: '123456',
    specialty: 'Cirugía'
},
{
    firtsname: 'Mr',
    lastname: 'Lord',
    id: '654321',
    specialty: 'Nutrición'
}]

btnAdd.addEventListener('click', () => {
    btnSave.innerText = 'Agregar'
    firtsName.value = ''
    lastName.value = ''
    idDoctor.value = ''
    specialty.value = 'Especialidad'
    indexDoctors.value = ''
})

function showDoctors() {
    const htmlDoctors = doctors.map((doctor, idx) => `
    <tr>
        <th scope="row">${idx}</th>
        <td>${doctor.firtsname}</td>
        <td>${doctor.lastname}</td>
        <td>${doctor.id}</td>
        <td>${doctor.specialty}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info edit" data-index="${idx}" data-toggle="modal"
                data-target="#staticBackdrop"><i class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-danger delete"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>
`).join('')

doctorsList.innerHTML = htmlDoctors
const btnEdit = document.querySelectorAll('.edit').forEach((btn, idx) => btn.onclick = editarDatos(idx))
const btnDelete = document.querySelectorAll('.delete').forEach((btn, idx) => btn.onclick = eliminarDatos(idx))
}

function enviarDatos(e) {
    e.preventDefault()
    const datos = {
        firtsname: firtsName.value,
        lastname: lastName.value,
        id: id.value,
        specialty: specialty.value
    }
    if (btnSave.innerText === 'Agregar') {
        doctors.push(datos)
    } else {
        doctors[indexDoctors.value] = datos
    }
    showDoctors()
}

function editarDatos(index) {  
    return function handler() {
        btnSave.innerText = 'Actualizar'
        firtsName.value = doctors[index].firtsname
        lastName.value = doctors[index].lastname
        id.value = doctors[index].id
        specialty.value = doctors[index].specialty
        indexDoctors.value = index
    }
}

function eliminarDatos(index) {
    return function handler () {
        doctors.splice(index, 1); 
        showDoctors()
    }
}


showDoctors()
btnSave.onclick = enviarDatos
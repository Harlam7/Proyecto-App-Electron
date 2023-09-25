let txtId = document.querySelector('#txtId');
let txtEstudiante = document.querySelector('#txtEstudiante');
let txtMatricula = document.querySelector('#txtMatricula');
let txtEstudio = document.querySelector('#txtEstudio');
let txtObserva = document.querySelector('#txtObserva');
let txtTel = document.querySelector('#txtTel');
let txtEnero = document.querySelector('#txtEnero');
let txtFebrero = document.querySelector('#txtFebrero');
let txtMarzo = document.querySelector('#txtMarzo');
let txtAbril = document.querySelector('#txtAbril');
let txtMayo = document.querySelector('#txtMayo');
let txtJunio = document.querySelector('#txtJunio');
let txtJulio = document.querySelector('#txtJulio');
let txtAgosto = document.querySelector('#txtAgosto');
let txtSeptiembre = document.querySelector('#txtSeptiembre');
let txtOctubre = document.querySelector('#txtOctubre');
let txtNoviembre = document.querySelector('#txtNoviembre');
let txtDiciembre = document.querySelector('#txtDiciembre');
let txtFechaS = document.querySelector('#txtFechaS');
let txtFechaE = document.querySelector('#txtFechaE');
var today = new Date().toISOString().split('T')[0];
// document.getElementById("txtFechaS").setAttribute("min", today);
// document.getElementById("txtFechaE").setAttribute("min", today);
let txtType = document.querySelector('#txtType');
let txtPrice = document.querySelector('#txtPrice');
let txtFechaC = new Date;

txtId.focus();

txtMatricula.addEventListener('keypress', function (e) {
    if (!soloNumeros(e)) {
        e.preventDefault();
    }
});

const camposNumericos = [
    txtMatricula, txtTel, txtEnero, txtFebrero, txtMarzo, txtAbril, txtMayo,
    txtJunio, txtJulio, txtAgosto, txtSeptiembre, txtOctubre,
    txtNoviembre, txtDiciembre
];

for (let i = 0; i < camposNumericos.length; i++) {
    camposNumericos[i].addEventListener('keypress', function (e) {
        if (!soloNumeros(e)) {
            e.preventDefault();
        }
    });
}

let btnAgregar = document.querySelector('#btnAddClient');

btnAgregar.addEventListener('click', () => {
    if (!(
        txtId.value == ''
        || txtEstudiante.value == ''
        || txtMatricula.value == ''
        || txtFechaS.value == ''
        || txtFechaE.value == '')) {
        let data = {
            id: txtId.value,
            estudiante: txtEstudiante.value,
            matricula: txtMatricula.value,
            estudio: txtEstudio.value,
            observa: txtObserva.value,
            tel: txtTel.value,
            matriculaenero: txtEnero.value,
            matriculafebrero: txtFebrero.value,
            matriculamarzo: txtMarzo.value,
            matriculaabril: txtAbril.value,
            matriculamayo: txtMayo.value,
            matriculajunio: txtJunio.value,
            matriculajulio: txtJulio.value,
            matriculaagosto: txtAgosto.value,
            matriculaseptiembre: txtSeptiembre.value,
            matriculaoctubre: txtOctubre.value,
            matriculanoviembre: txtNoviembre.value,
            matriculadiciembre: txtDiciembre.value,
            matriculadiciembre: txtFechaS.value,
            fecha_s: txtFechaS.value,
            fecha_e: txtFechaE.value
        };
        console.log(data)
        addClient(data);
    }
});

const addClient = (data) => {
    window.ipcRender.send('addClient', data);
    localStorage.setItem('reload', '1');
    location.reload();
}

if (localStorage.getItem('reload') == '1') {
    localStorage.removeItem('reload');

    window.ipcRender.invoke('confirmAddClient').then((confirm) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        });

        if (confirm == 1) {
            swalWithBootstrapButtons.fire({
                title: '¡Agregado!',
                text: "Registro agregado.",
                icon: 'success',
                confirmButtonClass: 'mr-2'
            }).then((result) => {
                if (result.value) {
                    consultClients();
                    location.href = './consultClient.html';
                }
            });
        } else if (confirm == 0) {
            swalWithBootstrapButtons.fire({
                title: '¡Error!',
                text: "No se puede agregar un nuevo registro a la base de datos.",
                icon: 'error',
                confirmButtonClass: 'mr-2'
            }).then((result) => {
                if (result.value) {
                    consultClients();
                    location.href = './consultClient.html';
                }
            });
        }
    });
}

const mostrarClients1 = (clients) => {
    let TablaClients = document.querySelector('#tabla-clientes');
    let texto = '';

    TablaClients.innerHTML = '';

    for (let i = 0; i < clients.length; i++) {
        texto +=
            `
            <tr>
                <td>${clients[i].id}</td>
                <td>${clients[i].estudiante}</td>
                <td>${clients[i].matricula}</td>
                <td>${clients[i].estudio}</td>
                <td>${clients[i].observa}</td>
                <td>${clients[i].tel}</td>
                <td>${clients[i].matriculaenero}</td>
                <td>${clients[i].matriculafebrero}</td>
                <td>${clients[i].matriculamarzo}</td>
                <td>${clients[i].matriculaabril}</td>
                <td>${clients[i].matriculamayo}</td>
				<td>${clients[i].matriculajunio}</td>
				<td>${clients[i].matriculajulio}</td>
				<td>${clients[i].matriculaagosto}</td>
				<td>${clients[i].matriculaseptiembre}</td>
				<td>${clients[i].matriculaoctubre}</td>
				<td>${clients[i].matriculanoviembre}</td>
				<td>${clients[i].matriculadiciembre}</td>
				<td>${clients[i].fecha_s}</td>
				<td>${clients[i].fecha_e}</td>
                <td class="text-center"><button type="button" class="btn btn-danger" onclick="showSwal('passing-parameter-execute-cancel', '${clients[i].id}')">Eliminar</button></td>
            </tr>
        `;
    }

    TablaClients.innerHTML = texto;
}

const consultClients = () => {
    window.ipcRender.invoke('getClients').then((result) => {
        let { id, estudiante, matricula, estudio, observa, tel, matriculaenero,
            matriculafebrero, matriculamarzo, matriculaabril,
            matriculamayo, matriculajunio, matriculajulio,
            matriculaagosto, matriculaseptiembre, matriculaoctubre,
            matriculanoviembre, matriculadiciembre, fecha_s, fecha_e } = result;

        id = id.replace(/(^_)|(_$)/g, '');
        estudiante = estudiante.replace(/(^_)|(_$)/g, '');
        matricula = matricula.replace(/(^_)|(_$)/g, '');
        estudio = estudio.replace(/(^_)|(_$)/g, '');
        observa = observa.replace(/(^_)|(_$)/g, '');
        tel = tel.replace(/(^_)|(_$)/g, '');
        matriculaenero = matriculaenero.replace(/(^_)|(_$)/g, '');
        matriculafebrero = matriculafebrero.replace(/(^_)|(_$)/g, '');
        matriculamarzo = matriculamarzo.replace(/(^_)|(_$)/g, '');
        matriculaabril = matriculaabril.replace(/(^_)|(_$)/g, '');
        matriculamayo = matriculamayo.replace(/(^_)|(_$)/g, '');
        matriculajunio = matriculajunio.replace(/(^_)|(_$)/g, '');
        matriculajulio = matriculajulio.replace(/(^_)|(_$)/g, '');
        matriculaagosto = matriculaagosto.replace(/(^_)|(_$)/g, '');
        matriculaseptiembre = matriculaseptiembre.replace(/(^_)|(_$)/g, '');
        matriculaoctubre = matriculaoctubre.replace(/(^_)|(_$)/g, '');
        matriculanoviembre = matriculanoviembre.replace(/(^_)|(_$)/g, '');
        matriculadiciembre = matriculadiciembre.replace(/(^_)|(_$)/g, '');
        fecha_s = fecha_s.replace(/(^_)|(_$)/g, '');
        fecha_e = fecha_e.replace(/(^_)|(_$)/g, '');

        id = id.split('_');
        estudiante = estudiante.split('_');
        matricula = matricula.split('_');
        estudio = estudio.split('_');
        observa = observa.split('_');
        tel = tel.split('_');
        matriculaenero = matriculaenero.split('_');
        matriculafebrero = matriculafebrero.split('_');
        matriculamarzo = matriculamarzo.split('_');
        matriculaabril = matriculaabril.split('_');
        matriculamayo = matriculamayo.split('_');
        matriculajunio = matriculajunio.split('_');
        matriculajulio = matriculajulio.split('_');
        matriculaagosto = matriculaagosto.split('_');
        matriculaseptiembre = matriculaseptiembre.split('_');
        matriculaoctubre = matriculaoctubre.split('_');
        matriculanoviembre = matriculanoviembre.split('_');
        matriculadiciembre = matriculadiciembre.split('_');
        fecha_s = fecha_s.split('_');
        fecha_e = fecha_e.split('_');

        let clients = [];

        for (let i = 0; i < id.length; i++) {
            clients.push({
                'id': id[i],
                'estudiante': estudiante[i],
                'matricula': matricula[i],
                'estudio': estudio[i],
                'observa': observa[i],
                'tel': tel[i],
                'matriculaenero': matriculaenero[i],
                'matriculafebrero': matriculafebrero[i],
                'matriculamarzo': matriculamarzo[i],
                'matriculaabril': matriculaabril[i],
                'matriculamayo': matriculamayo[i],
                'matriculajunio': matriculajunio[i],
                'matriculajulio': matriculajulio[i],
                'matriculaagosto': matriculaagosto[i],
                'matriculaseptiembre': matriculaseptiembre[i],
                'matriculaoctubre': matriculaoctubre[i],
                'matriculanoviembre': matriculanoviembre[i],
                'matriculadiciembre': matriculadiciembre[i],
                'fecha_s': fecha_s[i],
                'fecha_e': fecha_e[i],
            });
        }

        mostrarClients1(clients);
    });
}

function soloNumeros(e) {
    var key = e.charCode;
    return key >= 48 && key <= 57 || key == 13;
}

const formSubmit = (event) => {
    event.preventDefault();
    return false;
}

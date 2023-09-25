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
// let txtType = document.querySelector('#txtType');
// let txtPrice = document.querySelector('#txtPrice');
let txtNewFechaS = document.querySelector('#txtNewFechaS');
let txtNewFechaE = document.querySelector('#txtNewFechaE');
let txtFechaC = new Date();

const loadClient = () => {
    window.ipcRender.invoke('getClient').then((result) => {
        let { id, estudiante, matricula, estudio, observa, tel, matriculaenero, 
		matriculafebrero, matriculamarzo, matriculaabril, 
		matriculamayo, matriculajunio, matriculajulio,
		matriculaagosto, matriculaseptiembre, matriculaoctubre,
		matriculanoviembre, matriculadiciembre, fecha_s, fecha_e } = result;
        const fechas_db = new Date(fecha_s)
        const fechae_db = new Date(fecha_e)
        const fechasEnFormatoCorrecto = fechas_db.toISOString().substring(0, 10);
        const fechaeEnFormatoCorrecto = fechae_db.toISOString().substring(0, 10);
        const today = new Date()
        const mili = today.getTime() - fechae_db.getTime();
        const days = Math.round(mili / (1000 * 60 * 60 * 24));
        txtId.value = id;
        txtEstudiante.value = estudiante;
        txtMatricula.value = matricula;
        txtEstudio.value = estudio;
        txtObserva.value = observa;
        txtTel.value = tel;
        txtEnero.value = matriculaenero;
        txtFebrero.value = matriculafebrero;
        txtMarzo.value = matriculamarzo;
		txtAbril.value = matriculaabril;
		txtMayo.value = matriculamayo;
		txtJunio.value = matriculajunio;
		txtJulio.value = matriculajulio;
		txtAgosto.value = matriculaagosto;
		txtSeptiembre.value = matriculaseptiembre;
		txtOctubre.value = matriculaoctubre;
		txtNoviembre.value = matriculanoviembre;
		txtDiciembre.value = matriculadiciembre;
        txtFechaS.value = fechasEnFormatoCorrecto;
        txtFechaE.value = fechaeEnFormatoCorrecto;
        txtDays.value = days + " dias";
        const fecha = new Date(txtFechaE.value);
        fecha.setDate(fecha.getDate() + 1);
        const minFechaE = fecha.toISOString().slice(0, 10);
        // document.getElementById("txtNewFechaS").setAttribute("min", minFechaE);
        // document.getElementById("txtNewFechaE").setAttribute("min", minFechaE);

        txtMatricula.focus();
    });
}

loadClient();

let btnCancelar = document.querySelector('#btnCancelar');
let btnRenovar = document.querySelector('#btnRenovar');

btnCancelar.addEventListener('click', () => {
    location.href = './renewExpiredClient.html';
});

btnRenovar.addEventListener('click', () => {
    if (!( txtId.value == '' 
        ||txtEstudiante.value == '' 
        || txtMatricula.value == '' 
        || txtFechaS.value == ''
        || txtFechaE.value == ''
        || txtFechaC.value == '')) {
            
        let data = { 
            id: txtId.value || '',
            estudiante: txtEstudiante.value || '',
            matricula: txtMatricula.value || '',
            estudio: txtEstudio.value || '',
            observa: txtObserva.value || '',
            tel: txtTel.value || '',
            matriculaenero: txtEnero.value || '',
            matriculafebrero: txtFebrero.value || '',
            matriculamarzo: txtMarzo.value || '',
            matriculaabril: txtAbril.value || '',
            matriculamayo: txtMayo.value || '',
            matriculajunio: txtJunio.value || '',
            matriculajulio: txtJulio.value || '',
            matriculaagosto: txtAgosto.value || '',
            matriculaseptiembre: txtSeptiembre.value || '',
            matriculaoctubre: txtOctubre.value || '',
            matriculanoviembre: txtNoviembre.value || '',
            matriculadiciembre: txtDiciembre.value || '',
            fecha_s: txtFechaS.value || '',
            fecha_e: txtFechaE.value || '',
            fecha_c: txtFechaC.value || ''
        };

        renewExpiredClient(data);
    }
});




const renewExpiredClient = (data) => {
    window.ipcRender.send('renewExpiredClient', data);

    localStorage.setItem('reload', '1');
    localStorage.setItem('txtId', txtId.value);
    localStorage.setItem('txtEstudiante', txtEstudiante.value);
    localStorage.setItem('txtMatricula', txtMatricula.value);
    localStorage.setItem('txtEstudio', txtEstudio.value);
    localStorage.setItem('txtObserva', txtObserva.value);
    localStorage.setItem('txtTel', txtTel.value);
    localStorage.setItem('txtEnero', txtEnero.value);
    localStorage.setItem('txtFebrero', txtFebrero.value);
    localStorage.setItem('txtMarzo', txtMarzo.value);
    localStorage.setItem('txtAbril', txtAbril.value);
    localStorage.setItem('txtMayo', txtMayo.value);
	localStorage.setItem('txtJunio', txtJunio.value);
	localStorage.setItem('txtJulio', txtJulio.value);
	localStorage.setItem('txtAgosto', txtAgosto.value);
	localStorage.setItem('txtSeptiembre', txtSeptiembre.value);
	localStorage.setItem('txtOctubre', txtOctubre.value);
	localStorage.setItem('txtNoviembre', txtNoviembre.value);
	localStorage.setItem('txtDiciembre', txtDiciembre.value);
	localStorage.setItem('txtFechaS', txtFechaS.value);
	localStorage.setItem('txtFechaE', txtFechaE.value);
    localStorage.setItem('txtFechaC', txtFechaC.value);

    location.reload();
}

if (localStorage.getItem('reload') == '1') {
    localStorage.removeItem('reload');

    window.ipcRender.invoke('confirmRenewExpiredClient').then((confirm) => {
        txtId.value = localStorage.getItem('txtId');
        txtEstudiante.value = localStorage.getItem('txtEstudiante');
        txtMatricula.value = localStorage.getItem('txtMatricula');
        txtEstudio.value = localStorage.getItem('txtEstudio');
        txtObserva.value = localStorage.getItem('txtObserva');
        txtTel.value = localStorage.getItem('txtTel');
        txtEnero.value = localStorage.getItem('txtEnero');
        txtFebrero.value = localStorage.getItem('txtFebrero');
        txtMarzo.value = localStorage.getItem('txtMarzo');
        txtAbril.value = localStorage.getItem('txtAbril');
        txtMayo.value = localStorage.getItem('txtMayo');
		txtJunio.value = localStorage.getItem('txtJunio');
		txtJulio.value = localStorage.getItem('txtJulio');
		txtAgosto.value = localStorage.getItem('txtAgosto');
		txtSeptiembre.value = localStorage.getItem('txtSeptiembre');
		txtOctubre.value = localStorage.getItem('txtOctubre');
		txtNoviembre.value = localStorage.getItem('txtNoviembre');
		txtDiciembre.value = localStorage.getItem('txtDiciembre');
		txtFechaS.value = localStorage.getItem('txtFechaS');
		txtFechaE.value = localStorage.getItem('txtFechaE');
        txtFechaC.value = localStorage.getItem('txtFechaC');

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
                title: '¡Actualizado!',
                text: "Registro actualizado.",
                icon: 'success',
                confirmButtonClass: 'mr-2'
            }).then((result) => {
                if (result.value) {
                    localStorage.removeItem('txtId');
                   localStorage.removeItem('txtEstudiante');
                    localStorage.removeItem('txtMatricula');
                    localStorage.removeItem('txtEstudio');
                    localStorage.removeItem('txtObserva');
                    localStorage.removeItem('txtTel');
                    localStorage.removeItem('txtEnero');
                    localStorage.removeItem('txtFebrero');
                    localStorage.removeItem('txtMarzo');
                    localStorage.removeItem('txtAbril');
                    localStorage.removeItem('txtMayo');
					localStorage.removeItem('txtJunio');
					localStorage.removeItem('txtJulio');
					localStorage.removeItem('txtAgosto');
					localStorage.removeItem('txtSeptiembre');
					localStorage.removeItem('txtOctubre');
					localStorage.removeItem('txtNoviembre');
					localStorage.removeItem('txtDiciembre');
					localStorage.removeItem('txtFechaS');
					localStorage.removeItem('txtFechaE');
                    localStorage.removeItem('txtFechaC');
                    consultClients();
                    location.href = './renewExpiredClient.html';
                }
            });
        } else if (confirm == 0) {
            swalWithBootstrapButtons.fire({
                title: '¡Error!',
                text: "La información permanece segura :)",
                icon: 'error',
                confirmButtonClass: 'mr-2'
            }).then((result) => {
                if (result.value) {
                    localStorage.removeItem('txtId');
                    localStorage.removeItem('txtEstudiante');
                    localStorage.removeItem('txtMatricula');
                    localStorage.removeItem('txtEstudio');
                    localStorage.removeItem('txtObserva');
                    localStorage.removeItem('txtTel');
                    localStorage.removeItem('txtEnero');
                    localStorage.removeItem('txtFebrero');
                    localStorage.removeItem('txtMarzo');
                    localStorage.removeItem('txtAbril');
                    localStorage.removeItem('txtMayo');
					localStorage.removeItem('txtJunio');
					localStorage.removeItem('txtJulio');
					localStorage.removeItem('txtAgosto');
					localStorage.removeItem('txtSeptiembre');
					localStorage.removeItem('txtOctubre');
					localStorage.removeItem('txtNoviembre');
					localStorage.removeItem('txtDiciembre');
					localStorage.removeItem('txtFechaS');
					localStorage.removeItem('txtFechaE');
                    localStorage.removeItem('txtFechaC');
                    consultClients();
                    location.href = './renewExpiredClient.html';
                }
            });
        }
    });
}

const mostrarClients6 = (clients) => {
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
            <td>${clients[i].days}</td>
            <td class="text-center"><button type="button" class="btn btn-danger" onclick="showSwal('passing-parameter-execute-cancel', '${clients[i].id}')">Renovar</button></td>
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
                'id' : id[i],
                'estudiante' : estudiante[i],
                'matricula' : matricula[i],
                'estudio' : estudio[i],
                'observa' : observa[i],
                'tel' : tel[i],
                'matriculaenero' : matriculaenero[i],
                'matriculafebrero' : matriculafebrero[i],
                'matriculamarzo' : matriculamarzo[i],
                'matriculaabril' : matriculaabril[i],
                'matriculamayo' : matriculamayo[i],
				'matriculajunio' : matriculajunio[i],
				'matriculajulio' : matriculajulio[i],
				'matriculaagosto' : matriculaagosto[i],
				'matriculaseptiembre' : matriculaseptiembre[i],
				'matriculaoctubre' : matriculaoctubre[i],
				'matriculanoviembre' : matriculanoviembre[i],
				'matriculadiciembre' : matriculadiciembre[i],
				'fecha_s' : fecha_s[i],
				'fecha_e' : fecha_e[i],
            });
        }

        mostrarClients6(clients);
    });
}

const formSubmit = (event) => {
    event.preventDefault();
    return false;
}
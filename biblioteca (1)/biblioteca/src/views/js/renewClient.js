const renewClient = (id) => {
    window.ipcRender.send('consultClient', id);

    location.href = './form-renewClient.html';
}

const mostrarClients8 = (clients) => {
    let TablaClientes = document.querySelector('#tabla-clientes');
    let texto = '';
    console.log(clients)
    TablaClientes.innerHTML = '';

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
			<td class="text-center"><button type="button" class="btn btn-success" onclick="renewClient('${clients[i].id}')">Renovar</button></td>
            </tr>
        `;
    }

    TablaClientes.innerHTML = texto;
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
            const today = new Date()
            const fechas_db = new Date(fecha_s[i])
            const fechae_db = new Date(fecha_e[i])
            const mili = (today.getTime() - fechae_db.getTime()) * -1;
            const days = Math.round(mili / (1000 * 60 * 60 * 24));
            const fechasEnFormatoCorrecto = fechas_db.toISOString().substring(0, 10);
            const fechaeEnFormatoCorrecto = fechae_db.toISOString().substring(0, 10);
            
            if (days >= 0) {
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
                    'fecha_s' : fechasEnFormatoCorrecto,
                    'fecha_e' : fechaeEnFormatoCorrecto,
                    'days' : days + " días"
                });
            }
        }

        mostrarClients8(clients);
    });
}

consultClients();
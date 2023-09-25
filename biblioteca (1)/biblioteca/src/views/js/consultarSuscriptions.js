let pageConsult;

document.addEventListener('DOMContentLoaded', function () {
    pageConsult = new PageConsult(window);
});

class PageConsult {
    constructor() {
        this.consultSuscriptions();
    }

    consultSuscriptions() {
        window.ipcRender.invoke('getSuscriptions').then((result) => {
            let { 
                id,
                estudiante, 
                matricula, 
                fecha_s, fecha_e,fecha_c,
                type, price } = result;
            
            let suscriptions = [];

            for (let i = 0; i < id.length; i++) {
                const fechas_db = new Date(fecha_s[i])
                const fechae_db = new Date(fecha_e[i])
                const fechac_db = new Date(fecha_c[i])
                const fechasEnFormatoCorrecto = fechas_db.toISOString().substring(0, 10);
                const fechaeEnFormatoCorrecto = fechae_db.toISOString().substring(0, 10);
                const fechacEnFormatoCorrecto = fechac_db.toISOString().substring(0, 10);
                suscriptions.push({
                    'id' : id[i],
                    'estudiante' : estudiante[i],
                    'matricula' : matricula[i],
                    'fecha_s' : fechasEnFormatoCorrecto,
                    'fecha_e' : fechaeEnFormatoCorrecto,
                    'fecha_c' : fechacEnFormatoCorrecto,
                    'type' : type[i],
                    'price' : price[i]
                });
            }
            console.log(suscriptions)
            mostrarSuscriptions(suscriptions);
        });
    }
}

const mostrarSuscriptions = (suscriptions) => {
    let TablaSuscripciones = document.querySelector('#tabla-suscripciones');
    let texto = '';

    TablaSuscripciones.innerHTML = '';

    for (let i = 0; i < suscriptions.length; i++) {
        texto +=
            `
            <tr>
            <td>${suscriptions[i].id}</td>
                <td>${suscriptions[i].estudiante}</td>
                <td>${suscriptions[i].matricula}</td>
                <td>${suscriptions[i].fecha_s}</td>
                <td>${suscriptions[i].fecha_e}</td>
                <td>${suscriptions[i].fecha_c}</td>
                <td>${suscriptions[i].type}</td>
                <td>${suscriptions[i].price}</td>
            </tr>
        `;
    }

    TablaSuscripciones.innerHTML = texto;
}
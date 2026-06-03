// 1. Seleccionamos el formulario usando la clase exacta de tu HTML (.formulario-reserva)
const formularioReserva = document.querySelector('.formulario-reserva');

// 2. Recuperamos el array existente de localStorage, o creamos uno nuevo vacío si no hay datos
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

if (formularioReserva) {
    formularioReserva.addEventListener('submit', (e) => {
        // DETIENE EL ENVÍO POR DEFECTO: Esto evita el error ERR_CONNECTION_REFUSED y que la página se rompa
        e.preventDefault(); 

        // 3. Capturamos los valores de los inputs usando sus IDs exactos del HTML
        const nombre = document.getElementById('reserva-nombre').value;
        const email = document.getElementById('reserva-email').value;
        const telefono = document.getElementById('reserva-tel').value;
        const destino = document.getElementById('filtro-destino').value;
        const fechaSalida = document.getElementById('reserva-fecha').value;
        const adultos = document.getElementById('reserva-adultos').value;
        const ninos = document.getElementById('reserva-ninos').value;

        // 4. Capturamos los checkboxes de servicios adicionales que estén seleccionados
        const serviciosSeleccionados = [];
        const checkboxes = document.querySelectorAll('input[name="servicios[]"]:checked');
        checkboxes.forEach(cb => {
            serviciosSeleccionados.push(cb.value);
        });

        // 5. Creamos el objeto plano con la información estructurada
        const nuevaReserva = {
            nombre: nombre.trim(),
            email: email.trim(),
            telefono: telefono.trim(),
            destino: destino,
            fechaSalida: fechaSalida,
            adultos: parseInt(adultos) || 0,
            ninos: parseInt(ninos) || 0,
            servicios: serviciosSeleccionados
        };

        // 6. Añadimos el objeto al array global de reservas
        reservas.push(nuevaReserva);

        // 7. LO GUARDAMOS EN EL LOCALSTORAGE CONVIRTIÉNDOLO A CADENA TEXTO (JSON)
        localStorage.setItem('reservas', JSON.stringify(reservas));

        // 8. Mensaje de confirmación en pantalla y limpieza de los campos del formulario
        alert('¡Reserva guardada en el LocalStorage con éxito!');
        formularioReserva.reset();

        // Muestra en la consola el estado actual del LocalStorage para verificación rápida
        console.log("Reservas almacenadas actualmente:", reservas);
    });
}
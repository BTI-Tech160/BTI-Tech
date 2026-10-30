/* =====================================================
   BTI Tech · js/app.js
   Funcionamiento general de index.html: el formulario demostrativo.
   (El buscador está en js/buscador.js y los juegos en js/juegos.js.)
   ===================================================== */
(function () {
  "use strict";
  const formulario = document.getElementById("form-sugerencia");
  if (!formulario) return;   // por si el script se carga en una página sin formulario

  // Formulario demostrativo: NO guarda ni envía nada.
  // - No tiene campo de nombre ni pide datos personales.
  // - No usa fetch, cookies, localStorage ni sessionStorage.
  // - El navegador ya revisa los campos "required".
  // - Si el comentario parece tener un correo o un teléfono, avisa y no lo da por válido.
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();   // evita que la página intente enviar los datos
    const mensaje = document.getElementById("mensaje-form");
    const texto = document.getElementById("comentario").value;
    const pareceCorreo = /\S+@\S+\.\S+/.test(texto);
    const pareceTelefono = /\d[\d\s().-]{6,}\d/.test(texto);

    if (pareceCorreo || pareceTelefono) {
      mensaje.textContent = "✗ Parece que escribiste un correo o un teléfono. Borralo y probá de nuevo: este formulario no necesita datos personales.";
      mensaje.className = "resultado-mal";
      return;   // no se limpia el formulario para que puedas corregir el texto
    }

    mensaje.textContent = "✓ ¡Gracias! Tu idea quedó validada (demostración: no se guardó ni se envió ningún dato).";
    mensaje.className = "";
    this.reset();
  });
})();

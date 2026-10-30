/* =====================================================
   BTI Tech · js/juegos.js
   Los dos juegos de juegos.html (se usa solo en esa página):
   1. Quiz tecnológico (10 preguntas, nota de 0 a 10).
   2. Identificá el componente (10 desafíos con imagen, se confirma la respuesta).
   No usa internet, no guarda nada y no pide datos personales.
   Los dos juegos comparten el mismo "motor" (crearMotor): el progreso, la barra,
   el orden aleatorio, la nota final y el botón de volver a jugar.
   ===================================================== */
(function () {
  "use strict";

  /* ---------- Datos ----------
     "tema" sirve para decirle al jugador qué conviene repasar.
     "correcta" es la posición de la opción correcta (0 = A, 1 = B...). */
  const preguntas = [
    {
      tema: "Hardware",
      texto: "¿Cuál de estos componentes se encarga principalmente de ejecutar instrucciones?",
      opciones: ["Monitor", "CPU", "Teclado", "Pendrive"],
      correcta: 1,
      explicacion: "La CPU ejecuta las instrucciones de los programas y realiza los cálculos. El monitor muestra información, el teclado ingresa datos y el pendrive guarda archivos."
    },
    {
      tema: "Software",
      texto: "¿Qué tipo de software administra los recursos del dispositivo y permite que otros programas funcionen?",
      opciones: ["Software de aplicación", "Un navegador web", "Software de sistema", "Un reproductor de video"],
      correcta: 2,
      explicacion: "El software de sistema, como un sistema operativo, administra el equipo. Las aplicaciones, como un navegador o un reproductor, sirven para tareas concretas y dependen de él."
    },
    {
      tema: "Almacenamiento",
      texto: "¿Qué característica tiene un SSD?",
      opciones: [
        "Usa memoria flash y no tiene partes móviles",
        "Usa piezas mecánicas para guardar información",
        "Solo funciona si hay internet",
        "Sirve únicamente para imprimir"
      ],
      correcta: 0,
      explicacion: "El SSD usa memoria flash y, generalmente, abre archivos más rápido que un HDD."
    },
    {
      tema: "Seguridad digital",
      texto: "Te llega un mensaje que pide tu contraseña mediante un enlace inesperado. ¿Qué es lo más prudente?",
      opciones: [
        "Ingresar tus datos rápido para no perder la cuenta",
        "Reenviarlo a todos tus contactos",
        "Responder con tu código de seguridad",
        "Desconfiar y no abrir el enlace"
      ],
      correcta: 3,
      explicacion: "Es una señal típica de phishing: te apuran y te piden datos por un enlace inesperado. Lo prudente es no abrirlo y escribir vos mismo la dirección oficial. Reenviarlo o dar tu código de seguridad solo ayuda a los estafadores."
    },
    {
      tema: "Inteligencia artificial",
      texto: "¿Cuál es una forma responsable de usar la inteligencia artificial para estudiar?",
      opciones: [
        "Copiar todo lo que responde sin leerlo",
        "Usarla como ayuda, revisar la información y comprender el contenido",
        "Confiar siempre sin comprobar nada",
        "Usarla para no tener que razonar"
      ],
      correcta: 1,
      explicacion: "La IA es una herramienta de aprendizaje, no un reemplazo de tu razonamiento. Puede equivocarse, por eso hay que revisar lo que responde y comprender el contenido."
    },
    {
      tema: "Memoria RAM",
      texto: "¿Qué pasa con la información guardada en la memoria RAM cuando se apaga el equipo?",
      opciones: [
        "Se guarda para siempre dentro de la RAM",
        "Pasa sola a la nube",
        "Se borra, porque la RAM es temporal",
        "Se convierte en un archivo del disco"
      ],
      correcta: 2,
      explicacion: "La RAM es volátil: guarda los datos que se están usando en ese momento y los pierde al apagar el equipo."
    },
    {
      tema: "Almacenamiento",
      texto: "¿Por qué un HDD suele ser más lento y más sensible a los golpes que un SSD?",
      opciones: [
        "Porque tiene platos que giran y un brazo lector (partes móviles)",
        "Porque guarda los datos en memoria flash",
        "Porque no tiene capacidad para guardar archivos",
        "Porque solo funciona con internet"
      ],
      correcta: 0,
      explicacion: "El HDD guarda los datos en platos magnéticos que giran, y un brazo los lee. El SSD no tiene piezas móviles."
    },
    {
      tema: "Sistemas operativos",
      texto: "¿Cuál de estas tareas realiza un sistema operativo?",
      opciones: [
        "Fabricar los chips del procesador",
        "Reemplazar al monitor",
        "Guardar los archivos solamente en la nube",
        "Repartir la RAM entre los programas y reconocer los dispositivos conectados"
      ],
      correcta: 3,
      explicacion: "El sistema operativo administra la CPU, la RAM, los archivos y los dispositivos, como un pendrive o una impresora."
    },
    {
      tema: "Hardware",
      texto: "¿Cuál de estos dispositivos es un periférico de salida?",
      opciones: ["Teclado", "Monitor", "Mouse", "Micrófono"],
      correcta: 1,
      explicacion: "El monitor muestra información, por eso es de salida. El teclado, el mouse y el micrófono son de entrada."
    },
    {
      tema: "Seguridad digital",
      texto: "¿Cuál es una buena práctica para proteger tus cuentas?",
      opciones: [
        "Usar la misma contraseña corta en todas las cuentas",
        "Compartir la contraseña con amigos de confianza",
        "Activar la verificación en dos pasos y usar contraseñas largas y distintas",
        "Desactivar las actualizaciones para que no molesten"
      ],
      correcta: 2,
      explicacion: "La verificación en dos pasos agrega una barrera extra, y las contraseñas largas y distintas evitan que un robo afecte a todas tus cuentas."
    }
  ];

  const desafios = [
    {
      tema: "Memoria RAM",
      imagen: { archivo: "ram.jpg", ancho: 800, alto: 600, alt: "Fotografía de varias placas alargadas verdes con pequeños chips negros, encajadas en ranuras blancas de una placa de circuitos" },
      texto: "¿Qué componente observás?",
      opciones: ["Disco duro (HDD)", "Memoria RAM", "Procesador (CPU)"],
      correcta: 1,
      explicacion: "Son módulos de memoria RAM, instalados en las ranuras de la placa madre. La RAM guarda de forma temporal los datos y programas que se están usando, y se borra al apagar el equipo."
    },
    {
      tema: "Procesador (CPU)",
      imagen: { archivo: "cpu.jpg", ancho: 800, alto: 600, alt: "Fotografía de un chip cuadrado y plano, de metal gris, sostenido con una mano" },
      texto: "¿Cuál es la función principal de este componente?",
      opciones: ["Guardar archivos de forma permanente", "Ejecutar instrucciones y realizar operaciones", "Imprimir documentos"],
      correcta: 1,
      explicacion: "Es un procesador (CPU). Ejecuta las instrucciones de los programas y hace los cálculos. Los archivos se guardan en el almacenamiento, y para imprimir se usa una impresora."
    },
    {
      tema: "SSD",
      imagen: { archivo: "ssd-sata.jpg", ancho: 800, alto: 600, alt: "Fotografía de dos unidades delgadas: una caja plana gris con etiqueta y, apoyada encima, una placa alargada negra" },
      texto: "¿Para qué se utilizan principalmente estas unidades?",
      opciones: ["Almacenamiento de datos", "Proyección de imágenes", "Entrada de sonido"],
      correcta: 0,
      explicacion: "Son unidades SSD: una de 2,5 pulgadas y, encima, una M.2. Guardan archivos y programas de forma permanente en memoria flash, sin partes móviles."
    },
    {
      tema: "Periféricos",
      imagen: { archivo: "perifericos.png", ancho: 420, alto: 400, alt: "Esquema con dos columnas, entrada y salida, con íconos de dispositivos: teclado, mouse y micrófono en una; monitor, impresora y parlantes en la otra; abajo, un recuadro de entrada y salida" },
      texto: "En este esquema aparece un teclado. ¿A qué categoría pertenece?",
      opciones: ["Software de sistema", "Hardware de entrada", "Sistema operativo"],
      correcta: 1,
      explicacion: "El teclado es un periférico de entrada: envía datos al equipo. El software de sistema y el sistema operativo son programas, y los programas no se pueden tocar."
    },
    {
      tema: "Tarjeta gráfica (GPU)",
      imagen: { archivo: "gpu.jpg", ancho: 800, alto: 600, alt: "Fotografía de una placa rectangular con dos ventiladores y, en un lateral, varios conectores de video" },
      texto: "¿Qué componente observás?",
      opciones: ["Fuente de alimentación", "Disco duro (HDD)", "Tarjeta gráfica (GPU)"],
      correcta: 2,
      explicacion: "Es una tarjeta gráfica dedicada, con ventiladores y salidas de video. Genera las imágenes que se ven en la pantalla."
    },
    {
      tema: "Disco duro (HDD)",
      imagen: { archivo: "hdd.jpg", ancho: 800, alto: 600, alt: "Fotografía de una caja metálica abierta que deja ver un disco plateado redondo y un brazo fino apoyado encima" },
      texto: "En el interior se ve un plato que gira y un brazo lector. ¿Qué componente es?",
      opciones: ["Disco duro (HDD)", "Unidad SSD", "Memoria RAM"],
      correcta: 0,
      explicacion: "Es un disco duro (HDD) abierto. Guarda los datos en platos magnéticos y un brazo los lee. Por tener piezas móviles, es más lento y más sensible a los golpes que un SSD."
    },
    {
      tema: "SSD",
      imagen: { archivo: "ssd-m2.jpg", ancho: 800, alto: 600, alt: "Fotografía de dos placas azules alargadas, con etiqueta, apoyadas sobre una placa de circuitos oscura" },
      texto: "Estas unidades son placas alargadas, con un conector dorado en un extremo. ¿Cómo se llama su formato?",
      opciones: ["3,5 pulgadas", "DIMM", "M.2"],
      correcta: 2,
      explicacion: "M.2 es el formato: una placa pequeña que se atornilla directamente en una ranura de la placa madre, sin cables. Estos modelos son NVMe, más rápidos. DIMM, en cambio, es un formato de módulos de RAM."
    },
    {
      tema: "Software",
      imagen: { archivo: "capas-software.png", ancho: 420, alto: 430, alt: "Esquema en cuatro capas, de arriba abajo: usuario, software de aplicación, software de sistema y hardware" },
      texto: "En este esquema, ¿qué capa administra el equipo y permite que las aplicaciones funcionen?",
      opciones: ["Software de aplicación", "Hardware", "Software de sistema"],
      correcta: 2,
      explicacion: "El software de sistema, como el sistema operativo y los controladores, administra los recursos del equipo. Las aplicaciones piden ayuda a esta capa, y ella usa el hardware."
    },
    {
      tema: "Sistemas operativos",
      imagen: { archivo: "sistemas-operativos.png", ancho: 420, alto: 330, alt: "Esquema con cinco pantallas simplificadas, rotuladas Windows, macOS, Linux, Android e iOS" },
      texto: "¿Cuál de estos sistemas operativos es de código abierto y se usa mucho en servidores?",
      opciones: ["Linux", "Windows", "macOS"],
      correcta: 0,
      explicacion: "Linux es de código abierto y se usa en computadoras y en servidores. Windows (de Microsoft) y macOS (de Apple) son propietarios: su código es cerrado."
    },
    {
      tema: "Placa madre",
      imagen: { archivo: "partes-computadora.png", ancho: 420, alto: 320, alt: "Esquema con la CPU en el centro, conectada con memoria RAM, almacenamiento, tarjeta gráfica y periféricos" },
      texto: "En el esquema, la CPU parece conectarse sola con todo. En una computadora real, ¿qué pieza conecta y comunica todos los componentes?",
      opciones: ["El gabinete", "La fuente de alimentación", "La placa madre"],
      correcta: 2,
      explicacion: "La placa madre conecta y comunica los componentes: sobre ella se instalan la CPU, la RAM, la tarjeta gráfica y el almacenamiento. La fuente da energía y el gabinete es la caja que protege las piezas."
    }
  ];

  /* ---------- Textos de cada juego ---------- */
  const TEXTOS = {
    quiz: {
      etiqueta: "Pregunta", siguiente: "Siguiente pregunta →", ultimo: "Ver nota final →",
      porcentaje: function (p) { return "Respondiste bien el " + p + " % de las preguntas."; },
      repasar: "Temas para repasar: ", sinErrores: "No tenés temas para repasar. ¡Seguí así!",
      mensajes: [   // según la nota: 10, 8-9, 6-7, 4-5, 0-3
        "¡Excelente! Respondiste todo bien. Ya dominás los temas básicos de esta guía.",
        "¡Muy bien! Entendés casi todo. Repasá lo que falló y vas a llegar a 10.",
        "Bien. Tenés una buena base. Volvé a leer los temas que fallaste en la página de Tecnología.",
        "Vas por buen camino, pero todavía hay conceptos para reforzar. Leé la guía y usá el buscador de la página de Inicio.",
        "No te preocupes: equivocarse también es aprender. Leé la guía con calma, usá el buscador de Inicio y volvé a jugar."
      ]
    },
    juego: {
      etiqueta: "Desafío", siguiente: "Siguiente desafío →", ultimo: "Ver resultado →",
      porcentaje: function (p) { return "Acertaste el " + p + " % de los desafíos."; },
      repasar: "Para repasar: ", sinErrores: "No tenés nada para repasar. ¡Seguí así!",
      mensajes: [
        "¡Excelente ojo! Reconociste todos los componentes.",
        "¡Muy bien! Reconocés casi todo. Mirá de nuevo el que fallaste y vas a llegar a 10.",
        "Bien. Ya reconocés varias piezas. Repasá las que fallaste en la página de Tecnología.",
        "Vas por buen camino. Mirá las imágenes de la página de Tecnología y volvé a intentarlo.",
        "No te preocupes: reconocer piezas lleva práctica. Leé la guía con calma, usá el buscador de Inicio y volvé a jugar."
      ]
    }
  };

  const LETRAS = ["A", "B", "C", "D"];

  /* ---------- Piezas compartidas ---------- */

  // Mezcla una lista (Fisher-Yates) y devuelve una copia: el banco original no cambia.
  function mezclar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const guardado = copia[i];
      copia[i] = copia[j];
      copia[j] = guardado;
    }
    return copia;
  }

  // Crea los botones de respuesta ("A. texto") y devuelve la lista de botones.
  function crearOpciones(contenedor, opciones, alElegir) {
    contenedor.replaceChildren();
    opciones.forEach(function (texto, i) {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "option";
      boton.textContent = LETRAS[i] + ". " + texto;
      boton.addEventListener("click", function () { alElegir(i); });
      contenedor.appendChild(boton);
    });
    return contenedor.querySelectorAll("button");
  }

  // El motor de una partida. "p" es el prefijo de los ids del HTML ("quiz" o "juego").
  // "dibujar(item)" muestra la pregunta o el desafío; cada juego hace lo suyo.
  // Devuelve registrar(acerto): suma el punto UNA sola vez por pregunta.
  function crearMotor(p, banco, textos, dibujar) {
    const $ = function (sufijo) { return document.getElementById(p + "-" + sufijo); };
    const el = {
      inicio: $("inicio"), jugando: $("jugando"), progreso: $("progreso"), barraCaja: $("barra-caja"),
      barra: $("barra"), pregunta: $("pregunta"), siguiente: $("siguiente"), final: $("final")
    };
    let partida = [];      // las preguntas de ESTA partida, en orden mezclado
    let actual = 0;        // la que se está mostrando (empieza en 0)
    let puntaje = 0;
    let errados = [];      // temas de las respuestas falladas
    let cerrada = false;   // evita que una misma pregunta sume puntos más de una vez

    function barra(hechos) {   // la barra se llena según cuántas ya se respondieron
      el.barra.style.width = (hechos / partida.length * 100) + "%";
      el.barraCaja.setAttribute("aria-valuenow", hechos);
    }

    function mostrar() {
      cerrada = false;
      el.progreso.textContent = textos.etiqueta + " " + (actual + 1) + " de " + partida.length;
      barra(actual);
      el.pregunta.textContent = partida[actual].texto;
      el.siguiente.hidden = true;
      dibujar(partida[actual]);
    }

    function empezar() {       // sirve para comenzar y para volver a jugar
      partida = mezclar(banco);
      actual = 0;
      puntaje = 0;
      errados = [];
      el.barraCaja.setAttribute("aria-valuemax", partida.length);
      el.inicio.hidden = true;
      el.final.hidden = true;
      el.jugando.hidden = false;
      mostrar();
      el.pregunta.focus();
    }

    function registrar(acerto) {
      if (cerrada) return false;               // ya se respondió: no pasa nada
      cerrada = true;
      if (acerto) puntaje++;
      else if (errados.indexOf(partida[actual].tema) === -1) errados.push(partida[actual].tema);
      barra(actual + 1);
      el.siguiente.textContent = (actual === partida.length - 1) ? textos.ultimo : textos.siguiente;
      el.siguiente.hidden = false;
      el.siguiente.focus();
      return true;
    }

    function mostrarNota() {
      el.jugando.hidden = true;
      const tramo = puntaje === 10 ? 0 : puntaje >= 8 ? 1 : puntaje >= 6 ? 2 : puntaje >= 4 ? 3 : 4;
      $("nota-numero").textContent = puntaje;
      $("nota-porcentaje").textContent = textos.porcentaje(Math.round(puntaje / partida.length * 100));
      $("nota-mensaje").textContent = textos.mensajes[tramo];
      $("nota-repasar").textContent = errados.length === 0 ? textos.sinErrores : textos.repasar + errados.join(", ") + ".";
      el.final.hidden = false;
      el.final.focus();
    }

    $("comenzar").addEventListener("click", empezar);
    $("reiniciar").addEventListener("click", empezar);   // vuelve a mezclar
    el.siguiente.addEventListener("click", function () {
      actual++;
      if (actual < partida.length) { mostrar(); el.pregunta.focus(); } else { mostrarNota(); }
    });
    return { registrar: registrar };
  }

  /* ---------- Juego 1: Quiz tecnológico ---------- */
  const quizOpciones = document.getElementById("quiz-opciones");
  const quizResultado = document.getElementById("quiz-resultado");

  let temporizadorEspera = null;   // medio segundo de "espera" después de mostrar cada pregunta
  const quiz = crearMotor("quiz", preguntas, TEXTOS.quiz, function (p) {
    quizResultado.textContent = "";
    quizResultado.className = "";
    crearOpciones(quizOpciones, p.opciones, function (elegida) { responder(p, elegida); });
    // Si alguien toca dos veces seguidas "Volver a jugar", el segundo toque caía sobre una opción de la
    // pregunta nueva y la respondía sin querer. Por eso, durante 0,5 s las opciones no reciben toques ni
    // clics del mouse (el teclado no se ve afectado). La clase "espera" está en el CSS.
    quizOpciones.classList.add("espera");
    clearTimeout(temporizadorEspera);
    temporizadorEspera = setTimeout(function () { quizOpciones.classList.remove("espera"); }, 500);
  });

  function responder(p, elegida) {
    if (!quiz.registrar(elegida === p.correcta)) return;   // una sola respuesta por pregunta
    const botones = quizOpciones.querySelectorAll("button");
    botones.forEach(function (b) { b.disabled = true; });
    botones[p.correcta].classList.add("correcta");
    if (elegida === p.correcta) {
      quizResultado.textContent = "✓ ¡Correcto! " + p.explicacion;
      quizResultado.className = "resultado-ok";
    } else {
      botones[elegida].classList.add("incorrecta");
      quizResultado.textContent = "✗ Casi. " + p.explicacion;
      quizResultado.className = "resultado-mal";
    }
  }

  /* ---------- Juego 2: Identificá el componente ---------- */
  const elImg = document.getElementById("juego-img");
  const elOpciones = document.getElementById("juego-opciones");
  const elAviso = document.getElementById("juego-aviso");
  const elExplicacion = document.getElementById("juego-explicacion");
  const btnConfirmar = document.getElementById("juego-confirmar");
  let desafio = null;       // el desafío que se está mostrando
  let elegida = -1;         // opción marcada, todavía sin confirmar (-1 = ninguna)

  const juego = crearMotor("juego", desafios, TEXTOS.juego, function (d) {
    desafio = d;
    elegida = -1;
    elImg.src = "img/" + d.imagen.archivo;
    elImg.alt = d.imagen.alt;
    elImg.width = d.imagen.ancho;
    elImg.height = d.imagen.alto;
    crearOpciones(elOpciones, d.opciones, elegir).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    elAviso.hidden = false;
    elExplicacion.replaceChildren();
    elExplicacion.className = "";       // quita el recuadro verde o rojo del desafío anterior
    btnConfirmar.hidden = false;
    btnConfirmar.disabled = true;       // se activa al elegir una respuesta
  });

  // Marcar una opción (todavía no cuenta: falta confirmar). Se puede cambiar de idea.
  function elegir(i) {
    elegida = i;
    elOpciones.querySelectorAll("button").forEach(function (b, k) {
      b.classList.toggle("elegida", k === i);
      b.setAttribute("aria-pressed", k === i ? "true" : "false");
    });
    btnConfirmar.disabled = false;
  }

  btnConfirmar.addEventListener("click", function () {
    if (elegida < 0 || !juego.registrar(elegida === desafio.correcta)) return;
    const botones = elOpciones.querySelectorAll("button");
    botones.forEach(function (b) { b.disabled = true; b.classList.remove("elegida"); });
    botones[desafio.correcta].classList.add("correcta");
    const veredicto = document.createElement("p");
    const detalle = document.createElement("p");
    detalle.textContent = desafio.explicacion;
    if (elegida === desafio.correcta) {
      veredicto.textContent = "✓ ¡Correcto!";
      veredicto.className = "resultado-ok";
      elExplicacion.className = "juego-explicacion ok";
    } else {
      botones[elegida].classList.add("incorrecta");
      veredicto.textContent = "✗ Casi. La respuesta correcta es la " + LETRAS[desafio.correcta] + ".";
      veredicto.className = "resultado-mal";
      elExplicacion.className = "juego-explicacion mal";
    }
    elExplicacion.replaceChildren(veredicto, detalle);
    elAviso.hidden = true;
    btnConfirmar.hidden = true;
  });

  // En el celular, al pasar al desafío siguiente la pantalla quedaba más abajo y la imagen
  // (lo principal del juego) quedaba arriba, fuera de la vista. Esto lleva el principio del
  // desafío (progreso + imagen) al borde de la pantalla. Se registra DESPUÉS del motor, así
  // que corre cuando el desafío nuevo ya está dibujado. En la nota final no hace nada.
  const elJugando = document.getElementById("juego-jugando");
  const elProgreso = document.getElementById("juego-progreso");
  ["juego-comenzar", "juego-siguiente", "juego-reiniciar"].forEach(function (id) {
    document.getElementById(id).addEventListener("click", function () {
      if (!elJugando.hidden) elProgreso.scrollIntoView({ block: "start" });
    });
  });
})();

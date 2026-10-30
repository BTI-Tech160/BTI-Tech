/* =====================================================
   BTI Tech · js/buscador.js
   Buscador de conceptos tecnológicos. Se usa solo en index.html.
   Funciona sin servidor ni base de datos: todo está en el arreglo "conceptos".
   Cada concepto tiene: id, nombre, alias (otras formas de nombrarlo), definicion,
   funcion, ejemplo, imagen (o null si no hay una imagen adecuada) y mas (enlace).
   Las imágenes son las que ya están en la carpeta img/.
   ===================================================== */
(function () {
  "use strict";
  const conceptos = [
    {
      id: "cpu", nombre: "CPU (procesador)",
      alias: ["procesador", "unidad central de procesamiento", "microprocesador"],
      definicion: "Chip que ejecuta las instrucciones de los programas y realiza los cálculos de la computadora. Su nombre completo es unidad central de procesamiento.",
      funcion: "Ejecutar las instrucciones de los programas y hacer los cálculos.",
      ejemplo: "Al abrir una aplicación, la CPU ejecuta sus instrucciones.",
      imagen: { archivo: "cpu.jpg", ancho: 800, alto: 600, alt: "Fotografía de un procesador Intel Core i5 sostenido con una mano: un chip cuadrado y pequeño, con cubierta metálica gris", pie: "Un procesador (CPU)" },
      mas: "tecnologia.html#componentes"
    },
    {
      id: "ram", nombre: "RAM (memoria de acceso aleatorio)",
      alias: ["memoria", "memoria ram", "memoria principal"],
      definicion: "Memoria rápida y temporal donde la computadora guarda los datos y programas que está usando en ese momento. Es volátil: al apagar el equipo, su contenido se borra. No es lo mismo que el almacenamiento, que sí conserva los datos.",
      funcion: "Guardar temporalmente lo que se está usando para que la CPU lo consiga rápido.",
      ejemplo: "Si tenés abiertos el navegador, un documento y música, todos usan una parte de la RAM.",
      imagen: { archivo: "ram.jpg", ancho: 800, alto: 600, alt: "Fotografía de varios módulos de memoria RAM instalados en las ranuras de una placa madre azul", pie: "Módulos de memoria RAM instalados" },
      mas: "tecnologia.html#ram"
    },
    {
      id: "hardware", nombre: "Hardware",
      alias: ["componentes fisicos", "partes fisicas"],
      definicion: "Conjunto de componentes físicos de un equipo, es decir, las partes que se pueden tocar.",
      funcion: "Ejecutar el software y permitir ingresar, procesar, guardar y mostrar información.",
      ejemplo: "El teclado, el monitor, el procesador y el disco son hardware.",
      imagen: { archivo: "partes-computadora.png", ancho: 420, alto: 320, alt: "Diagrama simple de una computadora: la CPU en el centro conectada con la memoria RAM, el almacenamiento, la tarjeta gráfica y los periféricos", pie: "Partes principales de una computadora" },
      mas: "tecnologia.html#componentes"
    },
    {
      id: "software", nombre: "Software",
      alias: ["programas", "aplicaciones", "programa"],
      definicion: "Conjunto de programas e instrucciones que le indican al hardware qué tareas hacer. No se puede tocar.",
      funcion: "Decirle al hardware qué hacer y cómo hacerlo.",
      ejemplo: "Un navegador, un editor de texto y el sistema operativo son software.",
      imagen: { archivo: "capas-software.png", ancho: 420, alto: 430, alt: "Esquema en capas: el usuario usa el software de aplicación, que funciona sobre el software de sistema, y este controla el hardware", pie: "Capas del software" },
      mas: "tecnologia.html#software"
    },
    {
      id: "almacenamiento", nombre: "Almacenamiento",
      alias: ["memoria de almacenamiento", "nube", "guardar archivos"],
      definicion: "Dispositivos o servicios que guardan los datos de forma permanente, como un HDD, un SSD o un servicio en la nube. La nube guarda los datos en servidores conectados a internet. No es lo mismo que la RAM, que es temporal.",
      funcion: "Conservar archivos y programas aunque el equipo esté apagado.",
      ejemplo: "Las fotos del celular, los documentos y los programas instalados quedan guardados en el almacenamiento.",
      imagen: null,
      mas: "tecnologia.html#hdd-ssd"
    },
    {
      id: "hdd", nombre: "HDD (disco duro)",
      alias: ["disco duro", "disco rigido", "almacenamiento mecanico"],
      definicion: "Unidad de almacenamiento que guarda los datos en platos magnéticos que giran y que son leídos por un brazo con cabeza lectora. Tiene partes móviles.",
      funcion: "Conservar archivos y programas de forma permanente, con mucha capacidad y bajo costo por GB.",
      ejemplo: "Guardar copias de seguridad y muchos archivos grandes, como videos.",
      imagen: { archivo: "hdd.jpg", ancho: 800, alto: 600, alt: "Fotografía de un disco duro (HDD) abierto, donde se ven el plato giratorio y el brazo lector", pie: "Disco duro abierto" },
      mas: "tecnologia.html#hdd-ssd"
    },
    {
      id: "ssd", nombre: "SSD (unidad de estado sólido)",
      alias: ["disco solido", "disco de estado solido", "memoria flash", "m.2", "nvme", "sata"],
      definicion: "Unidad de almacenamiento que guarda los datos en memoria flash. No tiene partes móviles. Puede tener forma de caja de 2,5 pulgadas o de placa M.2.",
      funcion: "Conservar archivos y el sistema operativo con lectura y escritura rápidas.",
      ejemplo: "Instalar el sistema operativo en un SSD hace que el equipo encienda y abra programas más rápido.",
      imagen: { archivo: "ssd-sata.jpg", ancho: 800, alto: 600, alt: "Imagen de un SSD de 2,5 pulgadas con su conector SATA a la izquierda y, apoyado encima, un SSD M.2 NVMe", pie: "SSD de 2,5 pulgadas con un SSD M.2 encima" },
      mas: "tecnologia.html#hdd-ssd"
    },
    {
      id: "gpu", nombre: "GPU (tarjeta gráfica)",
      alias: ["tarjeta grafica", "tarjeta de video", "unidad de procesamiento grafico", "grafica"],
      definicion: "Componente especializado en procesar imágenes y video. Puede ser dedicada (una placa aparte, con su propia memoria) o integrada (viene dentro del procesador).",
      funcion: "Generar las imágenes y el video que se ven en la pantalla.",
      ejemplo: "Al jugar o mirar un video, la GPU genera las imágenes de la pantalla.",
      imagen: { archivo: "gpu.jpg", ancho: 800, alto: 600, alt: "Fotografía de una tarjeta gráfica dedicada con dos ventiladores y, en su lateral, salidas de video HDMI, VGA y DVI", pie: "Tarjeta gráfica dedicada" },
      mas: "tecnologia.html#componentes"
    },
    {
      id: "perifericos", nombre: "Periféricos",
      alias: ["periferico", "teclado", "mouse", "monitor", "impresora", "dispositivos de entrada", "dispositivos de salida"],
      definicion: "Dispositivos que se conectan a la computadora desde afuera para ingresar información (entrada), mostrarla (salida) o hacer las dos cosas.",
      funcion: "Permitir la comunicación entre la persona y el equipo.",
      ejemplo: "El teclado ingresa tu mensaje y el monitor lo muestra. Una pantalla táctil hace las dos cosas.",
      imagen: { archivo: "perifericos.png", ancho: 420, alto: 400, alt: "Esquema de periféricos: de entrada (teclado, mouse y micrófono), de salida (monitor, impresora y parlantes) y de entrada y salida (pantalla táctil e impresora multifunción)", pie: "Periféricos de entrada, de salida y mixtos" },
      mas: "tecnologia.html#componentes"
    },
    {
      id: "so", nombre: "Sistema operativo",
      alias: ["so", "os", "sistemas operativos"],
      definicion: "Software principal que administra los recursos del equipo y permite que las demás aplicaciones funcionen. También ofrece la interfaz con la que usamos el dispositivo.",
      funcion: "Administrar la CPU, la RAM, el almacenamiento y los dispositivos, y ofrecer una interfaz al usuario.",
      ejemplo: "Al conectar un pendrive, el sistema operativo lo detecta y muestra sus archivos.",
      imagen: { archivo: "sistemas-operativos.png", ancho: 420, alto: 330, alt: "Esquema simplificado de las pantallas de Windows, macOS, Linux, Android e iOS", pie: "Esquema de sistemas operativos (no son capturas reales)" },
      mas: "tecnologia.html#sistemas-operativos"
    },
    {
      id: "windows", nombre: "Windows",
      alias: ["microsoft"],
      definicion: "Sistema operativo desarrollado por Microsoft, muy usado en computadoras personales.",
      funcion: "Administrar el equipo y ejecutar aplicaciones, con una interfaz gráfica de ventanas, íconos y menús.",
      ejemplo: "Escribir un trabajo en un procesador de textos y navegar por internet en una computadora con Windows.",
      imagen: null,
      mas: "tecnologia.html#sistemas-operativos"
    },
    {
      id: "linux", nombre: "Linux",
      alias: ["ubuntu", "debian", "fedora", "distribucion", "distribuciones"],
      definicion: "Sistema operativo de código abierto basado en el núcleo Linux, la parte central que controla el hardware. Se distribuye en versiones llamadas distribuciones, como Ubuntu, Debian o Fedora.",
      funcion: "Administrar los recursos del equipo; se usa en computadoras personales y en servidores.",
      ejemplo: "Muchos servidores de internet funcionan con Linux, y Android también se basa en su núcleo.",
      imagen: null,
      mas: "tecnologia.html#sistemas-operativos"
    },
    {
      id: "ia", nombre: "Inteligencia artificial (IA)",
      alias: ["ia", "aprendizaje automatico", "ia generativa"],
      definicion: "Campo de la informática que crea sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como traducir, reconocer voz o recomendar. Muchos sistemas aprenden patrones a partir de datos.",
      funcion: "Realizar tareas a partir de lo aprendido de muchos ejemplos.",
      ejemplo: "Una aplicación de traducción convierte una frase a otro idioma. Conviene revisar el resultado, porque puede equivocarse.",
      imagen: { archivo: "ia-proceso.png", ancho: 420, alto: 430, alt: "Diagrama de tres pasos: entrada de información (texto, imágenes o voz), procesamiento por un sistema de inteligencia artificial y resultado (respuesta, traducción, clasificación o recomendación)", pie: "Cómo trabaja un sistema de IA" },
      mas: "tecnologia.html#ia"
    },
    {
      id: "phishing", nombre: "Phishing",
      alias: ["estafa", "suplantacion de identidad", "correo falso", "mensaje falso"],
      definicion: "Engaño en el que alguien se hace pasar por una persona o institución de confianza, mediante mensajes, correos o sitios falsos, para robar contraseñas o datos personales.",
      funcion: "Su objetivo es que la víctima entregue sus datos; por eso hay que aprender a reconocerlo.",
      ejemplo: "Un mensaje dice que tu cuenta será bloqueada y te pide entrar a un enlace. Lo correcto es no tocarlo y escribir vos mismo la dirección oficial.",
      imagen: { archivo: "phishing-ejemplo.png", ancho: 420, alto: 470, alt: "Ejemplo ficticio de mensaje de phishing con cuatro señales de alerta numeradas: remitente extraño, urgencia, saludo genérico y enlace sospechoso", pie: "Ejemplo ficticio de phishing con sus señales de alerta" },
      mas: "tecnologia.html#seguridad"
    },
    {
      id: "ciberseguridad", nombre: "Ciberseguridad",
      alias: ["seguridad digital", "seguridad informatica", "seguridad"],
      definicion: "Conjunto de prácticas y herramientas para proteger dispositivos, redes, cuentas e información contra accesos no autorizados o daños.",
      funcion: "Lograr que solo accedan las personas autorizadas y que los datos no se pierdan ni se alteren.",
      ejemplo: "Usar contraseñas largas y distintas, activar la verificación en dos pasos y mantener el sistema actualizado.",
      imagen: null,
      mas: "tecnologia.html#seguridad"
    }
  ];

  // Quita mayúsculas y tildes, y deja solo letras, números y espacios.
  // Así "Gráfica", "grafica" y "GRÁFICA" se vuelven iguales: "grafica".
  function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }

  // Para cada concepto se preparan una sola vez las palabras del nombre y de los alias.
  conceptos.forEach(function (c) {
    c.palabrasNombre = normalizar(c.nombre).split(" ");
    c.palabrasTodas = c.palabrasNombre.concat(normalizar(c.alias.join(" ")).split(" "));
  });

  // Un concepto coincide si CADA palabra escrita es el comienzo de alguna de sus palabras.
  // Por eso se encuentra mientras se escribe: "pro" ya encuentra "procesador".
  function coincide(palabrasBuscadas, palabras) {
    return palabrasBuscadas.every(function (p) {
      return palabras.some(function (w) { return w.startsWith(p); });
    });
  }

  // Puntaje para ordenar (menor = sale antes):
  //   0 = la palabra escrita es EXACTAMENTE una palabra del nombre
  //   1 = es exactamente una palabra de un alias   (por eso "so" muestra Sistema operativo primero)
  //   2 = es solo el comienzo de una palabra del nombre
  //   3 = es solo el comienzo de una palabra de un alias
  function puntaje(c, buscadas) {
    // una sola letra no cuenta como coincidencia exacta: "m" no debe ser "la palabra m de m.2"
    const exacta = buscadas.every(function (p) { return p.length > 1 && c.palabrasTodas.indexOf(p) !== -1; });
    return (exacta ? 0 : 2) + (coincide(buscadas, c.palabrasNombre) ? 0 : 1);
  }

  function buscar(consulta) {
    const buscadas = normalizar(consulta).split(" ").filter(Boolean);
    if (buscadas.length === 0) return [];
    return conceptos
      .filter(function (c) { return coincide(buscadas, c.palabrasTodas); })
      .sort(function (a, b) { return puntaje(a, buscadas) - puntaje(b, buscadas); });   // el orden es estable: si empatan, queda el de la lista
  }

  const elInput = document.getElementById("buscador-input");
  const elResultados = document.getElementById("buscador-resultados");
  const elEstado = document.getElementById("buscador-estado");
  const elSugerencias = document.getElementById("buscador-sugerencias");

  function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    return el;
  }

  function dato(dl, titulo, texto) {
    dl.appendChild(crear("dt", "", titulo));
    dl.appendChild(crear("dd", "", texto));
  }

  function crearResultado(c) {
    const tarjeta = crear("article", "resultado");
    tarjeta.tabIndex = 0;                                   // se puede llegar con el teclado
    tarjeta.setAttribute("aria-labelledby", "res-" + c.id);
    if (c.imagen) {
      const fig = crear("figure");
      const img = document.createElement("img");
      img.src = "img/" + c.imagen.archivo;
      img.alt = c.imagen.alt;
      img.width = c.imagen.ancho;
      img.height = c.imagen.alto;
      img.loading = "lazy";
      fig.appendChild(img);
      fig.appendChild(crear("figcaption", "", c.imagen.pie));
      tarjeta.appendChild(fig);
    } else {
      tarjeta.classList.add("sin-imagen");
    }
    const texto = crear("div");
    const titulo = crear("h3", "", c.nombre);
    titulo.id = "res-" + c.id;
    texto.appendChild(titulo);
    const dl = crear("dl");
    dato(dl, "Definición sencilla", c.definicion);
    dato(dl, "Función principal", c.funcion);
    dato(dl, "Ejemplo de uso", c.ejemplo);
    texto.appendChild(dl);
    const enlace = crear("a", "mas", "Ver más en Tecnología →");
    enlace.href = c.mas;
    texto.appendChild(enlace);
    tarjeta.appendChild(texto);
    return tarjeta;
  }

  function mostrar() {
    const consulta = elInput.value;
    const encontrados = buscar(consulta);
    elResultados.replaceChildren();
    elEstado.classList.remove("sin-resultados");
    if (consulta.trim() === "") {     // vacío o solo espacios: indicación inicial
      elEstado.textContent = "Escribí un término o elegí una de las búsquedas sugeridas.";
      return;
    }
    if (encontrados.length === 0) {
      elEstado.textContent = "No encontramos «" + consulta.trim() + "». Probá con otra palabra, por ejemplo CPU, memoria o phishing.";
      elEstado.classList.add("sin-resultados");
      return;
    }
    elEstado.textContent = encontrados.length === 1 ? "1 resultado." : encontrados.length + " resultados.";
    encontrados.forEach(function (c) { elResultados.appendChild(crearResultado(c)); });
  }

  function limpiar() {
    elInput.value = "";
    mostrar();
    elInput.focus();
  }

  // Botones de búsquedas sugeridas
  ["CPU", "Memoria", "SSD", "Sistema operativo", "Phishing", "Inteligencia artificial"].forEach(function (termino) {
    const boton = crear("button", "", termino);
    boton.type = "button";
    boton.addEventListener("click", function () { elInput.value = termino; mostrar(); });
    elSugerencias.appendChild(boton);
  });

  elInput.addEventListener("input", mostrar);               // busca mientras se escribe
  document.getElementById("buscador-limpiar").addEventListener("click", limpiar);
  document.getElementById("buscador-form").addEventListener("submit", function (e) { e.preventDefault(); mostrar(); });

  // Teclado: Esc borra la búsqueda; ↓ pasa a los resultados.
  elInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { limpiar(); }
    if (e.key === "ArrowDown" && elResultados.firstElementChild) { e.preventDefault(); elResultados.firstElementChild.focus(); }
  });
  // Dentro de los resultados: ↑ y ↓ cambian de tarjeta; Esc vuelve al campo de búsqueda.
  elResultados.addEventListener("keydown", function (e) {
    const tarjeta = e.target.closest(".resultado");
    if (!tarjeta || e.target !== tarjeta) return;
    if (e.key === "ArrowDown" && tarjeta.nextElementSibling) { e.preventDefault(); tarjeta.nextElementSibling.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); (tarjeta.previousElementSibling || elInput).focus(); }
    if (e.key === "Escape") { elInput.focus(); }
  });

  mostrar();
})();

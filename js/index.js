window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  let language = params.get("lang");

  if (!language) {
    window.location.search = "?lang=ES";
    return;
  }

  const configScript = document.createElement("script");
  configScript.src = `conf/config${language}.json`;
  configScript.onload = function () {
    const buscador = document.getElementById("buscador");
    const botonBuscar = document.getElementById("botonBuscar");
    const lista = document.getElementById("lista-estudiantes");

    if (buscador && botonBuscar) {
      buscador.placeholder = config.nombre;
      botonBuscar.value = config.buscar;
    }

    const saludo = document.querySelector("li:nth-child(2)");
    if (saludo) {
      saludo.textContent = `${config.saludo}, Nicole`;
    }

    const tituloAti = document.getElementById("titulo-ati");
    if (tituloAti && config.sitio) {
      tituloAti.innerHTML = `${config.sitio[0]}<span class="ucv">${config.sitio[1]}</span> ${config.sitio[2]}`;
    }

    const footer = document.querySelector("footer");
    if (footer) {
      footer.textContent = config.copyRight;
    }

    function mostrarEstudiantes(filtro) {
      lista.innerHTML = "";

      const resultados = perfiles.filter(perfil =>
        perfil.nombre.toLowerCase().includes(filtro.toLowerCase())
      );

      if (resultados.length === 0) {
 lista.innerHTML = "";
const mensaje = document.createElement("h2");
mensaje.className = "mensaje-no-resultados";
mensaje.textContent = `${config.mensaje_no_resultados}${filtro}`;
lista.appendChild(mensaje);

} else {
        resultados.forEach(perfil => {
          const li = document.createElement("li");

          const enlace = document.createElement("a");
          enlace.href = `perfil.html?ci=${perfil.ci}&lang=${language}`;

          const img = document.createElement("img");
          img.src = perfil.imagen;
          img.alt = perfil.nombre;

          const nombre = document.createElement("span");
          nombre.textContent = perfil.nombre;

          enlace.appendChild(img);
          enlace.appendChild(nombre);
          li.appendChild(enlace);
          lista.appendChild(li);
        });
      }
    }

    mostrarEstudiantes("");

    botonBuscar.addEventListener("click", function (e) {
      e.preventDefault();
      const filtro = buscador.value.trim();
      mostrarEstudiantes(filtro);
    });
  };

  document.body.appendChild(configScript);
};

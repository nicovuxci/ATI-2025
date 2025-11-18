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
  };
  document.body.appendChild(configScript);

  if (typeof perfiles !== "undefined") {
    const lista = document.getElementById("lista-estudiantes");
    perfiles.forEach(perfil => {
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
};

window.onload = function () {
  const language = new URLSearchParams(window.location.search).get("lang") || "ES";

  const configScript = document.createElement("script");
  configScript.src = `conf/config${language}.json`;
  configScript.onload = function () {
    const buscador = document.getElementById("buscador");
    const botonBuscar = document.getElementById("botonBuscar");
    if (buscador && botonBuscar) {
      buscador.placeholder = config.placeholder;
      botonBuscar.textContent = config.botonBuscar;
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

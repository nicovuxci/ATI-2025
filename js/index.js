window.onload = function () {
  // Paso 6: Detectar idioma desde la URL
  const language = new URLSearchParams(window.location.search).get("lang");
  if (!language) {
    let url = window.location.href;
    url += url.includes("?") ? "&lang=ES" : "?lang=ES";
    window.location.href = url;
    return;
  }

  // Paso 6: Cargar configuración según idioma
  const configScript = document.createElement("script");
  configScript.src = `conf/config${language}.json`;
  configScript.onload = function () {
    document.getElementById("buscador").placeholder = config.placeholder;
    document.getElementById("boton-buscar").value = config.botonBuscar;
  };
  document.body.appendChild(configScript);

  // Paso 7: Mostrar lista de estudiantes desde index.json
  if (typeof perfiles !== "undefined") {
    const lista = document.getElementById("lista-estudiantes");

    perfiles.forEach(perfil => {
      const li = document.createElement("li");

      const img = document.createElement("img");
      img.src = perfil.imagen;
      img.alt = perfil.nombre;

      const nombre = document.createElement("span");
      nombre.textContent = perfil.nombre;

      li.appendChild(img);
      li.appendChild(nombre);
      lista.appendChild(li);
    });
  }
};

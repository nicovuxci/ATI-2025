window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const ci = params.get("ci");
  const language = params.get("lang");

  if (!ci || !language) {
    document.body.innerHTML = "<h2 class='mensaje-no-resultados'>Perfil no disponible. Falta información en el enlace.</h2>";
    throw new Error("Faltan parámetros en el URL");
  }

  const configScript = document.createElement("script");
  configScript.src = `conf/config${language}.json`;
  configScript.onload = function () {
    const scriptPerfil = document.createElement("script");
    scriptPerfil.src = `${ci}/perfil.json`;
    scriptPerfil.onload = function () {
      document.title = perfil.nombre;
      document.getElementById("titulo-pagina").textContent = perfil.nombre;
      document.getElementById("nombre-usuario").textContent = perfil.nombre;
      document.getElementById("descripcion").textContent = perfil.descripcion;

      const correo = document.querySelector('#correo');
      const correoTexto = config.correo.replace(
        "[email]",
        `<a id="email-link" href="mailto:${perfil.email}">${perfil.email}</a>`
      );
      correo.innerHTML = correoTexto;

      const foto = document.createElement("img");
      foto.alt = perfil.nombre;
      foto.src = `${ci}/${ci}.jpg`;
      foto.onerror = function () {
        foto.src = `${ci}/${ci}.PNG`;
      };
      document.getElementById("foto-perfil").appendChild(foto);

      const tabla = document.getElementById("info");
      const campos = [
        "color",
        "libro",
        "musica",
        "video_juego",
        "lenguajes",
        "genero",
        "fecha_nacimiento"
      ];
      campos.forEach(campo => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${config[campo]}:</td><td>${perfil[campo]}</td>`;
        tabla.appendChild(fila);
      });
    };
    document.body.appendChild(scriptPerfil);
  };
  document.body.appendChild(configScript);
};

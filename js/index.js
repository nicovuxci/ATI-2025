window.onload = function () {

  function setLangCookie(lang) {
    document.cookie = `lang=${lang}; path=/; max-age=3600`;
  }

  function getLangCookie() {
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
      const [key, value] = c.trim().split("=");
      if (key === "lang") return value;
    }
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  let language = params.get("lang") || getLangCookie() || "ES";
  setLangCookie(language);

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
    const saludo = document.getElementById("saludo");
    if (saludo) saludo.textContent = `${config.saludo}, Nicole`;

    const tituloAti = document.getElementById("titulo-ati");
    if (tituloAti && config.sitio) {
      tituloAti.innerHTML = `${config.sitio[0]}<span class="ucv">${config.sitio[1]}</span> ${config.sitio[2]}`;
    }
    const footer = document.querySelector("footer");
    if (footer) footer.textContent = config.copyRight;

    if (botonBuscar) {
      botonBuscar.addEventListener("click", function (e) {
        e.preventDefault();
        const filtro = buscador.value.trim();

        fetch(`/ATI/index.py?nombre=${encodeURIComponent(filtro)}`)
          .then(res => res.text())
          .then(html => {
            document.body.innerHTML = html;
            recargarScript();
          })
          .catch(err => console.error("Error en búsqueda:", err));
      });
    }

    if (lista) {
      lista.addEventListener("click", (e) => {
        e.preventDefault();
        const link = e.target.closest("a");
        if (!link) return;

        fetch(link.href.replace("perfil.html", "index.py"))
          .then(res => res.text())
          .then(html => {
            document.body.innerHTML = html;
            recargarScript();
          })
          .catch(err => console.error("Error cargando perfil:", err));
      });
    }
  };

  document.body.appendChild(configScript);

  function recargarScript() {
    const script = document.createElement("script");
    script.src = "/ATI/js/index.js";
    document.body.appendChild(script);
  }
};

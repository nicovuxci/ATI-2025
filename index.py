#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, os
from urllib.parse import parse_qs

def application(environ, start_response):

    cookies = environ.get("HTTP_COOKIE", "")
    lang_cookie = "ES"
    for cookie in cookies.split(";"):
        if "lang=" in cookie:
            lang_cookie = cookie.split("=")[1].strip()

    params = parse_qs(environ.get("QUERY_STRING", ""))
    ci = params.get("ci", [None])[0]
    lang = params.get("lang", [lang_cookie])[0]
    nombre = params.get("nombre", [None])[0]

    headers = [
        ("Content-type", "text/html; charset=utf-8"),
        (f"Set-Cookie", f"lang={lang}; Path=/; Max-Age=3600")
    ]
    status = "200 OK"
    start_response(status, headers)

    config_path = f"/var/www/html/ATI/conf/config{lang}.json"
    with open(config_path, encoding="utf-8") as f:
        config = json.load(f)

    with open("/var/www/html/ATI/datos/index.json", encoding="utf-8") as f:
        data = json.load(f)

    perfil = None
    resultados = data["perfiles"]

    if nombre:
        resultados = [p for p in data["perfiles"] if nombre.lower() in p["nombre"].lower()]

    if ci:
        perfil_path = f"/var/www/html/ATI/{ci}/perfil.json"
        if os.path.exists(perfil_path):
            with open(perfil_path, encoding="utf-8") as f:
                perfil = json.load(f)

    if perfil:
        html = f"""
        <!DOCTYPE html>
        <html lang="{lang}">
        <head>
          <meta charset="UTF-8">
          <title>{perfil['nombre']}</title>
          <link rel="stylesheet" href="/ATI/css/style.css">
          <script src="/ATI/js/index.js"></script>
        </head>
        <body>
          <div class="pictureBox">
            <div id="foto-perfil">
              <img src="/ATI/{ci}/{ci}.jpg" alt="{perfil['nombre']}">
            </div>
            <div class="perfil">
              <h1 id="nombre-usuario">{perfil['nombre']}</h1>
              <p id="descripcion" class="side">{perfil.get("descripcion","")}</p>
              <table id="info" class="info">
                <tr><td>{config['color']}:</td><td>{perfil.get('color','')}</td></tr>
                <tr><td>{config['libro']}:</td><td>{perfil.get('libro','')}</td></tr>
                <tr><td>{config['musica']}:</td><td>{perfil.get('musica','')}</td></tr>
                <tr><td>{config['video_juego']}:</td><td>{perfil.get('video_juego','')}</td></tr>
                <tr><td>{config['lenguajes']}:</td><td>{perfil.get('lenguajes','')}</td></tr>
                <tr><td>{config['genero']}:</td><td>{perfil.get('genero','')}</td></tr>
                <tr><td>{config['fecha_nacimiento']}:</td><td>{perfil.get('fecha_nacimiento','')}</td></tr>
              </table>
              <p id="correo">{config['correo'].replace("[email]", f"<a href='mailto:{perfil.get('email','')}'>{perfil.get('email','')}</a>")}</p>
            </div>
          </div>
        </body>
        </html>
        """
    else:
        lista_html = "".join([
            f"<li><a href='?ci={p['ci']}&lang={lang}'><img src='/ATI/{p['imagen']}' alt='{p['nombre']}'><span>{p['nombre']}</span></a></li>"
            for p in resultados
        ])
        html = f"""
        <!DOCTYPE html>
        <html lang="{lang}">
        <head>
          <meta charset="UTF-8">
          <title>{config['sitio'][0]} {config['sitio'][1]} {config['sitio'][2]}</title>
          <link rel="stylesheet" href="/ATI/css/style.css">
          <script src="/ATI/js/index.js"></script>
        </head>
        <body>
          <header>
            <nav>
              <ul>
                <li><span id="titulo-ati" class="titulo-ati">{config['sitio'][0]}<span class="ucv">{config['sitio'][1]}</span> {config['sitio'][2]}</span></li>
                <li>{config['saludo']}, Nicole</li>
                <li>
                  <form id="form-buscar" action="" method="get">
                    <input type="text" id="buscador" name="nombre" placeholder="{config['nombre']}">
                    <input type="submit" id="botonBuscar" value="{config['buscar']}">
                  </form>
                </li>
              </ul>
            </nav>
          </header>
          <div class="contenedor">
            <section class="estudiantes">
              <ul id="lista-estudiantes">{lista_html}</ul>
            </section>
          </div>
          <footer>{config['copyRight']}</footer>
        </body>
        </html>
        """

    return [html.encode("utf-8")]

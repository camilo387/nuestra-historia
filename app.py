"""
Nuestra Historia — Juan ❤ María José
Servidor Flask mínimo para servir la página romántica.

Estructura del proyecto:
  app.py
  templates/
      index.html
  static/
      style.css
      script.js
      foto.jpg      <- coloca aquí la foto de ustedes dos
      cancion.mp3   <- coloca aquí la música romántica (opcional)

Para ejecutarlo:
  1) pip install flask
  2) python app.py
  3) abre http://127.0.0.1:5000 en el navegador
"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    # debug=True recarga automáticamente al guardar cambios en desarrollo
    app.run(debug=True, host="127.0.0.1", port=5000)
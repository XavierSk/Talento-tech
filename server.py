from flask import Flask, request, jsonify, send_from_directory
import sqlite3
from datetime import datetime
import os

DB = 'data.db'
QUESTIONS = [
    '¿Tienes una idea de negocio definida?',
    '¿Has validado tu idea con potenciales clientes?',
    '¿Tienes un plan básico (objetivos y pasos)?',
    '¿Conoces a tu cliente ideal?',
    '¿Has lanzado al menos una versión mínima de tu producto/servicio?',
    '¿Tienes una forma clara de generar ingresos?',
    '¿Has pensado en precios y costes?',
    '¿Buscas activamente retroalimentación?',
    '¿Estás dispuesto a iterar y mejorar el producto?',
    '¿Tienes una red de apoyo (mentores, colegas)?'
]

app = Flask(__name__, static_folder='static')

# ----------------- BASE DE DATOS -----------------
def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            answers TEXT,
            score INTEGER,
            level TEXT,
            ts TEXT
        )
    ''')
    conn.commit()
    conn.close()

def save_submission(answers, score, level):
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute(
        'INSERT INTO submissions (answers, score, level, ts) VALUES (?, ?, ?, ?)',
        (','.join(answers), score, level, datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()

def get_all_submissions():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('SELECT id, answers, score, level, ts FROM submissions ORDER BY id DESC')
    rows = c.fetchall()
    conn.close()
    return [
        {'id': r[0], 'answers': r[1].split(','), 'score': r[2], 'level': r[3], 'ts': r[4]}
        for r in rows
    ]

# ----------------- EVALUACIÓN -----------------
def evaluate(answers):
    score = sum(1 for a in answers if a.lower() == 'si')
    n = len(QUESTIONS)
    if score <= 2:
        level = 'Nivel inicial'
        message = 'Empieza por clarificar tu idea y validar el problema.'
    elif score <= 5:
        level = 'En proceso'
        message = 'Vas por buen camino; valida más y construye un MVP.'
    elif score <= 8:
        level = 'Avanzado'
        message = 'Tienes una base sólida; trabaja en escalabilidad y métricas.'
    else:
        level = 'Emprendedor/a'
        message = 'Excelente: tu emprendimiento muestra señales de madurez.'
    return score, level, message

# ----------------- RUTAS HTML -----------------
@app.route('/')
def home():
    return send_from_directory('.', 'Emprendimiento.html')

@app.route('/formulario.html')
def formulario():
    return send_from_directory('.', 'formulario.html')

@app.route('/dashboard.html')
def dashboard():
    return send_from_directory('.', 'dashboard.html')

# ----------------- ENDPOINTS API -----------------
@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    answers = data.get('answers')
    if not answers or len(answers) != len(QUESTIONS):
        return jsonify({'error': 'Número de respuestas inválido.'}), 400
    score, level, message = evaluate(answers)
    save_submission(answers, score, level)
    return jsonify({'score': score, 'level': level, 'message': message})

@app.route('/submissions', methods=['GET'])
def submissions():
    return jsonify(get_all_submissions())

# ----------------- ARCHIVOS ESTÁTICOS -----------------
@app.route('/static/<path:path>')
def static_files(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    if not os.path.exists(DB):
        init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)

document.getElementById("form-emprendimiento").addEventListener("submit", async function (e) {
    e.preventDefault();

    const respuestas = [];
    for (let i = 1; i <= 10; i++) {
        const seleccion = document.querySelector(`input[name="q${i}"]:checked`);
        if (!seleccion) {
            alert(`Por favor responde la pregunta ${i}`);
            return;
        }
        respuestas.push(seleccion.value);
    }

    try {
        const resp = await fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: respuestas })
        });

        const data = await resp.json();
        if (!resp.ok) {
            alert(data.error || "Error al enviar el formulario.");
            return;
        }

        // Mostrar resultado
        const resultado = document.getElementById("resultado");
        resultado.innerHTML = `
            <p><strong>Puntaje:</strong> ${data.score}</p>
            <p><strong>Nivel:</strong> ${data.level}</p>
            <p>${data.message}</p>
            <a href="/dashboard.html">
                <button style="
                    margin-top: 10px;
                    padding: 8px 12px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                    Ver Dashboard
                </button>
            </a>
        `;

    } catch (error) {
        console.error(error);
        alert("No se pudo enviar el formulario. Intenta de nuevo.");
    }
});

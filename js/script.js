fetch("/menu")
  .then(response => response.json())
  .then(data => {
    console.log("Platos del menú:", data);
    // Aquí podrías renderizar los platos en pantalla
  });
function reservarMesa(event) {
  event.preventDefault();
  const mensaje = document.getElementById("mensaje-reserva");
  mensaje.textContent = "¡Gracias! Tu reserva ha sido registrada.";
  setTimeout(() => {
    mensaje.textContent = "";
    event.target.reset();
  }, 3000);
}
// Efecto fade-in al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});